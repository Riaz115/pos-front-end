import React, { useEffect, useState } from "react";
import { Container, Row, Col, Input, Label } from "reactstrap";
import {
  FaTicketAlt,
  FaFileAlt,
  FaRupeeSign,
  FaExchangeAlt,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { UseRiazHook } from "../../RiazStore/RiazStore";
import { toast } from "react-toastify";

const DashboardAnalytics = () => {
  const [forSettlement, setForSettlement] = useState(false);
  const [forSettingKot, setForSettingKot] = useState(false);
  const [forKot, setForKot] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableId, setTableId] = useState("");
  const [allKotsIds, setAllKotsIds] = useState([]);
  const [allKots, setAllKots] = useState([]);
  const [tableData, setTableData] = useState({});
  const [areaData, setAreaData] = useState({});
  const [counters, setCounters] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const [allTables, setAllTables] = useState([]);
  const [areaid, setAreaId] = useState("");
  const [forAllAreas, setForAllAreas] = useState([]);
  const [allFilteredTables, setAllFilteredTables] = useState([]);
  const [callSettleFunction, setCallSettleFunction] = useState(false);
  const [forMultiPaymentOpen, setForMultiPaymentOpen] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [payDetail, setPayDetail] = useState("");
  const [forLoading, setForLoading] = useState(false);

  //this is for naviagtion
  const navigate = useNavigate();

  //this is for getting data from my store
  const {
    myUrl,
    userData,
    setPersons,
    restData,
    counterId,
    restId,
    token,
    setForTableId,
    forTableId,
    guestSearchChangeState,
    forTableData,
    forGettingTableData,
    setGuestData,
    formatAmount,
  } = UseRiazHook();

  //this is for open pop up on kot button
  const openKotPopup = (id) => {
    setSelectedTable(id);
    setTableId(id);
    setForKot(true);
    setForTableId(id);
  };

  //this is for getting id from url of counter
  const { id } = useParams();

  //this is for getting all tables of the current area
  const forGetAllTables = async () => {
    const url = `${myUrl}/forget/all/tables/${restId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllTables(data.allTables);
        setAllFilteredTables(data.allTables);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get all tables function", err);
    }
  };

  //this is for getting the tables of all area
  const forGettingTablesOfAllAreas = async (id) => {
    setAreaId(id);
    const url = `${myUrl}/getall/${id}/tables`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllTables(data.allTables);
        setAllFilteredTables(data.allTables);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get all tables function", err);
    }
  };

  //this is for filter tables
  const forFilterTables = (status) => {
    try {
      if (status === "all") {
        forGetAllTables();
      } else {
        const filteredTables = allTables.filter(
          (table) => table.currentOrder.status === status
        );
        setAllFilteredTables(filteredTables);
      }
    } catch (err) {
      console.log("there is error in the get all tables function", err);
    }
  };

  //this is for select number of persons
  const handleClick = (value) => {
    setPersons(value);
    localStorage.setItem("person", value);
    setForKot(false);
    forAddOrder(value);
    navigate(`/for-kot/${tableId}`);
  };

  //this is for controll the rendering of get all tables function
  useEffect(() => {
    forGetAllTables();
  }, []);

  //this is for add order
  const forAddOrder = async (person) => {
    let orderData = {
      persons: person,
    };
    const url = `${myUrl}/add/${tableId}/order`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(orderData),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        forGetTableData(tableId);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the add order function", err);
    }
  };

  // Generate 20 buttons with values 1 to 20
  const buttons = [];
  for (let i = 1; i <= 20; i++) {
    buttons.push(
      <button
        key={i}
        className="btn btn-primary rounded-0 mx-1 my-2"
        onClick={() => handleClick(i)}
      >
        {i}
      </button>
    );
  }

  //this is for getting table data
  const forGetTableData = async (id) => {
    setForTableId(id);
    setForLoading(true);
    const url = `${myUrl}/getdata/${id}/table`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllKotsIds(data.tableData.currentOrder.kots);
        setTableData(data.tableData);
        const kotUrl = `${myUrl}/getall/kots`;
        const responseKot = await fetch(kotUrl);
        const dataKot = await responseKot.json();
        if (responseKot.ok) {
          let allKots = dataKot.allKots;
          let filterKots = allKots.filter((kot) =>
            data?.tableData?.currentOrder?.kots.includes(kot._id)
          );
          setAllKots(filterKots);
          setForLoading(false);
        } else {
          console.log("err data of the kots", err);
          setForLoading(false);
        }
      } else {
        console.log("err data", data);
        setForLoading(false);
      }
    } catch (err) {
      console.log("there is error in the get table data for edit", err);
      setForLoading(false);
    }
  };

  //this is for settlements
  const forSettleMents = (id) => {
    setTableId(id);
    setForSettlement(!forSettlement);
    forGetTableData(id);
  };

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

        const url = `${myUrl}/add/${tableId}/saveorder`;

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
            forGetAllTables();
            if (data?.table?.currentOrder?.remainAmount === 0) {
              setForMultiPaymentOpen(false);
              setGuestData({});
            }
            forGetTableData(tableId);
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
      const url = `${myUrl}/add/${tableId}/saveorder`;

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
          forGetAllTables();
          setForSettlement(false);
          forGetTableData(tableId);
          setGuestData({});
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
    setCallSettleFunction(false);
  };

  //this is for get all counter areas
  const forGetAllCounterAreas = async () => {
    const url = `${myUrl}/getforallcounterareas/${id}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        setForAllAreas(data.counterAllArea);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get all counter areas function", err);
    }
  };

  //this is for control rendering of get counter all area data
  useEffect(() => {
    forGetAllCounterAreas();
  }, [counterId]);

  //this is for color of tables based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "empty":
        return "#45A14E"; // Green for empty
      case "running":
        return "#FE9900"; // Orange for running
      case "invoiced":
        return "#FD5432"; // Red for invoiced
      default:
        return ""; // Default color if no match
    }
  };

  //this is for get counters
  const forGetAllCountersofRestaurent = async () => {
    const url = `${myUrl}/getAllCountersofRestaurent/${restId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setCounters(data.counters);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get all counters of the restauret function",
        err
      );
    }
  };

  //this is for call only once time for all counter
  useEffect(() => {
    forGetAllCountersofRestaurent();
  }, []);

  //this is for search
  const OnchangeHandler = (e) => {
    const search = e.target.value.trim();

    if (search) {
      const searchLowerCase = search.toLowerCase();
      const isNumber = !isNaN(search) && search !== "";

      const filteredItems = allFilteredTables.filter((table) => {
        if (isNumber) {
          // If it's a number, match it only with `tableNo`
          return table.tableNo
            .toString()
            .toLowerCase()
            .includes(searchLowerCase);
        } else {
          // Match for both tableNo and other string fields (including guest name)
          const matchesTableNo = table.tableNo
            .toString()
            .toLowerCase()
            .includes(searchLowerCase);

          const matchesGuestName =
            table.currentOrder &&
            table.currentOrder.guest &&
            table.currentOrder.guest.name
              ? table.currentOrder.guest.name
                  .toLowerCase()
                  .includes(searchLowerCase)
              : false;

          const matchesStringFields = Object.values(table).some((field) => {
            if (typeof field === "string") {
              return field.toLowerCase().includes(searchLowerCase);
            } else if (typeof field === "object" && field !== null) {
              return Object.values(field).some(
                (subField) =>
                  typeof subField === "string" &&
                  subField.toLowerCase().includes(searchLowerCase)
              );
            }
            return false;
          });

          return matchesTableNo || matchesStringFields || matchesGuestName;
        }
      });

      setAllFilteredTables(filteredItems);
    } else {
      setAllFilteredTables(allTables);
    }
  };

  //this is for check and create table with the id of area
  const forCheckAndAddTableToTableAreaId = () => {
    console.log("area id", areaid);
    if (areaid === "") {
      toast.error("please click on area area for add table in the area");
    }
  };

  //this is for multi payment
  const formultiPayment = () => {
    setForMultiPaymentOpen(true);
    setForSettlement(false);
    forGetTableData(tableId);
  };

  //this is for the settle of table with the pre method
  useEffect(() => {
    if (callSettleFunction && tableId) {
      forSettleTheOrderOfTable();
      setCallSettleFunction(false);
    }
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
      <div className="page-content">
        <Col sm={12}>
          <div className="d-flex align-items-center justify-content-between mt-0 ">
            <div style={{ gap: "5px" }}>
              <Link
                onClick={() => forFilterTables("all")}
                style={{
                  backgroundColor: "#F3F3F9",
                  color: "black",
                  textDecoration: "none",
                  textAlign: "center",

                  fontSize: "14px",
                }}
                className="px-3 mx-1 py-1"
              >
                All Tables
              </Link>
              <Link
                to={`/take-away/table/${id}`}
                style={{
                  backgroundColor: "#F3F3F9",
                  color: "black",
                  textDecoration: "none",
                  textAlign: "center",

                  fontSize: "14px",
                }}
                className="px-3 mx-1 py-1"
              >
                Take Away Parcel
              </Link>

              <Link
                to={`/delivery/tables/${id}`}
                style={{
                  backgroundColor: "#F3F3F9",
                  color: "black",
                  textDecoration: "none",
                  textAlign: "center",

                  fontSize: "14px",
                }}
                className="px-3 mx-1 py-1"
              >
                Home Delivery
              </Link>
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
                onClick={() => forFilterTables("running")}
              >
                Running tables
              </Link>

              <Link
                style={{
                  backgroundColor: "#45A14E",
                  color: "white",
                  textDecoration: "none",
                  textAlign: "center",

                  fontSize: "14px",
                }}
                className="px-3 mx-1 py-1"
                onClick={() => forFilterTables("empty")}
              >
                available tables
              </Link>

              <Link
                style={{
                  backgroundColor: "#FD5432",
                  color: "white",
                  textDecoration: "none",
                  textAlign: "center",

                  fontSize: "14px",
                }}
                className="px-3 mx-1 py-1"
                onClick={() => forFilterTables("invoiced")}
              >
                P Settlement
              </Link>
            </div>

            <div>
              <Link
                to={`/transfar-table/${id}`}
                style={{
                  backgroundColor: "#F3F3F9",
                  color: "black",
                  textDecoration: "none",
                  textAlign: "center",

                  fontSize: "14px",
                }}
                className="px-3 mx-1 py-1"
              >
                <FaExchangeAlt className="mx-1" />
                Transfar
              </Link>
              <Link
                to={`/merg-table/${id}`}
                style={{
                  backgroundColor: "#F3F3F9",
                  color: "black",
                  textDecoration: "none",
                  textAlign: "center",

                  fontSize: "14px",
                }}
                className="px-3 mx-1 py-1"
              >
                {" "}
                <FaExchangeAlt className="mx-1" />
                Merge
              </Link>
            </div>
          </div>
        </Col>
        <hr></hr>
        <Container fluid>
          <Col sm={12}>
            <div className="d-flex flex-wrap align-items-center justify-content-between mt-0">
              <div
                className="d-flex flex-wrap col-12 col-md-8 col-lg-9"
                style={{ gap: "5px" }}
              >
                {" "}
                {forAllAreas?.map((item, index) => (
                  <button
                    onClick={() => forGettingTablesOfAllAreas(item._id)}
                    key={index}
                    style={{
                      backgroundColor: "#F3F3F9",
                      color: "black",
                      textDecoration: "none",
                      textAlign: "center",
                      fontSize: "14px",
                      borderRadius: "30px",
                      border: "1px solid #B3C8CF",
                    }}
                    className="px-3 mx-1 py-1"
                  >
                    {item.areaName}
                  </button>
                ))}
              </div>

              <div className="col-12 col-lg-3 col-md-4 d-flex flex-wrap justify-content-end">
                <Link
                  style={{
                    color: "black",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                  className="px-3 mx-1 py-1"
                >
                  <span style={{ marginRight: "5px" }}>Table</span>
                  <input
                    type="text"
                    onChange={(e) => OnchangeHandler(e)}
                    placeholder="table no"
                    style={{
                      width: "60px",
                      height: "25px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="mx-1"
                  />
                </Link>
                <Link
                  to={areaid && `/area/${areaid ? areaid : id}/tables-setting`}
                  onClick={forCheckAndAddTableToTableAreaId}
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                  className="mx-1 px-2 py-1"
                >
                  create
                </Link>
              </div>
            </div>
          </Col>

          <Row className="my-3">
            {forAllAreas.map((areaItem, areaIndex) => {
              const filteredTables = allFilteredTables.filter(
                (table) => table?.counterArea?.id === areaItem._id
              );

              return filteredTables.map((item, index) => (
                <Col
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                  className="mb-2 mx-0 p-1"
                  key={index}
                >
                  <div
                    className="d-flex flex-column"
                    style={{
                      backgroundColor: getStatusColor(item.currentOrder.status),
                    }}
                  >
                    <div
                      className="p-0 mb-0 text-white"
                      style={{
                        height: "60px",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      <div className="d-flex">
                        <div
                          className="w-25 d-flex align-items-center justify-content-center"
                          style={{
                            borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                            height: "60px",
                          }}
                        >
                          <p>D-{item.tableNo}</p>
                        </div>
                        <div className="w-50 text-center py-1 px-1 ">
                          <p
                            className="m-0 py-1  text-truncate"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              fontSize: "12px",
                            }}
                          >
                            {userData.name}
                          </p>
                          <p>{formatAmount(item?.currentOrder?.totalAmount)}</p>
                        </div>

                        <div
                          style={{
                            borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                          }}
                          className="w-25 d-flex align-items-center justify-content-center"
                        >
                          <p>{item.currentOrder.persons}</p>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-around mt-0">
                      <Link
                        to={
                          item.currentOrder.status === "running"
                            ? `/for-kot/${item._id}`
                            : "#"
                        }
                        onClick={(e) => {
                          if (item.currentOrder.status === "empty") {
                            openKotPopup(item._id);
                          }
                        }}
                        className="text-white w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                        style={{
                          borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                          cursor:
                            item.currentOrder.status === "invoiced"
                              ? "not-allowed"
                              : "pointer",
                          opacity:
                            item.currentOrder.status === "invoiced" ? 0.6 : 1,
                        }}
                        onMouseEnter={(e) => {
                          if (item.currentOrder.status === "invoiced") {
                            e.currentTarget
                              .querySelector(".not-allowed-icon")
                              .classList.remove("d-none");
                          } else {
                            e.currentTarget
                              .querySelector(".hover-text")
                              .classList.remove("d-none");
                            e.currentTarget.querySelector(
                              ".hover-text"
                            ).textContent = "kot";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget
                            .querySelector(".hover-text")
                            .classList.add("d-none");
                          e.currentTarget
                            .querySelector(".not-allowed-icon")
                            .classList.add("d-none");
                        }}
                      >
                        {/* Not allowed icon */}
                        <div
                          className="not-allowed-icon position-absolute top-50 start-50 translate-middle d-none"
                          style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            border: "2px solid red",
                            borderRadius: "50%",
                            color: "red",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                            }}
                          >
                            &#x2F;
                          </span>
                        </div>

                        <FaTicketAlt />
                        <span
                          className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                          style={{
                            bottom: "-40px",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            padding: "5px 10px",
                            fontSize: "0.8rem",
                            zIndex: 1000,
                          }}
                        >
                          kot
                        </span>
                      </Link>

                      <Link
                        to={
                          item.currentOrder.status !== "empty" &&
                          item.currentOrder.status !== "invoiced"
                            ? `/for-invoice/${item._id}`
                            : "#"
                        }
                        onClick={(e) => {
                          if (
                            item.currentOrder.status === "empty" ||
                            item.currentOrder.status === "invoiced"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        className="text-white w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                        style={{
                          borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                          cursor:
                            item.currentOrder.status === "empty" ||
                            item.currentOrder.status === "invoiced"
                              ? "not-allowed"
                              : "pointer",
                          opacity:
                            item.currentOrder.status === "empty" ||
                            item.currentOrder.status === "invoiced"
                              ? 0.6
                              : 1,
                        }}
                        onMouseEnter={(e) => {
                          if (
                            item.currentOrder.status === "empty" ||
                            item.currentOrder.status === "invoiced"
                          ) {
                            e.currentTarget
                              .querySelector(".not-allowed-icon")
                              .classList.remove("d-none");
                          } else {
                            e.currentTarget
                              .querySelector(".hover-text")
                              .classList.remove("d-none");
                            e.currentTarget.querySelector(
                              ".hover-text"
                            ).textContent = "Invoice";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget
                            .querySelector(".hover-text")
                            .classList.add("d-none");
                          e.currentTarget
                            .querySelector(".not-allowed-icon")
                            .classList.add("d-none");
                        }}
                      >
                        {/* Not allowed icon */}
                        <div
                          className="not-allowed-icon position-absolute top-50 start-50 translate-middle d-none"
                          style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            border: "2px solid red",
                            borderRadius: "50%",
                            color: "red",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                            }}
                          >
                            &#x2F;
                          </span>
                        </div>

                        <FaFileAlt />
                        <span
                          className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                          style={{
                            bottom: "-40px",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            padding: "5px 10px",
                            fontSize: "0.8rem",
                            zIndex: 1000,
                          }}
                        >
                          Invoice
                        </span>
                      </Link>

                      <Link
                        onClick={(e) => {
                          setTableId(item._id);
                          if (item.currentOrder.status === "invoiced") {
                            if (
                              restData?.payemtPreOrPost === "pre" &&
                              item?.currentOrder?.paymentMethod
                            ) {
                              setTableId(item._id);
                              setCallSettleFunction(true);
                            } else {
                              forSettleMents(item._id);
                            }
                          }
                        }}
                        className="text-white w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                        style={{
                          borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                          cursor:
                            item.currentOrder.status !== "invoiced"
                              ? "not-allowed"
                              : "pointer",
                          opacity:
                            item.currentOrder.status !== "invoiced" ? 0.6 : 1,
                        }}
                        onMouseEnter={(e) => {
                          if (item.currentOrder.status !== "invoiced") {
                            e.currentTarget
                              .querySelector(".not-allowed-icon")
                              .classList.remove("d-none");
                          } else {
                            e.currentTarget
                              .querySelector(".hover-text")
                              .classList.remove("d-none");
                            e.currentTarget.querySelector(
                              ".hover-text"
                            ).textContent = "Settlement";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget
                            .querySelector(".hover-text")
                            .classList.add("d-none");
                          e.currentTarget
                            .querySelector(".not-allowed-icon")
                            .classList.add("d-none");
                        }}
                      >
                        {/* Not allowed icon */}
                        <div
                          className="not-allowed-icon position-absolute top-50 start-50 translate-middle d-none"
                          style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            border: "2px solid red",
                            borderRadius: "50%",
                            color: "red",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                            }}
                          >
                            &#x2F;
                          </span>
                        </div>

                        <FaRupeeSign />
                        <span
                          className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                          style={{
                            bottom: "-40px",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            padding: "5px 10px",
                            fontSize: "0.8rem",
                            zIndex: 1000,
                          }}
                        >
                          SettleMent
                        </span>
                      </Link>

                      <Link
                        onClick={(e) => {
                          if (
                            item.currentOrder.status === "empty" ||
                            item.currentOrder.status === "invoiced"
                          ) {
                            e.preventDefault();
                          } else {
                            forGetTableData(item._id);
                            setForSettingKot(true);
                          }
                        }}
                        className="text-white w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                        style={{
                          borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                          cursor:
                            item.currentOrder.status === "empty" ||
                            item.currentOrder.status === "invoiced"
                              ? "not-allowed"
                              : "pointer",
                          opacity:
                            item.currentOrder.status === "empty" ||
                            item.currentOrder.status === "invoiced"
                              ? 0.6
                              : 1,
                        }}
                        onMouseEnter={(e) => {
                          if (
                            item.currentOrder.status === "empty" ||
                            item.currentOrder.status === "invoiced"
                          ) {
                            e.currentTarget
                              .querySelector(".not-allowed-icon")
                              .classList.remove("d-none");
                          } else {
                            e.currentTarget
                              .querySelector(".hover-text")
                              .classList.remove("d-none");
                            e.currentTarget.querySelector(
                              ".hover-text"
                            ).textContent = "Settings";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget
                            .querySelector(".hover-text")
                            .classList.add("d-none");
                          e.currentTarget
                            .querySelector(".not-allowed-icon")
                            .classList.add("d-none");
                        }}
                      >
                        {/* Not allowed icon */}
                        <div
                          className="not-allowed-icon position-absolute top-50 start-50 translate-middle d-none"
                          style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            border: "2px solid red",
                            borderRadius: "50%",
                            color: "red",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                            }}
                          >
                            &#x2F;
                          </span>
                        </div>

                        <FaFileAlt />
                        <span
                          className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                          style={{
                            bottom: "-40px",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            padding: "5px 10px",
                            fontSize: "0.8rem",
                            zIndex: 1000,
                          }}
                        >
                          Settings
                        </span>
                      </Link>
                    </div>
                  </div>
                </Col>
              ));
            })}
          </Row>

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

          {/* this is for the setting of the table and kot */}
          {forSettingKot && (
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
                className="d-flex  flex-column bg-white  pb-4 "
                style={{
                  width: "700px",
                  height: "80vh",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  className=" p-1  d-flex justify-content-between align-items-center  mb-2"
                  style={{ fontSize: "14px", backgroundColor: "#E3614D" }}
                >
                  <p className="p-0 m-0 text-white">
                    KOT Details Table no {tableData.tableNo}
                  </p>
                  <p
                    className="m-0 p-2 color-dark cursor-pointer"
                    onClick={() => setForSettingKot(false)}
                  >
                    x
                  </p>
                </div>

                {forLoading ? (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      height: "70vh",
                      width: "100%",
                    }}
                  >
                    <div
                      className="spinner-border text-primary"
                      role="status"
                      style={{ width: "2.5rem", height: "2.5rem" }}
                    ></div>
                    <p
                      className="ms-3"
                      style={{
                        fontSize: "18px",
                        color: "#007bff",
                        fontWeight: "bold",
                      }}
                    >
                      Loading kots all items...
                    </p>
                  </div>
                ) : (
                  allKots.map((item, index) => (
                    <div
                      className="p-2"
                      style={{
                        maxHeight: "70vh",
                        gap: "1px",
                      }}
                    >
                      <div className="p-1">
                        <div
                          className="d-flex justify-content-between align-items-center px-2"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#F3F3F3",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center">
                            KOT/{item.number} -{" "}
                            {formatDateTime(
                              item?.createdAt,
                              restData?.dateFormate,
                              restData?.selectedTimezone
                            )}
                          </div>
                          <div
                            className="d-flex align-items-center justify-content-center   "
                            style={{ gap: "5px" }}
                          >
                            <Link
                              to={`/kot/${item._id}/void/${forTableId}`}
                              className="cursor-pointer"
                              style={{
                                backgroundColor: "#0074FF",
                                color: "white",
                                padding: "3px 5px",
                                margin: 0,
                                textDecoration: "none",
                              }}
                            >
                              <FiEdit className="pe-1" /> Void items
                            </Link>
                            <Link
                              to={`/kot/${item._id}/transfar/${forTableId}`}
                              className="cursor-pointer"
                              style={{
                                backgroundColor: "#FE9900",
                                color: "white",
                                padding: "3px 5px",
                                margin: 0,
                                textDecoration: "none",
                              }}
                            >
                              <FiEdit className="pe-1" /> Transfar
                            </Link>
                          </div>
                        </div>
                        <div
                          className="table-responsive "
                          style={{
                            gap: "1px",
                          }}
                        >
                          <table class="table  table-striped  table-hover table-light  ">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  style={{ fontSize: "12px" }}
                                  className="fw-bold"
                                >
                                  SL
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
                              </tr>
                            </thead>
                            {item.orderItems.map((item, index) => (
                              <tbody style={{ fontSize: "12px" }} key={index}>
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{item.name}</td>
                                  <td>{item.quantity}</td>
                                </tr>
                              </tbody>
                            ))}
                          </table>
                          <div
                            className="  d-flex align-items-center justify-content-between p-1 "
                            style={{
                              backgroundColor: "#E6E6E6",
                              fontSize: "12px",
                            }}
                          >
                            <p className="p-0 m-0">Total Items </p>
                            <p className="p-0 m-0">{item.orderItems.length}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* this is for kot */}
          {forKot && (
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
                className="d-flex  flex-column bg-white  pb-4 "
                style={{
                  width: "700px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  className=" p-1  d-flex justify-content-between align-items-center  mb-2"
                  style={{ fontSize: "14px", backgroundColor: "#E3614D" }}
                >
                  <p className="p-0 m-0 text-white">Select Number of Persons</p>
                  <p
                    className="m-0 p-2 color-dark cursor-pointer"
                    onClick={() => setForKot(false)}
                  >
                    x
                  </p>
                </div>
                <div className="mt-1 p-1">
                  <div>
                    <p className="m-0 p-1">Select PAX</p>
                    <div className="d-flex flex-wrap">{buttons}</div>
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
                        onClick={() =>
                          forClickOnPaymentMethod("multi", "advance")
                        }
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
                        onClick={() =>
                          forClickOnPaymentMethod("multi", "paytm")
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
                            {formatAmount(tableData?.currentOrder?.totalAmount)}
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
                          <p className="p-0 m-0 text-secondary">
                            Return Amount
                          </p>
                        </div>{" "}
                        <div
                          className="p-2 w-75"
                          style={{
                            borderBottom: "1px solid #B3C8CF",
                          }}
                        >
                          <input
                            type="text"
                            value={
                              tableData?.currentOrder?.remainAmount
                                ? formatAmount(
                                    tableData?.currentOrder?.remainAmount
                                  )
                                : "0"
                            }
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
                          <p className="p-0 m-0 text-secondary">
                            Payment Detail
                          </p>
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
                          {formatAmount(10)}
                        </button>
                        <button
                          onClick={() => setInputValue(20)}
                          style={{ border: "none", width: "140px" }}
                          className="bg-success py-2 mx-1 px-4 text-white"
                        >
                          {formatAmount(20)}
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
                          {formatAmount(50)}
                        </button>
                        <button
                          onClick={() => setInputValue(100)}
                          style={{ border: "none", width: "140px" }}
                          className="bg-success py-2 mx-1 px-4 text-white"
                        >
                          {formatAmount(100)}
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
                          {formatAmount(200)}
                        </button>
                        <button
                          onClick={() => setInputValue(500)}
                          style={{ border: "none", width: "140px" }}
                          className="bg-success py-2 mx-1 px-4 text-white"
                        >
                          {formatAmount(500)}
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
                          {formatAmount(1000)}
                        </button>
                        <button
                          onClick={() => setInputValue(2000)}
                          style={{ border: "none", width: "140px" }}
                          className="bg-success py-2 mx-1 px-4 text-white"
                        >
                          {formatAmount(2000)}
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
                          {formatAmount(3000)}
                        </button>
                        <button
                          onClick={() => setInputValue(4000)}
                          style={{ border: "none", width: "140px" }}
                          className="bg-success py-2 mx-1 px-4 text-white"
                        >
                          {formatAmount(4000)}
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
                          {formatAmount(5000)}
                        </button>
                        <button
                          onClick={() => setInputValue(10000)}
                          style={{ border: "none", width: "140px" }}
                          className="bg-success py-2 mx-1 px-4 text-white"
                        >
                          {formatAmount(10000)}
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
                            : "Payment Complete"}{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardAnalytics;
