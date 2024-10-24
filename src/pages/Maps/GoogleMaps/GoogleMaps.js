import React from "react";
import { Container, Table } from "reactstrap";
import { Link } from "react-router-dom";

const GoogleMaps = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className=" py-2 px-1 mt-1">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="bg-light-dark ">Cash Book</h5>
              <button
                type="button"
                className="btn btn-primary btn-outline-on-hover">
                <i className="ri-add-circle-line align-middle me-1"></i> Add
                transition
              </button>
            </div>
          </div>

          <hr />

          {/* Table Section */}
          <div className="table-responsive mt-4">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>vocture#</th>
                  <th>Date</th>
                  <th>Account head</th>
                  <th>Account name</th>
                  <th>Created by</th>
                  <th>Payment Mode</th>
                  <th>Amount paid</th>
                  <th>Amount received</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>cashier</td>
                  <td>cash</td>
                  <td>12575.00</td>
                  <td>234567.00</td>
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
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>cashier</td>
                  <td>cash</td>
                  <td>12575.00</td>
                  <td>234567.00</td>
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
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>cashier</td>
                  <td>cash</td>
                  <td>12575.00</td>
                  <td>234567.00</td>
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
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>cashier</td>
                  <td>cash</td>
                  <td>12575.00</td>
                  <td>234567.00</td>
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
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>cashier</td>
                  <td>cash</td>
                  <td>12575.00</td>
                  <td>234567.00</td>
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
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>cashier</td>
                  <td>cash</td>
                  <td>12575.00</td>
                  <td>234567.00</td>
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
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>cashier</td>
                  <td>cash</td>
                  <td>12575.00</td>
                  <td>234567.00</td>
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
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>cashier</td>
                  <td>cash</td>
                  <td>12575.00</td>
                  <td>234567.00</td>
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
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>cashier</td>
                  <td>cash</td>
                  <td>12575.00</td>
                  <td>234567.00</td>
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
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>cashier</td>
                  <td>cash</td>
                  <td>12575.00</td>
                  <td>234567.00</td>
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
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>cashier</td>
                  <td>cash</td>
                  <td>12575.00</td>
                  <td>234567.00</td>
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
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>cashier</td>
                  <td>cash</td>
                  <td>12575.00</td>
                  <td>234567.00</td>
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
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>cashier</td>
                  <td>cash</td>
                  <td>12575.00</td>
                  <td>234567.00</td>
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
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>cashier</td>
                  <td>cash</td>
                  <td>12575.00</td>
                  <td>234567.00</td>
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

export default GoogleMaps;
