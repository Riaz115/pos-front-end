import React from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Table,
  Form,
  Input,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";

const DashboardNFT = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h1>Credit Book</h1>

          <div className=" py-2 px-1 mt-1">
            <Form>
              <Row>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name"
                  />

                  {/* Search button */}
                  <Button
                    className="add-btn primary text-white px-3 py-2 border-none"
                    id="create-btn">
                    <i className="ri-search-line align-bottom me-1"></i>Search
                  </Button>
                </div>
              </Row>
            </Form>
          </div>

          <hr />

          {/* Table Section */}
          <div className="table-responsive mt-4">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Guest name</th>
                  <th>Mobile number</th>
                  <th>Total Credit</th>
                  <th>Total Paid</th>
                  <th>Total Received</th>
                  <th> Balance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ali raza shb</td>
                  <td>03245356899</td>
                  <td>2134.00</td>
                  <td>7689.00</td>
                  <td>43256.00</td>
                  <td>5433.00</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}>
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}>
                        <i className="ri-delete-bin-5-fill align-bottom" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>ali raza shb</td>
                  <td>03245356899</td>
                  <td>2134.00</td>
                  <td>7689.00</td>
                  <td>43256.00</td>
                  <td>5433.00</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}>
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}>
                        <i className="ri-delete-bin-5-fill align-bottom" />
                      </button>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td>ali raza shb</td>
                  <td>03245356899</td>
                  <td>2134.00</td>
                  <td>7689.00</td>
                  <td>43256.00</td>
                  <td>5433.00</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}>
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}>
                        <i className="ri-delete-bin-5-fill align-bottom" />
                      </button>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td>ali raza shb</td>
                  <td>03245356899</td>
                  <td>2134.00</td>
                  <td>7689.00</td>
                  <td>43256.00</td>
                  <td>5433.00</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}>
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}>
                        <i className="ri-delete-bin-5-fill align-bottom" />
                      </button>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td>ali raza shb</td>
                  <td>03245356899</td>
                  <td>2134.00</td>
                  <td>7689.00</td>
                  <td>43256.00</td>
                  <td>5433.00</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}>
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}>
                        <i className="ri-delete-bin-5-fill align-bottom" />
                      </button>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td>ali raza shb</td>
                  <td>03245356899</td>
                  <td>2134.00</td>
                  <td>7689.00</td>
                  <td>43256.00</td>
                  <td>5433.00</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}>
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}>
                        <i className="ri-delete-bin-5-fill align-bottom" />
                      </button>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td>ali raza shb</td>
                  <td>03245356899</td>
                  <td>2134.00</td>
                  <td>7689.00</td>
                  <td>43256.00</td>
                  <td>5433.00</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}>
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}>
                        <i className="ri-delete-bin-5-fill align-bottom" />
                      </button>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td>ali raza shb</td>
                  <td>03245356899</td>
                  <td>2134.00</td>
                  <td>7689.00</td>
                  <td>43256.00</td>
                  <td>5433.00</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}>
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}>
                        <i className="ri-delete-bin-5-fill align-bottom" />
                      </button>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td>ali raza shb</td>
                  <td>03245356899</td>
                  <td>2134.00</td>
                  <td>7689.00</td>
                  <td>43256.00</td>
                  <td>5433.00</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}>
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}>
                        <i className="ri-delete-bin-5-fill align-bottom" />
                      </button>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td>ali raza shb</td>
                  <td>03245356899</td>
                  <td>2134.00</td>
                  <td>7689.00</td>
                  <td>43256.00</td>
                  <td>5433.00</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}>
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}>
                        <i className="ri-delete-bin-5-fill align-bottom" />
                      </button>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td>ali raza shb</td>
                  <td>03245356899</td>
                  <td>2134.00</td>
                  <td>7689.00</td>
                  <td>43256.00</td>
                  <td>5433.00</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}>
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}>
                        <i className="ri-delete-bin-5-fill align-bottom" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardNFT;
