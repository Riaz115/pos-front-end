import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  Form,
} from "reactstrap";
import { toast } from "react-toastify";
import avatar from "../../assets/images/users/avatar-1.jpg";
import { UseRiazHook } from "../../RiazStore/RiazStore";

const UserProfile = () => {
  const [updateUserName, setUpdateUserName] = useState("");
  const [errors, setErrors] = useState({});

  //this is my store file data
  const { userData, userImage } = UseRiazHook();

  //this is for catchError
  const forCatchErrors = () => {
    let isOk = true;
    let newErrors = {};

    if (!updateUserName.trim()) {
      newErrors.updateUserName = "Please Enter Name";
      toast.error("Name is Required");
      isOk = false;
    }

    setErrors(newErrors);
    return isOk;
  };

  //this is for submit and update
  const forHandleUpdateSubmit = (e) => {
    e.preventDefault();
    if (forCatchErrors()) {
      let formData = {
        updateUserName,
      };
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center ">
                    <div className="mx-3">
                      <img
                        src={userImage ? userImage : avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{userData.name}</h5>
                        <p className="my-1">Phone : {userData.phone}</p>
                        <p className="my-1">Email Id : {userData.email}</p>
                        <p className="mt-1 mb-0">{userData.address}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
              <Form className="form-horizontal">
                <div className="form-group">
                  <Label className="form-label">{userData.name}</Label>
                  <Input
                    name="first_name"
                    className="form-control"
                    placeholder="Enter User Name"
                    onChange={(e) => setUpdateUserName(e.target.value)}
                    type="text"
                  />
                  {errors.updateUserName && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}>
                      {errors.updateUserName}
                    </p>
                  )}
                </div>
                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    color="danger"
                    onClick={forHandleUpdateSubmit}>
                    Update User Name
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
