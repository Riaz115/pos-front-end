import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
} from "reactstrap";
import { UseRiazHook } from "../../RiazStore/RiazStore";
import { toast } from "react-toastify";
import BasicSuccessMsg from "../AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import Select from "react-select";

const InvoiceDetails = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [filteredAccountNames, setFilteredAccountNames] = useState([]);
  const [headAcount, setHeadAccount] = useState("");
  const [accountName, setAccountName] = useState("");
  const [exprensType, setExpenseType] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [errors, setErrors] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [forOpenAddNameModal, setForOpenAddNameModal] = useState(false);
  const [AccountName, setAccountNames] = useState("");
  const [AccountNameHead, setAccountNameHead] = useState("");

  //this is for getting id of restaurent from the url
  const { id } = useParams();

  //this is for getting data from my custome hook
  const {
    myUrl,
    token,
    restId,
    restData,
    allHeadAccounts,
    ForGettingAllHeadAccounts,
    forGetAllAcountNames,
    allAccNames,
  } = UseRiazHook();

  //this is for the add name modal
  const forAddNameModal = () => {
    setForOpenAddNameModal(!forOpenAddNameModal);
  };

  //this is for select account head
  const forSelectAccountHead = (selectedOptions) => {
    setAccountNameHead(selectedOptions);
  };

  //this is for getting all
  useEffect(() => {
    ForGettingAllHeadAccounts();
    forGetAllAcountNames();
  }, []);

  //this is for payment methods
  const allPaymentMethods = [
    { name: "Cash", value: "cash" },
    { name: "Card", value: "card" },
    { name: "PayTM", value: "paytm" },
    { name: "UPI", value: "upi" },
    { name: "Bank Account", value: "bank account" },
  ];

  //this is for filter account names with accont heads
  useEffect(() => {
    if (!headAcount) {
      setFilteredAccountNames(allAccNames);
    } else {
      const filtered = allAccNames.filter(
        (account) => account.AccountNameHead === headAcount
      );
      setFilteredAccountNames(filtered);
    }
  }, [headAcount, allAccNames]);

  //this is for catch error
  const forCatchErrors = () => {
    let isOk = true;
    let newErrors = {};

    if (!headAcount.trim()) {
      isOk = false;
      newErrors.headAcount = "Please select account head";
      toast.error("please Select Account Head");
    } else if (!accountName.trim()) {
      isOk = false;
      newErrors.accountName = "Please select account name";
      toast.error("please Select Account Name");
    } else if (!exprensType.trim()) {
      isOk = false;
      newErrors.exprensType = "Please select expense type";
      toast.error("please Select Expense Type");
    } else if (amount === 0) {
      isOk = false;
      newErrors.amount = "Please enter amount";
      toast.error("please Enter Amount");
    } else if (!paymentType.trim()) {
      isOk = false;
      newErrors.paymentType = "Please select payment type";
      toast.error("please Select Payment Type");
    }

    setErrors(newErrors);
    return isOk;
  };

  //this is for add payment to cash book
  const forAddPaymentToCashBook = () => {
    if (forCatchErrors()) {
      const paymentData = {
        headAcount,
        accountName,
        exprensType,
        paymentType,
        description,
        amount,
      };

      const forAddTransitionToCashBook = async () => {
        const url = `${myUrl}/restaurent/${id}/add/transition/cashbook`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify(paymentData),
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            toast.success(data.msg);
            setSuccessModal(true);
            setHeadAccount("");
            setAccountName("");
            setExpenseType("");
            setPaymentType("");
            setDescription("");
            setAmount(0);
            paymentData = {};
          } else {
            console.log("err data", data);
            toast.error(data.msg);
          }
        } catch (err) {
          console.log(
            "there is error in the add transition to cash book function",
            err
          );
        }
      };

      forAddTransitionToCashBook();
    }
  };

  //this is for the date and time formate
  const formatDateTime = () => {
    const d = new Date();

    // Convert the date to the selected timezone
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    // Get the formatted date and time in the selected timezone
    const dateFormatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = dateFormatter.format(d);

    // Extract individual parts of the date and time
    const parts = formattedDate.split(", ");
    const datePart = parts[0];

    // Format the date based on the provided 'format' argument
    let finalFormattedDate;
    const [day, month, year] = datePart.split("/");

    switch (restData?.dateFormate) {
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

    setCurrentDate(finalFormattedDate);
  };

  //this is forcontroll rendering
  useEffect(() => {
    formatDateTime();
  }, []);

  //this is for catch error for the name
  const forCatchErrorsAccName = () => {
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

  //this is for add account name
  const forAddAccountName = async (e) => {
    e.preventDefault();
    if (forCatchErrorsAccName()) {
      const accNameData = {
        AccountName,
        AccountNameHead,
      };
      const url = `${myUrl}/restaurent/${id}/add/acc/head/name/cashbook`;
      const options = {
        method: "POST",
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
          setForOpenAddNameModal(false);
          toast.success(data.msg);
          setSuccessModal(true);
          forGetAllAcountNames();
          ForGettingAllHeadAccounts();
        } else {
          console.log("err data", data);
          toast.error(data.msg);
        }
      } catch (err) {
        console.log("there is error in the add account name funciton", err);
      }
    }
  };

  return (
    <React.Fragment>
      <BasicSuccessMsg
        show={successModal}
        onCloseClick={() => setSuccessModal(false)}
      />
      <div className="page-content">
        <Container fluid className="px-lg-5 px-md-2 px-1  py-3">
          <div className="d-flex align-items-center justify-content-between py-1">
            <h5>Cash book</h5>
            <Link
              to={`/restaurent/${id}/cash-book`}
              className="px-2 py-1 text-white"
              style={{
                backgroundColor: "#6E747A",
                textDecoration: "none",
                fontSize: "15px",
              }}
            >
              Return To List
            </Link>
          </div>
          <div
            className="my-1 px-4 pb-4"
            style={{
              backgroundColor: "#FFFFFF",
              border: " 1px solid #6E747A",
            }}
          >
            <div className="mt-2 mb-3">
              <h6 className="m-0 px-0 py-1" style={{ fontWeight: "bold" }}>
                Invoice Date
              </h6>
              <h6 className="m-0 px-0 py-1" style={{ fontWeight: "bold" }}>
                From
              </h6>

              <div
                className="input-group d-flex align-items-center justify-content-between px-2 "
                style={{ width: "fit-content", border: " 1px solid #6E747A" }}
              >
                <p className="p-0 m-0" style={{ fontSize: "12px" }}>
                  {currentDate}
                </p>
                <span className="text-dark ps-4">
                  <i className="ri-calendar-2-line"></i>
                </span>
              </div>
            </div>
            <div className="my-2">
              <h6 className="m-0 px-0 py-1 " style={{ fontWeight: "bold" }}>
                Account Head
              </h6>

              <select
                className="form-select "
                style={{
                  border: " 1px solid #6E747A",
                  borderRadius: "0",
                  maxWidth: "500px",
                  padding: "2px 7px",
                }}
                value={headAcount || ""}
                onChange={(event) => {
                  setHeadAccount(event.target.value);
                  setAccountName("");
                }}
              >
                {allHeadAccounts.map((role, index) => (
                  <option key={index} value={role.AccountHead}>
                    {role.AccountHead}
                  </option>
                ))}
              </select>
              {errors.headAcount && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    paddingLeft: "5px",
                  }}
                >
                  {errors.headAcount}
                </p>
              )}
            </div>
            <div className="my-2">
              <h6 className="m-0 px-0 py-1 " style={{ fontWeight: "bold" }}>
                Account Head :
                <span style={{ fontSize: "16px", fontWeight: "300" }}>
                  {" "}
                  {headAcount ? headAcount : "Select Head Accont"}
                </span>
                <button
                  onClick={() => setForOpenAddNameModal(true)}
                  className=" my-custome-button-edit ms-2  "
                  style={{
                    padding: "2px 6px",
                  }}
                >
                  <i className="ri-pencil-fill align-bottom" />
                </button>
              </h6>
            </div>
            <div className="my-2">
              <h6 className="m-0 px-0 py-1 " style={{ fontWeight: "bold" }}>
                Account Name
              </h6>
              <select
                className="form-select "
                style={{
                  border: " 1px solid #6E747A",
                  borderRadius: "0",
                  maxWidth: "500px",
                  padding: "2px 7px",
                }}
                onChange={(e) => {
                  setAccountName(e.target.value);
                }}
              >
                {filteredAccountNames.map((role, index) => (
                  <option key={index} value={role.AccountHead}>
                    {role.AccountName}
                  </option>
                ))}
              </select>
              {errors.accountName && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    paddingLeft: "5px",
                  }}
                >
                  {errors.accountName}
                </p>
              )}
            </div>
            <div
              className="my-4 d-flex align-items-center justify-content-evenly"
              style={{ maxWidth: "500px" }}
            >
              <div>
                <input
                  type="radio"
                  id="credit"
                  name="transactionType"
                  value="credit"
                  onChange={() => setExpenseType("paid")}
                />
                <label htmlFor="credit" className="ms-1">
                  Credit
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="debit"
                  name="transactionType"
                  value="debit"
                  onChange={() => setExpenseType("received")}
                />
                <label htmlFor="debit" className="ms-1">
                  Debit
                </label>
              </div>
            </div>

            <div className="my-2">
              <h6 className="m-0 px-0 py-1 " style={{ fontWeight: "bold" }}>
                Amount Received
              </h6>
              <div style={{ maxWidth: "500px" }}>
                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{
                    border: " 1px solid #6E747A",
                    borderRadius: "0",
                    width: "100%",
                    padding: "2px 7px",
                  }}
                />
              </div>
              {errors.amount && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    paddingLeft: "5px",
                  }}
                >
                  {errors.amount}
                </p>
              )}
            </div>
            <div className="my-2">
              <h6 className="m-0 px-0 py-1 " style={{ fontWeight: "bold" }}>
                Payment Method
              </h6>
              <select
                className="form-select "
                value={paymentType}
                style={{
                  border: " 1px solid #6E747A",
                  borderRadius: "0",
                  maxWidth: "500px",
                  padding: "2px 7px",
                }}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                {allPaymentMethods.map((role, index) => (
                  <option key={index} value={role.value}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.paymentType && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    paddingLeft: "5px",
                  }}
                >
                  {errors.paymentType}
                </p>
              )}
            </div>
            <div className="my-2">
              <h6 className="m-0 px-0 py-1 " style={{ fontWeight: "bold" }}>
                Narration
              </h6>
              <div style={{ maxWidth: "500px" }}>
                <textarea
                  placeholder="Enter Amount"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="2"
                  style={{
                    border: "1px solid #6E747A",
                    borderRadius: "0",
                    width: "100%",
                    padding: "2px 7px",
                    height: "auto",
                  }}
                />
              </div>
            </div>
            <div
              className="my-4 d-flex align-items-center"
              style={{ gap: "10px" }}
            >
              <button
                onClick={forAddPaymentToCashBook}
                style={{
                  backgroundColor: "#14692e",
                  color: "#fff",
                  border: "none",
                  padding: "5px 15px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                Save
              </button>

              <button
                style={{
                  backgroundColor: "#FAB005",
                  color: "black",
                  border: "none",
                  padding: "5px 15px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                <i className="ri-printer-fill align-bottom mx-1" /> Print
              </button>

              <Link
                to={`/restaurent/${id}/cash-book`}
                style={{
                  backgroundColor: "#6E747A",
                  color: "#fff",
                  border: "none",
                  padding: "5px 15px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                Return
              </Link>
            </div>
          </div>
        </Container>
      </div>

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
                onChange={(e) => setAccountNames(e.target.value)}
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
    </React.Fragment>
  );
};

export default InvoiceDetails;
