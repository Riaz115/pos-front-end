import React from "react";
import { Container, Col, Button, Row, Input, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { UseRiazHook } from "../../../RiazStore/RiazStore";

const Transactions = () => {
  //this is for add guest
  const { guestSearchChangeState } = UseRiazHook();

  return (
    <React.Fragment>
      <div
        className="page-content"
        style={{ overflow: "hidden", height: "100vh" }}>
        <Container fluid>
          <Row className="p-0">
            <Col lg={6}>
              <div
                className="d-flex align-items-center justify-content-between p-2"
                style={{
                  fontSize: "12px",
                  padding: "2px",
                  backgroundColor: "#e2dad9",
                }}>
                <p className="m-0 p-0 ">
                  {" "}
                  table no{" "}
                  <span
                    className="fw-bold"
                    style={{
                      fontSize: "12px",
                    }}>
                    8
                  </span>
                </p>
                <p className="m-0 p-0 ">
                  captain
                  <span
                    className="fw-bold"
                    style={{
                      fontSize: "12px",
                    }}>
                    riaz shb
                  </span>
                </p>

                <p className="m-0 p-0 ">
                  No of Person{" "}
                  <span
                    className="fw-bold"
                    style={{
                      fontSize: "12px",
                    }}>
                    12
                  </span>
                </p>

                <p className="m-0 p-0 ">
                  Date
                  <span
                    className="fw-bold"
                    style={{
                      fontSize: "12px",
                    }}>
                    12/13/2323
                  </span>
                </p>
              </div>

              <div
                className="mt-2 table-responsive z-3"
                style={{
                  maxHeight: "35vh",
                  overflowY: "scroll",
                  gap: "1px",
                }}>
                <table class="table  table-hover table-light  ">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold">
                        Item Name
                      </th>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold">
                        Quantity
                      </th>

                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold">
                        Rate
                      </th>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold">
                        Disc
                      </th>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "12px" }}>
                    <tr>
                      <td>pizza paratha taste</td>
                      <td>12</td>
                      <td>125.00</td>
                      <td>12.00</td>
                      <td>124356.00</td>
                    </tr>

                    <tr>
                      <td>pizza paratha taste</td>
                      <td>12</td>
                      <td>125.00</td>
                      <td>12.00</td>
                      <td>124356.00</td>
                    </tr>

                    <tr>
                      <td>pizza paratha taste</td>
                      <td>12</td>
                      <td>125.00</td>
                      <td>12.00</td>
                      <td>124356.00</td>
                    </tr>

                    <tr>
                      <td>pizza paratha taste</td>
                      <td>12</td>
                      <td>125.00</td>
                      <td>12.00</td>
                      <td>124356.00</td>
                    </tr>

                    <tr>
                      <td>pizza paratha taste</td>
                      <td>12</td>
                      <td>125.00</td>
                      <td>12.00</td>
                      <td>124356.00</td>
                    </tr>

                    <tr>
                      <td>pizza paratha taste</td>
                      <td>12</td>
                      <td>125.00</td>
                      <td>12.00</td>
                      <td>124356.00</td>
                    </tr>

                    <tr>
                      <td>pizza paratha taste</td>
                      <td>12</td>
                      <td>125.00</td>
                      <td>12.00</td>
                      <td>124356.00</td>
                    </tr>

                    <tr>
                      <td>pizza paratha taste</td>
                      <td>12</td>
                      <td>125.00</td>
                      <td>12.00</td>
                      <td>124356.00</td>
                    </tr>

                    <tr>
                      <td>pizza paratha taste</td>
                      <td>12</td>
                      <td>125.00</td>
                      <td>12.00</td>
                      <td>124356.00</td>
                    </tr>

                    <tr>
                      <td>pizza paratha taste</td>
                      <td>12</td>
                      <td>125.00</td>
                      <td>12.00</td>
                      <td>124356.00</td>
                    </tr>

                    <tr>
                      <td>pizza paratha taste</td>
                      <td>12</td>
                      <td>125.00</td>
                      <td>12.00</td>
                      <td>124356.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="mt-1  d-flex align-items-center justify-content-between p-1 "
                style={{ backgroundColor: "#E6E6E6", fontSize: "12px" }}>
                <h6 className="p-0 m-0">Total Items </h6>
                <h6 className="p-0 m-0">03</h6>
              </div>
              <div
                className="mt-1 table-responsive "
                style={{
                  maxHeight: "25vh",
                  overflowY: "scroll",
                  gap: "1px",
                }}>
                <table class="table  table-hover table-light  ">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold">
                        Food
                      </th>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold">
                        15867.00
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "12px" }}>
                    <tr>
                      <td>sr.Charges on FOOD @2.00%</td>
                      <td>12.63</td>
                    </tr>

                    <tr>
                      <td>Sub Total</td>
                      <td>1265.56</td>
                    </tr>

                    <tr>
                      <td>SGST ON FOOD @ 2.50%</td>
                      <td>123.90</td>
                    </tr>

                    <tr>
                      <td>cGST ON FOOD @ 2.50%</td>
                      <td>123.90</td>
                    </tr>

                    <tr className="fw-bold">
                      <td>Grand Total</td>
                      <td>1245.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
            <Col lg={6}>
              <div className="d-flex aling-items-center justify-content-end ms-auto">
                <Link
                  to="/all-tables-etc"
                  style={{
                    backgroundColor: "#0054B1",
                    color: "white",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                  className="px-4 py-2">
                  Back To Table List
                </Link>
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
                    className="px-4 py-2">
                    Parcel
                  </Link>
                  <Link
                    style={{
                      backgroundColor: "#E84743",
                      color: "white",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    className="px-4 py-2">
                    NC
                  </Link>
                  <Link
                    style={{
                      backgroundColor: "#0054B1",
                      color: "white",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    className="px-4 py-2">
                    save
                  </Link>
                </div>
                <div className="d-flex " style={{ gap: "5px" }}>
                  <Link
                    style={{
                      backgroundColor: "#0054B1",
                      color: "white",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    className="px-4 py-2">
                    save
                  </Link>
                  <Link
                    style={{
                      backgroundColor: "#166930",
                      color: "white",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    className="px-4 py-2">
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
                    className="px-4 py-2">
                    Guest
                  </Link>
                  <Link
                    style={{
                      backgroundColor: "#A2302F",
                      color: "white",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    className="px-4 py-2">
                    Discount
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Transactions;
