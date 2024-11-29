import React, { useState } from "react";
import { Container, Row, Col, Input, Label } from "reactstrap";
import { FaTicketAlt, FaFileAlt, FaRupeeSign, FaList } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const EcommerceSellerDetail = () => {
  const [forSettlement, setForSettlement] = useState(false);
  const [forSettingKot, setForSettingKot] = useState(false);
  const [forKot, setForKot] = useState(false);
  const [clickedWaiter, setClickedWaiter] = useState(null);
  const [clickedValue, setClickedValue] = useState(null);

  //this is for guest page open

  // Function to handle button click
  const handleClick = (value) => {
    setClickedValue(value);
  };

  // List of waiters
  const waiters = ["John", "Alice", "Bob", "Michael", "Sarah"];

  // Function to handle button click
  const handleClickforWaiter = (waiterName) => {
    setClickedWaiter(waiterName);
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
          />

          <Row>
            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0   p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#45A14E" }}
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
                        }}
                      >
                        {clickedWaiter}
                      </p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
                      <h6>{clickedValue}</h6>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-around mt-0">
                  <Link
                    to="/for-kot"
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
                    }}
                  >
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
                    to="/for-invoice"
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Invoice
                    </span>
                  </Link>

                  <Link
                    onClick={() => setForSettlement(!forSettlement)}
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
                    }}
                  >
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
                      settlements
                    </span>
                  </Link>

                  <Link
                    onClick={() => setForSettingKot(!forSettingKot)}
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
                    }}
                  >
                    <FaList />
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

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0   p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#FD5432" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#FE9900" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: " #7487DE" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
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
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: " #7487DE" }}
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
                        }}
                      >
                        i am for waiter name and i am checkin for next line
                      </p>
                      <h6>23456.00</h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
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
                    }}
                  >
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
                    }}
                  >
                    <FaList />
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
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0   p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#45A14E" }}
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
                        }}
                      >
                        {clickedWaiter}
                      </p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
                      <h6>{clickedValue}</h6>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-around mt-0">
                  <Link
                    onClick={() => setForKot(!forKot)}
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
                    }}
                  >
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
                    to="/for-invoice"
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Invoice
                    </span>
                  </Link>

                  <Link
                    onClick={() => setForSettlement(!forSettlement)}
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
                    }}
                  >
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
                      settlements
                    </span>
                  </Link>

                  <Link
                    onClick={() => setForSettingKot(!forSettingKot)}
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
                    }}
                  >
                    <FaList />
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

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0   p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#FD5432" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0   p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#45A14E" }}
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
                        }}
                      >
                        {clickedWaiter}
                      </p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
                      <h6>{clickedValue}</h6>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-around mt-0">
                  <Link
                    onClick={() => setForKot(!forKot)}
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
                    }}
                  >
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
                    to="/for-invoice"
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Invoice
                    </span>
                  </Link>

                  <Link
                    onClick={() => setForSettlement(!forSettlement)}
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
                    }}
                  >
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
                      settlements
                    </span>
                  </Link>

                  <Link
                    onClick={() => setForSettingKot(!forSettingKot)}
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
                    }}
                  >
                    <FaList />
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

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0   p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#FD5432" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#FE9900" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: " #7487DE" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
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
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: " #7487DE" }}
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
                        }}
                      >
                        i am for waiter name and i am checkin for next line
                      </p>
                      <h6>23456.00</h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
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
                    }}
                  >
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
                    }}
                  >
                    <FaList />
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
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0   p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#45A14E" }}
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
                        }}
                      >
                        {clickedWaiter}
                      </p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
                      <h6>{clickedValue}</h6>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-around mt-0">
                  <Link
                    onClick={() => setForKot(!forKot)}
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
                    }}
                  >
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
                    to="/for-invoice"
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Invoice
                    </span>
                  </Link>

                  <Link
                    onClick={() => setForSettlement(!forSettlement)}
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
                    }}
                  >
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
                      settlements
                    </span>
                  </Link>

                  <Link
                    onClick={() => setForSettingKot(!forSettingKot)}
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
                    }}
                  >
                    <FaList />
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

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0   p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#FD5432" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#FE9900" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: " #7487DE" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
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
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: " #7487DE" }}
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
                        }}
                      >
                        i am for waiter name and i am checkin for next line
                      </p>
                      <h6>23456.00</h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
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
                    }}
                  >
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
                    }}
                  >
                    <FaList />
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
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0   p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#45A14E" }}
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
                        }}
                      >
                        {clickedWaiter}
                      </p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
                      <h6>{clickedValue}</h6>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-around mt-0">
                  <Link
                    onClick={() => setForKot(!forKot)}
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
                    }}
                  >
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
                    to="/for-invoice"
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Invoice
                    </span>
                  </Link>

                  <Link
                    onClick={() => setForSettlement(!forSettlement)}
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
                    }}
                  >
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
                      settlements
                    </span>
                  </Link>

                  <Link
                    onClick={() => setForSettingKot(!forSettingKot)}
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
                    }}
                  >
                    <FaList />
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

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0   p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#FD5432" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#FE9900" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: " #7487DE" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
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
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: " #7487DE" }}
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
                        }}
                      >
                        i am for waiter name and i am checkin for next line
                      </p>
                      <h6>23456.00</h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
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
                    }}
                  >
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
                    }}
                  >
                    <FaList />
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
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0   p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#45A14E" }}
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
                        }}
                      >
                        {clickedWaiter}
                      </p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
                      <h6>{clickedValue}</h6>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-around mt-0">
                  <Link
                    onClick={() => setForKot(!forKot)}
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
                    }}
                  >
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
                    to="/for-invoice"
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Invoice
                    </span>
                  </Link>

                  <Link
                    onClick={() => setForSettlement(!forSettlement)}
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
                    }}
                  >
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
                      settlements
                    </span>
                  </Link>

                  <Link
                    onClick={() => setForSettingKot(!forSettingKot)}
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
                    }}
                  >
                    <FaList />
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

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0   p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#FD5432" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: "#FE9900" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: " #7487DE" }}
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
                        }}
                      ></p>
                      <h6 className="m-0 px-1"></h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaFileAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaRupeeSign />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
                    <FaList />
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
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={6} md={4} lg={3} xl={2} className="mb-2 mx-0  p-1">
              <div
                className="d-flex flex-column"
                style={{ backgroundColor: " #7487DE" }}
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
                        }}
                      >
                        i am for waiter name and i am checkin for next line
                      </p>
                      <h6>23456.00</h6>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                      className="w-25 d-flex align-items-center justify-content-center"
                    >
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
                    }}
                  >
                    <FaTicketAlt />
                    <span
                      className="hover-text position-absolute start-50 translate-middle-x bg-white text-dark p-1 d-none"
                      style={{
                        bottom: "-40px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        zIndex: 1000, // Ensures this element shows on top
                      }}
                    >
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
                    }}
                  >
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
                    }}
                  >
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
                    }}
                  >
                    <FaList />
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
                  </div>
                </div>
              </div>
            </Col>
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
                    className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                    style={{ height: "100px", backgroundColor: "#1F9642" }}
                  >
                    Cash
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                    style={{ height: "100px", backgroundColor: "#FFBD00" }}
                  >
                    Cash
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                    style={{ height: "100px", backgroundColor: "#0A97BB" }}
                  >
                    Cash
                  </div>
                </div>
                <div
                  className="d-flex align-items-center justify-content-between "
                  style={{ padding: "2px 5px", gap: "5px" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                    style={{ height: "100px", backgroundColor: "#0172F0" }}
                  >
                    Cash
                  </div>
                  <div
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
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  className=" p-1  d-flex justify-content-between align-items-center  mb-2"
                  style={{ fontSize: "14px", backgroundColor: "#E3614D" }}
                >
                  <p className="p-0 m-0 text-white">KOT Details Table no 8</p>
                  <p
                    className="m-0 p-2 color-dark cursor-pointer"
                    onClick={() => setForSettingKot(false)}
                  >
                    x
                  </p>
                </div>

                <div
                  className="px-2"
                  style={{
                    maxHeight: "70vh",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    overflowY: "scroll",
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
                        KOT/7 - 04/12/2024 12:30:32
                      </div>
                      <div
                        className="d-flex align-items-center justify-content-center   "
                        style={{ gap: "5px" }}
                      >
                        <p
                          className="cursor-pointer"
                          style={{
                            backgroundColor: "#0074FF",
                            color: "white",
                            padding: "3px 5px",
                            margin: 0,
                          }}
                        >
                          <FiEdit className="pe-1" /> Void items
                        </p>
                        <p
                          className="cursor-pointer"
                          style={{
                            backgroundColor: "#FDBE05",
                            color: "black",
                            padding: "3px 5px",
                            margin: 0,
                          }}
                        >
                          <FiEdit /> Transfar
                        </p>
                      </div>
                    </div>
                    <div
                      className="table-responsive "
                      style={{
                        maxHeight: "35vh",
                        overflowY: "scroll",
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
                        <tbody style={{ fontSize: "12px" }}>
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="  d-flex align-items-center justify-content-between p-1 "
                      style={{ backgroundColor: "#E6E6E6", fontSize: "12px" }}
                    >
                      <p className="p-0 m-0">Total Items </p>
                      <p className="p-0 m-0">03</p>
                    </div>
                  </div>
                  <div className="p-1">
                    <div
                      className="d-flex justify-content-between align-items-center px-2"
                      style={{
                        fontSize: "14px",
                        backgroundColor: "#F3F3F3",
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        KOT/7 - 04/12/2024 12:30:32
                      </div>
                      <div
                        className="d-flex align-items-center justify-content-center   "
                        style={{ gap: "5px" }}
                      >
                        <p
                          className="cursor-pointer"
                          style={{
                            backgroundColor: "#0074FF",
                            color: "white",
                            padding: "3px 5px",
                            margin: 0,
                          }}
                        >
                          <FiEdit className="pe-1" /> Void items
                        </p>
                        <p
                          className="cursor-pointer"
                          style={{
                            backgroundColor: "#FDBE05",
                            color: "black",
                            padding: "3px 5px",
                            margin: 0,
                          }}
                        >
                          <FiEdit /> Transfar
                        </p>
                      </div>
                    </div>
                    <div
                      className="table-responsive "
                      style={{
                        maxHeight: "35vh",
                        overflowY: "scroll",
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
                        <tbody style={{ fontSize: "12px" }}>
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="  d-flex align-items-center justify-content-between p-1 "
                      style={{ backgroundColor: "#E6E6E6", fontSize: "12px" }}
                    >
                      <p className="p-0 m-0">Total Items </p>
                      <p className="p-0 m-0">03</p>
                    </div>
                  </div>{" "}
                  <div className="p-1">
                    <div
                      className="d-flex justify-content-between align-items-center px-2"
                      style={{
                        fontSize: "14px",
                        backgroundColor: "#F3F3F3",
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        KOT/7 - 04/12/2024 12:30:32
                      </div>
                      <div
                        className="d-flex align-items-center justify-content-center   "
                        style={{ gap: "5px" }}
                      >
                        <p
                          className="cursor-pointer"
                          style={{
                            backgroundColor: "#0074FF",
                            color: "white",
                            padding: "3px 5px",
                            margin: 0,
                          }}
                        >
                          <FiEdit className="pe-1" /> Void items
                        </p>
                        <p
                          className="cursor-pointer"
                          style={{
                            backgroundColor: "#FDBE05",
                            color: "black",
                            padding: "3px 5px",
                            margin: 0,
                          }}
                        >
                          <FiEdit /> Transfar
                        </p>
                      </div>
                    </div>
                    <div
                      className="table-responsive "
                      style={{
                        maxHeight: "35vh",
                        overflowY: "scroll",
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
                        <tbody style={{ fontSize: "12px" }}>
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>{" "}
                          <tr>
                            <td>12</td>
                            <td>pizza paratha taste</td>
                            <td>125.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="  d-flex align-items-center justify-content-between p-1 "
                      style={{ backgroundColor: "#E6E6E6", fontSize: "12px" }}
                    >
                      <p className="p-0 m-0">Total Items </p>
                      <p className="p-0 m-0">03</p>
                    </div>
                  </div>
                </div>
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
                  <p className="p-0 m-0 text-white">Select PAX and CAPTAIN</p>
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
                  <div className="my-2">
                    <p className="m-0 p-1">Select CAPTAIN</p>
                    <div className="d-flex flex-wrap">
                      {" "}
                      {waiters.map((waiter, index) => (
                        <div key={index} className="col-md-3 mx-1">
                          <button
                            style={{ backgroundColor: "#FFBD00" }}
                            className="text-dark w-100 m-1 rounded-0 py-3  border-0"
                            onClick={() => handleClickforWaiter(waiter)}
                          >
                            {waiter}
                          </button>
                        </div>
                      ))}
                    </div>
                    {clickedWaiter && (
                      <p className="mt-3">You clicked on: {clickedWaiter}</p>
                    )}
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

export default EcommerceSellerDetail;
