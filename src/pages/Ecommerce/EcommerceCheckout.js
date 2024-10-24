import React, { useState } from "react";

//Import Breadcrumb
import BreadCrumb from "../../Components/Common/BreadCrumb";

import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { toast } from "react-toastify";

const EcommerceCheckout = () => {
  const [addRole, setAddRole] = useState(false);
  const [roleValue, setRoleValue] = useState("");
  const [errors, setErrors] = useState("");

  //this is for catch errors
  const forCatchRoleErrors = () => {
    let isOK = true;
    let newErrors = {};

    if (!roleValue.trim()) {
      newErrors.roleValue = "Please Enter Role";
      toast.error("please enter role");
      isOK = false;
    }

    setErrors(newErrors);
    return isOK;
  };

  //this is for handleSubmit
  const handleRoleSubmit = (e) => {
    e.preventDefault();
    if (forCatchRoleErrors()) {
      let newRole = {
        roleValue,
      };
      console.log(newRole);
    }
  };

  //this is for open for add role
  const forAddROle = () => {
    setAddRole(!addRole);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb rolesText="All Roles" />
          <div className="d-flex align-items-center justify-content-between my-3">
            <h3> All Roles And Its Permissions </h3>
            <Button
              onClick={forAddROle}
              className="add-btn bg-dark text-white px-3 py-1 border-none"
              id="create-btn">
              <i className="ri-add-line align-bottom me-1"></i> Add Role
            </Button>
          </div>

          <Row>
            <div className=" my-0 py-3 px-4 bg-danger text-white">
              <Col sm={12}>
                <div className="d-flex align-items-center justify-content-between ">
                  <h5>Role Name</h5>
                  <h5>permissions</h5>
                  <h5>Actions</h5>
                </div>
              </Col>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-2 py-3  px-2 bg-info">
              <Col sm={2}>
                <h4 className="text-muted ">Order Taker</h4>
              </Col>
              <Col sm={8}>
                <div className="d-flex flex-wrap  align-items-center justify-content-start">
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>
                </div>
              </Col>
              <Col sm={2}>
                <div className="hstack gap-3 flex-wrap align-items-center  justify-content-end">
                  <button
                    className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                    style={{
                      padding: "8px 18px",
                      backgroundColor: "#E6F7FC",
                    }}>
                    <i className="ri-pencil-fill align-bottom fs-24" />
                  </button>
                  <button
                    className="btn btn-sm btn-soft-danger remove-list delete-btn"
                    style={{
                      padding: "8px 18px",
                      backgroundColor: "#FEEDE9",
                      color: "red",
                    }}>
                    <i className="ri-delete-bin-5-fill align-bottom fs-24" />
                  </button>
                </div>
              </Col>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-2 py-3  px-2 bg-info">
              <Col sm={2}>
                <h4 className="text-muted ">Order Taker</h4>
              </Col>
              <Col sm={8}>
                <div className="d-flex flex-wrap  align-items-center justify-content-start">
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>
                </div>
              </Col>
              <Col sm={2}>
                <div className="hstack gap-3 flex-wrap align-items-center  justify-content-end">
                  <button
                    className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                    style={{
                      padding: "8px 18px",
                      backgroundColor: "#E6F7FC",
                    }}>
                    <i className="ri-pencil-fill align-bottom fs-24" />
                  </button>
                  <button
                    className="btn btn-sm btn-soft-danger remove-list delete-btn"
                    style={{
                      padding: "8px 18px",
                      backgroundColor: "#FEEDE9",
                      color: "red",
                    }}>
                    <i className="ri-delete-bin-5-fill align-bottom fs-24" />
                  </button>
                </div>
              </Col>
            </div>{" "}
            <div className="d-flex align-items-center justify-content-between mb-2 py-3  px-2 bg-info">
              <Col sm={2}>
                <h4 className="text-muted ">Admin</h4>
              </Col>
              <Col sm={8}>
                <div className="d-flex flex-wrap  align-items-center justify-content-start">
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>
                </div>
              </Col>
              <Col sm={2}>
                <div className="hstack gap-3 flex-wrap align-items-center  justify-content-end">
                  <button
                    className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                    style={{
                      padding: "8px 18px",
                      backgroundColor: "#E6F7FC",
                    }}>
                    <i className="ri-pencil-fill align-bottom fs-24" />
                  </button>
                  <button
                    className="btn btn-sm btn-soft-danger remove-list delete-btn"
                    style={{
                      padding: "8px 18px",
                      backgroundColor: "#FEEDE9",
                      color: "red",
                    }}>
                    <i className="ri-delete-bin-5-fill align-bottom fs-24" />
                  </button>
                </div>
              </Col>
            </div>{" "}
            <div className="d-flex align-items-center justify-content-between mb-2 py-3  px-2 bg-info">
              <Col sm={2}>
                <h4 className="text-muted ">Waiter</h4>
              </Col>
              <Col sm={8}>
                <div className="d-flex flex-wrap  align-items-center justify-content-start">
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">new eidt</p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">
                    all Catagoreis
                  </p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">all eidt</p>{" "}
                  <p className="px-3 py-1 bg-danger text-white m-2">all</p>
                </div>
              </Col>
              <Col sm={2}>
                <div className="hstack gap-3 flex-wrap align-items-center  justify-content-end">
                  <button
                    className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                    style={{
                      padding: "8px 18px",
                      backgroundColor: "#E6F7FC",
                    }}>
                    <i className="ri-pencil-fill align-bottom fs-24" />
                  </button>
                  <button
                    className="btn btn-sm btn-soft-danger remove-list delete-btn"
                    style={{
                      padding: "8px 18px",
                      backgroundColor: "#FEEDE9",
                      color: "red",
                    }}>
                    <i className="ri-delete-bin-5-fill align-bottom fs-24" />
                  </button>
                </div>
              </Col>
            </div>
          </Row>
        </Container>
      </div>
      {/* this is for add role */}
      <Modal isOpen={addRole} toggle={forAddROle} centered>
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={forAddROle}>
          Add Role
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                New Role
              </label>
              <input
                type="text"
                id="customername-field"
                className="form-control"
                placeholder="Enter Catagory "
                onChange={(e) => setRoleValue(e.target.value)}
              />
              {errors.roleValue && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    paddingLeft: "5px",
                  }}>
                  {errors.roleValue}
                </p>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setAddRole(false)}>
                Close
              </button>
              <button
                onClick={handleRoleSubmit}
                className="btn btn-primary px-2"
                id="add-btn">
                Add Role
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default EcommerceCheckout;
