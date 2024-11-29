import React, { useEffect, useState } from "react";
import {
  Input,
  Label,
  Col,
  Row,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { UseRiazHook } from "../RiazStore/RiazStore";
import Select from "react-select";
import SimpleBar from "simplebar-react";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import myImage from "../assets/images/users/avatar-1.jpg";

function AllPopUpsAndOffCanvas() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [GuestImage, setGuestImage] = useState("");
  const [errors, setErrors] = useState({});
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  //this is show for guest
  const {
    showForGuest,
    guestSearchChangeState,
    showForEditGuest,
    editGuestChangeState,
    showForGuestAdd,
    addGuestChangeState,
    guestData,
    myUrl,
    restId,
    guestId,
    setGuestId,
    setGuestData,
    forTableData,
    forTableId,
    forGettingTableData,
    allGuests,
    setAllGuests,
    filteredGuest,
    setFilterGuests,
  } = UseRiazHook();

  //this is for select Guest gender
  function handleSelectGender(selectedOption) {
    setGender(selectedOption.value);
  }

  //this is for getting all guests data
  const forGettingAllGuests = async () => {
    const url = `${myUrl}/forgetall/${restId}/guests`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllGuests(data.guests);
        setFilterGuests(data.guests);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get all restaurent guest function",
        err
      );
    }
  };

  //this is for controll rendering of all all guest getting data function
  useEffect(() => {
    forGettingAllGuests();
  }, []);

  //this is Guest Gender List
  const genders = [
    {
      options: [
        { label: "Select Gender...", value: "Select Gender" },
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
  ];

  //this is for catch errors for add Guest
  const CatchErrorAddGuest = () => {
    let isOk = true;
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is Required";
      toast.error("Email is Required");
      isOk = false;
    } else if (!isEmail(email)) {
      newErrors.email = "Please Enter Valid Email";
      toast.error("Please Enter Valid email");
      isOk = false;
    } else if (!name.trim()) {
      newErrors.name = "Name is Required";
      toast.error("Name is Required");
      isOk = false;
    } else if (age === "") {
      newErrors.age = "Age is Required";
      toast.error("Age is Required");
      isOk = false;
    } else if (phone.length < 11) {
      newErrors.phone = "phone Number should be at least 11 letters";
      toast.error("phone Number should be at least 11 letters");
      isOk = false;
    } else if (!address.trim()) {
      newErrors.address = "Address is Required";
      toast.error("address is required");
      isOk = false;
    } else if (!gender.trim()) {
      newErrors.gender = "Please Select Gender";
      toast.error("Please Select Gender");
      isOk = false;
    }
    setErrors(newErrors);
    return isOk;
  };

  //this is for handleSubmit
  const forAddGuestSubmit = () => {
    if (CatchErrorAddGuest()) {
      let formData = {
        name,
        email,
        phone,
        age,
        address,
        gender,
      };

      //this is for add guest
      const forAddGuest = async () => {
        const url = `${myUrl}/foradd/${restId}/guest`;
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
            addGuestChangeState();
            forGettingAllGuests();
            setName("");
            setEmail("");
            setAge("");
            setAddress("");
            setPhone("");
            setGender("");
          } else {
            toast.error(data.msg);
          }
        } catch (err) {
          console.log("there is error in the add rest guest function", err);
        }
      };

      forAddGuest();
    }
  };

  //this is for get data of user for edit
  const forEditGetGuestData = async () => {
    const url = `${myUrl}/getforedit/${guestId}/guest`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setName(data.guestPrevData.name);
        setEmail(data.guestPrevData.email);
        setPhone(data.guestPrevData.phone);
        setAge(data.guestPrevData.age);
        setAddress(data.guestPrevData.address);
        setGender(data.guestPrevData.gender);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get data of guest for edit", err);
    }
  };

  //this is for control rendering of the get data of guest for edit
  useEffect(() => {
    if (guestId) {
      forEditGetGuestData();
    }
  }, [guestId]);

  //this is for click on edit guests
  const forClickOnEditGuest = async (id) => {
    editGuestChangeState();
    localStorage.setItem("guestid", id);
    setGuestId(id);
    forEditGetGuestData();
  };

  //this is for edit guest
  const forHandleEditGuestSubmit = (e) => {
    e.preventDefault();
    if (CatchErrorAddGuest()) {
      let formData = {
        name,
        email,
        phone,
        age,
        gender,
        address,
      };

      const forEditGuest = async () => {
        const url = `${myUrl}/editguest/${guestId}`;
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
            forGettingAllGuests();
            editGuestChangeState();
          } else {
            toast.error(data.msg);
          }
        } catch (err) {
          console.log("there is error in the edit guest", err);
        }
      };

      forEditGuest();
    }
  };

  //this is for add guest to order
  const forAddGuestToOrder = async (guestData) => {
    let newGuestData = {
      guestData: guestData,
    };
    const url = `${myUrl}/add/${forTableId}/guesttoorder`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGuestData),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        console.log("ok data", data);
        setGuestData({});
        forGettingTableData();
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the for add and remove guest data to order",
        err
      );
    }
  };

  //this is for guest handle change
  const handleGuestSelection = (item) => {
    setGuestData(item);
    guestSearchChangeState();
    forAddGuestToOrder(item);
  };

  //this is for search from guests
  const OnchangeHandler = (e) => {
    let search = e.target.value;
    if (search) {
      const filteredUsers = allGuests.filter((data) =>
        Object.values(data).some(
          (field) =>
            typeof field === "string" &&
            field.toLowerCase().includes(search.toLowerCase())
        )
      );
      setFilterGuests(filteredUsers);
    } else {
      setFilterGuests(allGuests);
    }
  };

  return (
    <div>
      {/* this is for show guest search  */}
      {showForGuest && (
        <div
          className="d-flex align-items-center justify-content-center position-fixed"
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 12,
          }}
        >
          <div
            className="d-flex  flex-column bg-white  pb-4 "
            style={{
              width: "700px",
              height: "80vh",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className=" p-1  d-flex justify-content-between align-items-center  mb-2"
              style={{ fontSize: "14px", backgroundColor: "#E3614D" }}
            >
              <p className="p-0 m-0 text-white">Guest</p>
              <p
                className="m-0 p-2 color-dark cursor-pointer"
                onClick={guestSearchChangeState}
              >
                x
              </p>
            </div>

            <div
              className="d-flex justify-content-between align-items-center px-2"
              style={{
                fontSize: "14px",
                backgroundColor: "#F3F3F3",
              }}
            >
              <div className="d-flex align-items-center justify-content-center fs-4">
                All Guests
              </div>
              <div
                className="d-flex align-items-center justify-content-center   "
                style={{ gap: "5px" }}
              >
                <p
                  onClick={addGuestChangeState}
                  className="cursor-pointer"
                  style={{
                    backgroundColor: "#0074FF",
                    color: "white",
                    padding: "3px 5px",
                    margin: 0,
                  }}
                >
                  <FaPlus className="pe-1" /> Add Guest
                </p>
              </div>
            </div>

            <div
              className="d-flex  flex-column my-1 px-3 py-1"
              style={{ gap: "10px" }}
            >
              <div className="d-flex flex-column">
                <Label for="kotNumber" style={{ fontSize: "14px" }}>
                  Mobile Number *
                </Label>
                <Input
                  type="number"
                  id="kotNumber"
                  placeholder="Mobile Number"
                  onChange={(e) => OnchangeHandler(e)}
                />
              </div>
              <div className="d-flex flex-column">
                <Label for="kotNumber" style={{ fontSize: "14px" }}>
                  Guest Name *
                </Label>
                <Input
                  type="text"
                  onChange={(e) => OnchangeHandler(e)}
                  id="kotNumber"
                  placeholder="Guest Name"
                />
              </div>
            </div>

            <div
              className="px-2"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overflowY: "scroll",
                gap: "1px",
              }}
            >
              <div className="p-1">
                <div
                  className="table-responsive "
                  style={{
                    overflowY: "scroll",
                    gap: "1px",
                  }}
                >
                  <table className="table  table-striped  table-hover table-light  ">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          style={{ fontSize: "12px" }}
                          className="fw-bold"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          style={{ fontSize: "12px" }}
                          className="fw-bold"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          style={{ fontSize: "12px" }}
                          className="fw-bold"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          style={{ fontSize: "12px" }}
                          className="fw-bold"
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          style={{ fontSize: "12px" }}
                          className="fw-bold"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredGuest.map((item, index) => (
                        <tr key={index} style={{ fontSize: "12px" }}>
                          <td>1</td>
                          <td>{item.name}</td>
                          <td>{item.phone}</td>
                          <td>{item.address}</td>
                          <td>
                            <div
                              className="d-flex align-items-center justify-content-between"
                              style={{ gap: "2px" }}
                            >
                              <Input
                                className="form-check-input p-2"
                                type="checkbox"
                                id="formCheck6"
                                checked={
                                  forTableData?.currentOrder?.guest?.id ===
                                  item._id
                                }
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    handleGuestSelection(item);
                                  } else {
                                    setGuestData({});
                                    forAddGuestToOrder(guestData);
                                  }
                                }}
                              />
                              <FaRegEdit
                                onClick={() => forClickOnEditGuest(item._id)}
                                style={{
                                  padding: "5px",
                                  backgroundColor: "#FFBE07",
                                  fontSize: "20px",
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* this is for add guest */}
      <Offcanvas
        isOpen={showForGuestAdd}
        direction="end"
        toggle={addGuestChangeState}
        id="offcanvasRight"
        className="border-bottom w-75  "
      >
        <OffcanvasHeader toggle={addGuestChangeState} id="offcanvasRightLabel">
          <h1>Add Guest</h1>
        </OffcanvasHeader>
        <OffcanvasBody className="p-0 overflow-scroll">
          <SimpleBar style={{ height: "100vh" }}>
            <div className="px-5 py-3">
              <Row>
                <Col sm={6} className="mt-2">
                  <div className="mb-3">
                    <Label
                      htmlFor="billinginfo-firstName"
                      className="form-label"
                    >
                      Guest Email
                    </Label>
                    <input
                      type="email"
                      className="form-control"
                      id="billinginfo-firstName"
                      placeholder="Enter Email"
                      onChange={(e) => setEmail(e.target.value)}
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
                <Col sm={6} className="mt-2">
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Guest Name
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Name"
                      onChange={(e) => setName(e.target.value)}
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
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Guest Age
                    </Label>
                    <input
                      type="number"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Name"
                      onChange={(e) => setAge(e.target.value)}
                    />
                    {errors.age && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.age}
                      </p>
                    )}
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Guest Phone
                    </Label>
                    <input
                      type="number"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Phone"
                      onChange={(e) => setPhone(e.target.value)}
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
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Guest Address
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Address"
                      onChange={(e) => setAddress(e.target.value)}
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

              <div className="hstack gap-2 justify-content-end my-5">
                <button
                  type="button"
                  className="btn bg-dark text-white"
                  onClick={addGuestChangeState}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  type="submit"
                  id="add-btn"
                  onClick={(e) => forAddGuestSubmit(e)}
                >
                  Add Guest
                </button>
              </div>
            </div>
          </SimpleBar>
        </OffcanvasBody>
      </Offcanvas>

      {/* this is for edit the guest */}
      <Offcanvas
        isOpen={showForEditGuest}
        direction="end"
        toggle={editGuestChangeState}
        id="offcanvasRight"
        className="border-bottom w-75  "
      >
        <OffcanvasHeader toggle={editGuestChangeState} id="offcanvasRightLabel">
          <h1>Edit Guest</h1>
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
                            setGuestImage(file);
                          }}
                        />
                      </div>
                      <div className="avatar-lg p-1">
                        <div className="avatar-title bg-light rounded-circle">
                          <img
                            src={
                              GuestImage
                                ? URL.createObjectURL(GuestImage)
                                : myImage
                            }
                            alt="multiGuest"
                            id="companylogo-img"
                            className="avatar-md rounded-circle object-fit-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <h5 className="fs-13 mt-3">Guest Image</h5>
                  </div>
                </Col>

                <Col sm={6} className="mt-2">
                  <div className="mb-3">
                    <Label
                      htmlFor="billinginfo-firstName"
                      className="form-label"
                    >
                      Guest Email
                    </Label>
                    <input
                      type="email"
                      value={email}
                      className="form-control"
                      id="billinginfo-firstName"
                      placeholder="Enter Email"
                      onChange={(e) => setEmail(e.target.value)}
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
                <Col sm={6} className="mt-2">
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Guest Name
                    </Label>
                    <input
                      type="text"
                      value={name}
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Name"
                      onChange={(e) => setName(e.target.value)}
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
              </Row>

              <Row>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Guest Age
                    </Label>
                    <input
                      type="number"
                      value={age}
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Name"
                      onChange={(e) => setAge(e.target.value)}
                    />
                    {errors.age && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.age}
                      </p>
                    )}
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Guest Phone
                    </Label>
                    <input
                      type="number"
                      value={phone}
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Phone"
                      onChange={(e) => setPhone(e.target.value)}
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
              </Row>
              <Row>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Guest Address
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      value={address}
                      id="billinginfo-email"
                      placeholder="Enter Address"
                      onChange={(e) => setAddress(e.target.value)}
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

              <div className="hstack gap-2 justify-content-end my-5">
                <button
                  type="button"
                  className="btn bg-dark text-white"
                  onClick={editGuestChangeState}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="add-btn"
                  onClick={(e) => forHandleEditGuestSubmit(e)}
                >
                  Edit Guest
                </button>
              </div>
            </div>
          </SimpleBar>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}

export default AllPopUpsAndOffCanvas;
