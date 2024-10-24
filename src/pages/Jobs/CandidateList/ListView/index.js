import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { jobCandidates } from "../../../../common/data/appsJobs";
import myImage from "../../../../assets/images/users/avatar-1.jpg";
import {
  Button,
  Col,
  Card,
  CardBody,
  Container,
  Row,
  Input,
  Table,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Label,
} from "reactstrap";
import Select from "react-select";
import SimpleBar from "simplebar-react";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import { UseRiazHook } from "../../../../RiazStore/RiazStore";

const CandidateList = () => {
  const [candidateData, setCandidateData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  //this is for testing
  const { riaz } = UseRiazHook();

  //pagination
  const perPageData = 8;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;
  const currentdata = useMemo(
    () => jobCandidates?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  useEffect(() => {
    setCandidateData(currentdata);
  }, [currentdata]);

  //this is my code
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [UserRole, setUserRole] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userImage, setUserImage] = useState("");
  const [isRight, setIsRight] = useState(false);
  const [errors, setErrors] = useState({});
  const [forEditUser, setForEditUser] = useState(false);
  const [userCity, setUserCity] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userState, setUserState] = useState("");
  const [UserGender, setUserGender] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");

  //this is for select role of user
  function handleSelectRole(selectedOption) {
    setUserRole(selectedOption.value);
  }

  //this is for select user gender
  function handleSelectGender(selectedOption) {
    setUserGender(selectedOption.value);
  }

  //this is for open canvas to add user
  const toggleRightCanvas = () => {
    setIsRight(!isRight);
  };

  //this is for open canvas to edit user
  const toggleRightCanvasforEditUser = () => {
    setForEditUser(!forEditUser);
  };

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
    } else if (userPassword.length < 8) {
      newErrors.userPassword = "Password must be at least 8 characters long";
      toast.error("password must should be at leat 8 letters");
      isOk = false;
    } else if (userPassword !== confirmUserPassword) {
      newErrors.confirmUserPassword =
        "Password and Confirm Password do not match";
      toast.error("Password and Confirm Password do not match");
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

  //this is for handleSubmit
  const forAddUserSubmit = () => {
    if (CatchErrorAddUser()) {
      let formData = new FormData();
      formData.append("user Email", userEmail);
      formData.append("userName", userName);
      formData.append("userPhone", userPhone);
      formData.append("UserRole", UserRole);
      formData.append("userAddress", userAddress);
      formData.append("image", userImage);
      formData.append("userCity", userCity);
      formData.append("userState", userState);
      formData.append("userCountry", userCountry);
      formData.append("UserGender", UserGender);

      console.log("my form Data", formData);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="g-4 mb-4">
            <Col className="col-sm-auto">
              <div>
                <Link
                  to="#!"
                  className="btn bg-dark text-white "
                  onClick={toggleRightCanvas}>
                  <i className="ri-add-line align-bottom me-1 "></i>Add User
                </Link>
              </div>
            </Col>
            <Col className="col-sm">
              <div className="d-md-flex justify-content-sm-end gap-2">
                <div className="search-box ms-md-2 flex-shrink-0 mb-3 mb-md-0">
                  <Input
                    type="text"
                    className="form-control"
                    id="searchJob"
                    autoComplete="off"
                    placeholder="user Name"
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>

                <div className="search-box ms-md-2 flex-shrink-0 mb-3 mb-md-0">
                  <Input
                    type="text"
                    className="form-control"
                    id="searchJob"
                    autoComplete="off"
                    placeholder="User Role"
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>

                <div className="search-box ms-md-2 flex-shrink-0 mb-3 mb-md-0">
                  <Input
                    type="text"
                    className="form-control"
                    id="searchJob"
                    autoComplete="off"
                    placeholder="User email"
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="gy-2 mb-2" id="candidate-list">
            {(candidateData || []).map((item, key) => (
              <Col lg={12} key={key}>
                <Card className="mb-0">
                  <CardBody>
                    <div className="d-lg-flex align-items-center">
                      <div className="flex-shrink-0">
                        {item.nickname ? (
                          <div className="avatar-title border bg-light text-primary rounded p-2 text-uppercase fs-16">
                            {item.nickname}
                          </div>
                        ) : (
                          <div className="avatar-sm rounded">
                            <img
                              src={myImage}
                              alt="my pic"
                              className="member-img img-fluid d-block rounded"></img>
                          </div>
                        )}
                      </div>
                      <div className="ms-3">
                        <h5 className="fs-16 mb-2">Muhammad Riaz Ahmad</h5>
                      </div>
                      <div className="d-flex gap-4 mt-0 text-muted mx-auto">
                        <h5 className="fs-16 mb-2">
                          riazahamdsandhilashb@gmail.com
                        </h5>
                      </div>
                      <div className="d-flex gap-4 mt-0 text-muted mx-auto">
                        <h5 className="fs-16 mb-2">
                          <i className="ri-phone-line"></i> 0321-1234567
                        </h5>
                      </div>
                      <div className="d-flex gap-4 mt-0 text-muted mx-auto">
                        <h5 className="fs-16 mb-2">
                          chak no 115 sahiwal in punjab in city
                        </h5>
                      </div>
                      <div className="d-flex flex-wrap gap-2 align-items-center mx-auto">
                        <h5 className="fs-16 mb-2">Order Taker</h5>
                      </div>
                      <div className="hstack gap-2">
                        <button
                          className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                          onClick={toggleRightCanvasforEditUser}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#E6F7FC",
                          }}>
                          <i className="ri-pencil-fill align-bottom" />
                        </button>
                        <button
                          className="btn btn-sm btn-soft-danger remove-list delete-btn"
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#FEEDE9",
                            color: "red",
                          }}>
                          <i className="ri-delete-bin-5-fill align-bottom" />
                        </button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* this is for the add user */}
      <Offcanvas
        isOpen={isRight}
        direction="end"
        toggle={toggleRightCanvas}
        id="offcanvasRight"
        className="border-bottom w-75  ">
        <OffcanvasHeader toggle={toggleRightCanvas} id="offcanvasRightLabel">
          <h1>Add User</h1>
        </OffcanvasHeader>
        <OffcanvasBody className="p-0 overflow-scroll">
          <SimpleBar style={{ height: "100vh" }}>
            <div className="px-5 py-3">
              <Row>
                <Col lg={12}>
                  <div className="text-center">
                    <div className="position-relative d-inline-block">
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
                                : myImage
                            }
                            alt="multiUser"
                            id="companylogo-img"
                            className="avatar-md rounded-circle object-fit-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <h5 className="fs-13 mt-3">User Image</h5>
                  </div>
                </Col>

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
                    <Label htmlFor="billinginfo-email" className="form-label">
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
                      placeholder={UserRole ? UserRole : "select User Role"}
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
                    <Label htmlFor="billinginfo-email" className="form-label">
                      User Password
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Name"
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                    {errors.userPassword && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.userPassword}
                      </p>
                    )}
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Confirm Password
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Name"
                      onChange={(e) => setConfirmUserPassword(e.target.value)}
                    />
                    {errors.confirmUserPassword && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.confirmUserPassword}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
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
                    <Label htmlFor="billinginfo-email" className="form-label">
                      User Address
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Address"
                      onChange={(e) => setUserAddress(e.target.value)}
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
                    <Label htmlFor="billinginfo-email" className="form-label">
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
                    <Label htmlFor="billinginfo-email" className="form-label">
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
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Country
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Country"
                      onChange={(e) => setUserCountry(e.target.value)}
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
                      placeholder={UserGender ? UserGender : "select Gender"}
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
                  type="button"
                  className="btn bg-dark text-white"
                  onClick={toggleRightCanvas}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  id="add-btn"
                  onClick={forAddUserSubmit}>
                  Add User
                </button>
              </div>
            </div>
          </SimpleBar>
        </OffcanvasBody>
      </Offcanvas>

      {/* this is for edit user */}
      <Offcanvas
        isOpen={forEditUser}
        direction="end"
        toggle={toggleRightCanvasforEditUser}
        id="offcanvasRight"
        className="border-bottom w-75">
        <OffcanvasHeader
          toggle={toggleRightCanvasforEditUser}
          id="offcanvasRightLabel">
          <h1>Edit User</h1>
        </OffcanvasHeader>
        <OffcanvasBody className="p-0 overflow-scroll">
          <SimpleBar style={{ height: "100vh" }}>
            <div className="px-5 py-3">
              <Row>
                <Col lg={12}>
                  <div className="text-center">
                    <div className="position-relative d-inline-block">
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
                                : myImage
                            }
                            alt="multiUser"
                            id="companylogo-img"
                            className="avatar-md rounded-circle object-fit-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <h5 className="fs-13 mt-3">User Image</h5>
                  </div>
                </Col>

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
                    <Label htmlFor="billinginfo-email" className="form-label">
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
                      placeholder={UserRole ? UserRole : "select User Role"}
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
                    <Label htmlFor="billinginfo-email" className="form-label">
                      User Password
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Name"
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                    {errors.userPassword && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.userPassword}
                      </p>
                    )}
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Confirm Password
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Name"
                      onChange={(e) => setConfirmUserPassword(e.target.value)}
                    />
                    {errors.confirmUserPassword && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.confirmUserPassword}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
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
                    <Label htmlFor="billinginfo-email" className="form-label">
                      User Address
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Address"
                      onChange={(e) => setUserAddress(e.target.value)}
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
                    <Label htmlFor="billinginfo-email" className="form-label">
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
                    <Label htmlFor="billinginfo-email" className="form-label">
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
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Country
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Country"
                      onChange={(e) => setUserCountry(e.target.value)}
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
                      placeholder={UserGender ? UserGender : "select Gender"}
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
                  type="button"
                  className="btn bg-dark text-white"
                  onClick={toggleRightCanvasforEditUser}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  id="add-btn"
                  onClick={forAddUserSubmit}>
                  Edit User
                </button>
              </div>
            </div>
          </SimpleBar>
        </OffcanvasBody>
      </Offcanvas>
    </React.Fragment>
  );
};

export default CandidateList;
