import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
const ICOList = () => {
  const { counterId } = useParams();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={4} md={6}>
              <div
                className="d-flex align-items-center justify-content-center flex-column text-center my-2 px-5"
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "10px",
                }}>
                <h2>All User of This Counter </h2>
                <div
                  className="d-flex align-items-center justify-content-center my-2 p-2"
                  style={{ gap: "10px" }}>
                  <Link
                    to={`/counter/${counterId}/allUsers`}
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
            <Col lg={4} md={6}>
              <div
                className="d-flex align-items-center justify-content-center flex-column text-center my-2"
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "10px",
                }}>
                <h2>All Areas of This Counter </h2>
                <div
                  className="d-flex align-items-center justify-content-center my-2 p-2"
                  style={{ gap: "10px" }}>
                  <Link
                    to={`/counter/${counterId}/counterareas`}
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
    </React.Fragment>
  );
};

export default ICOList;
