import React, { useEffect, useState, useMemo } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Table,
  Form,
  Input,
  Label,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";
import { FaExchangeAlt } from "react-icons/fa";
import Pagination from "../../../Components/Common/Pagination";
import Select from "react-select";
import { UseRiazHook } from "../../../RiazStore/RiazStore";

const DashboardCrypto = () => {
  const [allOrder, setAllOrders] = useState([]);
  const [filterOrders, setFilterOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableType, setTableType] = useState("");

  //this is for getting data from my custome hookk
  const { restData, myUrl, restId, counterId } = UseRiazHook();

  //this is for pagination
  const perPageData = 50;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  //this is for page current data
  const currentdata = useMemo(
    () => allOrder?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  //this is for first time load and set data
  useEffect(() => {
    setFilterOrders(allOrder.slice(0, perPageData));
  }, [allOrder]);

  //this is for set current data of page
  useEffect(() => {
    setFilterOrders(currentdata);
  }, [currentdata]);

  //this is for onchage and search
  const OnchangeHandler = (e, type) => {
    let value;

    if (type === "date") {
      value = e[0]?.toLocaleDateString("en-GB");
      if (value) {
        const filteredByDate = allOrder.filter((kot) => {
          const invoiceDate = new Date(kot.createdAt).toLocaleDateString(
            "en-GB"
          );
          return invoiceDate === value;
        });
        setFilterOrders(filteredByDate.slice(0, perPageData));
      }
    } else if (type === "table") {
      value = e.target.value;
      if (value) {
        const filteredByTable = allOrder.filter((kot) =>
          kot?.table?.name?.toLowerCase().includes(value.toLowerCase())
        );
        setFilterOrders(filteredByTable.slice(0, perPageData));
      }
    } else if (type === "invoiceNo") {
      value = e.target.value;
      if (value) {
        const filteredByInvoiceNo = allOrder.filter((kot) =>
          kot?.invoiceNo?.toString().includes(value)
        );
        setFilterOrders(filteredByInvoiceNo.slice(0, perPageData));
      }
    } else if (type === "paymentMethod") {
      value = e.target.value.toLowerCase();

      if (value) {
        const filteredByPaymentMethod = allOrder.filter((kot) => {
          let paymentMethods = [];
          if (kot.paymentMethod) {
            try {
              paymentMethods = JSON.parse(kot.paymentMethod);
            } catch (error) {
              console.error("Error parsing paymentMethod:", error);
            }
          }

          if (value === "multi") {
            return paymentMethods.length > 1;
          } else {
            return (
              paymentMethods.length === 1 &&
              paymentMethods.some((method) =>
                method?.payMethod?.toLowerCase().includes(value)
              )
            );
          }
        });

        setFilterOrders(filteredByPaymentMethod.slice(0, perPageData));
      }
    } else if (type === "tableType") {
      value = e.target.value;

      if (value) {
        const filteredByTableType = allOrder.filter((kot) =>
          kot.orderType?.toLowerCase().includes(value.toLowerCase())
        );
        setFilterOrders(filteredByTableType.slice(0, perPageData));
      }
    } else if (type === "guest") {
      value = e.target.value;

      if (value) {
        const filteredByTableType = allOrder.filter((kot) =>
          kot?.guest?.name?.toLowerCase().includes(value.toLowerCase())
        );
        setFilterOrders(filteredByTableType.slice(0, perPageData));
      }
    }

    if (!value) {
      setFilterOrders(allOrder.slice(indexOfFirst, indexOfLast));
    }

    setCurrentPage(1);
  };

  //this is for getting all orders of the restaurent
  const forGettingAllOrdersOfRestaurent = async () => {
    const url = `${myUrl}/get/${restId}/restaurent/all/orders`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        let myCounterOrders = data.myFilterOrders.filter(
          (order) => order.counter.id === counterId
        );
        setAllOrders(myCounterOrders);
        setFilterOrders(myCounterOrders);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the getting all invoices function", err);
    }
  };

  //this is for control the rendering of the all invoices function
  useEffect(() => {
    forGettingAllOrdersOfRestaurent();
  }, []);

  //this is for the date
  const formatDateTime = (date, format) => {
    const d = new Date(date);

    const day = d.getDate(); // No leading zero
    const month = d.getMonth() + 1; // No leading zero, Months are 0-indexed
    const year = d.getFullYear();
    const hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // 12-hour format

    let formattedDate;
    switch (format) {
      case "D/M/Y":
        formattedDate = `${day}/${month}/${year}`;
        break;
      case "M/Y/D":
        formattedDate = `${month}/${year}/${day}`;
        break;
      case "Y/M/D":
        formattedDate = `${year}/${month}/${day}`;
        break;
      default:
        formattedDate = d.toLocaleDateString(); // Default fallback
    }

    return `${formattedDate} ${formattedHours}:${minutes} ${ampm}`;
  };

  //this is for date formate
  const dateFormatMapper = (format) => {
    switch (format) {
      case "D/M/Y":
        return "d/m/Y";
      case "M/D/Y":
        return "m/d/Y";
      case "Y/M/D":
        return "Y/m/d";
      default:
        return "d/m/Y"; // Default format
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="mt-0">
            <Col sm={12} className="mt-0">
              <div className="d-flex align-items-center justify-content-between mt-0 ">
                <div style={{ gap: "5px" }}>
                  <h4>All Invoices of my agree</h4>
                </div>

                <div>
                  <Link
                    style={{
                      backgroundColor: "#FE9900",
                      color: "black",
                      textDecoration: "none",
                      textAlign: "center",

                      fontSize: "14px",
                    }}
                    className="px-3 mx-1 py-1"
                  >
                    <FaExchangeAlt className="mx-1" />
                    Export to Excel
                  </Link>
                </div>
              </div>
            </Col>
            <hr></hr>
            <Form>
              <Row>
                <Col md={4} xs={12} className="mb-3">
                  <Label for="kotNumber" style={{ fontWeight: "bold" }}>
                    invoice No
                  </Label>
                  <Input
                    type="number"
                    id="kotNumber"
                    onChange={(e) => OnchangeHandler(e, "invoiceNo")}
                    placeholder="Invoice Number"
                  />
                </Col>
                <Col md={4} xs={12} className="mb-3">
                  <Label for="kotDate" style={{ fontWeight: "bold" }}>
                    Kot Date
                  </Label>
                  <Flatpickr
                    className="form-control"
                    id="datepicker-publish-input"
                    placeholder="Select date or search"
                    onChange={(e) => OnchangeHandler(e, "date")}
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: dateFormatMapper(restData.dateFormate),
                    }}
                  />
                </Col>
                <Col md={4} xs={12} className="mb-3">
                  <Label for="kotType" style={{ fontWeight: "bold" }}>
                    Table No
                  </Label>
                  <Input
                    type="number"
                    id="kotType"
                    onChange={(e) => OnchangeHandler(e, "table")}
                    placeholder="Enter table no"
                  />
                </Col>
                <Col md={4} xs={12} className="mb-3">
                  <div className="mb-3">
                    <Label for="kotDate" style={{ fontWeight: "bold" }}>
                      Table Type
                    </Label>
                    <Select
                      value={tableType}
                      onChange={(selectedOption) => {
                        setTableType(selectedOption.value);
                        OnchangeHandler(
                          { target: { value: selectedOption.value } },
                          "tableType"
                        );
                      }}
                      options={[
                        { value: "dine-in", label: "Dine In" },
                        { value: "take-away", label: "Take Away" },
                        { value: "delivery", label: "Delivery" },
                      ]}
                      placeholder={tableType ? tableType : "select table type"}
                    />
                  </div>
                </Col>{" "}
                <Col md={4} xs={12} className="mb-3">
                  <Label for="additionalInfo" style={{ fontWeight: "bold" }}>
                    payment mode
                  </Label>
                  <Input
                    onChange={(e) => OnchangeHandler(e, "paymentMethod")}
                    type="text"
                    id="additionalInfo"
                    placeholder="search payment type"
                  />
                </Col>
                <Col md={4} xs={12} className="mb-3">
                  <Label for="kotNumber" style={{ fontWeight: "bold" }}>
                    Guest Name
                  </Label>
                  <Input
                    type="text"
                    id="kotNumber"
                    onChange={(e) => OnchangeHandler(e, "guest")}
                    placeholder="Guest Name"
                  />
                </Col>
              </Row>
            </Form>
          </div>

          {/* Table Section */}
          <div className="table-responsive mt-4">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Date</th>
                  <th>Counter</th>
                  <th>Table</th>
                  <th>Table Type</th>
                  <th>Waiter</th>
                  <th>Guest</th>
                  <th>Grand total</th>
                  <th>Payment Mode</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filterOrders.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.invoiceNo}</td>
                    <td>
                      {formatDateTime(item?.createdAt, restData?.dateFormate)}
                    </td>
                    <td>{item?.counter?.name}</td>
                    <td>{item?.table?.name}</td>
                    <td>{item?.orderType}</td>
                    <td>{item?.orderTaker}</td>
                    <td>{item?.guest?.name}</td>
                    <td>{item?.totalAmount}</td>
                    <td>
                      {(() => {
                        // Handle potential undefined or invalid JSON gracefully
                        let paymentMethods = [];
                        if (item.paymentMethod) {
                          try {
                            paymentMethods = JSON.parse(item.paymentMethod);
                          } catch (error) {
                            console.error(
                              "Error parsing paymentMethod:",
                              error
                            );
                          }
                        }

                        // Check if paymentMethods array has one or more methods
                        if (paymentMethods.length === 1) {
                          return paymentMethods[0]?.payMethod;
                        } else if (paymentMethods.length > 1) {
                          return "multi";
                        } else {
                          return "No Payment Method"; // Fallback if no payment method exists
                        }
                      })()}
                    </td>

                    <td>
                      <div className="hstack gap-3 flex-wrap">
                        <button className="btn btn-sm btn-soft-info edit-list">
                          <i className="ri-printer-fill align-bottom" />{" "}
                        </button>
                        <button className="btn btn-sm btn-soft-info edit-list">
                          <i className="ri-pencil-fill align-bottom" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="my-3 p-3">
            <Pagination
              perPageData={perPageData}
              data={allOrder}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardCrypto;
