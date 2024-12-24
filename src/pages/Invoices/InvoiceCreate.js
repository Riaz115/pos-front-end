import React, { useEffect, useState } from "react";

import {
  Row,
  Col,
  Container,
  Label,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { UseRiazHook } from "../../RiazStore/RiazStore";
import { toast } from "react-toastify";
import Loader from "../../Components/Common/Loader";
import DeleteModal from "../../Components/Common/DeleteModal";
import BasicSuccessMsg from "../AuthenticationInner/SuccessMessage/BasicSuccessMsg";

const InvoiceCreate = () => {
  const [AccountHead, setAccountHead] = useState("");
  const [showAccountAddModal, setShowAccountAddModal] = useState(false);
  const [showEditAccountModal, setShowEditAccountModal] = useState(false);
  const [headId, setHeadId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [forDeletHeadId, setForDeleteHeadId] = useState("");

  //this is for getting id from the url
  const { id } = useParams();

  //this is for getting data from my custome hook
  const {
    myUrl,
    token,
    restData,
    ForGettingAllHeadAccounts,
    allHeadAccounts,
    loading,
  } = UseRiazHook();

  //this is for toggle modal for add acunt
  const forAddAcountModal = () => {
    setShowAccountAddModal(!showAccountAddModal);
  };

  //this is for edit head modal
  const forEditHeadModal = () => {
    setShowEditAccountModal(!showEditAccountModal);
  };

  //this is for controll rendering of getting all heads funciton
  useEffect(() => {
    ForGettingAllHeadAccounts();
  }, []);

  //this is for add the head to the backend
  const forAddHeadAccount = async (e) => {
    e.preventDefault();
    if (!AccountHead) {
      toast.error("please enter head name");
      return;
    }

    const headData = {
      AccountHead,
    };
    const url = `${myUrl}/restaurent/${id}/add/account/cashbook/head`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(headData),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setShowAccountAddModal(false);
        ForGettingAllHeadAccounts();
        toast.success(data.msg);
        setSuccessModal(true);
      } else {
        console.log("err data", data);
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("there is error in the add account head function", err);
    }
  };

  //this is for add the head to the backend
  const forEditHeadAccount = async (e) => {
    e.preventDefault();
    if (!AccountHead) {
      toast.error("please enter head name");
      return;
    }

    const headData = {
      AccountHead,
    };
    const url = `${myUrl}/restaurent/${headId}/edit/account/head/cashbook`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(headData),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setShowEditAccountModal(false);
        ForGettingAllHeadAccounts();
        setSuccessModal(true);
      } else {
        console.log("err data", data);
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("there is error in the add account head function", err);
    }
  };

  //this is for getting data for edit account head
  const forGetDataForEditHead = async (headid) => {
    setHeadId(headid);
    const url = `${myUrl}/restaurent/${headid}/get/data/account/head/edit`;
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
        setAccountHead(data.AccountHead);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the getting data for edit funciton of the head",
        err
      );
    }
  };

  //this is for click on the delete button
  const forClickOnDeleteButton = (id) => {
    setForDeleteHeadId(id);
    setDeleteModal(true);
  };

  //this is for deleting head account
  const forDeleteHeadAccount = async () => {
    const url = `${myUrl}/restaurent/${forDeletHeadId}/delete/head/cashbook/account`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        ForGettingAllHeadAccounts();
        setDeleteModal(false);
        setSuccessModal(true);
      } else {
        console.log("err data", data);
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("there is error in the delete head function", err);
    }
  };

  //this is for the date and time formate
  const formatDateTime = (date, format, timezone) => {
    const d = new Date(date);

    // Convert the date to the selected timezone
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: timezone, // Use the selected timezone here
    };

    // Get the formatted date and time in the selected timezone
    const dateFormatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = dateFormatter.format(d);

    // Extract individual parts of the date and time
    const parts = formattedDate.split(", ");
    const datePart = parts[0]; // "12/11/2024"
    const timePart = parts[1]; // "10:21:59 AM"

    // Format the date based on the provided 'format' argument
    let finalFormattedDate;
    const [day, month, year] = datePart.split("/");
    const [hour, minute, second] = timePart.split(":");

    switch (format) {
      case "D/M/Y":
        finalFormattedDate = `${day}/${month}/${year}`;
        break;
      case "M/Y/D":
        finalFormattedDate = `${month}/${year}/${day}`;
        break;
      case "Y/M/D":
        finalFormattedDate = `${year}/${month}/${day}`;
        break;
      case "Y-M-D":
        finalFormattedDate = `${year}-${month}-${day}`;
        break;
      case "M-D-Y":
        finalFormattedDate = `${month}-${day}-${year}`;
        break;
      default:
        finalFormattedDate = datePart;
    }

    return `${finalFormattedDate} ${hour}:${minute} ${timePart.split(" ")[1]}`;
  };

  const handleEdit = (itemId) => {
    navigate(`${itemId}`, {
      state: { from: window.location.pathname }, // Set current page URL in state
    });
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={forDeleteHeadAccount}
        onCloseClick={() => setDeleteModal(false)}
      />

      <BasicSuccessMsg
        show={successModal}
        onCloseClick={() => setSuccessModal(false)}
      />
      <div className="page-content">
        <Col sm={12}>
          <div className="d-flex align-items-center justify-content-between mt-0 ">
            <div>
              <h5>All Head Account </h5>
            </div>

            <div>
              <button
                onClick={() => setShowAccountAddModal(true)}
                style={{
                  backgroundColor: "#0000FF",
                  color: "white",
                  textDecoration: "none",
                  textAlign: "center",
                  border: "none",
                  fontSize: "14px",
                }}
                className="px-3 mx-1 py-1"
              >
                <i className="ri-add-circle-line align-middle me-1"></i> Add
                Account Head
              </button>
            </div>
          </div>
        </Col>
        <hr></hr>
        <Container fluid>
          <div className="my-2">
            <Row>
              <Col xl={12}>
                <div className="table-responsive">
                  <Table className="table-dark table-striped table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th className="text-center" scope="col">
                          ID
                        </th>
                        <th className="text-center" scope="col">
                          Date
                        </th>
                        <th className="text-center" scope="col">
                          Name
                        </th>

                        <th className="text-center" scope="col">
                          Update
                        </th>
                        <th className="text-center" scope="col">
                          Delete
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading ? (
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ position: "fixed", left: "50%", top: "50%" }}
                        >
                          <Loader />{" "}
                        </div>
                      ) : (
                        allHeadAccounts.map((item, index) => (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">
                              {formatDateTime(
                                item?.createdAt,
                                restData?.dateFormate,
                                restData?.selectedTimezone
                              )}
                            </td>
                            <td className="text-center">{item.AccountHead}</td>

                            <td className="text-center">
                              <button
                                onClick={() => {
                                  forGetDataForEditHead(item._id);
                                  setShowEditAccountModal(true);
                                }}
                                className="my-custome-button-edit"
                                style={{
                                  padding: "4px 8px",
                                }}
                              >
                                <i className="ri-pencil-fill align-bottom" />
                              </button>
                            </td>
                            <td className="text-center">
                              <button
                                onClick={() => forClickOnDeleteButton(item._id)}
                                className="my-custome-button-delete"
                                style={{
                                  padding: "4px 8px",
                                }}
                              >
                                <i className="ri-delete-bin-5-fill align-bottom" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        </Container>

        {/* this is for add head account */}
        <Modal isOpen={showAccountAddModal} toggle={forAddAcountModal} centered>
          <ModalHeader
            className="bg-light p-3"
            id="exampleModalLabel"
            toggle={forAddAcountModal}
          >
            Add Head Account
          </ModalHeader>
          <form className="tablelist-form">
            <ModalBody>
              <div className="mb-3">
                <label htmlFor="customername-field" className="form-label">
                  Enter Head
                </label>
                <input
                  type="text"
                  id="customername-field"
                  className="form-control"
                  placeholder="Enter Catagory "
                  required
                  onChange={(e) => setAccountHead(e.target.value)}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setShowAccountAddModal(false)}
                >
                  Close
                </button>
                <button
                  onClick={(e) => {
                    forAddHeadAccount(e);
                  }}
                  className="btn btn-primary px-2"
                  id="add-btn"
                >
                  Add Head
                </button>
              </div>
            </ModalFooter>
          </form>
        </Modal>

        {/* this is for edit head account */}
        <Modal isOpen={showEditAccountModal} toggle={forEditHeadModal} centered>
          <ModalHeader
            className="bg-light p-3"
            id="exampleModalLabel"
            toggle={forEditHeadModal}
          >
            Add Head Account
          </ModalHeader>
          <form className="tablelist-form">
            <ModalBody>
              <div className="mb-3">
                <label htmlFor="customername-field" className="form-label">
                  Enter Head
                </label>
                <input
                  type="text"
                  id="customername-field"
                  className="form-control"
                  placeholder="Enter Catagory "
                  value={AccountHead}
                  required
                  onChange={(e) => setAccountHead(e.target.value)}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setShowEditAccountModal(false)}
                >
                  Close
                </button>
                <button
                  onClick={(e) => {
                    forEditHeadAccount(e);
                  }}
                  className="btn btn-primary px-2"
                  id="add-btn"
                >
                  Add Head
                </button>
              </div>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default InvoiceCreate;
