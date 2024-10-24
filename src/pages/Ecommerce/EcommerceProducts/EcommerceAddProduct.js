import React, { useState, useMemo, useEffect } from "react";
import myImage from "../../../assets/images/users/avatar-1.jpg";
import {
  Col,
  Card,
  CardBody,
  Container,
  Row,
  Input,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Label,
} from "reactstrap";
import Select from "react-select";
import SimpleBar from "simplebar-react";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import { country } from "../../../common/data";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import DeleteModal from "../../../Components/Common/DeleteModal";
import Pagination from "../../../Components/Common/Pagination";

import { Link, useNavigate, useParams } from "react-router-dom";

const EcommerceAddProduct = () => {
  const { newId } = useParams();

  const [counterUserName, setCounterUserName] = useState("");
  const [counterUserEmail, setCounterUserEmail] = useState("");
  const [counterUserPassword, setCounterUserPassword] = useState("");
  const [counterUserPhone, setCounterUserPhone] = useState("");
  const [counterUseraddress, setCounterUseraddress] = useState("");
  const [counterUserImage, setCounterUserImage] = useState("");
  const [isRight, setIsRight] = useState(false);
  const [errors, setErrors] = useState({});
  const [counterUserGender, setCounterUserGender] = useState("");
  const [counterUserRole, setCounterUserRole] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [counterUserCountry, setCounterUserCountry] = useState("");
  const [counterUserState, setCounterUserState] = useState("");
  const [counterUserCity, setCounterUserCity] = useState("");
  const [counterAllUsers, setCounterAllUsers] = useState([]);
  const [forEditUser, setForEditUser] = useState(false);
  const [countries, setCountries] = useState([]);
  const [passwordShow, setCounterUserPasswordShow] = useState(false);
  const [showConfrimPassword, setShowConfirmPassword] = useState(false);
  const [editImage, setEditImage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [idForDelete, setIdForDelete] = useState("");
  const [allUser, setAllUsers] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState("");

  //this is for getting data from hook
  const { myUrl } = UseRiazHook();

  //this is for pagination
  const perPageData = 10;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  //this is for page current data
  const currentdata = useMemo(
    () => counterAllUsers?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  //this is for first time load and set data
  useEffect(() => {
    setAllUsers(counterAllUsers.slice(0, perPageData));
  }, [counterAllUsers]);

  //this is for set current data of page
  useEffect(() => {
    setAllUsers(currentdata);
  }, [currentdata]);

  //this is for search from users
  const OnchangeHandler = (e) => {
    let search = e.target.value;
    if (search) {
      const filteredUsers = counterAllUsers.filter((data) =>
        Object.values(data).some(
          (field) =>
            typeof field === "string" &&
            field.toLowerCase().includes(search.toLowerCase())
        )
      );
      setAllUsers(filteredUsers.slice(0, perPageData));
      setCurrentPage(1);
    } else {
      setAllUsers(counterAllUsers.slice(indexOfFirst, indexOfLast));
    }
  };

  //this is for select country
  const forSelectCountry = async (myCountryOption) => {
    if (myCountryOption && myCountryOption.countryName) {
      setCounterUserCountry(myCountryOption.countryName);
    } else {
      setCounterUserCountry("null");
    }
  };

  //this is for select user gender
  function handleSelectGender(selectedOption) {
    setCounterUserGender(selectedOption.value);
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

  //this is for select role of user
  function handleSelectRole(selectedOption) {
    setCounterUserRole(selectedOption.value);
  }

  //this is for open canvas to add user
  const toggleForAddUser = () => {
    setIsRight(!isRight);
  };

  //this is for open canvas to edit user
  const toggleForEditUser = () => {
    setForEditUser(!forEditUser);
  };

  //this is user Gender List
  const genders = [
    {
      options: [
        { label: "Select Gender...", value: "Select Gender" },
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
      ],
    },
  ];

  //this is for all countries
  useEffect(() => {
    const forAllCountries = country.map((item) => ({
      value: item.countryName,
      label: item.countryName,
      myCode: item.myCode,
      flagImg: item.flagImg,
    }));

    setCountries(forAllCountries);
  }, []);

  //this is for country flags etc
  const formatOptionLabel = ({ flagImg, countryName }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={flagImg} // Update this to the actual flag image path or URL
        alt={countryName}
        style={{ width: "20px", height: "15px", marginRight: "8px" }} // Adjust size as needed
      />
      <span>{countryName}</span>
    </div>
  );

  //this is for get all users of counter
  const forGetCounterAllUsers = async () => {
    const url = `${myUrl}/getcounterallusers/${newId}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setCounterAllUsers(data);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get all user of counter function",
        err
      );
    }
  };

  //this is for catch errors for add user
  const CatchErrorAddUser = () => {
    let isOk = true;
    let newErrors = {};

    if (!counterUserName.trim()) {
      newErrors.counterUserName = "Name is Required";
      toast.error("Name is Required");
      isOk = false;
    } else if (!counterUserEmail.trim()) {
      newErrors.counterUserEmail = "Email is Required";
      toast.error("Email is Required");
      isOk = false;
    } else if (!isEmail(counterUserEmail)) {
      newErrors.counterUserEmail = "Please Enter Valid Email";
      toast.error("Please Enter Valid email");
      isOk = false;
    } else if (counterUserPassword.length < 1) {
      newErrors.counterUserPassword =
        "Password must be at least 8 characters long";
      toast.error("password must should be at leat 8 letters");
      isOk = false;
    } else if (counterUserPassword !== confirmpassword) {
      newErrors.confirmpassword = "Password and Confirm Password do not match";
      toast.error("Password and Confirm Password do not match");
      isOk = false;
    } else if (counterUserPhone.length < 11) {
      newErrors.counterUserPhone = "phone Number should be at least 11 letters";
      toast.error("phone Number should be at least 11 letters");
      isOk = false;
    } else if (!counterUserGender.trim()) {
      newErrors.counterUserGender = "Please Select Gender";
      toast.error("Please Select Gender");
      isOk = false;
    } else if (!counterUserCountry.trim()) {
      newErrors.counterUserCountry = "Country is Required";
      toast.error("Country is Required");
      isOk = false;
    } else if (!counterUserState.trim()) {
      newErrors.counterUserState = "State is Required";
      toast.error("State is required");
      isOk = false;
    } else if (!counterUserCity.trim()) {
      newErrors.counterUserCity = "City is Required";
      toast.error("City is Required");
      isOk = false;
    } else if (!counterUseraddress.trim()) {
      newErrors.counterUseraddress = "Address is Required";
      toast.error("address is required");
      isOk = false;
    } else if (!counterUserRole.trim()) {
      newErrors.counterUserRole = "Please Select Role";
      toast.error("Please Select Role");
      isOk = false;
    }
    setErrors(newErrors);
    return isOk;
  };

  //this is for handleSubmit
  const forAddUserSubmit = () => {
    if (CatchErrorAddUser()) {
      let formData = new FormData();
      formData.append("counterUserName", counterUserName);
      formData.append("counterUserEmail", counterUserEmail);
      formData.append("counterUserPhone", counterUserPhone);
      formData.append("counterUseraddress", counterUseraddress);
      formData.append("counterUserImage", counterUserImage);
      formData.append("counterUserState", counterUserState);
      formData.append("counterUserCountry", counterUserCountry);
      formData.append("counterUserCity", counterUserCity);
      formData.append("counterUserGender", counterUserGender);
      formData.append("counterUserPassword", counterUserPassword);
      formData.append("counterUserRole", counterUserRole);

      //this is for post the user data
      const forAddUserData = async () => {
        const url = `${myUrl}/addcounteruser/${newId}`;
        const options = {
          method: "POST",
          body: formData,
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            toast.success(data.msg);
            forGetCounterAllUsers();
            setIsRight(false);
          } else {
            toast.error(data.msg);
            console.log("err data", data);
          }
        } catch (err) {
          console.log("there is error in the add User function");
        }
      };

      //calling the function
      forAddUserData();
    }
  };

  //this is for catch errors for add user
  const CatchErrorEditUser = () => {
    let isOk = true;
    let newErrors = {};

    if (!counterUserName.trim()) {
      newErrors.counterUserName = "Name is Required";
      toast.error("Name is Required");
      isOk = false;
    } else if (!counterUserEmail.trim()) {
      newErrors.counterUserEmail = "Email is Required";
      toast.error("Email is Required");
      isOk = false;
    } else if (!isEmail(counterUserEmail)) {
      newErrors.counterUserEmail = "Please Enter Valid Email";
      toast.error("Please Enter Valid email");
      isOk = false;
    } else if (counterUserPassword !== confirmpassword) {
      newErrors.confirmpassword = "Password and Confirm Password do not match";
      toast.error("Password and Confirm Password do not match");
      isOk = false;
    } else if (counterUserPhone.length < 11) {
      newErrors.counterUserPhone = "phone Number should be at least 11 letters";
      toast.error("phone Number should be at least 11 letters");
      isOk = false;
    } else if (!counterUserGender.trim()) {
      newErrors.counterUserGender = "Please Select Gender";
      toast.error("Please Select Gender");
      isOk = false;
    } else if (!counterUserCountry.trim()) {
      newErrors.counterUserCountry = "Country is Required";
      toast.error("Country is Required");
      isOk = false;
    } else if (!counterUserState.trim()) {
      newErrors.counterUserState = "State is Required";
      toast.error("State is required");
      isOk = false;
    } else if (!counterUserCity.trim()) {
      newErrors.counterUserCity = "City is Required";
      toast.error("City is Required");
      isOk = false;
    } else if (!counterUseraddress.trim()) {
      newErrors.counterUseraddress = "Address is Required";
      toast.error("address is required");
      isOk = false;
    } else if (!counterUserRole.trim()) {
      newErrors.counterUserRole = "Please Select Role";
      toast.error("Please Select Role");
      isOk = false;
    }
    setErrors(newErrors);
    return isOk;
  };

  // //this is for delete user
  // const forDeleteUser = async (id) => {
  //   const url = `${myUrl}/deleteOwnerUser/${id}`;
  //   const options = {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   try {
  //     const response = await fetch(url, options);
  //     const data = await response.json();

  //     if (response.ok) {
  //       toast.success("user deleted successfully");
  //       counterAllUsersGet();
  //       console.log("sucess data", data);
  //     } else {
  //       toast.error("user not deleted");
  //       console.log("error data", data);
  //     }
  //   } catch (err) {
  //     console.log("there is error in delete user function", err);
  //   }
  // };

  //this is for get user data for update
  const getUserDataForUpdate = async (id) => {
    const url = `${myUrl}/getuserforedit/${id}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setCounterUserName(data.counterUser.counterUserName);
        setCounterUserEmail(data.counterUser.counterUserEmail);
        setCounterUserPhone(data.counterUser.counterUserPhone);
        setCounterUseraddress(data.counterUser.counterUseraddress);
        setEditImage(data.counterUser.counterUserImage);
        setCounterUserGender(data.counterUser.counterUserGender);
        setCounterUserRole(data.counterUser.counterUserRole);
        setCounterUserCountry(data.counterUser.counterUserCountry);
        setCounterUserState(data.counterUser.counterUserState);
        setCounterUserCity(data.counterUser.counterUserCity);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is eror in get user data forupate function", err);
    }
  };

  //this is for edit user button click get
  const forClickEditUserBtn = (id) => {
    setForEditUser(!forEditUser);
    getUserDataForUpdate(id);
    setUserId(id);
  };

  //this is for updated user
  const forEditUserSubmit = () => {
    if (CatchErrorEditUser()) {
      let formData = new FormData();
      formData.append("counterUserName", counterUserName);
      formData.append("counterUserEmail", counterUserEmail);
      formData.append("counterUserPhone", counterUserPhone);
      formData.append("counterUseraddress", counterUseraddress);
      formData.append("counterUserImage", counterUserImage);
      formData.append("counterUserState", counterUserState);
      formData.append("counterUserCountry", counterUserCountry);
      formData.append("counterUserCity", counterUserCity);
      formData.append("counterUserGender", counterUserGender);
      formData.append("counterUserPassword", counterUserPassword);
      formData.append("counterUserRole", counterUserRole);

      //this is for update user data
      const forUpdateUserData = async () => {
        const id = userId;

        const url = `${myUrl}/foreditcounteruser/${id}`;
        const options = {
          method: "PATCH",
          body: formData,
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();

          if (response.ok) {
            toast.success(data.msg);
            console.log("data", data);
            forGetCounterAllUsers();
            setForEditUser(!forEditUser);
          } else {
            toast.error(data.msg);
          }
        } catch (err) {
          console.log("there is error in the update user function", err);
        }
      };

      forUpdateUserData();
    }
  };

  // //handle click on delete button
  // const clickOnDeleteBtn = (id) => {
  //   setDeleteModal(!deleteModal);
  //   setIdForDelete(id);
  // };

  // //this is for delete
  // const handleForDeleteUser = () => {
  //   forDeleteUser(idForDelete);
  //   setDeleteModal(false);
  // };

  //this is for getting data
  useEffect(() => {
    forGetCounterAllUsers();
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <Row className="g-4 mb-4">
          <Col className="col-sm-auto">
            <div>
              <Link
                to="#!"
                className="btn bg-dark text-white "
                onClick={toggleForAddUser}>
                <i className="ri-add-line align-bottom me-1 "></i> Add User
              </Link>
            </div>
          </Col>
          <Col className="col-sm">
            <div className="d-md-flex justify-content-sm-end gap-2">
              <div className="search-box ms-md-2 flex-shrink-0 mb-3 mb-md-0">
                <Input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  placeholder="user Name"
                  onChange={(e) => OnchangeHandler(e)}
                />
                <i className="ri-search-line search-icon"></i>
              </div>

              <div className="search-box ms-md-2 flex-shrink-0 mb-3 mb-md-0">
                <Input
                  type="number"
                  className="form-control"
                  autoComplete="off"
                  placeholder="User phone"
                  onChange={(e) => OnchangeHandler(e)}
                />
                <i className="ri-search-line search-icon"></i>
              </div>

              <div className="search-box ms-md-2 flex-shrink-0 mb-3 mb-md-0">
                <Input
                  type="email"
                  className="form-control"
                  autoComplete="off"
                  placeholder="User email"
                  onChange={(e) => OnchangeHandler(e)}
                />
                <i className="ri-search-line search-icon"></i>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="gy-2 mb-2" id="candidate-list">
          {(allUser || []).map((user, key) => (
            <Col lg={12} key={key}>
              <Card className="mb-0">
                <CardBody>
                  <div className="d-lg-flex align-items-center">
                    <div className="flex-shrink-0">
                      <div className="avatar-sm rounded">
                        <img
                          src={
                            user.counterUserImage
                              ? user.counterUserImage
                              : myImage
                          }
                          alt="my pic"
                          className="member-img img-fluid d-block rounded"></img>
                      </div>
                    </div>
                    <div className="ms-3">
                      <h5 className="fs-16 mb-2">{user.counterUserName}</h5>
                    </div>
                    <div className="d-flex gap-4 mt-0 text-muted mx-auto">
                      <h5 className="fs-16 mb-2">{user.counterUserEmail}</h5>
                    </div>
                    <div className="d-flex gap-4 mt-0 text-muted mx-auto">
                      <h5 className="fs-16 mb-2">
                        <i className="ri-phone-line"></i>{" "}
                        {user.counterUserPhone}
                      </h5>
                    </div>
                    <div className="d-flex gap-4 mt-0 text-muted mx-auto">
                      <h5 className="fs-16 mb-2">{user.counterUseraddress}</h5>
                    </div>
                    <div className="d-flex gap-4 mt-0 text-muted mx-auto">
                      <h5 className="fs-16 mb-2">{user.counterUserRole}</h5>
                    </div>

                    <div className="hstack gap-2">
                      <button
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                        onClick={() => forClickEditUserBtn(user._id)}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}>
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        // onClick={() => clickOnDeleteBtn(user.userId)}
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

          <div className="my-3 p-3">
            <Pagination
              perPageData={perPageData}
              data={counterAllUsers}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Row>
      </Container>
      {/* this is for the add user */}
      <Offcanvas
        isOpen={isRight}
        direction="end"
        toggle={toggleForAddUser}
        id="offcanvasRight"
        className="border-bottom w-75  ">
        <OffcanvasHeader toggle={toggleForAddUser} id="offcanvasRightLabel">
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
                          name="file"
                          className="form-control d-none"
                          id="company-logo-input"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setCounterUserImage(file);
                          }}
                        />
                      </div>
                      <div className="avatar-lg p-1">
                        <div className="avatar-title bg-light rounded-circle">
                          <img
                            src={
                              counterUserImage
                                ? URL.createObjectURL(counterUserImage)
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
                      value={counterUserName}
                      placeholder="Enter Name"
                      onChange={(e) => setCounterUserName(e.target.value)}
                    />
                    {errors.counterUserName && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUserName}
                      </p>
                    )}
                  </div>
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label
                      htmlFor="billinginfo-firstName"
                      className="form-label">
                      User Email
                    </Label>
                    <input
                      type="email"
                      className="form-control"
                      value={counterUserEmail}
                      id="billinginfo-firstName"
                      placeholder="Enter Email"
                      onChange={(e) => setCounterUserEmail(e.target.value)}
                    />
                    {errors.counterUserEmail && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUserEmail}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <div>
                    <Label className="form-label" htmlFor="password-input">
                      Password
                    </Label>
                    <div className="position-relative auth-pass-inputgroup mb-3">
                      <Input
                        className="form-control"
                        placeholder="Enter Passwrod if you want to change"
                        onChange={(e) => setCounterUserPassword(e.target.value)}
                        type={passwordShow ? "text" : "password"}
                      />

                      <button
                        className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                        type="button"
                        id="password-addon"
                        onClick={() =>
                          setCounterUserPasswordShow(!passwordShow)
                        }>
                        <i className="ri-eye-fill align-middle"></i>
                      </button>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div>
                    <Label className="form-label" htmlFor="password-input">
                      Confirm Password
                    </Label>
                    <div className="position-relative auth-pass-inputgroup mb-3">
                      <Input
                        className="form-control"
                        placeholder="Enter Name"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                        type={showConfrimPassword ? "text" : "password"}
                      />

                      <button
                        className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                        type="button"
                        id="password-addon"
                        onClick={() =>
                          setShowConfirmPassword(!showConfrimPassword)
                        }>
                        <i className="ri-eye-fill align-middle"></i>
                      </button>
                    </div>
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
                      value={counterUserPhone}
                      placeholder="Enter Phone"
                      onChange={(e) => setCounterUserPhone(e.target.value)}
                    />
                    {errors.counterUserPhone && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUserPhone}
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
                      value={counterUserGender}
                      onChange={(selectedOption) =>
                        handleSelectGender(selectedOption)
                      }
                      placeholder={
                        counterUserGender ? counterUserGender : "select Gender"
                      }
                      options={genders}
                      id="gender"></Select>
                    {errors.counterUserGender && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUserGender}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <div className="mb-3">
                    <Label
                      htmlFor="choices-single-no-search"
                      className="form-label text-muted">
                      Country
                    </Label>

                    <Select
                      isClearable={true}
                      value={counterUserCountry}
                      placeholder={
                        counterUserCountry
                          ? counterUserCountry
                          : "Select Country"
                      }
                      onChange={(selectedOption) => {
                        forSelectCountry(selectedOption);
                      }}
                      options={country}
                      formatOptionLabel={formatOptionLabel}
                      getOptionLabel={(option) => option.countryName}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      State
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      value={counterUserState}
                      placeholder="Enter State"
                      onChange={(e) => setCounterUserState(e.target.value)}
                    />
                    {errors.counterUserState && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUserState}
                      </p>
                    )}
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      City
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      value={counterUserCity} 
                      placeholder="Enter City"
                      onChange={(e) => setCounterUserCity(e.target.value)}
                    />
                    {errors.counterUserCity && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUserCity}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      User Address
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      value={counterUseraddress}
                      placeholder="Enter Address"
                      onChange={(e) => setCounterUseraddress(e.target.value)}
                    />
                    {errors.counterUseraddress && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUseraddress}
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
                      value={counterUserRole}
                      onChange={(selectedOption) =>
                        handleSelectRole(selectedOption)
                      }
                      placeholder={
                        counterUserRole ? counterUserRole : "select User Role"
                      }
                      options={UserRoles}
                      id="country"></Select>
                    {errors.counterUserRole && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUserRole}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>

              <div className="hstack gap-2 justify-content-end my-5">
                <button
                  type="button"
                  className="btn bg-dark text-white"
                  onClick={toggleForAddUser}>
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
        toggle={toggleForEditUser}
        id="offcanvasRight"
        className="border-bottom w-75">
        <OffcanvasHeader toggle={toggleForEditUser} id="offcanvasRightLabel">
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
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setCounterUserImage(file);
                            setEditImage(URL.createObjectURL(file));
                          }}
                        />
                      </div>
                      <div className="avatar-lg p-1">
                        <div className="avatar-title bg-light rounded-circle">
                          <img
                            src={editImage || myImage}
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
                      value={counterUserName}
                      placeholder="Enter Name"
                      onChange={(e) => setCounterUserName(e.target.value)}
                    />
                    {errors.counterUserName && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUserName}
                      </p>
                    )}
                  </div>
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label
                      htmlFor="billinginfo-firstName"
                      className="form-label">
                      User Email
                    </Label>
                    <input
                      type="email"
                      className="form-control"
                      value={counterUserEmail}
                      id="billinginfo-firstName"
                      placeholder="Enter Email"
                      onChange={(e) => setCounterUserEmail(e.target.value)}
                    />
                    {errors.counterUserEmail && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUserEmail}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <div>
                    <Label className="form-label" htmlFor="password-input">
                      Password
                    </Label>
                    <div className="position-relative auth-pass-inputgroup mb-3">
                      <Input
                        className="form-control"
                        placeholder="Enter Passwrod if you want to change"
                        onChange={(e) => setCounterUserPassword(e.target.value)}
                        type={passwordShow ? "text" : "password"}
                      />

                      <button
                        className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                        type="button"
                        id="password-addon"
                        onClick={() =>
                          setCounterUserPasswordShow(!passwordShow)
                        }>
                        <i className="ri-eye-fill align-middle"></i>
                      </button>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div>
                    <Label className="form-label" htmlFor="password-input">
                      Confirm Password
                    </Label>
                    <div className="position-relative auth-pass-inputgroup mb-3">
                      <Input
                        className="form-control"
                        placeholder="Enter Name"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                        type={showConfrimPassword ? "text" : "password"}
                      />

                      <button
                        className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                        type="button"
                        id="password-addon"
                        onClick={() =>
                          setShowConfirmPassword(!showConfrimPassword)
                        }>
                        <i className="ri-eye-fill align-middle"></i>
                      </button>
                    </div>
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
                      value={counterUserPhone}
                      placeholder="Enter Phone"
                      onChange={(e) => setCounterUserPhone(e.target.value)}
                    />
                    {errors.counterUserPhone && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUserPhone}
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
                      value={counterUserGender}
                      onChange={(selectedOption) =>
                        handleSelectGender(selectedOption)
                      }
                      placeholder={
                        counterUserGender ? counterUserGender : "select Gender"
                      }
                      options={genders}
                      id="gender"></Select>
                    {errors.counterUserGender && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUserGender}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <div className="mb-3">
                    <Label
                      htmlFor="choices-single-no-search"
                      className="form-label text-muted">
                      Country
                    </Label>

                    <Select
                      isClearable={true}
                      value={counterUserCountry}
                      placeholder={
                        counterUserCountry
                          ? counterUserCountry
                          : "Select Country"
                      }
                      onChange={(selectedOption) => {
                        forSelectCountry(selectedOption);
                      }}
                      options={country}
                      formatOptionLabel={formatOptionLabel}
                      getOptionLabel={(option) => option.countryName}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      State
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      value={counterUserState}
                      placeholder="Enter State"
                      onChange={(e) => setCounterUserState(e.target.value)}
                    />
                    {errors.counterUserState && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUserState}
                      </p>
                    )}
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      City
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      value={counterUserState}
                      placeholder="Enter City"
                      onChange={(e) => setCounterUserCity(e.target.value)}
                    />
                    {errors.counterUserCity && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUserCity}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      User Address
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      value={counterUseraddress}
                      placeholder="Enter Address"
                      onChange={(e) => setCounterUseraddress(e.target.value)}
                    />
                    {errors.counterUseraddress && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUseraddress}
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
                      value={counterUserRole}
                      onChange={(selectedOption) =>
                        handleSelectRole(selectedOption)
                      }
                      placeholder={
                        counterUserRole ? counterUserRole : "select User Role"
                      }
                      options={UserRoles}
                      id="country"></Select>
                    {errors.counterUserRole && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.counterUserRole}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>

              <div className="hstack gap-2 justify-content-end my-5">
                <button
                  type="button"
                  className="btn bg-dark text-white"
                  onClick={toggleForEditUser}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  id="add-btn"
                  onClick={forEditUserSubmit}>
                  Edit User
                </button>
              </div>
            </div>
          </SimpleBar>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default EcommerceAddProduct;
