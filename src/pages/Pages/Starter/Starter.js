import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Starter = () => {
  document.title = "Starter | Velzon - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="p-0 m-0">
          <Row>
            <Col xs={12}>h1 i am riaz</Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Starter;
