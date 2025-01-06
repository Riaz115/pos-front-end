import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import { toast } from "react-toastify";

const ListView = () => {
  const [forShowAddCounter, setForShowAddCoutner] = useState(false);
  const [counterName, setCounterName] = useState("");

  //this is for getting url from my data provider
  const { myUrl, setRestId } = UseRiazHook();

  //this is for get id from url
  const { id } = useParams();
  setRestId(id);

  //this is for open and close for add counter
  const toggleAddCounter = () => {
    setForShowAddCoutner(!forShowAddCounter);
  };

  //this is for catch eror
  const forCatchErorAddCounter = () => {
    let isOk = true;
    if (!counterName.trim()) {
      isOk = false;
      toast.error("Please Enter Counter Name");
    }

    return isOk;
  };

  //this is for add counter submit
  const handleAddCounterSubmit = (e) => {
    e.preventDefault();
    if (forCatchErorAddCounter()) {
      let counterData = {
        counterName,
      };

      const forAddCounterToBAckend = async () => {
        const url = `${myUrl}/forAddCounter/${id}/addCounter`;
        const options = {
          method: "POST",
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
            setForShowAddCoutner(!forShowAddCounter);
          } else {
            toast.error(data.msg);
          }
        } catch (err) {
          console.log("there is error in the add counter function", err);
        }
      };

      forAddCounterToBAckend();
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={4} md={6}>
              <div
                className="d-felx align-items-center justify-content-center flex-column text-center my-2"
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <h2>All Counters of the Restaruent</h2>
                <div
                  className="d-flex align-items-center justify-content-center my-2 p-2"
                  style={{ gap: "10px" }}
                >
                  <button
                    style={{
                      textDecoration: "none",
                      padding: "5px 30px",
                      borderRadius: "20px",
                      backgroundColor: "black",
                      color: "white",
                    }}
                    onClick={toggleAddCounter}
                  >
                    Add Counter
                  </button>
                  <Link
                    to={`/restaurent/${id}/allCounters`}
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
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div
                className="d-felx align-items-center justify-content-center flex-column text-center my-2"
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <h2>All Menu Items and catagories of the Restaurent</h2>
                <div
                  className="d-flex align-items-center justify-content-center my-2 p-2"
                  style={{ gap: "10px" }}
                >
                  <Link
                    to={`/rest-items-catagories/${id}`}
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
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div
                className="d-felx align-items-center justify-content-center flex-column text-center my-2"
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <h2>All Food Items of Restaurent </h2>
                <div
                  className="d-flex align-items-center justify-content-center my-2 p-2"
                  style={{ gap: "10px" }}
                >
                  <Link
                    to={`/restaurent/${id}/food/items`}
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
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div
                className="d-felx align-items-center justify-content-center flex-column text-center my-2"
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <h2>All Guests of Restaurent </h2>
                <div
                  className="d-flex align-items-center justify-content-center my-2 p-2"
                  style={{ gap: "10px" }}
                >
                  <Link
                    to={`/guest/${id}`}
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
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* this is for add counter */}
        <Modal isOpen={forShowAddCounter} toggle={toggleAddCounter} centered>
          <ModalHeader
            className="bg-light p-3"
            id="exampleModalLabel"
            toggle={toggleAddCounter}
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
                  onClick={toggleAddCounter}
                >
                  Close
                </button>
                <button
                  type="submit"
                  onClick={handleAddCounterSubmit}
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

export default ListView;
