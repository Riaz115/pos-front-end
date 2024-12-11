import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Button,
  Row,
  Input,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import { toast } from "react-toastify";
import { rest } from "lodash";

const Transactions = () => {
  const [tableData, setTableData] = useState({});
  const [orderAllItems, setOrderAllItems] = useState([]);
  const [forParcel, setForParcel] = useState(false);
  const [parcel, setParcel] = useState(0);
  const [discountType, setDiscountType] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showDiscount, setShowDiscount] = useState(false);
  const [isServiceCharges, setIsServiceCharges] = useState("yes");
  const [isGstTex, setisGstTex] = useState("yes");
  const [forOpennoChargeReason, setForOpennoChargeReason] = useState(false);
  const [noChargeReason, setNoChargenoChargeReason] = useState("");
  const [isNoCharge, setIsNoCharge] = useState(false);
  const [items, setItems] = useState([]);
  const [forSettlement, setForSettlement] = useState(false);
  const [forMultiPaymentOpen, setForMultiPaymentOpen] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [payDetail, setPayDetail] = useState("");

  //this is for add guest
  const {
    guestSearchChangeState,
    myUrl,
    restId,
    userData,
    token,
    guestData,
    counterAreaId,
    setForTableData,
    restData,
    forTableData,
    setForTableId,
    counterId,
  } = UseRiazHook();

  //this is for navigate
  const navigate = useNavigate();

  //this is getting id for table
  const { id } = useParams();
  setForTableId(id);

  //this is for show and add parcel
  const forShowParcels = () => {
    setForParcel(!forParcel);
  };

  //this is for getting table data
  const forGettingTableData = async () => {
    const url = `${myUrl}/getdata/${id}/table`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setTableData(data.tableData);
        setForTableData(data.tableData);
        console.log("table data", data.tableData);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get table data for edit", err);
    }
  };
  //this is for getting table data rendering
  useEffect(() => {
    forGettingTableData();
  }, []);

  //this is for getting all items of this order
  const forGettingAllItemsOfOrder = async () => {
    const url = `${myUrl}/getall/${id}/itemsofcurrorder`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setOrderAllItems(data.allItems);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get all items of current order function",
        err
      );
    }
  };

  //this is for getting all items data controll rendering
  useEffect(() => {
    forGettingAllItemsOfOrder();
  }, []);

  //this is for the parcel charges
  const forParcleCharges = (e) => {
    e.preventDefault();

    if (parcel) {
      let parcelData = {
        parcel,
      };

      //this is for add parcel charges
      const forAddParcelCharges = async () => {
        const url = `${myUrl}/add/${id}/parcel/${restId}`;

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parcelData),
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            setForParcel(false);
            setParcel(0);
            forGettingTableData();
          } else {
            console.log(" err data ", data);
          }
        } catch (err) {
          console.log("there is error in the for add parcerl function", err);
        }
      };

      forAddParcelCharges();
    } else {
      toast.error("please enter parcel charges");
    }
  };

  //this is for invocie to backend
  const forInovieToBackend = async () => {
    if (
      restData?.payemtPreOrPost === "pre" &&
      forTableData?.currentOrder?.remainAmount > 0
    ) {
      toast.error("please pay total bill ");
      return;
    }

    const url = `${myUrl}/add/${id}/invoice`;
    let newGuestData = {
      guestData,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGuestData),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        if (tableData?.tableType === "dine-in") {
          navigate(`/area/${counterId}/tables`);
        } else if (tableData?.tableType === "take-away") {
          navigate(`/take-away/table/${counterId}`);
        } else if (tableData?.tableType === "delivery") {
          navigate(`/delivery/tables/${counterId}`);
        }
      } else {
        console.log(" err data ", data);
      }
    } catch (err) {
      console.log("there is error in the for add parcerl function", err);
    }
  };

  //this is for show discount
  const forShowDiscount = () => {
    setShowDiscount(!showDiscount);
  };

  //this is for catch eror of dicount
  const forCatchErrorsDiscount = () => {
    let isOk = true;
    if (discountType === "") {
      isOk = false;
      toast.error("Please Select Discount Type");
    } else if (discount === 0) {
      isOk = false;
      toast.error("Please Enter Discount Amount");
    }

    return isOk;
  };

  //this is for discount
  const forAddDiscount = async (e) => {
    e.preventDefault();
    if (forCatchErrorsDiscount()) {
      let discountData = {
        discountType,
        discount,
      };

      const url = `${myUrl}/add/${id}/discount/${restId}`;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(discountData),
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          console.log("ok data", data);
          setShowDiscount(false);
          forGettingTableData();
        } else {
          console.log(" err data ", data);
        }
      } catch (err) {
        console.log("there is error in the for add discount function", err);
      }
    }
  };

  //this is for remove and add service charges
  const forRemoveAndAddServiceCharges = async (value) => {
    let chargesData = {
      isServiceCharges: value,
    };

    const url = `${myUrl}/add/${id}/removeaddservicecharges/${restId}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chargesData),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        forGettingTableData();
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the handle service charges function", err);
    }
  };
  //this is for remove and add service charges
  const forRemoveAndAddGstTex = async (value) => {
    let gstTexData = {
      isGstTex: value,
    };

    const url = `${myUrl}/add/${id}/removeaddgsttex/${restId}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gstTexData),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        forGettingTableData();
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the handle gst tex charges function", err);
    }
  };

  //this is for service handle change
  const handleServiceChargesChange = (e) => {
    setIsServiceCharges(e.target.checked ? "no" : "yes");
    forRemoveAndAddServiceCharges(e.target.checked ? "no" : "yes");
  };

  //this is for tex handle change
  const handleFoodTexChange = (e) => {
    setisGstTex(e.target.checked ? "no" : "yes");
    forRemoveAndAddGstTex(e.target.checked ? "no" : "yes");
  };

  //this is for the click on the select reason button
  const forSelectReasonButton = (e) => {
    e.preventDefault();

    if (noChargeReason !== "") {
      setIsNoCharge(true);
      setForOpennoChargeReason(!forOpennoChargeReason);
    } else {
      toast.error("please select reason or enter reason");
    }
  };

  //these are some reasons for select
  const noChargenoChargeReasons = [
    { value: "friend a/c", name: "Friend A/C" },
    { value: "family a/c", name: "Family A/C" },
    { value: "police a/c", name: "Police A/C" },
    { value: "army a/c", name: "Army A/C" },
    { value: "testing a/c", name: "Testing A/C" },
  ];

  //this is for no charge order
  const forNoChargeOrder = async () => {
    if (forTableData?.currentOrder?.guest) {
      let noChargeData = {
        noChargeReason,
      };
      const url = `${myUrl}/add/${id}/nocharge`;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(noChargeData),
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          if (tableData?.tableType === "dine-in") {
            navigate(`/area/${counterId}/tables`);
          } else if (tableData?.tableType === "take-away") {
            navigate(`/take-away/table/${counterId}`);
          } else if (tableData?.tableType === "delivery") {
            navigate(`/delivery/tables/${counterId}`);
          }
        } else {
          console.log(" err data ", data);
        }
      } catch (err) {
        console.log("there is error in the for add parcerl function", err);
      }
    } else {
      toast.error("please select guest from guest");
    }
  };

  //this is for back to table button
  const handleNavigation = () => {
    if (tableData?.tableType === "dine-in") {
      navigate(`/area/${counterId}/tables`);
    } else if (tableData?.tableType === "take-away") {
      navigate(`/take-away/table/${counterId}`);
    } else if (tableData?.tableType === "delivery") {
      navigate(`/delivery/tables/${counterId}`);
    }
  };

  //this is for get all menu items
  const forGetAllMenuItems = async () => {
    const url = `${myUrl}/get-all-menuitems/${restId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setItems(data.allItems);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in get all items function for order punch",
        err
      );
    }
  };

  //this is for controll rendering of get all items
  useEffect(() => {
    forGetAllMenuItems();
  }, []);

  //this is forj settle the order of the table
  const forSettleTheOrderOfTable = async (typ, metod) => {
    let paymentData = {};

    if (typ === "multi") {
      if (inputValue === null) {
        toast.error("please enter amount ");
      } else {
        paymentData = {
          paymentMethod: metod,
          amount: inputValue,
          detail: payDetail,
          frontEndType: typ,
        };

        const url = `${myUrl}/add/${id}/savepaymentmethod`;

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(paymentData),
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            forGettingTableData();
            if (tableData?.currentOrder?.remainAmount === 0) {
              setForMultiPaymentOpen(false);
            }
          } else {
            console.log(" err data ", data);
            setTableData(data?.table);
          }
        } catch (err) {
          console.log("there is error in the for add parcerl function", err);
        }
      }
    } else {
      paymentData = {
        paymentMethod: metod,
        frontEndType: typ,
      };
      const url = `${myUrl}/add/${id}/savepaymentmethod`;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(paymentData),
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          console.log("data", data);
          setForSettlement(false);
          forGettingTableData();
        } else {
          console.log(" err data ", data);
        }
      } catch (err) {
        console.log("there is error in the for add parcerl function", err);
      }
    }
  };

  //this is for click on the payment method
  const forClickOnPaymentMethod = (typ, metod) => {
    forSettleTheOrderOfTable(typ, metod);
    forGettingTableData();
  };

  //this is for multi payment
  const formultiPayment = () => {
    setForMultiPaymentOpen(true);
    setForSettlement(false);
  };

  //this is for testing
  useEffect(() => {
    console.log("table data", tableData?.currentOrder?.paidAmount);
  });

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

  return (
    <React.Fragment>
      <div
        className="page-content"
        style={{ overflow: "hidden", height: "100vh" }}
      >
        <Container fluid>
          <Row className="p-0">
            <Col lg={6}>
              <div
                className="d-flex align-items-center justify-content-between p-2"
                style={{
                  fontSize: "12px",
                  padding: "2px",
                  backgroundColor: "#e2dad9",
                }}
              >
                <p className="m-0 p-0 ">
                  {" "}
                  table no{" "}
                  <span
                    className="fw-bold"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {tableData?.tableNo}
                  </span>
                </p>
                <p className="m-0 p-0">
                  {tableData?.tableType === "dine-in" ? (
                    <>
                      Captain:{" "}
                      <span
                        className="fw-bold"
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        {userData ? userData.name : ""}
                      </span>
                    </>
                  ) : (
                    <>
                      Guest:{" "}
                      <span
                        className="fw-bold"
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        {forTableData?.currentOrder?.guest?.name}
                      </span>
                    </>
                  )}
                </p>
                {tableData?.tableType === "dine-in" && (
                  <p className="m-0 p-0 ">
                    No of Person{" "}
                    <span
                      className="fw-bold"
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      {tableData?.currentOrder
                        ? tableData?.currentOrder?.persons
                        : ""}
                    </span>
                  </p>
                )}

                <p className="m-0 p-0 ">
                  Date
                  <span
                    className="fw-bold px-1"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {tableData?.currentOrder
                      ? formatDateTime(
                          tableData?.currentOrder?.date,
                          restData?.dateFormate,
                          restData?.selectedTimezone
                        )
                      : ""}
                  </span>
                </p>
              </div>

              <div
                className="mt-2 table-responsive z-3"
                style={{
                  maxHeight: "35vh",
                  overflowY: "scroll",
                  gap: "1px",
                }}
              >
                <table class="table  table-hover table-light  ">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Item Name
                      </th>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Quantity
                      </th>

                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Rate
                      </th>

                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody style={{ fontSize: "12px" }}>
                    {orderAllItems.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>
                          {" "}
                          {restData.currencyPosition === "before"
                            ? `${
                                restData.restCurrencySymbol
                              }${item.price.toFixed(restData.precision)}`
                            : `${item.price.toFixed(restData.precision)}${
                                restData.restCurrencySymbol
                              }`}
                        </td>
                        <td>
                          {restData.currencyPosition === "before"
                            ? `${
                                restData.restCurrencySymbol
                              }${item.totalPrice.toFixed(restData.precision)}`
                            : `${item.totalPrice.toFixed(restData.precision)}${
                                restData.restCurrencySymbol
                              }`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                className="mt-1  d-flex align-items-center justify-content-between p-1 "
                style={{ backgroundColor: "#E6E6E6", fontSize: "12px" }}
              >
                <h6 className="p-0 m-0">Total Items </h6>
                <h6 className="p-0 m-0">{orderAllItems.length}</h6>
              </div>

              <div
                className="mt-1 table-responsive "
                style={{
                  maxHeight: "25vh",
                  overflowY: "scroll",
                  gap: "1px",
                }}
              >
                <table class="table  table-hover table-light  ">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Food Total
                      </th>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        {tableData?.currentOrder
                          ? restData.currencyPosition === "before"
                            ? `${restData.restCurrencySymbol}${
                                tableData?.currentOrder?.foodAmount
                                  ? tableData?.currentOrder?.foodAmount.toFixed(
                                      restData.precision
                                    )
                                  : "0.00"
                              }`
                            : `${
                                tableData?.currentOrder?.foodAmount
                                  ? tableData?.currentOrder?.foodAmount.toFixed(
                                      restData.precision
                                    )
                                  : "0.00"
                              }${restData?.restCurrencySymbol}`
                          : ""}
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "12px" }}>
                    <tr>
                      <td>Parcel Charges </td>
                      <td>
                        {tableData.currentOrder
                          ? restData.currencyPosition === "before"
                            ? `${restData.restCurrencySymbol}${
                                tableData.currentOrder?.parcel
                                  ? tableData.currentOrder.parcel.toFixed(
                                      restData.precision
                                    )
                                  : "0.00"
                              }`
                            : `${
                                tableData.currentOrder?.parcel
                                  ? tableData.currentOrder.parcel.toFixed(
                                      restData.precision
                                    )
                                  : "0.00"
                              }${restData.restCurrencySymbol}`
                          : ""}
                      </td>
                    </tr>

                    <tr>
                      <td>Discount</td>
                      <td>
                        {" "}
                        {tableData.currentOrder
                          ? restData.currencyPosition === "before"
                            ? `${restData.restCurrencySymbol}${
                                tableData.currentOrder?.discount
                                  ? tableData.currentOrder.discount.toFixed(
                                      restData.precision
                                    )
                                  : "0.00"
                              }`
                            : `${
                                tableData.currentOrder?.discount
                                  ? tableData.currentOrder.discount.toFixed(
                                      restData.precision
                                    )
                                  : "0.00"
                              }${restData.restCurrencySymbol}`
                          : ""}
                      </td>
                    </tr>

                    <tr>
                      <td
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        SubTotal
                      </td>
                      <td
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        {tableData.currentOrder
                          ? restData.currencyPosition === "before"
                            ? `${restData.restCurrencySymbol}${
                                tableData.currentOrder?.subTotal
                                  ? tableData.currentOrder.subTotal.toFixed(
                                      restData.precision
                                    )
                                  : "0.00"
                              }`
                            : `${
                                tableData.currentOrder?.subTotal
                                  ? tableData.currentOrder.subTotal.toFixed(
                                      restData.precision
                                    )
                                  : "0.00"
                              }${restData.restCurrencySymbol}`
                          : ""}
                      </td>
                    </tr>

                    {tableData?.tableType === "delivery" ? (
                      <tr>
                        <td>
                          Delivery Charges on FOOD{" "}
                          {restData?.typeOfDeliveryCharges === "number"
                            ? restData.currencyPosition === "before"
                              ? `${
                                  restData.restCurrencySymbol
                                }${restData.deliveryChargesAmount.toFixed(
                                  restData.precision
                                )}`
                              : `${restData.deliveryChargesAmount.toFixed(
                                  restData.precision
                                )}${restData.restCurrencySymbol}`
                            : `${restData.deliveryChargesAmount}%`}
                        </td>
                        <td>
                          {" "}
                          {tableData.currentOrder
                            ? restData.currencyPosition === "before"
                              ? `${restData.restCurrencySymbol}${
                                  tableData.currentOrder.deliveryCharges
                                    ? tableData.currentOrder.deliveryCharges.toFixed(
                                        restData.precision
                                      )
                                    : "0.00"
                                }`
                              : `${
                                  tableData.currentOrder.deliveryCharges
                                    ? tableData.currentOrder.deliveryCharges.toFixed(
                                        restData.precision
                                      )
                                    : "0.00"
                                }${restData.restCurrencySymbol}`
                            : ""}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td>
                          sr.Charges on FOOD{" "}
                          {restData?.typeOfServiceCharges === "number"
                            ? restData.currencyPosition === "before"
                              ? `${
                                  restData.restCurrencySymbol
                                }${restData.serviceChargesAmount.toFixed(
                                  restData.precision
                                )}`
                              : `${restData.serviceChargesAmount.toFixed(
                                  restData.precision
                                )}${restData.restCurrencySymbol}`
                            : `${restData.serviceChargesAmount}%`}
                        </td>
                        <td>
                          {" "}
                          {tableData.currentOrder
                            ? restData.currencyPosition === "before"
                              ? `${restData.restCurrencySymbol}${
                                  tableData.currentOrder.serviceCharges
                                    ? tableData.currentOrder.serviceCharges.toFixed(
                                        restData.precision
                                      )
                                    : "0.00"
                                }`
                              : `${
                                  tableData.currentOrder.serviceCharges
                                    ? tableData.currentOrder.serviceCharges.toFixed(
                                        restData.precision
                                      )
                                    : "0.00"
                                }${restData.restCurrencySymbol}`
                            : ""}
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td>
                        SGST ON FOOD{" "}
                        {restData?.gstTexType === "number"
                          ? restData.currencyPosition === "before"
                            ? `${
                                restData.restCurrencySymbol
                              }${restData.gstTexAmount.toFixed(
                                restData.precision
                              )}`
                            : `${restData.gstTexAmount.toFixed(
                                restData.precision
                              )}${restData.restCurrencySymbol}`
                          : `${restData.gstTexAmount}%`}
                      </td>
                      <td>
                        {" "}
                        {tableData.currentOrder
                          ? restData.currencyPosition === "before"
                            ? `${restData.restCurrencySymbol}${
                                tableData.currentOrder.gstTex
                                  ? tableData.currentOrder.gstTex.toFixed(
                                      restData.precision
                                    )
                                  : "0.00"
                              }`
                            : `${
                                tableData.currentOrder.gstTex
                                  ? tableData.currentOrder.gstTex.toFixed(
                                      restData.precision
                                    )
                                  : "0.00"
                              }${restData.restCurrencySymbol}`
                          : ""}
                      </td>
                    </tr>

                    <tr>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Total Paid Amount
                      </th>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        {tableData.currentOrder
                          ? restData.currencyPosition === "before"
                            ? `${restData.restCurrencySymbol}${
                                tableData.currentOrder.paidAmount
                                  ? tableData.currentOrder.paidAmount.toFixed(
                                      restData.precision
                                    )
                                  : "0.00"
                              }`
                            : `${
                                tableData.currentOrder.paidAmount
                                  ? tableData.currentOrder.paidAmount.toFixed(
                                      restData.precision
                                    )
                                  : "0.00"
                              }${restData.restCurrencySymbol}`
                          : ""}
                      </th>
                    </tr>

                    <tr>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Unpaid Amount
                      </th>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        {tableData.currentOrder
                          ? restData.currencyPosition === "before"
                            ? `${restData.restCurrencySymbol}${
                                tableData.currentOrder.remainAmount
                                  ? tableData.currentOrder.remainAmount.toFixed(
                                      restData.precision
                                    )
                                  : "0.00"
                              }`
                            : `${
                                tableData.currentOrder.remainAmount
                                  ? tableData.currentOrder.remainAmount.toFixed(
                                      restData.precision
                                    )
                                  : "0.00"
                              }${restData.restCurrencySymbol}`
                          : ""}
                      </th>
                    </tr>

                    <tr className="fw-bold">
                      <td>Grand Total</td>
                      <td>
                        {tableData.currentOrder
                          ? restData.currencyPosition === "before"
                            ? `${
                                restData.restCurrencySymbol
                              }${tableData.currentOrder.totalAmount.toFixed(
                                restData.precision
                              )}`
                            : `${tableData.currentOrder.totalAmount.toFixed(
                                restData.precision
                              )}${restData.restCurrencySymbol}`
                          : "0"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
            <Col lg={6}>
              <div className="d-flex aling-items-center justify-content-end ms-auto">
                {restData?.payemtPreOrPost === "pre" &&
                  tableData?.currentOrder?.remainAmount && (
                    <button
                      onClick={() => setForSettlement(!forSettlement)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        textDecoration: "none",
                        textAlign: "center",
                        border: "none",
                      }}
                      className="px-4 mx-1 py-2"
                    >
                      Pay Bill
                    </button>
                  )}

                <button
                  onClick={handleNavigation}
                  style={{
                    backgroundColor: "#0054B1",
                    color: "white",
                    textDecoration: "none",
                    textAlign: "center",
                    border: "none",
                  }}
                  className="px-4 mx-1 py-2"
                >
                  Back To Table List
                </button>
              </div>
            </Col>
            <Col sm={12}>
              <div className="d-flex align-items-center justify-content-between mt-1 ">
                <div className="d-flex " style={{ gap: "5px" }}>
                  <Link
                    style={{
                      backgroundColor: "#E84743",
                      color: "white",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    className="px-4 py-2"
                    onClick={forShowParcels}
                  >
                    Parcel
                  </Link>
                  <button
                    style={{
                      backgroundColor: "#E84743",
                      color: "white",
                      textDecoration: "none",
                      textAlign: "center",
                      border: "none",
                    }}
                    className="px-4 py-2 border-none"
                    onClick={() => setForOpennoChargeReason(!noChargeReason)}
                  >
                    No Charge
                  </button>
                </div>

                <div>
                  <input
                    type="checkbox"
                    className="form-check-input "
                    id="checkbox1"
                    style={{ marginRight: "10px" }}
                    checked={
                      forTableData?.currentOrder?.isServiceCharges === "no"
                    }
                    onChange={handleServiceChargesChange}
                  />
                  <label className="form-check-label " htmlFor="checkbox1">
                    No service Charges
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input "
                    id="checkbox2"
                    style={{ marginRight: "10px" }}
                    checked={forTableData?.currentOrder?.isGstTex === "no"}
                    onChange={handleFoodTexChange}
                  />
                  <label className="form-check-label " htmlFor="checkbox2">
                    No Foods Tex
                  </label>
                </div>

                <div className="d-flex " style={{ gap: "5px" }}>
                  <Link
                    onClick={isNoCharge ? forNoChargeOrder : forInovieToBackend}
                    style={{
                      backgroundColor: "#0054B1",
                      color: "white",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    className="px-4 py-2"
                  >
                    save
                  </Link>
                  <Link
                    onClick={isNoCharge ? forNoChargeOrder : forInovieToBackend}
                    style={{
                      backgroundColor: "#166930",
                      color: "white",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    className="px-4 py-2"
                  >
                    Save & Print
                  </Link>
                  <Link
                    onClick={guestSearchChangeState}
                    style={{
                      backgroundColor: "#B38401",
                      color: "black",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    className="px-4 py-2"
                  >
                    Guest
                  </Link>
                  <button
                    onClick={forShowDiscount}
                    style={{
                      backgroundColor: "#A2302F",
                      color: "white",
                      textDecoration: "none",
                      textAlign: "center",
                      border: "none",
                    }}
                    className="px-4 py-2"
                  >
                    Discount
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* this is for the select no charge resons */}
      {forOpennoChargeReason && (
        <div
          className="d-flex align-items-center justify-content-center position-fixed px-2"
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 5000,
          }}
        >
          <div
            className="d-flex flex-column bg-white pb-4"
            style={{
              width: "800px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="p-1 d-flex justify-content-between align-items-center mb-2"
              style={{ fontSize: "14px", backgroundColor: "#E3614D" }}
            >
              <p className="p-0 m-0 text-white">No Charges noChargeReasons</p>
              <p
                className="m-0 p-2 color-dark cursor-pointer"
                onClick={() => setForOpennoChargeReason(false)}
              >
                x
              </p>
            </div>
            <div className="mt-1 p-1">
              <form>
                <div className="form-group">
                  <div className=" mx-5 row d-flex flex-wrap">
                    {noChargenoChargeReasons.map((noChargeReason, index) => (
                      <div
                        onClick={() =>
                          setNoChargenoChargeReason(noChargeReason.value)
                        }
                        key={index}
                        className="my-4 cursor-pointer col-md-2  col-sm-3 d-flex align-items-center justify-content-center text-white bg-danger px-3 py-1 mx-1 my-1"
                        style={{ borderRadius: "5px" }}
                      >
                        {noChargeReason.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pe-auto search-box mx-2 my-2 w-75">
                  <Input
                    type="text"
                    placeholder="Enter Reason "
                    value={noChargeReason}
                    onChange={(e) => setNoChargenoChargeReason(e.target.value)}
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>

                <div className="d-flex flex-column m-2">
                  <div className="my-2">
                    <button
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        textDecoration: "none",
                        textAlign: "center",
                      }}
                      className="p-1 px-2 border-none"
                      onClick={(e) => forSelectReasonButton(e)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* this is for add parcel */}
      <Modal isOpen={forParcel} toggle={forShowParcels} centered>
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={forShowParcels}
        >
          Add Parcel Charges
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Enter Amount
              </label>
              <input
                type="number"
                id="customername-field"
                className="form-control"
                placeholder="Enter Parcel Charges "
                onChange={(e) => setParcel(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setForParcel(false)}
              >
                Close
              </button>
              <button
                className="btn btn-primary px-2"
                type="submit"
                onClick={(e) => forParcleCharges(e)}
                id="add-btn"
              >
                Add
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* this is for the add discount */}
      <Modal isOpen={showDiscount} toggle={forShowDiscount} centered>
        <ModalHeader className="bg-light p-3" toggle={forShowDiscount}>
          Add Discount
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            <div className="mb-1">
              <div className="d-flex justify-content-between">
                <div>
                  <input
                    type="radio"
                    id="percentage"
                    name="chargeType"
                    value="percentage"
                    checked={discountType === "percentage"}
                    onChange={() => setDiscountType("percentage")}
                  />
                  <label
                    htmlFor="percentage"
                    style={{ fontSize: "16px" }}
                    className="ms-1"
                  >
                    Percentage
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="number"
                    name="chargeType"
                    value="number"
                    checked={discountType === "number"}
                    onChange={() => setDiscountType("number")}
                  />
                  <label
                    htmlFor="number"
                    style={{ fontSize: "16px" }}
                    className="ms-1"
                  >
                    Number
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="customername-field"
                style={{ fontSize: "16px" }}
                className="form-label"
              >
                Enter Amount
              </label>
              <input
                type="number"
                id="customername-field"
                className="form-control"
                placeholder="Enter Parcel Charges"
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setShowDiscount(false)}
              >
                Close
              </button>
              <button
                className="btn btn-primary px-2"
                type="submit"
                onClick={(e) => forAddDiscount(e)}
              >
                Add
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* this is for settlement */}
      {forSettlement && (
        <div
          className="d-flex align-items-center justify-content-center position-fixed"
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 5000,
          }}
        >
          <div
            className="d-flex  flex-column bg-white pb-4"
            style={{
              borderRadius: "5px",
              width: "450px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h5 className="py-3 px-1 bg-danger text-white">Payment Mode</h5>
            <div
              className="d-flex align-items-center justify-content-between "
              style={{ padding: "2px 5px", gap: "5px" }}
            >
              <div
                onClick={() => forClickOnPaymentMethod("single", "cash")}
                className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                style={{ height: "100px", backgroundColor: "#1F9642" }}
              >
                Cash
              </div>
              <div
                onClick={() => forClickOnPaymentMethod("single", "card")}
                className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                style={{ height: "100px", backgroundColor: "#FFBD00" }}
              >
                Card
              </div>
              <div
                onClick={() => forClickOnPaymentMethod("single", "paytm")}
                className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                style={{ height: "100px", backgroundColor: "#0A97BB" }}
              >
                PayTM
              </div>
            </div>
            <div
              className="d-flex align-items-center justify-content-between "
              style={{ padding: "2px 5px", gap: "5px" }}
            >
              <div
                onClick={() => forClickOnPaymentMethod("single", "upi")}
                className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                style={{ height: "100px", backgroundColor: "#0172F0" }}
              >
                UPI
              </div>
              <div
                onClick={formultiPayment}
                className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                style={{ height: "100px", backgroundColor: "#030507" }}
              >
                Multi Payment
              </div>
              <div
                onClick={() => setForSettlement(!forSettlement)}
                className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                style={{ height: "100px", backgroundColor: "#DB433F" }}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}

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
              <p className="p-0 m-0 text-white">Payment</p>
              <p
                className="m-0 p-2 color-dark cursor-pointer"
                onClick={() => setForMultiPaymentOpen(false)}
              >
                x
              </p>
            </div>
            <div className="p-2">
              <div className="d-flex align-items-center justify-content-between">
                <div className="m-0 p-0">
                  <button
                    onClick={() => forClickOnPaymentMethod("multi", "cash")}
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
                    onClick={() => forClickOnPaymentMethod("multi", "card")}
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
                    onClick={() => forClickOnPaymentMethod("multi", "advance")}
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
                    onClick={() => forClickOnPaymentMethod("multi", "paytm")}
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
                    onClick={() =>
                      forClickOnPaymentMethod("multi", "check payment")
                    }
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
                    onClick={() => {
                      if (forTableData?.currentOrder.guest) {
                        forClickOnPaymentMethod("multi", "credit");
                      } else {
                        toast.error(
                          "please select guest for this debit amount"
                        );
                      }
                    }}
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
                    Credit
                  </button>
                  <button
                    onClick={() =>
                      forClickOnPaymentMethod("multi", "post to room")
                    }
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
                    onClick={() => forClickOnPaymentMethod("multi", "upi")}
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
                <div>
                  <button
                    onClick={() => {
                      guestSearchChangeState();
                      forGettingTableData();
                    }}
                    className="py-1 px-2 "
                    style={{
                      backgroundColor: "#F5B800",
                      marginLeft: "auto",
                      border: "none",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    Guest
                  </button>
                </div>
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
                        Invoice Total
                      </p>
                    </div>{" "}
                    <div
                      className="p-2 w-75"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 " style={{ fontWeight: "600" }}>
                        {restData.currencyPosition === "before"
                          ? `${
                              restData.restCurrencySymbol
                            }${tableData?.currentOrder?.totalAmount.toFixed(
                              restData.precision
                            )}`
                          : `${tableData?.currentOrder?.totalAmount.toFixed(
                              restData.precision
                            )}${restData.restCurrencySymbol}`}{" "}
                      </p>
                    </div>{" "}
                  </div>{" "}
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary">Amount</p>
                    </div>{" "}
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
                        style={{
                          border: "1px solid #B3C8CF",
                          borderRadius: "5px",
                        }}
                      />
                    </div>{" "}
                  </div>{" "}
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary">Paid Amount</p>
                    </div>{" "}
                    <div
                      className="p-2 w-75"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                      }}
                    >
                      <input
                        type="number"
                        className="px-2 m-0"
                        value={
                          tableData?.currentOrder?.paidAmount
                            ? tableData?.currentOrder?.paidAmount
                            : 0
                        }
                        style={{
                          border: "1px solid #B3C8CF",
                          borderRadius: "5px",
                        }}
                      />
                    </div>{" "}
                  </div>{" "}
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary">Return Amount</p>
                    </div>{" "}
                    <div
                      className="p-2 w-75"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                      }}
                    >
                      <input
                        type="number"
                        value={tableData?.currentOrder?.remainAmount}
                        className="px-2 m-0"
                        style={{
                          border: "1px solid #B3C8CF",
                          borderRadius: "5px",
                        }}
                      />
                    </div>{" "}
                  </div>{" "}
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary">Payment Detail</p>
                    </div>{" "}
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
                        placeholder="Yahan likhein..."
                      ></textarea>
                    </div>{" "}
                  </div>{" "}
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary"></p>
                    </div>{" "}
                    <div className="p-0 w-75"></div>{" "}
                  </div>{" "}
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
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(10).toFixed(
                            restData.precision
                          )}`
                        : `${(10).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                    <button
                      onClick={() => setInputValue(20)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(20).toFixed(
                            restData.precision
                          )}`
                        : `${(20).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
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
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(50).toFixed(
                            restData.precision
                          )}`
                        : `${(50).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                    <button
                      onClick={() => setInputValue(100)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(100).toFixed(
                            restData.precision
                          )}`
                        : `${(100).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                  </div>{" "}
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(200)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(200).toFixed(
                            restData.precision
                          )}`
                        : `${(200).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                    <button
                      onClick={() => setInputValue(500)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(500).toFixed(
                            restData.precision
                          )}`
                        : `${(500).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                  </div>{" "}
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(1000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(1000).toFixed(
                            restData.precision
                          )}`
                        : `${(1000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                    <button
                      onClick={() => setInputValue(2000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(2000).toFixed(
                            restData.precision
                          )}`
                        : `${(2000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
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
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(3000).toFixed(
                            restData.precision
                          )}`
                        : `${(3000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                    <button
                      onClick={() => setInputValue(4000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(4000).toFixed(
                            restData.precision
                          )}`
                        : `${(4000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                  </div>{" "}
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(5000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(5000).toFixed(
                            restData.precision
                          )}`
                        : `${(5000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                    <button
                      onClick={() => setInputValue(10000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(10000).toFixed(
                            restData.precision
                          )}`
                        : `${(10000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                  </div>{" "}
                  <div
                    className="mt-2 mb-1 d-flex align-items-center  "
                    style={{ width: "300px" }}
                  >
                    <button
                      // disabled={forTableData?.currentOrder?.remainAmount > 0}
                      onClick={() => {
                        if (tableData?.currentOrder?.remainAmount > 0) {
                          toast.error("Please pay the total bill");
                        } else {
                          setForMultiPaymentOpen(false);
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
                    </button>
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

export default Transactions;
