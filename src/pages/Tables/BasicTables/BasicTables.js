import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Container,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useParams } from "react-router-dom";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import Loader from "../../../Components/Common/Loader";
import Select from "react-select";
import SimpleBar from "simplebar-react";

const BasicTables = () => {
  const [addCatagory, setAddCatagory] = useState(false);
  const [editCatagory, setEditCatagory] = useState(false);
  const [allCatagories, setAllCatagories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [ctgryid, setCtgyid] = useState("");
  const [maincatagory, setMainCatagory] = useState("");

  //this is for getting rest id
  const { id } = useParams();

  //this is for getting url
  const { myUrl, token } = UseRiazHook();

  //this is for parent catagory

  const mainCatagories = [
    {
      options: [
        { label: "Select Catagory...", value: "Select Catagory" },
        { label: "Food", value: "food" },
        { label: "Drinks", value: "drinks" },
        { label: "Sweets", value: "sweets" },
      ],
    },
  ];

  //this is for select Guest gender
  function handleSelectMainCatagory(selectedOption) {
    setMainCatagory(selectedOption.value);
  }

  //this is for show add catagory
  const showForAddCatagory = () => {
    setAddCatagory(!addCatagory);
  };

  //this is for show edit catagory
  const forEditCatagory = () => {
    setEditCatagory(!editCatagory);
  };

  //this is for getting all catagories of the restaurent
  const forGettingAllCatagories = async () => {
    const url = `${myUrl}/get-all-catagories/${id}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllCatagories(data.catagories);
        setIsLoading(false);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in getting all catagories function", err);
    }
  };

  //this is for control rendering
  useEffect(() => {
    forGettingAllCatagories();
  }, []);

  //this is for catch errors
  const catchErrors = () => {
    let isOk = true;
    if (!maincatagory.trim()) {
      isOk = false;
      toast.error("please select main catagory ");
    } else if (!name.trim()) {
      isOk = false;
      toast.error("please enter catagory name");
    }

    return isOk;
  };

  //this is for handle submit
  const forHandleSubmit = (e) => {
    e.preventDefault();
    if (catchErrors()) {
      let formData = {
        name: name,
        maincatagory,
      };

      //this is for add catagory
      const forAddCatagory = async () => {
        const url = `${myUrl}/foraddcatagory/${id}/addcatagory`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            Authorization: token,
          },
          body: JSON.stringify(formData),
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            setAddCatagory(false);
            forGettingAllCatagories();
            toast.success(data.msg);
          } else {
            toast.error(data.msg);
          }
        } catch (err) {
          console.log("there is error in the add catagory function", err);
        }
      };

      forAddCatagory();
    }
  };

  //this is for getting data of catagory for update
  const forGetDataCatagoryForEdit = async (id) => {
    const url = `${myUrl}/getdataforedit/${id}/catagory`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setName(data.catagory.name);
        setMainCatagory(data.catagory.maincatagory);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get data for edit catagory", err);
    }
  };

  //this is for click on the edit button
  const forClickOnEditBtn = (id) => {
    setEditCatagory(true);
    forGetDataCatagoryForEdit(id);
    setCtgyid(id);
  };

  //this is for click on handle submit
  const forHandleSubmitUpdateCatagory = async (e) => {
    e.preventDefault();
    if (catchErrors()) {
      let formData = {
        name,
        maincatagory,
      };

      //this is for edit the catagory
      const forUpdateCatagory = async () => {
        const url = `${myUrl}/update/${ctgryid}/catagory`;
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(formData),
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            toast.success(data.msg);
            setEditCatagory(false);
            forGettingAllCatagories();
          } else {
            toast.error(data.msg);
          }
        } catch (err) {
          console.log("there is error in the update catagory function", err);
        }
      };

      forUpdateCatagory();
    }
  };

  //this is for the delete catagory
  const forDeleteCatagory = async (id) => {
    const url = `${myUrl}/delete/${id}/catagory`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg);
        forGettingAllCatagories();
      } else {
        console.log("err data", err);
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("there is eror in the delete catagory function ", err);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb catagoryText="All Catagories" search="search" />

          <div className="container mt-0">
            <div className="row">
              <div className="col-12 col-md-3 mb-3">
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
              </div>
              <div className="col-12 col-md-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name"
                />
              </div>
              <div className="col-12 col-md-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Number"
                />
              </div>
              <div className="col-12 col-md-3 mb-3">
                <Button
                  className="add-btn bg-dark text-white px-3 py-1 border-none"
                  id="create-btn"
                  onClick={showForAddCatagory}
                >
                  <i className="ri-add-line align-bottom me-1"></i> Add Catagory
                </Button>
              </div>
            </div>
          </div>

          <Row>
            <Col xl={12}>
              <div className="table-responsive mt-4 mt-xl-0">
                <Table className="table-success table-striped table-nowrap align-middle mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Catagory Name</th>
                      <th scope="col">Main Catagory</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
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
                      allCatagories.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>

                          <td>{item.name}</td>
                          <td>{item.maincatagory}</td>

                          <td>
                            <button
                              className="btn btn-sm btn-soft-info edit-list text-info "
                              onClick={() => forClickOnEditBtn(item._id)}
                              style={{
                                padding: "4px 8px",
                                backgroundColor: "#E6F7FC",
                              }}
                            >
                              <i className="ri-pencil-fill align-bottom" />
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => forDeleteCatagory(item._id)}
                              className="btn btn-sm btn-soft-danger remove-list delete-btn"
                              style={{
                                padding: "4px 8px",
                                backgroundColor: "#FEEDE9",
                                color: "red",
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
        </Container>
      </div>
      {/* this is for add catagory */}
      <Modal isOpen={addCatagory} toggle={showForAddCatagory} centered>
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={showForAddCatagory}
        >
          Add Catagroy
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            <div className="mb-3">
              <Label htmlFor="gender" className="form-label">
                Select Main Catagory
              </Label>
              <Select
                value={maincatagory}
                onChange={(selectedOption) =>
                  handleSelectMainCatagory(selectedOption)
                }
                placeholder={maincatagory ? maincatagory : "select Gender"}
                options={mainCatagories}
                id="gender"
              ></Select>
            </div>

            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Catagroy Name
              </label>
              <input
                type="text"
                id="customername-field"
                className="form-control"
                placeholder="Enter Catagory "
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setAddCatagory(false)}
              >
                Close
              </button>
              <button
                onClick={(e) => forHandleSubmit(e)}
                className="btn btn-primary px-2"
                id="add-btn"
              >
                Add Catagory
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* this is for edit catagory */}

      <Modal isOpen={editCatagory} toggle={forEditCatagory} centered>
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={forEditCatagory}
        >
          Edit Catagroy
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            <div className="mb-3">
              <Label htmlFor="gender" className="form-label">
                Select Main Catagory
              </Label>
              <Select
                value={maincatagory}
                onChange={(selectedOption) =>
                  handleSelectMainCatagory(selectedOption)
                }
                placeholder={maincatagory ? maincatagory : "select Gender"}
                options={mainCatagories}
                id="gender"
              ></Select>
            </div>

            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Catagroy Name
              </label>
              <input
                type="text"
                value={name}
                id="customername-field"
                className="form-control"
                placeholder="Enter Catagory "
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setEditCatagory(false)}
              >
                Close
              </button>
              <button
                type="submit"
                onClick={(e) => forHandleSubmitUpdateCatagory(e)}
                className="btn btn-primary px-2"
                id="add-btn"
              >
                Edit Catagory
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default BasicTables;
