import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import Select from "react-select";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";

//import images
import profileBg from "../../../../assets/images/profile-bg.jpg";
import avatar1 from "../../../../assets/images/users/avatar-1.jpg";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("1");
  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  //this is my code
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [UserRole, setUserRole] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userImage, setUserImage] = useState("");
  const [errors, setErrors] = useState({});
  const [userCity, setUserCity] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userState, setUserState] = useState("");
  const [UserGender, setUserGender] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({});
  const [oldPassword, setOldPassowrd] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bgImage, setBgImage] = useState("");

  //this is for select role of user
  function handleSelectRole(selectedOption) {
    setUserRole(selectedOption.value);
  }

  //this is for select user gender
  function handleSelectGender(selectedOption) {
    setUserGender(selectedOption.value);
  }

  //this user roles list
  const UserRoles = [
    {
      options: [
        { label: "Select Role...", value: "Select Role" },
        { label: "Admin", value: "Admin" },
        { label: "Cashier", value: "Cashier" },
        { label: "Waiter", value: "Waiter" },
        { label: "Order Taker", value: "Order Taker" },
        { label: "User", value: "User" },
      ],
    },
  ];

  //this is user Gender List
  const userGenders = [
    {
      options: [
        { label: "Select Gender...", value: "Select Gender" },
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
      ],
    },
  ];

  //this is for catch errors for add user
  const CatchErrorAddUser = () => {
    let isOk = true;
    let newErrors = {};

    if (!userEmail.trim()) {
      newErrors.userEmail = "Email is Required";
      toast.error("Email is Required");
      isOk = false;
    } else if (!isEmail(userEmail)) {
      newErrors.userEmail = "Please Enter Valid Email";
      toast.error("Please Enter Valid email");
      isOk = false;
    } else if (!userName.trim()) {
      newErrors.userName = "Name is Required";
      toast.error("Name is Required");
      isOk = false;
    } else if (!UserRole.trim()) {
      newErrors.userRole = "Please Select user Role";
      toast.error("please select User Role");
      isOk = false;
    } else if (userPhone.length < 11) {
      newErrors.userPhone = "phone Number should be at least 11 letters";
      toast.error("phone Number should be at least 11 letters");
      isOk = false;
    } else if (!userAddress.trim()) {
      newErrors.userAddress = "Address is Required";
      toast.error("address is required");
      isOk = false;
    } else if (!userCity.trim()) {
      newErrors.userCity = "City is Required";
      toast.error("City is Required");
      isOk = false;
    } else if (!userState.trim()) {
      newErrors.userState = "State is Required";
      toast.error("State is required");
      isOk = false;
    } else if (!userCountry.trim()) {
      newErrors.userCountry = "Country is Required";
      toast.error("Country is Required");
      isOk = false;
    } else if (!UserGender.trim()) {
      newErrors.UserGender = "Please Select Gender";
      toast.error("Please Select Gender");
      isOk = false;
    }
    setErrors(newErrors);
    return isOk;
  };

  //this is for catch errors for password
  const catchPasswordErrors = () => {
    let isOk = true;
    let newErrors = {};

    if (!oldPassword.trim()) {
      newErrors.oldPassword = "Old Password is Required";
      toast.error("Old Password is Required");
      isOk = false;
    } else if (password.length < 8) {
      newErrors.password = "Password should be at least 8 letters";
      toast.error("Password should be at least 8 letters");
      isOk = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Password and Confirm Password should be same";
      toast.error("Password and Confirm Password should be same");
      isOk = false;
    }

    setPasswordErrors(newErrors);
    return isOk;
  };

  //this is for password submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (catchPasswordErrors()) {
      let formData = {
        oldPassword,
        password,
        confirmPassword,
      };
      console.log("form data", formData);
    }
  };

  //this is for handleSubmit
  const forAddUserSubmit = (e) => {
    e.preventDefault();
    if (CatchErrorAddUser()) {
      let formData = new FormData();
      formData.append("user Email", userEmail);
      formData.append("userName", userName);
      formData.append("userPhone", userPhone);
      formData.append("UserRole", UserRole);
      formData.append("userAddress", userAddress);
      formData.append("userCity", userCity);
      formData.append("userState", userState);
      formData.append("userCountry", userCountry);
      formData.append("UserGender", UserGender);
      formData.append("image", userImage);
      console.log("my form Data", formData);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg profile-setting-img">
              <img
                src={bgImage ? URL.createObjectURL(bgImage) : profileBg}
                className="profile-wid-img"
                alt=""
              />
              <div className="overlay-content">
                <div className="text-end p-3">
                  <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                    <Input
                      id="profile-foreground-img-file-input"
                      type="file"
                      className="profile-foreground-img-file-input"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setBgImage(file);
                      }}
                    />
                    <Label
                      htmlFor="profile-foreground-img-file-input"
                      className="profile-photo-edit btn btn-light">
                      <i className="ri-image-edit-line align-bottom me-1"></i>{" "}
                      Change Cover
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col xxl={3}>
              <Card className="mt-n5">
                <CardBody className="p-4">
                  <div className="text-center">
                    <div className="position-relative d-inline-block mx-auto mb-4">
                      <div className="position-absolute bottom-0 end-0">
                        <Label htmlFor="company-logo-input" className="mb-0">
                          <div className="avatar-xs cursor-pointer">
                            <div className="avatar-title bg-light border rounded-circle text-muted">
                              <i className="ri-image-fill"></i>
                            </div>
                          </div>
                        </Label>
                        <Input
                          name="img"
                          className="form-control d-none"
                          id="company-logo-input"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setUserImage(file);
                          }}
                        />
                      </div>
                      <div className="avatar-lg p-1">
                        <div className="avatar-title bg-light rounded-circle">
                          <img
                            src={
                              userImage
                                ? URL.createObjectURL(userImage)
                                : avatar1
                            }
                            alt="multiUser"
                            id="companylogo-img"
                            className="avatar-lg rounded-circle object-fit-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <h5 className="fs-17 mb-1">Muhammad Riaz Ahamd shb</h5>
                    <p className="text-muted mb-0">Order Taker</p>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xxl={9}>
              <Card className="mt-xxl-n5">
                <CardHeader>
                  <Nav
                    className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                    role="tablist">
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          tabChange("1");
                        }}>
                        <i className="fas fa-home"></i>
                        Personal Details
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          tabChange("2");
                        }}
                        type="button">
                        <i className="far fa-user"></i>
                        Change Password
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody className="p-4">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Form>
                        <div className="px-5 py-3">
                          <Row>
                            <Col sm={12}>
                              <div className="mb-3">
                                <Label
                                  htmlFor="billinginfo-firstName"
                                  className="form-label">
                                  User Email
                                </Label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="billinginfo-firstName"
                                  placeholder="Enter Email"
                                  onChange={(e) => setUserEmail(e.target.value)}
                                />
                                {errors.userEmail && (
                                  <p
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      paddingLeft: "5px",
                                    }}>
                                    {errors.userEmail}
                                  </p>
                                )}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col sm={6}>
                              <div className="mb-3">
                                <Label
                                  htmlFor="billinginfo-email"
                                  className="form-label">
                                  User Name
                                </Label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="billinginfo-email"
                                  placeholder="Enter Name"
                                  onChange={(e) => setUserName(e.target.value)}
                                />
                                {errors.userName && (
                                  <p
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      paddingLeft: "5px",
                                    }}>
                                    {errors.userName}
                                  </p>
                                )}
                              </div>
                            </Col>

                            <Col sm={6}>
                              <div className="mb-3">
                                <Label htmlFor="role" className="form-label">
                                  Select Role
                                </Label>
                                <Select
                                  value={UserRole}
                                  onChange={(selectedOption) =>
                                    handleSelectRole(selectedOption)
                                  }
                                  placeholder={
                                    UserRole ? UserRole : "select User Role"
                                  }
                                  options={UserRoles}
                                  id="country"></Select>
                                {errors.userRole && (
                                  <p
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      paddingLeft: "5px",
                                    }}>
                                    {errors.userRole}
                                  </p>
                                )}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={6}>
                              <div className="mb-3">
                                <Label
                                  htmlFor="billinginfo-email"
                                  className="form-label">
                                  User Phone
                                </Label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="billinginfo-email"
                                  placeholder="Enter Phone"
                                  onChange={(e) => setUserPhone(e.target.value)}
                                />
                                {errors.userPhone && (
                                  <p
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      paddingLeft: "5px",
                                    }}>
                                    {errors.userPhone}
                                  </p>
                                )}
                              </div>
                            </Col>

                            <Col sm={6}>
                              <div className="mb-3">
                                <Label
                                  htmlFor="billinginfo-email"
                                  className="form-label">
                                  User Address
                                </Label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="billinginfo-email"
                                  placeholder="Enter Address"
                                  onChange={(e) =>
                                    setUserAddress(e.target.value)
                                  }
                                />
                                {errors.userAddress && (
                                  <p
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      paddingLeft: "5px",
                                    }}>
                                    {errors.userAddress}
                                  </p>
                                )}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={6}>
                              <div className="mb-3">
                                <Label
                                  htmlFor="billinginfo-email"
                                  className="form-label">
                                  City
                                </Label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="billinginfo-email"
                                  placeholder="Enter City"
                                  onChange={(e) => setUserCity(e.target.value)}
                                />
                                {errors.userCity && (
                                  <p
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      paddingLeft: "5px",
                                    }}>
                                    {errors.userCity}
                                  </p>
                                )}
                              </div>
                            </Col>

                            <Col sm={6}>
                              <div className="mb-3">
                                <Label
                                  htmlFor="billinginfo-email"
                                  className="form-label">
                                  State
                                </Label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="billinginfo-email"
                                  placeholder="Enter State"
                                  onChange={(e) => setUserState(e.target.value)}
                                />
                                {errors.userState && (
                                  <p
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      paddingLeft: "5px",
                                    }}>
                                    {errors.userState}
                                  </p>
                                )}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={6}>
                              <div className="mb-3">
                                <Label
                                  htmlFor="billinginfo-email"
                                  className="form-label">
                                  Country
                                </Label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="billinginfo-email"
                                  placeholder="Enter Country"
                                  onChange={(e) =>
                                    setUserCountry(e.target.value)
                                  }
                                />
                                {errors.userCountry && (
                                  <p
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      paddingLeft: "5px",
                                    }}>
                                    {errors.userCountry}
                                  </p>
                                )}
                              </div>
                            </Col>

                            <Col sm={6}>
                              <div className="mb-3">
                                <Label htmlFor="gender" className="form-label">
                                  Select Gender
                                </Label>
                                <Select
                                  value={UserGender}
                                  onChange={(selectedOption) =>
                                    handleSelectGender(selectedOption)
                                  }
                                  placeholder={
                                    UserGender ? UserGender : "select Gender"
                                  }
                                  options={userGenders}
                                  id="gender"></Select>
                                {errors.UserGender && (
                                  <p
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      paddingLeft: "5px",
                                    }}>
                                    {errors.UserGender}
                                  </p>
                                )}
                              </div>
                            </Col>
                          </Row>

                          <div className="hstack gap-2 justify-content-end my-5">
                            <button
                              className="btn btn-primary"
                              type="submit"
                              id="add-btn"
                              onClick={forAddUserSubmit}>
                              Update User
                            </button>
                          </div>
                        </div>
                      </Form>
                    </TabPane>

                    <TabPane tabId="2">
                      <Form>
                        <Row className="g-2">
                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="oldpasswordInput"
                                className="form-label">
                                Old Password*
                              </Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="oldpasswordInput"
                                placeholder="Enter current password"
                                onChange={(e) => setOldPassowrd(e.target.value)}
                              />{" "}
                              {passwordErrors.oldPassword && (
                                <p
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    paddingLeft: "5px",
                                  }}>
                                  {passwordErrors.oldPassword}
                                </p>
                              )}
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="newpasswordInput"
                                className="form-label">
                                New Password*
                              </Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="newpasswordInput"
                                placeholder="Enter new password"
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              {passwordErrors.password && (
                                <p
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    paddingLeft: "5px",
                                  }}>
                                  {passwordErrors.password}
                                </p>
                              )}
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="confirmpasswordInput"
                                className="form-label">
                                Confirm Password*
                              </Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="confirmpasswordInput"
                                placeholder="Confirm password"
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                              {passwordErrors.confirmPassword && (
                                <p
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    paddingLeft: "5px",
                                  }}>
                                  {passwordErrors.confirmPassword}
                                </p>
                              )}
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="mb-3">
                              <Link
                                to="#"
                                className="link-primary text-decoration-underline">
                                Forgot Password ?
                              </Link>
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="text-end">
                              <button
                                type="submit"
                                onClick={handlePasswordSubmit}
                                className="btn btn-success">
                                Change Password
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Settings;
