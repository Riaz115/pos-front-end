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
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const DashboardCrypto = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb settlementText="Manage SettleMents" />
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="bg-light-dark mt-2 mb-4">Settlements</h5>
              <div>
                <Button className="add-btn primary text-white px-2 me-1 py-2 border-none">
                  <i className="ri-search-line align-bottom me-1"></i>
                  search
                </Button>
                <Button className="add-btn btn-warning text-white px-2 py-2  border-none">
                  <i className="ri-download-line align-bottom me-1"></i>
                  Export to excel
                </Button>
              </div>
            </div>

            <Form>
              <Row>
                <Col md={3} xs={12} className="mb-3">
                  <Label for="kotNumber" style={{ fontWeight: "bold" }}>
                    invoice No
                  </Label>
                  <Input type="text" id="kotNumber" placeholder="Kot Number" />
                </Col>

                <Col md={3} xs={12} className="mb-3">
                  <Label for="kotDate" style={{ fontWeight: "bold" }}>
                    invoice Date
                  </Label>
                  <Flatpickr
                    className="form-control"
                    id="datepicker-publish-input"
                    placeholder="Select date or search"
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "d.m.y",
                    }}
                  />
                </Col>

                <Col md={3} xs={12} className="mb-3">
                  <Label for="kotType" style={{ fontWeight: "bold" }}>
                    Table No
                  </Label>
                  <Input
                    type="text"
                    id="kotType"
                    placeholder="Enter table no"
                  />
                </Col>

                <Col md={3} xs={12} className="mb-3">
                  <Label for="additionalInfo" style={{ fontWeight: "bold" }}>
                    payment mode
                  </Label>
                  <Input
                    type="text"
                    id="additionalInfo"
                    placeholder="select kot type"
                  />
                </Col>
              </Row>
            </Form>
          </div>

          <hr />

          {/* Table Section */}
          <div className="table-responsive mt-4">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>invoice</th>
                  <th>Date</th>
                  <th>table/parcel no</th>
                  <th>Waiter</th>
                  <th>Total items</th>
                  <th>Grand total</th>
                  <th>Payment Mode</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>5</td>
                  <td>45/5/2023/ 12:34pm</td>
                  <td>5</td>
                  <td>ali shan shb</td>
                  <td>5</td>
                  <td>3245</td>
                  <td>cash 1275.00rs</td>
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
                  <td>5</td>
                  <td>ali shan shb</td>
                  <td>5</td>
                  <td>3245</td>
                  <td>cash 1275.00rs</td>
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
                  <td>5</td>
                  <td>ali shan shb</td>
                  <td>5</td>
                  <td>3245</td>
                  <td>cash 1275.00rs</td>
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
                  <td>5</td>
                  <td>ali shan shb</td>
                  <td>5</td>
                  <td>3245</td>
                  <td>cash 1275.00rs</td>
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
                  <td>5</td>
                  <td>ali shan shb</td>
                  <td>5</td>
                  <td>3245</td>
                  <td>cash 1275.00rs</td>
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
                  <td>5</td>
                  <td>ali shan shb</td>
                  <td>5</td>
                  <td>3245</td>
                  <td>cash 1275.00rs</td>
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
                  <td>5</td>
                  <td>ali shan shb</td>
                  <td>5</td>
                  <td>3245</td>
                  <td>cash 1275.00rs</td>
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
                  <td>5</td>
                  <td>ali shan shb</td>
                  <td>5</td>
                  <td>3245</td>
                  <td>cash 1275.00rs</td>
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
                  <td>5</td>
                  <td>ali shan shb</td>
                  <td>5</td>
                  <td>3245</td>
                  <td>cash 1275.00rs</td>
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
                  <td>5</td>
                  <td>ali shan shb</td>
                  <td>5</td>
                  <td>3245</td>
                  <td>cash 1275.00rs</td>
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
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardCrypto;
