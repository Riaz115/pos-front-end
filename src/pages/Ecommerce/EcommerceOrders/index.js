import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Col,
  Container,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UseRiazHook } from "../../../RiazStore/RiazStore";

const EcommerceOrders = () => {
  const [addCounterArea, setAddCounterArea] = useState(false);
  const [editCounterArea, setEditCounterArea] = useState(false);
  const [areaName, setAreaName] = useState("");
  const [errors, setErrors] = useState({});
  const [allAreas, setAllAreas] = useState([]);
  const [areaId, setAreaId] = useState("");

  //this is for getting id
  const { counterId } = useParams();

  //this is for get data from my hook
  const { myUrl, setCounterAreaId } = UseRiazHook();

  //this is for select counter area id
  const forSelectCounterAreaId = (id) => {
    setCounterAreaId(id);
    localStorage.setItem("areaid", id);
  };

  //this is for get all counter areas
  const forGetAllCounterAreas = async () => {
    const url = `${myUrl}/getforallcounterareas/${counterId}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        setAllAreas(data.counterAllArea);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get all counter areas function", err);
    }
  };

  //this is for get counter area data for edit
  const getDataforEditCounterArea = async (id) => {
    const url = `${myUrl}/getdataforeditcounterarea/${id}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        setAreaName(data.CounterSingleArea.areaName);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get data for edit counter areas function",
        err
      );
    }
  };

  //this is for controll rendering get counter all areas
  useEffect(() => {
    forGetAllCounterAreas();
  }, []);

  //this is for show add areaName
  const showForaddCounterArea = () => {
    setAddCounterArea(!addCounterArea);
  };

  //this is for show edit areaName
  const foreditCounterArea = () => {
    setEditCounterArea(!editCounterArea);
  };

  //this is for click on edit button
  const forClickOnEditButton = (id) => {
    getDataforEditCounterArea(id);
    setAreaId(id);
    setEditCounterArea(!editCounterArea);
  };

  //this is for catch erors
  const forCatchErors = () => {
    let isOk = true;
    let newError = {};

    if (!areaName.trim()) {
      newError.areaName = "Please enter area Name";
      toast.error("please enter area name");
      isOk = false;
    }

    setErrors(newError);
    return isOk;
  };

  //this is for handle add area name submit
  const forHandleAddAreaSubmit = (e) => {
    e.preventDefault();
    if (forCatchErors()) {
      let formData = {
        areaName,
      };

      //this is for add counter area function
      const forAddCounterArea = async () => {
        const url = `${myUrl}/counter/${counterId}/counterareas`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();

          if (response.ok) {
            toast.success("add sucesfuly");
            forGetAllCounterAreas();
            setAddCounterArea(false);
          } else {
            console.log("err data", data);
          }
        } catch (err) {
          console.log("there is error in the add counter area function", err);
        }
      };

      forAddCounterArea();
    }
  };

  //this is for edit counter area
  const forEditCounterAreaSubmit = (e) => {
    e.preventDefault();
    if (forCatchErors()) {
      let formData = {
        areaName,
      };

      //this is function for edit
      const forEditCounterArea = async () => {
        const url = `${myUrl}/foreditcounterarea/${areaId}`;
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();

          if (response.ok) {
            toast.success(data.msg);
            forGetAllCounterAreas();
            setEditCounterArea(!editCounterArea);
          } else {
            console.log("err data", data);
          }
        } catch (err) {
          console.log("there is error in the edit counter area function", err);
        }
      };

      forEditCounterArea();
    }
  };

  //this is for delete counter area
  const forDeleteCounterArea = async (id) => {
    // const url = `${myUrl}/delete/${id}/counterarea`;
    // const options = {
    //   method: "DELETE",
    // };
    // try {
    //   const response = await fetch(url, options);
    //   const data = await response.json();
    //   if (response.ok) {
    //     toast.success(data.msg);
    //     forGetAllCounterAreas();
    //   } else {
    //     console.log("ok err", data);
    //     toast.error(data.msg);
    //   }
    // } catch (err) {
    //   console.log("there is error in the delete counter area funtcion", err);
    // }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <div className="d-flex align-items-center justify-content-between  my-2 px-5">
            <h1>All Areas of This counter</h1>
            <button
              onClick={showForaddCounterArea}
              style={{
                textDecoration: "none",
                padding: "5px 30px",
                borderRadius: "20px",
                backgroundColor: "black",
                color: "white",
              }}
            >
              Add Area
            </button>
          </div>

          {allAreas.map((area, index) => (
            <Col lg={4} md={6} key={index}>
              <div
                className="d-flex align-items-center justify-content-center flex-column text-center my-2"
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <h2>{area.areaName} </h2>
                <div
                  className="d-flex align-items-center justify-content-center my-2 p-2"
                  style={{ gap: "10px" }}
                >
                  <button
                    onClick={() => forClickOnEditButton(area._id)}
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
                    to={`/area/${area._id}/tables`}
                    onClick={() => forSelectCounterAreaId(area._id)}
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
                    onClick={() => forDeleteCounterArea(area._id)}
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

        {/* this is for add counter area */}
        <Modal isOpen={addCounterArea} toggle={showForaddCounterArea} centered>
          <ModalHeader
            className="bg-light p-3"
            id="exampleModalLabel"
            toggle={showForaddCounterArea}
          >
            Add Counter Area
          </ModalHeader>
          <form className="tablelist-form">
            <ModalBody>
              <div className="mb-3">
                <label htmlFor="customername-field" className="form-label">
                  Area Name
                </label>
                <input
                  type="text"
                  id="customername-field"
                  className="form-control"
                  placeholder="Enter areaName "
                  required
                  onChange={(e) => setAreaName(e.target.value)}
                />
                {errors.areaName && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      paddingLeft: "5px",
                    }}
                  >
                    {errors.areaName}
                  </p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setAddCounterArea(false)}
                >
                  Close
                </button>
                <button
                  onClick={forHandleAddAreaSubmit}
                  className="btn btn-primary px-2"
                  id="add-btn"
                >
                  Add
                </button>
              </div>
            </ModalFooter>
          </form>
        </Modal>

        {/* this is for edit areaName */}

        <Modal isOpen={editCounterArea} toggle={foreditCounterArea} centered>
          <ModalHeader
            className="bg-light p-3"
            id="exampleModalLabel"
            toggle={foreditCounterArea}
          >
            Edit Area Name
          </ModalHeader>
          <form className="tablelist-form">
            <ModalBody>
              <div className="mb-3">
                <label htmlFor="customername-field" className="form-label">
                  Area Name
                </label>
                <input
                  type="text"
                  id="customername-field"
                  value={areaName}
                  className="form-control"
                  placeholder="Enter areaName "
                  onChange={(e) => setAreaName(e.target.value)}
                />
                {errors.areaName && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      paddingLeft: "5px",
                    }}
                  >
                    {errors.areaName}
                  </p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setEditCounterArea(false)}
                >
                  Close
                </button>
                <button
                  onClick={(e) => forEditCounterAreaSubmit(e)}
                  type="submit"
                  className="btn btn-primary px-2"
                  id="add-btn"
                >
                  Edit
                </button>
              </div>
            </ModalFooter>
          </form>
        </Modal>
      </Container>
    </div>
  );
};

export default EcommerceOrders;
