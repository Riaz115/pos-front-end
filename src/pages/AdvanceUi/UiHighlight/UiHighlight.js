import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const UiHighlight = () => {
  const [forBill, setForBill] = useState(false);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div
            className="d-flex align-items-center justify-content-center position-fixed"
            style={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 5000,
            }}>
            <div
              className="d-flex  flex-column bg-white pb-4"
              style={{
                borderRadius: "5px",
                width: "450px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}>
              <h5 className="py-3 px-1 bg-danger text-white">Payment Mode</h5>
              <div
                className="d-flex align-items-center justify-content-between "
                style={{ padding: "2px 5px", gap: "5px" }}>
                <div
                  className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                  style={{ height: "100px", backgroundColor: "#1F9642" }}>
                  Cash
                </div>
                <div
                  className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                  style={{ height: "100px", backgroundColor: "#FFBD00" }}>
                  Cash
                </div>
                <div
                  className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                  style={{ height: "100px", backgroundColor: "#0A97BB" }}>
                  Cash
                </div>
              </div>
              <div
                className="d-flex align-items-center justify-content-between "
                style={{ padding: "2px 5px", gap: "5px" }}>
                <div
                  className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                  style={{ height: "100px", backgroundColor: "#0172F0" }}>
                  Cash
                </div>
                <div
                  className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                  style={{ height: "100px", backgroundColor: "#030507" }}>
                  Multi Payment
                </div>
                <div
                  className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                  style={{ height: "100px", backgroundColor: "#DB433F" }}>
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UiHighlight;
