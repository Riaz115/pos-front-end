import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";

import { Link, useParams } from "react-router-dom";

const EcommerceOrderDetail = () => {
  const { id } = useParams();

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col md={6}>
            <div
              className="d-felx align-items-center justify-content-center flex-column text-center my-2"
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                padding: "10px",
              }}>
              <h2>All Catagoreis of the Restaurent</h2>
              <div
                className="d-flex align-items-center justify-content-center my-2 p-2"
                style={{ gap: "10px" }}>
                <Link
                  to={`/all-catagories/${id}`}
                  style={{
                    textDecoration: "none",
                    padding: "5px 30px",
                    borderRadius: "20px",
                    backgroundColor: "black",
                    color: "white",
                  }}>
                  Open
                </Link>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div
              className="d-felx align-items-center justify-content-center flex-column text-center my-2"
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                padding: "10px",
              }}>
              <h2>All Menu Items of Restaurent </h2>
              <div
                className="d-flex align-items-center justify-content-center my-2 p-2"
                style={{ gap: "10px" }}>
                <Link
                  to={`/items/${id}`}
                  style={{
                    textDecoration: "none",
                    padding: "5px 30px",
                    borderRadius: "20px",
                    backgroundColor: "black",
                    color: "white",
                  }}>
                  Open
                </Link>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div
              className="d-felx align-items-center justify-content-center flex-column text-center my-2"
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                padding: "10px",
              }}>
              <h2>All Deals and Combo Items of Restaurent </h2>
              <div
                className="d-flex align-items-center justify-content-center my-2 p-2"
                style={{ gap: "10px" }}>
                <Link
                  to={`/all-deals/${id}`}
                  style={{
                    textDecoration: "none",
                    padding: "5px 30px",
                    borderRadius: "20px",
                    backgroundColor: "black",
                    color: "white",
                  }}>
                  Open
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EcommerceOrderDetail;
