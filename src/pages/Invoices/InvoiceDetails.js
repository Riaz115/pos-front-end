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
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

const InvoiceDetails = () => {
  document.title =
    "Invoice Details | Velzon - React Admin & Dashboard Template";
  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="page-content">
      <Container fluid>
        <h1>i am for the pay use age </h1>
      </Container>
    </div>
  );
};

export default InvoiceDetails;
