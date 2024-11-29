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
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useParams } from "react-router-dom";
import { UseRiazHook } from "../../../RiazStore/RiazStore";

const Calender = () => {
  const [allTables, setAllTables] = useState([]);
  const [forAddTableModal, setForAddTableModal] = useState(false);
  const [forEditTableModal, setForEditTableModel] = useState(false);
  const [tableNo, setTableNo] = useState("");
  const [tableType, setTableType] = useState("dine-in");
  const [tableId, setTableId] = useState("");

  //this is for getting data riaz hook
  const { myUrl } = UseRiazHook();

  //this is for getting id from url
  const { id } = useParams();

  //this is for open modal for add table
  const forAddTableOpenModal = () => {
    setForAddTableModal(!forAddTableModal);
  };

  //this is for edit modal of table
  const forEditTableModalOpen = () => {
    setForEditTableModel(!forEditTableModal);
  };

  //this is for catch errors
  const forCatchErrors = () => {
    let isOk = true;

    if (tableNo === "") {
      isOk = false;
      toast.error("Please Enter Table No");
    }

    return isOk;
  };

  //this is for add tables
  const forAddTableSubmit = (e) => {
    e.preventDefault();

    if (forCatchErrors()) {
      let formData = {
        tableNo,
        tableType,
      };

      //this is for add table function
      const forAddTable = async () => {
        const url = `${myUrl}/add/${id}/table`;
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
            toast.success(data.msg);
            setForAddTableModal(false);
            forGetAllTables();
            setTableNo("");
          } else {
            toast.error(data.msg);
          }
        } catch (err) {
          console.log("there is error in the add table function", err);
        }
      };

      forAddTable();
    }
  };

  //this is for get all tables
  const forGetAllTables = async () => {
    const url = `${myUrl}/getall/${id}/tables`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllTables(data.allTables);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get all tables function", err);
    }
  };

  //this is for controll rendering of the get all items
  useEffect(() => {
    forGetAllTables();
  }, []);

  //this is for get data for edit
  const getDataforEditTable = async (id) => {
    const url = `${myUrl}/getdata/${id}/table`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setTableNo(data.tableData.tableNo);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get table data for edit", err);
    }
  };

  //this is for click on the edit button
  const forClickOnEditBtn = (id) => {
    getDataforEditTable(id);
    setForEditTableModel(true);
    setTableId(id);
  };

  //this is for edit the table
  const forEditTableSubmit = (e) => {
    e.preventDefault();
    if (forCatchErrors()) {
      let formData = {
        tableNo,
      };
      //this is for edit table
      const forEditTable = async () => {
        const url = `${myUrl}/edit/${tableId}/table`;
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
            forGetAllTables();
            setForEditTableModel(false);
          } else {
            toast.success(data.msg);
          }
        } catch (err) {
          console.log("there is error in the edit table field", err);
        }
      };

      forEditTable();
    }
  };

  //this is for delete tables
  const forDeleteTables = async (id) => {
    const url = `${myUrl}/delete/${id}/table`;
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
        forGetAllTables();
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("there is error in the delete all tables", err);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb catagoryText="All Area Tables" search="search" />

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
                  onClick={forAddTableOpenModal}
                  className="add-btn bg-dark text-white px-3 py-1 border-none"
                  id="create-btn"
                >
                  <i className="ri-add-line align-bottom me-1"></i> Add Table
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
                      <th scope="col">Table Number</th>
                      <th scope="col">Table Type</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allTables.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>Table No: {item.tableNo}</td>
                        <td>{item.tableType}</td>

                        <td>
                          <button
                            onClick={() => forClickOnEditBtn(item._id)}
                            className="btn btn-sm btn-soft-info edit-list text-info "
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
                            onClick={() => forDeleteTables(item._id)}
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
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* this is for add catagory */}
      <Modal isOpen={forAddTableModal} toggle={forAddTableOpenModal} centered>
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={forAddTableOpenModal}
        >
          Add Table
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Table Number
              </label>
              <input
                type="Number"
                id="customername-field"
                className="form-control"
                placeholder="Enter Table Number "
                onChange={(e) => setTableNo(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setForAddTableModal(false)}
              >
                Close
              </button>
              <button
                className="btn btn-primary px-2"
                id="add-btn"
                type="submit"
                onClick={(e) => forAddTableSubmit(e)}
              >
                Add Table
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* this is for edit catagory */}

      <Modal isOpen={forEditTableModal} toggle={forEditTableModalOpen} centered>
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={forEditTableModalOpen}
        >
          Edit Table
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Table Number
              </label>
              <input
                type="number"
                value={tableNo}
                id="customername-field"
                className="form-control"
                placeholder="Enter Table Number "
                onChange={(e) => setTableNo(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setForEditTableModel(false)}
              >
                Close
              </button>
              <button
                onClick={(e) => forEditTableSubmit(e)}
                type="submit"
                className="btn btn-primary px-2"
                id="add-btn"
              >
                Edit Table
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default Calender;
