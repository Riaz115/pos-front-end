import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
BreadCrumb;
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
import { UseRiazHook } from "../../RiazStore/RiazStore";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Pagination from "../../Components/Common/Pagination";
import Flatpickr from "react-flatpickr";
import { method } from "lodash";

const CrmCompanies = () => {
  const [guestOrders, setGuestOrders] = useState([]);
  const [guestData, setGuestData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [guestFilterOrders, setGuestFilterOrders] = useState([]);
  const [forMultiPaymentOpen, setForMultiPaymentOpen] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [payDetail, setPayDetail] = useState("");
  const [creditOrderData, setCreditOrderData] = useState({});
  const [orderid, setOrderId] = useState("");

  //this is for getting the guest from the url
  const { id } = useParams();

  //this is for getting data from the useRiazHook
  const { restData, myUrl, token } = UseRiazHook();

  //this is for pagination
  const perPageData = 50;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  //this is for page current data
  const currentdata = useMemo(
    () => guestOrders?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  //this is for first time load and set data
  useEffect(() => {
    setGuestFilterOrders(guestOrders.slice(0, perPageData));
  }, [guestOrders]);

  //this is for set current data of page
  useEffect(() => {
    setGuestFilterOrders(currentdata);
  }, [currentdata]);

  //this is for search from guests
  const OnchangeHandler = (e, type) => {
    let value;

    if (type === "date") {
      value = e[0]?.toLocaleDateString("en-GB");
      if (value) {
        const filteredByDate = guestOrders.filter((order) => {
          const invoiceDate = new Date(order.orderDate).toLocaleDateString(
            "en-GB"
          );
          return invoiceDate === value;
        });
        setGuestFilterOrders(filteredByDate.slice(0, perPageData));
      }
    } else if (type === "invoice") {
      value = e.target.value;
      if (value) {
        const filteredByTable = guestOrders.filter((order) =>
          order?.orderNo?.toLowerCase().includes(value.toLowerCase())
        );
        setGuestFilterOrders(filteredByTable.slice(0, perPageData));
      }
    }
    if (!value) {
      setGuestFilterOrders(guestOrders.slice(indexOfFirst, indexOfLast));
    }

    setCurrentPage(1);
  };

  //this is for getting guest all debit orders
  const forGettingGuestAllDebitOrders = async () => {
    const url = `${myUrl}/getforallorders/${id}/credit`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setGuestOrders(data.allCreditOrders);
        setGuestFilterOrders(data.allCreditOrders);
        setGuestData(data.gusetOrderData);
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

  //this is for controll rendering of getting all debit orders function
  useEffect(() => {
    forGettingGuestAllDebitOrders();
  }, []);

  //this is for the date
  const formatDateTime = (date, format) => {
    const d = new Date(date);

    const day = d.getDate(); // No leading zero
    const month = d.getMonth() + 1; // No leading zero, Months are 0-indexed
    const year = d.getFullYear();

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

    return `${formattedDate} `;
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

  //this is for getting single order data of guest credit orders
  const forGettingSingleCreditOrderOfGuest = async (orderid) => {
    const url = `${myUrl}/getsingle/${orderid}/creditorder/data/${id}`;
    const options = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setCreditOrderData(data.orderData);
        if (data.orderData?.creditAmount <= 0) {
          setForMultiPaymentOpen(false);
        }
      } else {
        console.log("err data", err);
      }
    } catch (err) {
      console.log(
        "there is error in the getting all single credit order of guest function",
        err
      );
    }
  };

  //this is for click on pay button
  const forClickOnPayButton = (id) => {
    setOrderId(id);
    setForMultiPaymentOpen(true);
    forGettingSingleCreditOrderOfGuest(id);
  };

  //this is for paying credit amount of single invoice of guest
  const forClickOnPaymentMethod = async (type) => {
    const paymentData = {
      paymentMethod: type,
      amount: inputValue,
      detail: payDetail,
    };

    const url = `${myUrl}/forpay/singlecreditorder/${orderid}/guest/${id}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(paymentData),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        forGettingSingleCreditOrderOfGuest(orderid);
        forGettingGuestAllDebitOrders();

        console.log("ok data", data);
      } else {
        console.log("err data", err);
      }
    } catch (err) {
      console.log(
        "there is error in the pay single invoice credit of guest  function",
        err
      );
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb credit={`Credit Detail Of Guest ${guestData.name}`} />

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
                Invoice No
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
                  <th>#Invoice No</th>
                  <th>Total Amount</th>
                  <th>Paid Amount</th>
                  <th>CreditAmount</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {guestFilterOrders.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item?.orderDate
                        ? formatDateTime(item?.orderDate, restData?.dateFormate)
                        : "Empty"}
                    </td>
                    <td>{item.orderNo}</td>

                    <td>
                      {restData.currencyPosition === "before"
                        ? `${
                            restData.restCurrencySymbol
                          }${item.totalAmount.toFixed(restData.precision)}`
                        : `${item.totalAmount.toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </td>
                    <td>
                      {restData.currencyPosition === "before"
                        ? `${
                            restData.restCurrencySymbol
                          }${item.paidAmount.toFixed(restData.precision)}`
                        : `${item.paidAmount.toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </td>
                    <td>
                      {restData.currencyPosition === "before"
                        ? `${
                            restData.restCurrencySymbol
                          }${item.creditAmount.toFixed(restData.precision)}`
                        : `${item.creditAmount.toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </td>
                    <td>
                      <div className="hstack gap-3 flex-wrap">
                        <Link
                          onClick={() => {
                            forClickOnPayButton(item.orderid);
                          }}
                          className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#E6F7FC",
                          }}
                        >
                          Pay Credit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="my-3 p-3">
              <Pagination
                perPageData={perPageData}
                data={guestOrders}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </Container>
      </div>

      {/* this is for multipayment */}
      {forMultiPaymentOpen && (
        <div
          className="d-flex align-items-center justify-content-center position-fixed"
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            className="d-flex  flex-column bg-white  pb-4 "
            style={{
              width: "900px",
              height: "80vh",
              overflowY: "scroll",
              overflowX: "scroll",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className=" p-1  d-flex justify-content-between align-items-center  mb-2"
              style={{ fontSize: "14px", backgroundColor: "#E3614D" }}
            >
              <p className="p-0 m-0 text-white">
                Payment credit amount of {guestData?.name}
              </p>
              <p
                className="m-0 p-2 color-dark cursor-pointer"
                onClick={() => setForMultiPaymentOpen(false)}
              >
                x
              </p>
            </div>
            <div className="px-2">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  Geust Total Credti :
                  {restData.currencyPosition === "before"
                    ? `${restData.restCurrencySymbol}${
                        guestData?.totalCredit?.toFixed(restData.precision) || 0
                      }`
                    : `${
                        guestData?.totalCredit?.toFixed(restData.precision) || 0
                      }${restData.restCurrencySymbol}`}
                </div>
                <div>
                  <span className="px-1">
                    Invoice No: {creditOrderData?.orderNo}
                  </span>
                  <span className="px-1">
                    {" "}
                    Credit Amount :
                    {restData.currencyPosition === "before"
                      ? `${restData.restCurrencySymbol}${
                          creditOrderData?.creditAmount?.toFixed(
                            restData.precision
                          ) || 0
                        }`
                      : `${
                          creditOrderData?.creditAmount?.toFixed(
                            restData.precision
                          ) || 0
                        }${restData.restCurrencySymbol}`}
                  </span>
                  <span className="px-1">
                    {" "}
                    Paid Amount :{" "}
                    {restData.currencyPosition === "before"
                      ? `${restData.restCurrencySymbol}${
                          creditOrderData?.paidAmount?.toFixed(
                            restData.precision
                          ) || 0
                        }`
                      : `${
                          creditOrderData?.paidAmount?.toFixed(
                            restData.precision
                          ) || 0
                        }${restData.restCurrencySymbol}`}
                  </span>
                  <span className="px-1">
                    {" "}
                    Total Amount:
                    {restData.currencyPosition === "before"
                      ? `${restData.restCurrencySymbol}${
                          creditOrderData?.totalAmount?.toFixed(
                            restData.precision
                          ) || 0
                        }`
                      : `${
                          creditOrderData?.totalAmount?.toFixed(
                            restData.precision
                          ) || 0
                        }${restData.restCurrencySymbol}`}
                  </span>
                </div>
              </div>

              <hr className="p-0 m-0"></hr>

              <div className="m-0 py-1 px-0">
                <button
                  onClick={() => forClickOnPaymentMethod("cash")}
                  className="py-1 px-2"
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Cash
                </button>
                <button
                  onClick={() => forClickOnPaymentMethod("card")}
                  className="py-1 px-2"
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Card
                </button>
                <button
                  className="py-1 px-2"
                  onClick={() => forClickOnPaymentMethod("advance")}
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Advance
                </button>
                <button
                  onClick={() => forClickOnPaymentMethod("paytm")}
                  className="py-1 px-2"
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  PayTM
                </button>
                <button
                  onClick={() => forClickOnPaymentMethod("check payment")}
                  className="py-1 px-2"
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Check Payment
                </button>

                <button
                  onClick={() => forClickOnPaymentMethod("post to room")}
                  className="py-1 px-2"
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Post to room
                </button>
                <button
                  onClick={() => forClickOnPaymentMethod("upi")}
                  className="py-1 px-2"
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  upi
                </button>
              </div>

              <hr className="p-0 m-0"></hr>

              <div
                className="d-flex"
                style={{
                  gap: "10px",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div
                  className="p-0 mt-1 "
                  style={{
                    border: "1px solid #B3C8CF",
                    width: "500px",
                  }}
                >
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 " style={{ fontWeight: "600" }}>
                        Credit Total
                      </p>
                    </div>
                    <div
                      className="p-2 w-75"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 " style={{ fontWeight: "600" }}>
                        {restData.currencyPosition === "before"
                          ? `${restData.restCurrencySymbol}${
                              creditOrderData?.creditAmount?.toFixed(
                                restData.precision
                              ) || 0
                            }`
                          : `${
                              creditOrderData?.creditAmount?.toFixed(
                                restData.precision
                              ) || 0
                            }${restData.restCurrencySymbol}`}
                      </p>
                    </div>
                  </div>
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary">Amount</p>
                    </div>
                    <div
                      className="p-2 w-75"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                      }}
                    >
                      <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="px-2 m-0"
                        placeholder="enter amount"
                        style={{
                          border: "1px solid #B3C8CF",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                  </div>

                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary">Return Amount</p>
                    </div>
                    <div
                      className="p-2 w-75"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                      }}
                    >
                      <input
                        type="number"
                        value={creditOrderData?.creditAmount}
                        className="px-2 m-0"
                        style={{
                          border: "1px solid #B3C8CF",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary">Payment Detail</p>
                    </div>
                    <div
                      className="p-2 w-75"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                      }}
                    >
                      <textarea
                        onChange={(e) => setPayDetail(e.target.value)}
                        style={{ border: "1px solid #B3C8CF" }}
                        className="w-100 p-1"
                        rows="5"
                        placeholder="Enter payment Description..."
                      ></textarea>
                    </div>
                  </div>
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary"></p>
                    </div>
                    <div className="p-0 w-75"></div>
                  </div>
                </div>

                <div
                  className=" text-center p-3"
                  style={{
                    width: "300px",
                  }}
                >
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(10)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(10).toFixed(
                            restData.precision
                          )}`
                        : `${(10).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </button>
                    <button
                      onClick={() => setInputValue(20)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(20).toFixed(
                            restData.precision
                          )}`
                        : `${(20).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </button>
                  </div>
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(50)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(50).toFixed(
                            restData.precision
                          )}`
                        : `${(50).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </button>
                    <button
                      onClick={() => setInputValue(100)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(100).toFixed(
                            restData.precision
                          )}`
                        : `${(100).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </button>
                  </div>
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(200)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(200).toFixed(
                            restData.precision
                          )}`
                        : `${(200).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </button>
                    <button
                      onClick={() => setInputValue(500)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(500).toFixed(
                            restData.precision
                          )}`
                        : `${(500).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </button>
                  </div>
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(1000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(1000).toFixed(
                            restData.precision
                          )}`
                        : `${(1000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </button>
                    <button
                      onClick={() => setInputValue(2000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(2000).toFixed(
                            restData.precision
                          )}`
                        : `${(2000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </button>
                  </div>
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(3000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(3000).toFixed(
                            restData.precision
                          )}`
                        : `${(3000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </button>
                    <button
                      onClick={() => setInputValue(4000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(4000).toFixed(
                            restData.precision
                          )}`
                        : `${(4000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </button>
                  </div>
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(5000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(5000).toFixed(
                            restData.precision
                          )}`
                        : `${(5000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </button>
                    <button
                      onClick={() => setInputValue(10000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(10000).toFixed(
                            restData.precision
                          )}`
                        : `${(10000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}
                    </button>
                  </div>
                  <div
                    className="mt-2 mb-1 d-flex align-items-center  "
                    style={{ width: "300px" }}
                  >
                    {/* <button
                      // disabled={forTableData?.currentOrder?.remainAmount > 0}
                      onClick={() => {
                        if (tableData?.currentOrder?.remainAmount > 0) {
                          toast.error("Please pay the total bill");
                        }
                      }}
                      style={{
                        border: "none",
                        width: "295px",
                        backgroundColor: "black",
                      }}
                      className="py-2 mx-1 px-4 text-white"
                    >
                      {tableData?.currentOrder?.remainAmount > 0
                        ? "Enter Amount"
                        : "Payment Complete"}
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CrmCompanies;
