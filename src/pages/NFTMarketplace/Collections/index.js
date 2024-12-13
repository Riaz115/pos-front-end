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
import { toast } from "react-toastify";
import Loader from "../../../Components/Common/Loader";
import DeleteModal from "../../../Components/Common/DeleteModal";
import BasicSuccessMsg from "../../AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import { UseRiazHook } from "../../../RiazStore/RiazStore";

const Collections = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [AccountName, setAccountName] = useState("");
  const [AccountNameHead, setAccountNameHead] = useState("");
  const [errors, setErrors] = useState({});
  const [forOpenAddNameModal, setForOpenAddNameModal] = useState(false);
  const [forOpenEditNameModel, setForOpenEditNameModal] = useState(false);
  const [accNameId, setAccNameId] = useState("");
  const [forDeletNameId, setForDelteNameId] = useState("");

  //this is for getting id from url
  const { id } = useParams();

  //this is for getting data from my custome hook
  const {
    myUrl,
    restData,
    token,
    ForGettingAllHeadAccounts,
    allHeadAccounts,
    allAccNames,
    forGetAllAcountNames,
    loading,
  } = UseRiazHook();

  //this is for select account head
  const forSelectAccountHead = (selectedOptions) => {
    setAccountNameHead(selectedOptions);
  };

  //this is for the add name modal
  const forAddNameModal = () => {
    setForOpenAddNameModal(!forOpenAddNameModal);
  };

  //this is for edit name modal
  const forEditNameModal = () => {
    setForOpenEditNameModal(!forOpenEditNameModel);
  };

  //this is for catch error
  const forCatchErrors = () => {
    let isOk = true;
    let newErrors = {};
    if (!AccountNameHead.trim()) {
      isOk = false;
      newErrors.AccountNameHead = "Please Enter Account Name head";
      toast.error("please Enter Account Name head");
    } else if (!AccountName.trim()) {
      isOk = false;
      newErrors.AccountName = "Please Enter Account Name ";
      toast.error("please Enter Account Name ");
    }
    setErrors(newErrors);
    return isOk;
  };

  //this is for control rendering for getting all acc names
  useEffect(() => {
    ForGettingAllHeadAccounts();
    forGetAllAcountNames();
  }, []);

  //this is for getting data for edit the account name
  const forGettingDataforEditAccName = async (accnameid) => {
    setAccNameId(accnameid);
    const url = `${myUrl}/restaurent/${accnameid}/get/data/foredit/acc/name/cashbook`;
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
        setAccountName(data.AccountName);
        setAccountNameHead(data.AccountNameHead);
      } else {
        console.log("err data", data);
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(
        "there is error in the getting data account name for edit",
        err
      );
    }
  };

  //this is for edit the account name
  const forEditAccountName = async (e) => {
    e.preventDefault();
    if (forCatchErrors()) {
      const accNameData = {
        AccountName,
        AccountNameHead,
      };
      const url = `${myUrl}/restaurent/${accNameId}/for/edit/acc/name/cashbook`;
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(accNameData),
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          setForOpenEditNameModal(false);
          toast.success(data.msg);
          setSuccessModal(true);
          forGetAllAcountNames();
        } else {
          console.log("err data", data);
          toast.error(data.msg);
        }
      } catch (err) {
        console.log("there is error in the add account name funciton", err);
      }
    }
  };

  //this is for click on delete button
  const forClickOnDeleteButton = (id) => {
    setForDelteNameId(id);
    setDeleteModal(true);
  };

  //this is for delete the account name
  const forDeleteAccName = async () => {
    const url = `${myUrl}/restaurent/${forDeletNameId}/delete/account/name/cashbook`;
    console.log("my url", url);
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
        forGetAllAcountNames();
        setDeleteModal(false);
        setSuccessModal(true);
      } else {
        console.log("err data", data);
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("there is error in the delete name function", err);
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

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={forDeleteAccName}
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
              <h5>Cash Book All Account Name </h5>
            </div>

            <div>
              <button
                onClick={() => setForOpenAddNameModal(true)}
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
                Account Name
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
                          Head Name
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
                          <Loader />
                        </div>
                      ) : (
                        allAccNames.map((item, index) => (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">
                              {formatDateTime(
                                item?.createdAt,
                                restData?.dateFormate,
                                restData?.selectedTimezone
                              )}
                            </td>
                            <td className="text-center">{item.AccountName}</td>
                            <td className="text-center">
                              {item.AccountNameHead}
                            </td>
                            <td className="text-center">
                              <button
                                onClick={() => {
                                  forGettingDataforEditAccName(item._id);
                                  setForOpenEditNameModal(true);
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

        {/* this is for add the account name */}
        <Modal isOpen={forOpenAddNameModal} toggle={forAddNameModal} centered>
          <ModalHeader
            className="bg-light p-3"
            id="exampleModalLabel"
            toggle={forAddNameModal}
          >
            Add Account Name
          </ModalHeader>
          <form className="tablelist-form">
            <ModalBody>
              <div className="mb-3">
                <Label htmlFor="gender" className="form-label">
                  Select Head Account
                </Label>
                <Select
                  onChange={(selectedOption) =>
                    forSelectAccountHead(selectedOption.value)
                  }
                  placeholder="Select Account Head"
                  options={allHeadAccounts?.map((account) => ({
                    label: account.AccountHead,
                    value: account.AccountHead,
                  }))}
                  id="gender"
                />

                {errors.AccountNameHead && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      paddingLeft: "5px",
                    }}
                  >
                    {errors.AccountNameHead}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="customername-field" className="form-label">
                  Account Name
                </label>
                <input
                  type="text"
                  id="customername-field"
                  className="form-control"
                  placeholder="Enter Catagory "
                  required
                  onChange={(e) => setAccountName(e.target.value)}
                />
                {errors.AccountName && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      paddingLeft: "5px",
                    }}
                  >
                    {errors.AccountName}
                  </p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setForOpenAddNameModal(false)}
                >
                  Close
                </button>
                <button
                  onClick={(e) => forAddAccountName(e)}
                  className="btn btn-primary px-2"
                  id="add-btn"
                >
                  Add Name
                </button>
              </div>
            </ModalFooter>
          </form>
        </Modal>

        {/* this is for edit the account name */}
        <Modal isOpen={forOpenEditNameModel} toggle={forEditNameModal} centered>
          <ModalHeader
            className="bg-light p-3"
            id="exampleModalLabel"
            toggle={forEditNameModal}
          >
            Edit Account Name
          </ModalHeader>
          <form className="tablelist-form">
            <ModalBody>
              <div className="mb-3">
                <Label htmlFor="gender" className="form-label">
                  Select Head Account
                </Label>
                <Select
                  value={
                    AccountNameHead
                      ? { label: AccountNameHead, value: AccountNameHead }
                      : null
                  }
                  onChange={(selectedOption) =>
                    forSelectAccountHead(selectedOption.value)
                  }
                  placeholder="Select Account Head"
                  options={allHeadAccounts?.map((account) => ({
                    label: account.AccountHead,
                    value: account.AccountHead,
                  }))}
                  id="gender"
                />

                {errors.AccountNameHead && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      paddingLeft: "5px",
                    }}
                  >
                    {errors.AccountNameHead}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="customername-field" className="form-label">
                  Account Name
                </label>
                <input
                  type="text"
                  id="customername-field"
                  className="form-control"
                  placeholder="Enter Catagory "
                  value={AccountName}
                  required
                  onChange={(e) => setAccountName(e.target.value)}
                />
                {errors.AccountName && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      paddingLeft: "5px",
                    }}
                  >
                    {errors.AccountName}
                  </p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setForOpenEditNameModal(false)}
                >
                  Close
                </button>
                <button
                  onClick={(e) => forEditAccountName(e)}
                  className="btn btn-primary px-2"
                  id="add-btn"
                >
                  Update Name
                </button>
              </div>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Collections;
