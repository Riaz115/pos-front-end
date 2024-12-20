import React, { useEffect, useState } from "react";
import { Container, Table, Col } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import { FaExchangeAlt } from "react-icons/fa";
import { UseRiazHook } from "../../../RiazStore/RiazStore";

const GoogleMaps = () => {
  const [allExpenses, setAllExpenses] = useState([]);

  //this is for getting id from url
  const { id } = useParams();

  //this is for getting data from my custome hook
  const { myUrl, token, restData } = UseRiazHook();

  //this is for getting all expenses of the restaurent
  const forGettingAllExpensesOfRest = async () => {
    const url = `${myUrl}/restaurent/${id}/get/all/expenes/cashbook`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        console.log("ok data", data);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get all expense of restaurent funciton",
        err
      );
    }
  };

  //this is for controll the rendering of the get all expenses function
  useEffect(() => {
    forGettingAllExpensesOfRest();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Col sm={12}>
          <div className="d-flex align-items-center justify-content-between mt-0 ">
            <div>
              <h5>Cash Book</h5>
            </div>

            <div>
              <Link
                to={`/add/restaurent/${id}/transition`}
                style={{
                  backgroundColor: "#0000FF",
                  color: "white",
                  textDecoration: "none",
                  textAlign: "center",

                  fontSize: "14px",
                }}
                className="px-3 mx-1 py-1"
              >
                <i className="ri-add-circle-line align-middle me-1"></i> Add
                Transition
              </Link>
              <Link
                style={{
                  backgroundColor: "#FE9900",
                  color: "black",
                  textDecoration: "none",
                  textAlign: "center",

                  fontSize: "14px",
                }}
                className="px-3 mx-1 py-1"
              >
                {" "}
                <FaExchangeAlt className="mx-1" />
                Export To Excel
              </Link>
            </div>
          </div>
        </Col>
        <hr></hr>
        <Container fluid>
          {/* Table Section */}
          <div className="table-responsive mt-4">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>vocture</th>
                  <th>Date</th>
                  <th>Acc head</th>
                  <th>Acc name</th>
                  <th>Narration</th>
                  <th>Created by</th>
                  <th>Payment Mode</th>
                  <th>Paid</th>
                  <th>Received</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>5</td>
                  <td>45/5/2023</td>
                  <td>customer</td>
                  <td>ali raza shb</td>
                  <td>i am for description part</td>
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
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}
                      >
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
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}
                      >
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
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}
                      >
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
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}
                      >
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
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}
                      >
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
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}
                      >
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
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}
                      >
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
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}
                      >
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
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}
                      >
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
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}
                      >
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
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}
                      >
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
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}
                      >
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
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}
                      >
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
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list delete-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#FEEDE9",
                          color: "red",
                        }}
                      >
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
