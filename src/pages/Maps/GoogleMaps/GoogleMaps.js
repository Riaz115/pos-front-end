import React, { useEffect, useState } from "react";
import { Container, Table, Col } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { FaExchangeAlt } from "react-icons/fa";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import Loader from "../../../Components/Common/Loader";
import { toast } from "react-toastify";
import DeleteModal from "../../../Components/Common/DeleteModal";
import BasicSuccessMsg from "../../AuthenticationInner/SuccessMessage/BasicSuccessMsg";

const GoogleMaps = () => {
  const [allExpenses, setAllExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [testingId, setTEstingId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [expIdForDel, setExpIdForDel] = useState("");

  //this is for getting id from url of restaurent
  const { id } = useParams();

  //this is for getting data from my custome hook
  const { myUrl, token, restData, dayId, formatAmount } = UseRiazHook();

  //this is for getting all expenses of the restaurent
  const forGettingAllExpensesOfRest = async () => {
    setIsLoading(true);
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
        setAllExpenses(data);
        setIsLoading(false);
      } else {
        console.log("err data", data);
        setIsLoading(false);
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

  //this is for delete the transition
  const forDeleteTheExpenseTransitionFromDay = async () => {
    const url = `${myUrl}/restaurent/transition/${expIdForDel}/delete/expense/${dayId}/fromday`;
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
        forGettingAllExpensesOfRest();
        toast.success(data.msg);
        setDeleteModal(false);
        setSuccessModal(true);
      } else {
        console.log("err data", data);
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(
        "there is error in the delete expense from day function",
        err
      );
    }
  };

  //this is for click on delete button
  const forClickOnDeleteButton = (id) => {
    setExpIdForDel(id);
    setDeleteModal(true);
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={forDeleteTheExpenseTransitionFromDay}
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
                {isLoading ? (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ position: "fixed", left: "50%", top: "50%" }}
                  >
                    <Loader />{" "}
                  </div>
                ) : (
                  allExpenses.map((item, index) => (
                    <tr key={index}>
                      <td>{item.votureNo}</td>
                      <td>
                        {" "}
                        {formatDateTime(
                          item?.createdAt,
                          restData?.dateFormate,
                          restData?.selectedTimezone
                        )}
                      </td>
                      <td>{item?.headAcount}</td>
                      <td>{item?.accountName}</td>
                      <td>{item?.description}</td>
                      <td>{item?.createdBy?.name}</td>
                      <td>{item.paymentType}</td>
                      <td>
                        {item.exprensType === "paid"
                          ? formatAmount(item?.amount)
                          : "0.00"}
                      </td>
                      <td>
                        {item.exprensType === "received"
                          ? formatAmount(item?.amount)
                          : "0.00"}
                      </td>

                      <td>
                        {item.dayId === dayId && (
                          <Link
                            to={`/restaurent/${id}/edit/expense/${item._id}/runningday`}
                            className=" my-custome-button-edit"
                            style={{
                              padding: "4px 8px",
                              textDecoration: "none",
                              textAlign: "center",
                            }}
                          >
                            <i className="ri-pencil-fill align-bottom" />
                          </Link>
                        )}
                        {item.dayId === dayId && (
                          <button
                            onClick={() => forClickOnDeleteButton(item._id)}
                            className="my-custome-button-delete"
                            style={{
                              padding: "4px 8px",
                            }}
                          >
                            <i className="ri-delete-bin-5-fill align-bottom" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default GoogleMaps;
