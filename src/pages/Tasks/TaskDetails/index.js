import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "reactstrap";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import { toast } from "react-toastify";
import { intersectSpans } from "@fullcalendar/core/internal";

const TaskDetails = () => {
  const [allRunningKots, setAllRunningKots] = useState([]);
  const [timeLeft, setTimeLeft] = useState([]);

  //this is for getting data from the my custome hook
  const { myUrl, restId, token } = UseRiazHook();

  //this is for getting all kots
  const forGettingAllRunningKots = async () => {
    const url = `${myUrl}/get/${restId}/restaurent/all/running/kots`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllRunningKots(data.allRunningKots);

        const newTimes = data.allRunningKots.map((kot, index) => {
          const now = new Date().getTime();
          const kotTime = new Date(kot.createdAt).getTime();
          const elapsed = Math.floor((now - kotTime) / 1000);
          const remainingTime = Math.max(55 * 60 - elapsed, 0);
          return remainingTime;
        });

        setTimeLeft(newTimes);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get all running kots of the restaurent",
        err
      );
    }
  };

  //this is for controll rendering for getting all running kots function
  useEffect(() => {
    forGettingAllRunningKots();
    const interval = setInterval(() => {
      forGettingAllRunningKots();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  //this is for time stampes
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) =>
        prev.map((time, index) => {
          return time > 0 ? time - 1 : 0;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //this is for update the status of the item
  const forUpdateTheStatusOfItem = async (kotId, itemId, status) => {
    console.log("status", status);
    let newStatus = "";
    if (status === "Preparing") {
      newStatus = "Ready";
    } else if (status === "Ready") {
      newStatus = "Delivered";
    }

    let itemData = {
      status: newStatus,
    };

    console.log("data", itemData);
    const url = `${myUrl}/edit/${kotId}/kotitems/status/${itemId}`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        forGettingAllRunningKots();
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the update item status function", err);
    }
  };

  const forDeliveredAndSettingKotStatus = async (id) => {
    const url = `${myUrl}/add/kot/${id}/statustrue`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg);
        forGettingAllRunningKots();
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("there is error in the set status true of kot", err);
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4 className="text-center">All Kots Data of Counter Number One</h4>

          <Row className="mt-4 mx-lg-2">
            {allRunningKots.map((kotItem, index) => {
              const minutes = Math.floor(timeLeft[index] / 60);
              const seconds = timeLeft[index] % 60;
              return (
                <Col lg={4} md={6} className="p-0 m-0" key={index}>
                  <div
                    className="m-2"
                    style={{
                      border: "1px solid black",
                    }}
                  >
                    <div className="d-flex">
                      <h6
                        className="m-0 py-2 px-1"
                        style={{
                          backgroundColor: "#343434",
                          border: "1px solid black",
                          color: "white",
                          width: "60%",
                        }}
                      >
                        KOT -- {kotItem?.number}
                      </h6>
                      <h6
                        className="m-0 py-2 text-center"
                        style={{
                          backgroundColor: "#FDE536",
                          border: "1px solid black",
                          color: "black",
                          width: "40%",
                        }}
                      >
                        Table No -- {kotItem?.table}
                      </h6>
                    </div>

                    <div
                      className="p-1 my-1"
                      style={{
                        height: "300px",
                        overflowY: "auto",
                        overflowX: "auto",
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                      }}
                    >
                      <table
                        className="table"
                        style={{
                          border: "1px solid #ECECEC",
                          borderCollapse: "collapse",
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th
                              style={{
                                border: "1px solid #DEDEDE",
                                backgroundColor: "#DEDEDE",
                                padding: "7px",
                              }}
                            >
                              #
                            </th>
                            <th
                              style={{
                                border: "1px solid #DEDEDE",
                                backgroundColor: "#DEDEDE",
                                padding: "7px",
                              }}
                            >
                              Name
                            </th>
                            <th
                              style={{
                                border: "1px solid #DEDEDE",
                                backgroundColor: "#DEDEDE",
                                padding: "7px",
                              }}
                            >
                              Qty
                            </th>
                            <th
                              style={{
                                border: "1px solid #DEDEDE",
                                backgroundColor: "#DEDEDE",
                                padding: "7px",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {kotItem.orderItems.map((item, index) => (
                            <React.Fragment key={index}>
                              <tr>
                                <td
                                  style={{
                                    border: "1px solid #DEDEDE",
                                    backgroundColor:
                                      index % 2 === 0 ? "#F3F3F3" : "#FFBD00",
                                    padding: "7px",
                                  }}
                                >
                                  {index + 1}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #DEDEDE",
                                    backgroundColor:
                                      index % 2 === 0 ? "#F3F3F3" : "#FFBD00",
                                    padding: "7px",
                                  }}
                                >
                                  <strong>{item.name}</strong>
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #DEDEDE",
                                    backgroundColor:
                                      index % 2 === 0 ? "#F3F3F3" : "#FFBD00",
                                    padding: "7px",
                                  }}
                                >
                                  {item.quantity}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #DEDEDE",
                                    backgroundColor:
                                      index % 2 === 0 ? "#F3F3F3" : "#FFBD00",
                                    padding: "5px",
                                  }}
                                >
                                  <button
                                    disabled={item.status === "Delivered"}
                                    onClick={() => {
                                      forUpdateTheStatusOfItem(
                                        kotItem._id,
                                        item._id,
                                        item.status
                                      );
                                    }}
                                    style={{
                                      border: "none",
                                      backgroundColor:
                                        item.status === "Preparing"
                                          ? "#0A97BB"
                                          : item.status === "Ready"
                                          ? "#FFBD00"
                                          : item.status === "Delivered"
                                          ? "transparent"
                                          : "initial",
                                      fontSize: "14px",
                                      color:
                                        item.status === "Preparing"
                                          ? "white"
                                          : "black",
                                    }}
                                    className="p-1"
                                  >
                                    {item.status}...
                                  </button>
                                </td>
                              </tr>

                              {/* Check if the item has sub-items (deal) */}
                              {item.items &&
                                item.items.length > 0 &&
                                item.items.map((subItem, subIndex) => (
                                  <tr key={`${index}-${subIndex}`}>
                                    <td
                                      style={{
                                        border: "1px solid #DEDEDE",
                                        backgroundColor:
                                          subIndex % 2 === 0
                                            ? "#EFEFEF"
                                            : "#FFD700",
                                        padding: "7px",
                                      }}
                                    >
                                      {index + 1}.{subIndex + 1}
                                    </td>
                                    <td
                                      style={{
                                        border: "1px solid #DEDEDE",
                                        backgroundColor:
                                          subIndex % 2 === 0
                                            ? "#EFEFEF"
                                            : "#FFD700",
                                        padding: "7px",
                                      }}
                                    >
                                      {subItem.name}
                                    </td>
                                    <td
                                      style={{
                                        border: "1px solid #DEDEDE",
                                        backgroundColor:
                                          subIndex % 2 === 0
                                            ? "#EFEFEF"
                                            : "#FFD700",
                                        padding: "7px",
                                      }}
                                    >
                                      {subItem.qty}
                                    </td>
                                    <td
                                      style={{
                                        border: "1px solid #DEDEDE",
                                        backgroundColor:
                                          subIndex % 2 === 0
                                            ? "#EFEFEF"
                                            : "#FFD700",
                                        padding: "5px",
                                      }}
                                    >
                                      <button
                                        disabled={
                                          subItem.status === "Delivered"
                                        }
                                        onClick={() =>
                                          forUpdateTheStatusOfItem(
                                            kotItem._id,
                                            subItem._id,
                                            subItem.status
                                          )
                                        }
                                        style={{
                                          border: "none",
                                          backgroundColor:
                                            subItem.status === "Preparing"
                                              ? "#0A97BB"
                                              : subItem.status === "Ready"
                                              ? "#FFBD00"
                                              : subItem.status === "Delivered"
                                              ? "transparent"
                                              : "initial",
                                          fontSize: "14px",
                                          color:
                                            subItem.status === "Preparing"
                                              ? "white"
                                              : "black",
                                        }}
                                        className="p-1"
                                      ></button>
                                    </td>
                                  </tr>
                                ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div
                      className="d-flex justify-content-between align-items-center px-2 py-1 my-2 mx-1"
                      style={{ border: "1px solid #ECECEC" }}
                    >
                      <div>
                        <p
                          className="p-0 m-0"
                          style={{
                            fontSize: "15px",
                            fontWeight: "500",
                            color: "#0A97BB",
                          }}
                        >
                          Time Ellapsed:
                        </p>
                        <p
                          className="p-0 m-0"
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#0A97BB",
                          }}
                        >
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds} Seconds
                        </p>
                      </div>
                      <div>
                        {" "}
                        <button
                          onClick={() =>
                            forDeliveredAndSettingKotStatus(kotItem._id)
                          }
                          style={{
                            border: "none",
                            backgroundColor: "#209140",
                            fontSize: "14px",
                          }}
                          className="py-1 px-2 text-white"
                        >
                          Delivered
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TaskDetails;
