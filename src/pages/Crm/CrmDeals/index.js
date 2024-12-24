import React, { useEffect, useMemo, useState } from "react";

import { Container, Col, Row, Table } from "reactstrap";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteModal from "../../../Components/Common/DeleteModal";
import BasicSuccessMsg from "../../AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import { toast } from "react-toastify";

const CrmDeals = () => {
  const [runningDayData, setRunningDayData] = useState(null);
  const [allExpenses, setAllExpenses] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [expIdForDel, setExpIdForDel] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [ncCollection, setNcCollection] = useState(0);
  const [unBilledAmount, setUnBilledAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [parcelCharges, setParcelCharges] = useState(0);
  const [billedAmount, setBilledAmount] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [newBilledAmount, setNewBilledAmount] = useState(0);
  const [myAllItems, setMyAllItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todayAllOrders, setTodayAllOrders] = useState([]);
  const [recoveredCredit, setRecoveredCredit] = useState([]);
  const [allPaymentMethods, setAllPaymentMethods] = useState([]);

  //this is for getting id of restaurent from the url
  const { id } = useParams();

  //this is for navigate
  const navigate = useNavigate();

  //this is for getting data from my custome hook
  const { myUrl, restData, dayId, token } = UseRiazHook();

  //this isfor getting of running day data
  const forGettingRunningDayData = async () => {
    const url = `${myUrl}/restaurent/${id}/get/data/ofrunningday/${dayId}/rest`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setRunningDayData(data.runningDay);
        setAllExpenses(data.runningDay.expenses);
        setRecoveredCredit(data.runningDay.recoveredCredit);
      } else {
        consol.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the getting all data of running day function",
        err
      );
    }
  };

  //this is for control rendering of getting data
  useEffect(() => {
    forGettingRunningDayData();
  }, []);

  //this is for delete the transition
  const forDeleteTheExpenseTransitionFromDay = async () => {
    const url = `${myUrl}/restaurent/transition/${expIdForDel}/delete/expense/${dayId}/fromday`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        forGettingRunningDayData();
        toast.success(data.msg);
        setDeleteModal(false);
        setSuccessModal(true);
      } else {
        console.log("err data", data);
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(
        "there is error in the delete expense from day function",
        err
      );
    }
  };

  //this is for click on delete button
  const forClickOnDeleteButton = (id) => {
    setExpIdForDel(id);
    setDeleteModal(true);
  };

  //this is for calculation i.e total amount billed amount unbilled amount etc
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all data in parallel
        const [ordersResponse, tablesResponse, kotsResponse] =
          await Promise.all([
            fetch(`${myUrl}/get/${id}/restaurent/all/orders`),
            fetch(`${myUrl}/forget/all/tables/${id}`),
            fetch(`${myUrl}/get/${id}/restaurent/all/delivered/kots`),
          ]);

        const ordersData = await ordersResponse.json();
        const tablesData = await tablesResponse.json();
        const kotsData = await kotsResponse.json();

        if (ordersResponse.ok && tablesResponse.ok && kotsResponse.ok) {
          // Process today's orders
          const today = new Date().toISOString().split("T")[0];
          const todaysOrders = ordersData.myFilterOrders.filter((order) =>
            order.createdAt.startsWith(today)
          );

          setTodayAllOrders(todaysOrders);
          const paymentTotals = calculatePaymentMethodTotals(todaysOrders);

          const totalBilled = todaysOrders
            .filter((order) => order.isNoCharge !== "yes")
            .reduce(
              (sum, order) =>
                sum +
                (order.credit
                  ? order.totalAmount - order.credit
                  : order.totalAmount || 0),
              0
            );

          const totalNoCharge = todaysOrders
            .filter((order) => order.isNoCharge === "yes")
            .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

          const totalDiscount = todaysOrders.reduce(
            (sum, order) => sum + (order.discount || 0),
            0
          );

          const forTotalCredit = todaysOrders.reduce(
            (sum, order) => sum + (order?.credit || 0),
            0
          );

          const forParcleChargesCount = todaysOrders.reduce(
            (sum, order) => sum + (order.parcel || 0),
            0
          );

          setBilledAmount(totalBilled);
          setNcCollection(totalNoCharge);
          setTotalDiscount(totalDiscount);
          setParcelCharges(forParcleChargesCount);
          setTotalCredit(forTotalCredit);

          // Process tables for unbilled amounts
          const runningAndInvoicedTables = tablesData.allTables.filter(
            (table) =>
              table.currentOrder.status === "running" ||
              table.currentOrder.status === "invoiced"
          );

          const totalUnbilled = runningAndInvoicedTables.reduce(
            (sum, table) => sum + (table.currentOrder.remainAmount || 0),
            0
          );

          const totalPaid = runningAndInvoicedTables.reduce(
            (sum, table) => sum + (table.currentOrder.paidAmount || 0),
            0
          );

          setUnBilledAmount(totalUnbilled);
          setNewBilledAmount(totalBilled + totalPaid);

          // Collect KOT IDs from today's orders
          const kotIdsSet = new Set(
            todaysOrders.flatMap((order) => order.kots)
          );

          // Filter KOTs based on collected KOT IDs
          const filteredKots = kotsData.allKots.filter((kot) =>
            kotIdsSet.has(kot._id)
          );

          // Calculate totalQuantity and totalSale for each item
          let allItemsData = {};
          filteredKots.forEach((kot) => {
            kot.orderItems.forEach((item) => {
              const itemId = item.id;
              if (!allItemsData[itemId]) {
                allItemsData[itemId] = {
                  name: item.name,
                  totalQuantity: 0,
                  price: item.price,
                  totalSale: 0,
                };
              }
              allItemsData[itemId].totalQuantity += item.quantity;
              allItemsData[itemId].totalSale += item.quantity * item.price;
            });
          });

          const itemsArray = Object.values(allItemsData);
          setMyAllItems(itemsArray);

          // Calculate final total amount
          const calculatedTotalAmount =
            totalBilled +
            totalUnbilled +
            totalNoCharge +
            forTotalCredit +
            totalPaid;
          setTotalAmount(calculatedTotalAmount);
        } else {
          console.error("Error in API responses");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //this is for formatting the amount
  const formatAmount = (amount) => {
    const {
      currencyPosition,
      restCurrencySymbol,
      precision,
      decimalSeparator,
      thousandSeparator,
    } = restData;

    // Map separators to their actual values
    const separatorMapping = {
      dot: ".",
      comma: ",",
      space: " ",
    };

    const actualDecimalSeparator = separatorMapping[decimalSeparator] || ".";
    const actualThousandSeparator = separatorMapping[thousandSeparator] || ",";

    // Fix to the specified precision
    const fixedAmount = amount
      ? amount.toFixed(precision)
      : (0).toFixed(precision);

    // Split the amount into integer and decimal parts
    let [integerPart, decimalPart] = fixedAmount.split(".");

    // Add thousand separators to the integer part
    integerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      actualThousandSeparator
    );

    // Combine integer and decimal parts with the appropriate separator
    const formattedNumber = decimalPart
      ? `${integerPart}${actualDecimalSeparator}${decimalPart}`
      : integerPart;

    // Return the formatted amount with currency symbol
    return currencyPosition === "before"
      ? `${restCurrencySymbol}${formattedNumber}`
      : `${formattedNumber}${restCurrencySymbol}`;
  };

  const calculateTotal = () => {
    let forTotalAmount =
      totalAmount +
      runningDayData?.creditRecovered +
      runningDayData?.openingAmount;

    // Loop through each expense
    allExpenses.forEach((expense) => {
      if (expense.exprensType === "received") {
        forTotalAmount += expense.amount;
      } else if (expense.exprensType === "paid") {
        forTotalAmount -= expense.amount;
      }
    });

    return forTotalAmount;
  };

  //this is for calculation all methods total amount
  const calculatePaymentMethodTotals = (orders, expenses) => {
    const paymentTotals = {};

    orders.forEach((order) => {
      if (order.paymentMethod) {
        try {
          const paymentMethods = JSON.parse(order.paymentMethod);
          paymentMethods.forEach(({ payMethod, amount }) => {
            if (!paymentTotals[payMethod]) {
              paymentTotals[payMethod] = 0;
            }
            paymentTotals[payMethod] += amount;
          });
        } catch (error) {
          console.error(
            "Error parsing paymentMethod:",
            order.paymentMethod,
            error
          );
        }
      }
    });

    console.log("expenses", allExpenses);

    // Process expenses
    allExpenses?.forEach((expense) => {
      const type = expense.paymentType;
      const amount = expense.amount;

      if (!paymentTotals[type]) {
        paymentTotals[type] = 0;
      }

      if (expense.exprensType === "received") {
        paymentTotals[type] += amount;
      } else if (expense.exprensType === "paid") {
        paymentTotals[type] -= amount;
      }
    });

    // Process recovered credits
    recoveredCredit.forEach((credit) => {
      const type = credit.paymentMeth;
      const amount = credit.amount;

      if (!paymentTotals[type]) {
        paymentTotals[type] = 0;
      }
      paymentTotals[type] += amount;
    });

    // Convert paymentTotals object to an array
    const paymentTotalsArray = Object.entries(paymentTotals).map(
      ([method, amount]) => {
        return { method, amount };
      }
    );

    setAllPaymentMethods(paymentTotalsArray);
    console.log("all methods", paymentTotalsArray);
    return paymentTotalsArray;
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={forDeleteTheExpenseTransitionFromDay}
        onCloseClick={() => setDeleteModal(false)}
      />
      <BasicSuccessMsg
        show={successModal}
        onCloseClick={() => setSuccessModal(false)}
      />
      <div className="page-content">
        <Col sm={12}>
          <div className="d-flex align-items-center justify-content-between mt-0 ">
            <div>
              <h5>Close Day of {restData?.restName} </h5>
            </div>

            <div>
              <Link
                to={`/add/restaurent/${id}/transition`}
                style={{
                  backgroundColor: "#0000FF",
                  color: "white",
                  textDecoration: "none",
                  textAlign: "center",

                  fontSize: "14px",
                }}
                className="px-3 mx-1 py-1"
              >
                <i className="ri-add-circle-line align-middle me-1"></i> Add
                Transition
              </Link>
            </div>
          </div>
        </Col>
        <hr></hr>
        <Container fluid>
          <Row>
            <Col>
              <div>
                <table
                  className="table table-bordered"
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        UnBilled Amount
                      </td>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        {formatAmount(unBilledAmount)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Total Discount
                      </td>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        {formatAmount(totalDiscount)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Parcel Charges
                      </td>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        {formatAmount(parcelCharges)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        No Charge Amount
                      </td>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        {formatAmount(ncCollection)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Today Credit
                      </td>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        {formatAmount(totalCredit)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Billed Amount
                      </td>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        {formatAmount(billedAmount)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Credit Recovered
                      </td>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        {formatAmount(runningDayData?.creditRecovered)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Total Amount
                      </td>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        {formatAmount(
                          totalAmount + runningDayData?.creditRecovered
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Opening Amount
                      </td>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        {formatAmount(runningDayData?.openingAmount)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Grand Total
                      </td>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        {formatAmount(
                          totalAmount +
                            runningDayData?.creditRecovered +
                            runningDayData?.openingAmount
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
            <Col md={12}>
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>votur</th>
                      <th>Acc head</th>
                      <th>Acc name</th>
                      <th>Payment Mode</th>
                      <th>Amount</th>
                      <th>Type</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allExpenses?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.votureNo}</td>
                        <td>{item.headAcount}</td>
                        <td>{item.accountName}</td>
                        <td>{item.paymentType}</td>
                        <td>{item.amount}</td>
                        <td>{item.exprensType}</td>
                        <td className="text-center">
                          <button
                            onClick={() =>
                              navigate(
                                `/restaurent/${id}/edit/expense/${item.id}/runningday`
                              )
                            }
                            className="my-custome-button-edit"
                            style={{
                              padding: "4px 8px",
                            }}
                          >
                            <i className="ri-pencil-fill align-bottom" />
                          </button>

                          <button
                            onClick={() => forClickOnDeleteButton(item.id)}
                            className="my-custome-button-delete"
                            style={{
                              padding: "4px 8px",
                            }}
                          >
                            <i className="ri-delete-bin-5-fill align-bottom" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>

            <Col md={12}>
              <div>
                <table
                  className="table table-bordered"
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Total After Expenses
                      </td>
                      <td
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        {formatAmount(calculateTotal())}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>

            <Col md={12}>
              <div>
                <table
                  className="table table-bordered"
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                  }}
                >
                  <tbody>
                    {allPaymentMethods?.map((item, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            border: "1px solid #dee2e6",
                            padding: "10px",
                            fontWeight: "bold",
                            textAlign: "left",
                          }}
                        >
                          Total {item.method} Sale
                        </td>
                        <td
                          style={{
                            border: "1px solid #dee2e6",
                            padding: "10px",
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                        >
                          {formatAmount(item?.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CrmDeals;
