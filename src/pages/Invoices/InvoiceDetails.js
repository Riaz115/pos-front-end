import React from "react";
import {
  CardBody,
  Row,
  Col,
  Card,
  Table,
  CardHeader,
  Container,
} from "reactstrap";

const InvoiceDetails = () => {
  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="page-content">
      <Container fluid>
        <div>
          <h5>Add Transition</h5>
        </div>
        <div></div>
      </Container>
    </div>
  );
};

export default InvoiceDetails;
