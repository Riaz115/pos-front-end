import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { FaTicketAlt, FaFileAlt, FaRupeeSign, FaList } from "react-icons/fa";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

const DashboardAnalytics = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            dine="Dine In"
            takeAway="Take Away"
            delivery="Delivery"
            merge="Merge"
            transfar="Transfar"
            runing="Runing"
            newOrderbtn="New Order"
          />
          <Row>
            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0   p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#45A14E" }}>
                <div
                  className="p-0 mb-0 text-white"
                  style={{
                    height: "60px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                  }}>
                  <div className="d-flex">
                    <div
                      className="w-25 d-flex align-items-center justify-content-center"
                      style={{
                        borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                        height: "60px",
                      }}>
                      <h6>TA-1</h6>
                    </div>
                    <div className="w-50 text-center py-1 px-1 ">
                      <p
                        className="m-0 py-1  text-truncate"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: "12px",
                        }}>
                        waiter name{" "}
                      </p>
                      <h6 className="m-0 px-1">price 23</h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center">
                      <h6>12</h6>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-around mt-0">
                  <Link
                    to="/testing"
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "kot";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      kot
                    </span>
                  </Link>

                  <Link
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Invoice";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      Invoice
                    </span>
                  </Link>

                  <Link
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Bill";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      Payment
                    </span>
                  </Link>

                  <Link
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Settings";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000,
                      }}>
                      Settings
                    </span>
                  </Link>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0   p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#FD5432" }}>
                <div
                  className="p-0 mb-0 text-white"
                  style={{
                    height: "60px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                  }}>
                  <div className="d-flex">
                    <div
                      className="w-25 d-flex align-items-center justify-content-center"
                      style={{
                        borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                        height: "60px",
                      }}>
                      <h6>1</h6>
                    </div>
                    <div className="w-50 text-center py-1 px-1 ">
                      <p
                        className="m-0 py-1  text-truncate"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: "12px",
                        }}></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center">
                      <h6></h6>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-around mt-0">
                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "kot";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      kot
                    </span>
                  </div>

                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Invoice";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      Invoice
                    </span>
                  </div>

                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Bill";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      Payment
                    </span>
                  </div>

                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Settings";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#FE9900" }}>
                <div
                  className="p-0 mb-0 text-white"
                  style={{
                    height: "60px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                  }}>
                  <div className="d-flex">
                    <div
                      className="w-25 d-flex align-items-center justify-content-center"
                      style={{
                        borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                        height: "60px",
                      }}>
                      <h6>1</h6>
                    </div>
                    <div className="w-50 text-center py-1 px-1 ">
                      <p
                        className="m-0 py-1  text-truncate"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: "12px",
                        }}></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center">
                      <h6></h6>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-around mt-0">
                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "kot";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      kot
                    </span>
                  </div>

                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Invoice";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      Invoice
                    </span>
                  </div>

                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Bill";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      Payment
                    </span>
                  </div>

                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Settings";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: " #7487DE" }}>
                <div
                  className="p-0 mb-0 text-white"
                  style={{
                    height: "60px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                  }}>
                  <div className="d-flex">
                    <div
                      className="w-25 d-flex align-items-center justify-content-center"
                      style={{
                        borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                        height: "60px",
                      }}>
                      <h6>1</h6>
                    </div>
                    <div className="w-50 text-center py-1 px-1 ">
                      <p
                        className="m-0 py-1  text-truncate"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: "12px",
                        }}></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center">
                      <h6></h6>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-around mt-0">
                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "kot";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      kot
                    </span>
                  </div>

                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Invoice";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      Invoice
                    </span>
                  </div>

                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Bill";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      Payment
                    </span>
                  </div>

                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Settings";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000,
                      }}>
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: " #7487DE" }}>
                <div
                  className="p-0 mb-0 text-white"
                  style={{
                    height: "60px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                  }}>
                  <div className="d-flex">
                    <div
                      className="w-25 d-flex align-items-center justify-content-center"
                      style={{
                        borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                        height: "60px",
                      }}>
                      <p className="m-0 fs-5">1</p>
                    </div>
                    <div className="w-50 text-center py-1 px-1 ">
                      <p
                        className="m-0 py-1  text-truncate"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: "12px",
                        }}>
                        i am for waiter name and i am checkin for next line
                      </p>
                      <h6>23456.00</h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center">
                      <p className="m-0 fs-5">132</p>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-around mt-0">
                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "kot";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      kot
                    </span>
                  </div>

                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Invoice";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      Invoice
                    </span>
                  </div>

                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Bill";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}>
                      Payment
                    </span>
                  </div>

                  <div
                    className="text-white cursor-pointer w-25 py-1 d-flex align-items-center justify-content-center position-relative"
                    style={{
                      borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.remove("d-none");
                      e.currentTarget.querySelector(".hover-text").textContent =
                        "Settings";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget
                        .querySelector(".hover-text")
                        .classList.add("d-none");
                    }}>
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000,
                      }}>
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardAnalytics;
