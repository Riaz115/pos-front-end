import React, { useEffect, useRef, useState, useCallback } from "react";
import { Col, Container, Row } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UseRiazHook } from "../../RiazStore/RiazStore";
import { toast } from "react-toastify";

const Chat = () => {
  const [kotsAllItems, setKotAllItems] = useState([]);
  const [kotData, setKotData] = useState({});
  const [counters, setCounters] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const [allTables, setAllTables] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [forPersonOpen, setForPersonOpen] = useState(false);
  const [person, setPerson] = useState("");
  const [targetTableId, setTargetTableId] = useState("");

  //this is for getting from my custome hook
  const {
    myUrl,
    forTableData,
    counterAreaId,
    restId,
    restData,
    forGettingTableData,
    setForTableId,
    token,
    counterId,
    formatAmount,
  } = UseRiazHook();

  //this is for navigate
  const navigate = useNavigate();

  //this is for date
  const currentDate = new Date().toLocaleDateString();

  //this is for getting id of table and kot id
  const { id, tableid } = useParams();
  useEffect(() => {
    setForTableId(tableid);
  }, []);

  // On initial render, select all items by default
  useEffect(() => {
    setSelectedItems(kotsAllItems); // Select all items initially
  }, [kotsAllItems]);

  // Handle checkbox change
  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  //this is for getting kot data
  const forGettingKotDataForEdit = async () => {
    const url = `${myUrl}/get/${tableid}/kotdataforedit/${id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setKotAllItems(data.kot.orderItems);
        setKotData(data.kot);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the getting data kot for edit items", err);
    }
  };

  //this is for controll rendering of get data of kot for edit
  useEffect(() => {
    forGettingKotDataForEdit();
    forGettingTableData();
  }, []);

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

  //this is for call only once time
  useEffect(() => {
    forGetAllCountersofRestaurent();
  }, []);

  //this is for get all counter areas
  const forGetAllTablesOfRestaurent = async () => {
    const url = `${myUrl}/forget/all/tables/${restId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setAllTables(data.allTables);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get all tables areas function", err);
    }
  };
  //this is for get all counter areas
  const forGetAllCounterAreas = async () => {
    const url = `${myUrl}/forallcounterareas/get/all`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        setAllAreas(data.allAreas);
      } else {
        console.log("err data", data.allAreas);
      }
    } catch (err) {
      console.log("there is error in the get all counter areas function", err);
    }
  };

  //this is for controll rendering of the all counter areas
  useEffect(() => {
    forGetAllCounterAreas();
    forGetAllTablesOfRestaurent();
  }, []);

  const handleClick = (value) => {
    setPerson(value);
    setForPersonOpen(false);
  };

  //this is for number of persons
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

  //this is for select table target
  const handleTargetTableSelect = (id) => {
    setTargetTableId(id);
  };

  //this is for catch error
  const forCatchErrors = () => {
    let isOk = true;
    if (!targetTableId.trim()) {
      toast.error("please select table for transfar items");
      isOk = false;
    } else if (selectedItems.length === 0) {
      toast.error("please select item for transfar to table");
      isOk = false;
    } else if (person === "") {
      toast.error("please select the persons of this  table");
      isOk = false;
    }
    return isOk;
  };

  //this is for void or tranfar kot
  const forTransfarKotOrItemToTable = async () => {
    if (forCatchErrors()) {
      const orderData = {
        orderItems: selectedItems.map((item) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          items: item.items,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
          modifier: item.modifier || null,
        })),
        person,
      };

      const url = `${myUrl}/transfar/${id}/${tableid}/${targetTableId}/save`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(orderData),
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          console.log("ok data", data);
          navigate(`/area/${counterId}/tables`);
        } else {
          console.log("err data", data);
        }
      } catch (err) {
        console.log("there is error in the tranfar kot or item function", err);
      }
    }
  };
  //this is for the date and time formate
  const formatDateTime = (format, timezone) => {
    const d = new Date();

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
                  KOT/
                  <span
                    className="fw-bold"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {kotData?.number}
                  </span>
                </p>
                <p className="m-0 p-0 ">
                  {" "}
                  Date
                  <span
                    className="fw-bold px-1"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {formatDateTime(
                      restData?.dateFormate,
                      restData?.selectedTimezone
                    )}
                  </span>
                </p>
              </div>

              <div
                className="mt-2 table-responsive z-3"
                style={{
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
                    {kotsAllItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div>
                            <input
                              type="checkbox"
                              className="p-2 mx-1"
                              checked={selectedItems.includes(item)}
                              onChange={() => handleCheckboxChange(item)}
                            />
                            <span style={{ fontSize: "18px" }}>
                              {index + 1}
                            </span>
                          </div>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{formatAmount(item?.price)}</td>
                        <td>{formatAmount(item?.totalPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>

            <Col lg={6}>
              <div className="col-8">
                <Row className="my-3">
                  <h6>Select Table to Transfar items to table</h6>
                  {counters.map((counterItem, counterIndex) => {
                    const filteredAreas = allAreas.filter(
                      (area) => area?.counter?.id === counterItem?._id
                    );

                    return filteredAreas.map((areaItem, areaIndex) => {
                      const filteredTables = allTables.filter(
                        (table) =>
                          table?.counterArea?.id === areaItem?._id &&
                          table?.currentOrder?.status !== "invoiced" &&
                          table?._id !== tableid
                      );

                      return filteredTables.map((tableItem, tableIndex) => (
                        <>
                          <Col
                            key={tableIndex}
                            md={4}
                            sm={6}
                            className="text-center  mx-0 px-1"
                          >
                            <div
                              onClick={() => {
                                if (tableItem.currentOrder.status === "empty") {
                                  setForPersonOpen(true);
                                } else {
                                  setPerson(tableItem?.currentOrder?.persons);
                                }
                                handleTargetTableSelect(tableItem._id);
                              }}
                              className="py-2 px-0 w-100"
                              style={{
                                marginBottom: "3px",

                                color:
                                  tableItem._id === targetTableId
                                    ? "white"
                                    : tableItem.currentOrder.status ===
                                      "running"
                                    ? "black"
                                    : "white",
                                backgroundColor:
                                  tableItem._id === targetTableId
                                    ? "#432E54"
                                    : tableItem.currentOrder.status ===
                                      "running"
                                    ? "#FE9900"
                                    : "#2C76FF",
                              }}
                            >
                              <input
                                type="radio"
                                className="me-2 p-0"
                                id={`table-${tableItem._id}`}
                                checked={targetTableId === tableItem._id}
                                onChange={() => {
                                  handleTargetTableSelect(tableItem._id);
                                }}
                              />
                              <label
                                className="m-0 p-0"
                                htmlFor={`table-${tableItem._id}`}
                              >
                                Table {tableItem.tableNo}
                              </label>
                            </div>
                          </Col>
                        </>
                      ));
                    });
                  })}
                </Row>
              </div>
            </Col>

            <Col sm={12}>
              <div
                className="d-flex align-items-center  justify-content-between mt-1 "
                style={{ backgroundColor: "#E2DAD9" }}
              >
                <div
                  className="d-flex "
                  style={{ gap: "5px", backgroundColor: "#E2DAD9" }}
                >
                  <button
                    onClick={forTransfarKotOrItemToTable}
                    style={{
                      backgroundColor: "#E84743",
                      color: "white",
                      textDecoration: "none",
                      textAlign: "center",
                      border: "none",
                    }}
                    className="px-4 py-2 border-none"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* this is for person */}
      {forPersonOpen && (
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
                onClick={() => setForPersonOpen(false)}
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
    </React.Fragment>
  );
};

export default Chat;
