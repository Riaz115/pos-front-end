import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Container, Label, Input, Table } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Pagination from "../../Components/Common/Pagination";
import { UseRiazHook } from "../../RiazStore/RiazStore";

const InvoiceList = () => {
  const [guestData, setGuestData] = useState({});
  const [allPaysOfGuest, setAllPaysOfGuest] = useState([]);
  const [allFilterPayOfGuest, setAllFilterPaysOfGuest] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);

  //this is for getting the guest from the url
  const { id } = useParams();

  //this is for getting data from the useRiazHook
  const { restData, myUrl, token, formatAmount } = UseRiazHook();

  //this is for pagination
  const perPageData = 50;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  //this is for page current data
  const currentdata = useMemo(
    () => allPaysOfGuest?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  //this is for first time load and set data
  useEffect(() => {
    setAllFilterPaysOfGuest(allPaysOfGuest.slice(0, perPageData));
  }, [allPaysOfGuest]);

  //this is for set current data of page
  useEffect(() => {
    setAllFilterPaysOfGuest(currentdata);
  }, [currentdata]);

  const togglePaymentDetails = (paymentId) => {
    if (selectedPayment === paymentId) {
      // If already selected, unselect (hide details)
      setSelectedPayment(null);
    } else {
      // Select the payment to show details
      setSelectedPayment(paymentId);
    }
  };

  //this is for search from guests
  const OnchangeHandler = (e, type) => {
    let value;

    if (type === "date") {
      value = e[0]?.toLocaleDateString("en-GB");
      if (value) {
        const filteredByDate = allPaysOfGuest.filter((order) => {
          const invoiceDate = new Date(
            order.amountGivenDate
          ).toLocaleDateString("en-GB");
          return invoiceDate === value;
        });
        setAllFilterPaysOfGuest(filteredByDate.slice(0, perPageData));
      }
    } else if (type === "invoice") {
      value = e.target.value;
      if (value) {
        const filteredByTable = allPaysOfGuest.filter((order) => {
          const givenAmountStr = String(order?.givenAmount || ""); // Safely convert to string
          return givenAmountStr.toLowerCase().includes(value.toLowerCase());
        });
        setAllFilterPaysOfGuest(filteredByTable.slice(0, perPageData));
      }
    }
    if (!value) {
      setAllFilterPaysOfGuest(allPaysOfGuest.slice(indexOfFirst, indexOfLast));
    }

    setCurrentPage(1);
  };

  //this is for getting guest data
  const forGettingGuestData = async () => {
    const url = `${myUrl}/getforallorders/${id}/credit`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        console.log(data?.gusetOrderData?.guestCreditPaidAmounts);
        setGuestData(data.gusetOrderData);
        setAllPaysOfGuest(data?.gusetOrderData?.guestCreditPaidAmounts);
        setAllFilterPaysOfGuest(data?.gusetOrderData?.guestCreditPaidAmounts);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the getting all debit orders of the geust function",
        err
      );
    }
  };

  //this is for control rendering of getting user data function
  useEffect(() => {
    forGettingGuestData();
  }, []);

  //this is for the date and time formate
  const formatDateTime = (date, format, timezone) => {
    const d = new Date(date);

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: timezone,
    };

    const dateFormatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = dateFormatter.format(d);

    const parts = formattedDate.split(", ");
    const datePart = parts[0];
    const timePart = parts[1];

    let finalFormattedDate;
    const [day, month, year] = datePart.split("/");
    const [hour, minute, second] = timePart.split(":");

    switch (format) {
      case "D/M/Y":
        finalFormattedDate = `${day}/${month}/${year}`;
        break;
      case "M/Y/D":
        finalFormattedDate = `${month}/${year}/${day}`;
        break;
      case "Y/M/D":
        finalFormattedDate = `${year}/${month}/${day}`;
        break;
      case "Y-M-D":
        finalFormattedDate = `${year}-${month}-${day}`;
        break;
      case "M-D-Y":
        finalFormattedDate = `${month}-${day}-${year}`;
        break;
      default:
        finalFormattedDate = datePart;
    }

    return `${finalFormattedDate} ${hour}:${minute} ${timePart.split(" ")[1]}`;
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
          <BreadCrumb credit={`All Credit Pays Of Guest ${guestData.name}`} />

          <div
            className="mt-0 d-flex align-items-center justify-content-start "
            style={{ gap: "30px" }}
          >
            <h5>
              Name : <span className="text-bold">{guestData?.name}</span>
            </h5>
            <h5>
              Phone : <span className="text-bold">{guestData?.phone}</span>
            </h5>
          </div>
          <hr />
          <Row>
            <Col md={6} xs={12} className="mb-3">
              <Label for="kotType" style={{ fontWeight: "bold" }}>
                Enter Amount
              </Label>
              <Input
                type="number"
                id="kotType"
                onChange={(e) => OnchangeHandler(e, "invoice")}
                placeholder="Enter mobile number"
              />
            </Col>

            <Col md={6} xs={12} className="mb-3">
              <Label for="kotDate" style={{ fontWeight: "bold" }}>
                Order Date
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
          </Row>

          <hr />

          {/* Table Section */}
          <div className="table-responsive mt-4">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Payment Type</th>
                  <th>Paid Amount</th>
                  <th>check Detail</th>
                </tr>
              </thead>

              <tbody>
                {allFilterPayOfGuest.map((item, index) => (
                  <React.Fragment key={index}>
                    {/* Parent Row */}
                    <tr
                      style={{
                        border: "1px solid #ddd",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <td
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          width: "25%",
                        }}
                      >
                        {item?.amountGivenDate
                          ? formatDateTime(
                              item?.amountGivenDate,
                              restData?.dateFormate,
                              restData?.selectedTimezone
                            )
                          : "Empty"}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          width: "25%",
                        }}
                      >
                        {item?.paymentType}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          width: "25%",
                        }}
                      >
                        {formatAmount(item?.givenAmount)}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          width: "25%",
                        }}
                      >
                        <button
                          onClick={() => togglePaymentDetails(item._id)}
                          className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#E6F7FC",
                            border: "1px solid #ddd",
                          }}
                        >
                          {selectedPayment === item._id
                            ? "Hide Details"
                            : "Check Usage"}
                        </button>
                      </td>
                    </tr>

                    {/* Nested Table */}
                    {selectedPayment === item._id && (
                      <tr>
                        <td colSpan="4" style={{ padding: "0" }}>
                          <table
                            class="table table-dark table-striped"
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                              tableLayout: "fixed", // Ensures columns have equal width
                            }}
                          >
                            <thead>
                              <tr
                                style={{
                                  backgroundColor: "#f0f0f0",
                                  border: "1px solid #ddd",
                                }}
                              >
                                <th
                                  style={{
                                    padding: "8px",
                                    textAlign: "left",
                                    border: "1px solid #ddd",
                                    width: "25%", // Ensure equal width in nested table
                                  }}
                                >
                                  ID
                                </th>
                                <th
                                  style={{
                                    padding: "8px",
                                    textAlign: "left",
                                    border: "1px solid #ddd",
                                    width: "25%", // Ensure equal width in nested table
                                  }}
                                >
                                  Invoice No
                                </th>
                                <th
                                  style={{
                                    padding: "8px",
                                    textAlign: "left",
                                    border: "1px solid #ddd",
                                    width: "25%", // Ensure equal width in nested table
                                  }}
                                >
                                  Paid Amount
                                </th>
                                <th
                                  style={{
                                    padding: "8px",
                                    textAlign: "left",
                                    border: "1px solid #ddd",
                                    width: "25%", // Ensure equal width in nested table
                                  }}
                                >
                                  Remaining Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {item?.amountUseData?.map((usage, subIndex) => (
                                <tr
                                  key={subIndex}
                                  style={{
                                    border: "1px solid #ddd",
                                    backgroundColor:
                                      subIndex % 2 === 0
                                        ? "#ffffff"
                                        : "#f9f9f9",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                      "#eaf4ff")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                      subIndex % 2 === 0
                                        ? "#ffffff"
                                        : "#f9f9f9")
                                  }
                                >
                                  <td
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                      border: "1px solid #ddd",
                                    }}
                                  >
                                    {index}.{subIndex + 1}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                      border: "1px solid #ddd",
                                    }}
                                  >
                                    {usage?.orderNo || "N/A"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                      border: "1px solid #ddd",
                                    }}
                                  >
                                    {formatAmount(usage.paidCreditAmount)}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                      border: "1px solid #ddd",
                                    }}
                                  >
                                    {formatAmount(usage.remainCreditAmount)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>

            <div className="my-3 p-3">
              <Pagination
                perPageData={perPageData}
                data={allPaysOfGuest}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default InvoiceList;
