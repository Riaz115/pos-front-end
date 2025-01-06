import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import myImage from "../../../assets/images/users/avatar-1.jpg";
import {
  Col,
  Card,
  CardBody,
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

const List = () => {
  //this is my code
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [image, setimage] = useState("");
  const [isRight, setIsRight] = useState(false);
  const [errors, setErrors] = useState({});
  const [forEditUser, setForEditUser] = useState(false);
  const [gender, setgender] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [myCountry, setMyCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [showConfrimPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [idForDelete, setIdForDelete] = useState("");
  const [allUser, setAllUsers] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //this is for getting data from hook
  const { allOwnerUser, myUrl, allOwnerUserGet, setTokenToLocalStorage } =
    UseRiazHook();

  //this is for pagination
  const perPageData = 10;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  //this is for page current data
  const currentdata = useMemo(
    () => allOwnerUser?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  //this is for first time load and set data
  useEffect(() => {
    setAllUsers(allOwnerUser.slice(0, perPageData));
  }, [allOwnerUser]);

  //this is for set current data of page
  useEffect(() => {
    setAllUsers(currentdata);
  }, [currentdata]);

  //this is for search from users
  const OnchangeHandler = (e) => {
    let search = e.target.value;
    if (search) {
      const filteredUsers = allOwnerUser.filter((data) =>
        Object.values(data).some(
          (field) =>
            typeof field === "string" &&
            field.toLowerCase().includes(search.toLowerCase())
        )
      );
      setAllUsers(filteredUsers.slice(0, perPageData));
      setCurrentPage(1);
    } else {
      setAllUsers(allOwnerUser.slice(indexOfFirst, indexOfLast));
    }
  };

  //this is for select country
  const forSelectCountry = async (myCountryOption) => {
    if (myCountryOption && myCountryOption.countryName) {
      setMyCountry(myCountryOption.countryName);
    } else {
      setMyCountry("null");
    }
  };

  //this is for select user gender
  function handleSelectGender(selectedOption) {
    setgender(selectedOption.value);
  }

  //this is for open canvas to add user
  const toggleRightCanvas = () => {
    setIsRight(!isRight);
  };

  //this is for open canvas to edit user
  const toggleRightCanvasforEditUser = () => {
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

  //this is for catch errors for add user
  const CatchErrorAddUser = () => {
    let isOk = true;
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is Required";
      toast.error("Name is Required");
      isOk = false;
    } else if (!email.trim()) {
      newErrors.email = "Email is Required";
      toast.error("Email is Required");
      isOk = false;
    } else if (!isEmail(email)) {
      newErrors.email = "Please Enter Valid Email";
      toast.error("Please Enter Valid email");
      isOk = false;
    } else if (password.length < 1) {
      newErrors.password = "Password must be at least 8 characters long";
      toast.error("password must should be at leat 8 letters");
      isOk = false;
    } else if (password !== confirmpassword) {
      newErrors.confirmpassword = "Password and Confirm Password do not match";
      toast.error("Password and Confirm Password do not match");
      isOk = false;
    } else if (phone.length < 11) {
      newErrors.phone = "phone Number should be at least 11 letters";
      toast.error("phone Number should be at least 11 letters");
      isOk = false;
    } else if (!gender.trim()) {
      newErrors.gender = "Please Select Gender";
      toast.error("Please Select Gender");
      isOk = false;
    } else if (!myCountry.trim()) {
      newErrors.myCountry = "Country is Required";
      toast.error("Country is Required");
      isOk = false;
    } else if (!state.trim()) {
      newErrors.state = "State is Required";
      toast.error("State is required");
      isOk = false;
    } else if (!city.trim()) {
      newErrors.city = "City is Required";
      toast.error("City is Required");
      isOk = false;
    } else if (!address.trim()) {
      newErrors.address = "Address is Required";
      toast.error("address is required");
      isOk = false;
    }
    setErrors(newErrors);
    return isOk;
  };

  //this is for catch erorr edit user
  const catchErrorEditUser = () => {
    let isOk = true;
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is Required";
      toast.error("Name is Required");
      isOk = false;
    } else if (!email.trim()) {
      newErrors.email = "Email is Required";
      toast.error("Email is Required");
      isOk = false;
    } else if (!isEmail(email)) {
      newErrors.email = "Please Enter Valid Email";
      toast.error("Please Enter Valid email");
      isOk = false;
    } else if (phone.length < 11) {
      newErrors.phone = "phone Number should be at least 11 letters";
      toast.error("phone Number should be at least 11 letters");
      isOk = false;
    } else if (!gender.trim()) {
      newErrors.gender = "Please Select Gender";
      toast.error("Please Select Gender");
      isOk = false;
    } else if (!myCountry.trim()) {
      newErrors.myCountry = "Country is Required";
      toast.error("Country is Required");
      isOk = false;
    } else if (!state.trim()) {
      newErrors.state = "State is Required";
      toast.error("State is required");
      isOk = false;
    } else if (!city.trim()) {
      newErrors.city = "City is Required";
      toast.error("City is Required");
      isOk = false;
    } else if (!address.trim()) {
      newErrors.address = "Address is Required";
      toast.error("address is required");
      isOk = false;
    }
    setErrors(newErrors);
    return isOk;
  };

  //this is for handleSubmit
  const forAddUserSubmit = () => {
    if (CatchErrorAddUser()) {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("image", image);
      formData.append("state", state);
      formData.append("myCountry", myCountry);
      formData.append("city", city);
      formData.append("gender", gender);
      formData.append("password", password);

      //this is for post the user data
      const forAddUserData = async () => {
        const url = `${myUrl}/addUser`;
        const options = {
          method: "POST",
          body: formData,
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            toast.success(data.msg);
            console.log("my token ", data.token);
            setTokenToLocalStorage(data.token);
            setimage("");
            setMyCountry("");
            setgender();
            allOwnerUserGet();
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

  //this is for delete user
  const forDeleteUser = async (id) => {
    const url = `${myUrl}/deleteOwnerUser/${id}`;
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
        toast.success("user deleted successfully");
        allOwnerUserGet();
        console.log("sucess data", data);
      } else {
        toast.error("user not deleted");
        console.log("error data", data);
      }
    } catch (err) {
      console.log("there is error in delete user function", err);
    }
  };

  //this is for get user data for update
  const getUserDataForUpdate = async (id) => {
    const url = `${myUrl}/getOwnerUserDataForUpdate/${id}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setname(data.userData.name);
        setemail(data.userData.email);
        setphone(data.userData.phone);
        setaddress(data.userData.address);
        setEditImage(data.userData.image);
        setMyCountry(data.userData.myCountry);
        setstate(data.userData.state);
        setcity(data.userData.city);
        setgender(data.userData.gender);
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
    if (catchErrorEditUser()) {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("image", image);
      formData.append("state", state);
      formData.append("myCountry", myCountry);
      formData.append("city", city);
      formData.append("gender", gender);
      formData.append("password", password);

      //this is for update user data
      const forUpdateUserData = async () => {
        const id = userId;

        const url = `${myUrl}/editOwnerUser/${id}`;
        const options = {
          method: "PATCH",
          body: formData,
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();

          if (response.ok) {
            toast.success(data.msg);
            allOwnerUserGet();
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

  //handle click on delete button
  const clickOnDeleteBtn = (id) => {
    setDeleteModal(!deleteModal);
    setIdForDelete(id);
  };

  //this is for delete
  const handleForDeleteUser = () => {
    forDeleteUser(idForDelete);
    setDeleteModal(false);
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleForDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />

      <h1
        style={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.5)" }}
        className="mb-5 border bg-light  py-3  px-2  rounded p-2 text-capitalize "
      >
        i am owner of this software
      </h1>
      <Row className="g-4 mb-4">
        <Col className="col-sm-auto">
          <div>
            <Link
              to="#!"
              className="btn bg-dark text-white "
              onClick={toggleRightCanvas}
            >
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
                        src={user.image ? user.image : myImage}
                        alt="my pic"
                        className="member-img img-fluid d-block rounded"
                      ></img>
                    </div>
                  </div>
                  <div className="ms-3">
                    <h5 className="fs-16 mb-2">{user.name}</h5>
                  </div>
                  <div className="d-flex gap-4 mt-0 text-muted mx-auto">
                    <h5 className="fs-16 mb-2">{user.email}</h5>
                  </div>
                  <div className="d-flex gap-4 mt-0 text-muted mx-auto">
                    <h5 className="fs-16 mb-2">
                      <i className="ri-phone-line"></i> {user.phone}
                    </h5>
                  </div>
                  <div className="d-flex gap-4 mt-0 text-muted mx-auto">
                    <h5 className="fs-16 mb-2">{user.address}</h5>
                  </div>

                  <div className="hstack gap-2">
                    <button
                      className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                      onClick={() => forClickEditUserBtn(user.userId)}
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#E6F7FC",
                      }}
                    >
                      <i className="ri-pencil-fill align-bottom" />
                    </button>
                    <button
                      onClick={() => clickOnDeleteBtn(user.userId)}
                      className="btn btn-sm btn-soft-danger remove-list delete-btn"
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#FEEDE9",
                        color: "red",
                      }}
                    >
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
            data={allOwnerUser}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </Row>

      {/* this is for the add user */}
      <Offcanvas
        isOpen={isRight}
        direction="end"
        toggle={toggleRightCanvas}
        id="offcanvasRight"
        className="border-bottom w-75  "
      >
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
                          name="file"
                          className="form-control d-none"
                          id="company-logo-input"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setimage(file);
                          }}
                        />
                      </div>
                      <div className="avatar-lg p-1">
                        <div className="avatar-title bg-light rounded-circle">
                          <img
                            src={image ? URL.createObjectURL(image) : myImage}
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
                      id="billinginfo-email"
                      placeholder="Enter Name"
                      onChange={(e) => setname(e.target.value)}
                    />
                    {errors.name && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label
                      htmlFor="billinginfo-firstName"
                      className="form-label"
                    >
                      User Email
                    </Label>
                    <input
                      type="email"
                      className="form-control"
                      id="billinginfo-firstName"
                      placeholder="Enter Email"
                      onChange={(e) => setemail(e.target.value)}
                    />
                    {errors.email && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.email}
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
                        id="billinginfo-email"
                        placeholder="Enter Name"
                        onChange={(e) => setpassword(e.target.value)}
                        type={passwordShow ? "text" : "password"}
                      />

                      <button
                        className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                        type="button"
                        id="password-addon"
                        onClick={() => setPasswordShow(!passwordShow)}
                      >
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
                        id="billinginfo-email"
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
                        }
                      >
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
                      id="billinginfo-email"
                      placeholder="Enter Phone"
                      onChange={(e) => setphone(e.target.value)}
                    />
                    {errors.phone && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.phone}
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
                      value={gender}
                      onChange={(selectedOption) =>
                        handleSelectGender(selectedOption)
                      }
                      placeholder={gender ? gender : "select Gender"}
                      options={genders}
                      id="gender"
                    ></Select>
                    {errors.gender && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label
                      htmlFor="choices-single-no-search"
                      className="form-label text-muted"
                    >
                      Country
                    </Label>

                    <Select
                      isClearable={true}
                      value={myCountry}
                      placeholder={myCountry ? myCountry : "Select Country"}
                      onChange={(selectedOption) => {
                        forSelectCountry(selectedOption);
                      }}
                      options={country}
                      formatOptionLabel={formatOptionLabel}
                      getOptionLabel={(option) => option.countryName}
                    />
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
                      onChange={(e) => setstate(e.target.value)}
                    />
                    {errors.state && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.state}
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
                      onChange={(e) => setcity(e.target.value)}
                    />
                    {errors.city && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.city}
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
                      onChange={(e) => setaddress(e.target.value)}
                    />
                    {errors.address && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.address}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>

              <div className="hstack gap-2 justify-content-end my-5">
                <button
                  type="button"
                  className="btn bg-dark text-white"
                  onClick={toggleRightCanvas}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  id="add-btn"
                  onClick={forAddUserSubmit}
                >
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
        className="border-bottom w-75"
      >
        <OffcanvasHeader
          toggle={toggleRightCanvasforEditUser}
          id="offcanvasRightLabel"
        >
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
                            setimage(file);
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
                      value={name}
                      id="billinginfo-email"
                      placeholder="Enter Name"
                      onChange={(e) => setname(e.target.value)}
                    />
                    {errors.name && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label
                      htmlFor="billinginfo-firstName"
                      className="form-label"
                    >
                      User Email
                    </Label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      id="billinginfo-firstName"
                      placeholder="Enter Email"
                      onChange={(e) => setemail(e.target.value)}
                    />
                    {errors.email && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.email}
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
                        value={password}
                        id="billinginfo-email"
                        placeholder="change password if you want to change"
                        onChange={(e) => setpassword(e.target.value)}
                        type={passwordShow ? "text" : "password"}
                      />

                      <button
                        className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                        type="button"
                        id="password-addon"
                        onClick={() => setPasswordShow(!passwordShow)}
                      >
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
                        id="billinginfo-email"
                        value={confirmpassword}
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                        type={showConfrimPassword ? "text" : "password"}
                      />

                      <button
                        className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                        type="button"
                        id="password-addon"
                        onClick={() =>
                          setShowConfirmPassword(!showConfrimPassword)
                        }
                      >
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
                      value={phone}
                      id="billinginfo-email"
                      placeholder="Enter Phone"
                      onChange={(e) => setphone(e.target.value)}
                    />
                    {errors.phone && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.phone}
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
                      value={gender}
                      onChange={(selectedOption) =>
                        handleSelectGender(selectedOption)
                      }
                      placeholder={gender ? gender : "select Gender"}
                      options={genders}
                      id="gender"
                    ></Select>
                    {errors.gender && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label
                      htmlFor="choices-single-no-search"
                      className="form-label text-muted"
                    >
                      Country
                    </Label>

                    <Select
                      isClearable={true}
                      value={myCountry}
                      placeholder={myCountry ? myCountry : "Select Country"}
                      onChange={(selectedOption) => {
                        forSelectCountry(selectedOption);
                      }}
                      options={country}
                      formatOptionLabel={formatOptionLabel}
                    />
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
                      value={state}
                      onChange={(e) => setstate(e.target.value)}
                    />
                    {errors.state && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.state}
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
                      value={city}
                      id="billinginfo-email"
                      placeholder="Enter City"
                      onChange={(e) => setcity(e.target.value)}
                    />
                    {errors.city && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.city}
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
                      value={address}
                      id="billinginfo-email"
                      placeholder="Enter Address"
                      onChange={(e) => setaddress(e.target.value)}
                    />
                    {errors.address && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.address}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>

              <div className="hstack gap-2 justify-content-end my-5">
                <button
                  type="button"
                  className="btn bg-dark text-white"
                  onClick={toggleRightCanvasforEditUser}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  id="add-btn"
                  onClick={forEditUserSubmit}
                >
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

export default List;
