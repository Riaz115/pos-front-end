import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { UseRiazHook } from "../../../../RiazStore/RiazStore";
import { options } from "@fullcalendar/core/preact.js";
import { toast } from "react-toastify";

const index = () => {
  const [Counters, setCounters] = useState([]);
  const [forShowEditCounter, setForShowEditCoutner] = useState(false);
  const [counterName, setCounterName] = useState("");

  //this is for get id
  const { id } = useParams();

  //this is for open and close for add counter
  const toggleEditCounter = (id) => {
    setForShowEditCoutner(!forShowEditCounter);
    forGetSingleCounterDataForUpdate(id);
    setCounterId(id);
  };

  //this is for get data from my hook
  const { myUrl, counterId, setCounterId } = UseRiazHook();

  //this is for get counters
  const forGetAllCountersofRestaurent = async () => {
    const url = `${myUrl}/getAllCountersofRestaurent/${id}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setCounters(data.counters);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get all counters of the restauret function",
        err
      );
    }
  };

  //this is for call only once time for all counter
  useEffect(() => {
    forGetAllCountersofRestaurent();
  }, []);

  //this is for get single counter data for update ya edit
  const forGetSingleCounterDataForUpdate = async (id) => {
    const url = `${myUrl}/getdataforedit/${id}/counter`;

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setCounterName(data.counter.counterName);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get single counter data for edit",
        err
      );
    }
  };

  //this is for catch eror
  const forCatchErorEditCounter = () => {
    let isOk = true;
    if (!counterName.trim()) {
      isOk = false;
      toast.error("Please Enter Counter Name");
    }

    return isOk;
  };

  //this is for add counter submit
  const handleEditCounterSubmit = (e) => {
    e.preventDefault();
    if (forCatchErorEditCounter()) {
      let counterData = {
        counterName,
      };

      const forEditCounterToBAckend = async () => {
        const url = `${myUrl}//update/${counterId}/counter`;
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(counterData),
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();

          if (response.ok) {
            toast.success(data.msg);
            setForShowEditCoutner(!forShowEditCounter);
            forGetAllCountersofRestaurent();
          } else {
            toast.error(data.msg);
          }
        } catch (err) {
          console.log("there is error in the edit counter function", err);
        }
      };

      forEditCounterToBAckend();
    }
  };

  //this is for delete counter of restaurent
  const forDeleteCounter = async (id) => {
    const url = `${myUrl}/delete/${id}/counter`;
    const options = {
      method: "DELETE",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg);
        forGetAllCountersofRestaurent();
      } else {
        console.log("err data", data);
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("there is error in the delete restaurent function", err);
    }
  };

  //this is for get counter id
  const forGetCounterId = (id) => {
    localStorage.setItem("counterid", id);
    setCounterId(id);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            {Counters.map((counter, index) => (
              <Col lg={4} md={6} key={index}>
                <div
                  className="d-felx align-items-center justify-content-center flex-column text-center my-2"
                  style={{
                    border: "1px solid black",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <h2>{counter.counterName}</h2>
                  <div
                    className="d-flex align-items-center justify-content-center my-2 p-2"
                    style={{ gap: "10px" }}
                  >
                    <button
                      onClick={() => toggleEditCounter(counter._id)}
                      style={{
                        textDecoration: "none",
                        padding: "5px 30px",
                        borderRadius: "20px",
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      Edit
                    </button>
                    <Link
                      to={`/area/${counter._id}/tables`}
                      onClick={() => forGetCounterId(counter._id)}
                      style={{
                        textDecoration: "none",
                        padding: "5px 30px",
                        borderRadius: "20px",
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      Open
                    </Link>

                    <button
                      onClick={() => forDeleteCounter(counter._id)}
                      style={{
                        textDecoration: "none",
                        padding: "5px 30px",
                        borderRadius: "20px",
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
        {/* this is for add counter */}
        <Modal isOpen={forShowEditCounter} toggle={toggleEditCounter} centered>
          <ModalHeader
            className="bg-light p-3"
            id="exampleModalLabel"
            toggle={toggleEditCounter}
          >
            Add Counter
          </ModalHeader>
          <form className="tablelist-form">
            <ModalBody>
              <div className="mb-3">
                <label htmlFor="customername-field" className="form-label">
                  Counter Name
                </label>
                <input
                  type="text"
                  id="customername-field"
                  value={counterName}
                  className="form-control"
                  placeholder="Enter Catagory "
                  onChange={(e) => setCounterName(e.target.value)}
                  required
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={toggleEditCounter}
                >
                  Close
                </button>
                <button
                  type="submit"
                  onClick={handleEditCounterSubmit}
                  className="btn btn-primary px-2"
                  id="add-btn"
                >
                  Add Counter
                </button>
              </div>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default index;
