import React, { useState } from "react";
import {
  Input,
  Label,
  Col,
  Row,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Form,
} from "reactstrap";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { UseRiazHook } from "../RiazStore/RiazStore";
import Select from "react-select";
import SimpleBar from "simplebar-react";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import myImage from "../assets/images/users/avatar-1.jpg";
function AllPopUpsAndOffCanvas() {
  const [GuestName, setGuestName] = useState("");
  const [GuestEmail, setGuestEmail] = useState("");
  const [GuestPhone, setGuestPhone] = useState("");
  const [GuestAddress, setGuestAddress] = useState("");
  const [GuestImage, setGuestImage] = useState("");
  const [errors, setErrors] = useState({});
  const [GuestAge, setGuestAge] = useState("");
  const [GuestGender, setGuestGender] = useState("");

  //this is show for guest
  const {
    showForGuest,
    guestSearchChangeState,
    showForEditGuest,
    editGuestChangeState,
    showForGuestAdd,
    addGuestChangeState,
  } = UseRiazHook();

  //this is for select Guest gender
  function handleSelectGender(selectedOption) {
    setGuestGender(selectedOption.value);
  }

  //this is Guest Gender List
  const GuestGenders = [
    {
      options: [
        { label: "Select Gender...", value: "Select Gender" },
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
      ],
    },
  ];

  //this is for catch errors for add Guest
  const CatchErrorAddGuest = () => {
    let isOk = true;
    let newErrors = {};

    if (!GuestEmail.trim()) {
      newErrors.GuestEmail = "Email is Required";
      toast.error("Email is Required");
      isOk = false;
    } else if (!isEmail(GuestEmail)) {
      newErrors.GuestEmail = "Please Enter Valid Email";
      toast.error("Please Enter Valid email");
      isOk = false;
    } else if (!GuestName.trim()) {
      newErrors.GuestName = "Name is Required";
      toast.error("Name is Required");
      isOk = false;
    } else if (!GuestAge.trim()) {
      newErrors.GuestAge = "Age is Required";
      toast.error("Age is Required");
      isOk = false;
    } else if (GuestPhone.length < 11) {
      newErrors.GuestPhone = "phone Number should be at least 11 letters";
      toast.error("phone Number should be at least 11 letters");
      isOk = false;
    } else if (!GuestAddress.trim()) {
      newErrors.GuestAddress = "Address is Required";
      toast.error("address is required");
      isOk = false;
    } else if (!GuestGender.trim()) {
      newErrors.GuestGender = "Please Select Gender";
      toast.error("Please Select Gender");
      isOk = false;
    }
    setErrors(newErrors);
    return isOk;
  };

  //this is for handleSubmit
  const forAddGuestSubmit = () => {
    if (CatchErrorAddGuest()) {
      let formData = new FormData();
      formData.append("Guest Email", GuestEmail);
      formData.append("GuestName", GuestName);
      formData.append("GuestPhone", GuestPhone);
      formData.append("GuestAddress", GuestAddress);
      formData.append("image", GuestImage);
      formData.append("GuestAge", GuestAge);
      formData.append("GuestGender", GuestGender);

      console.log("my form Data", formData);
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
          }}>
          <div
            className="d-flex  flex-column bg-white  pb-4 "
            style={{
              width: "700px",
              height: "80vh",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}>
            <div
              className=" p-1  d-flex justify-content-between align-items-center  mb-2"
              style={{ fontSize: "14px", backgroundColor: "#E3614D" }}>
              <p className="p-0 m-0 text-white">Guest</p>
              <p
                className="m-0 p-2 color-dark cursor-pointer"
                onClick={guestSearchChangeState}>
                x
              </p>
            </div>

            <div
              className="d-flex justify-content-between align-items-center px-2"
              style={{
                fontSize: "14px",
                backgroundColor: "#F3F3F3",
              }}>
              <div className="d-flex align-items-center justify-content-center fs-4">
                All Guests
              </div>
              <div
                className="d-flex align-items-center justify-content-center   "
                style={{ gap: "5px" }}>
                <p
                  onClick={addGuestChangeState}
                  className="cursor-pointer"
                  style={{
                    backgroundColor: "#0074FF",
                    color: "white",
                    padding: "3px 5px",
                    margin: 0,
                  }}>
                  <FaPlus className="pe-1" /> Add Guest
                </p>
              </div>
            </div>

            <div
              className="d-flex  flex-column my-1 px-3 py-1"
              style={{ gap: "10px" }}>
              <div className="d-flex flex-column">
                <Label for="kotNumber">Mobile Number *</Label>
                <Input
                  type="number"
                  id="kotNumber"
                  placeholder="Mobile Number"
                />
              </div>
              <div className="d-flex flex-column">
                <Label for="kotNumber">Guest Name *</Label>
                <Input type="text" id="kotNumber" placeholder="Guest Name" />
              </div>
            </div>

            <div
              className="px-2"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overflowY: "scroll",
                gap: "1px",
              }}>
              <div className="p-1">
                <div
                  className="table-responsive "
                  style={{
                    overflowY: "scroll",
                    gap: "1px",
                  }}>
                  <table className="table  table-striped  table-hover table-light  ">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          style={{ fontSize: "12px" }}
                          className="fw-bold">
                          #
                        </th>
                        <th
                          scope="col"
                          style={{ fontSize: "12px" }}
                          className="fw-bold">
                          Name
                        </th>
                        <th
                          scope="col"
                          style={{ fontSize: "12px" }}
                          className="fw-bold">
                          Phone
                        </th>
                        <th
                          scope="col"
                          style={{ fontSize: "12px" }}
                          className="fw-bold">
                          Address
                        </th>
                        <th
                          scope="col"
                          style={{ fontSize: "12px" }}
                          className="fw-bold">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "12px" }}>
                      <tr>
                        <td>1</td>
                        <td>Muhammad Riaz Ahmad</td>
                        <td>03223456789086</td>
                        <td>i live in sahiwal and i live in lahore </td>
                        <td>
                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ gap: "2px" }}>
                            <Input
                              className="form-check-input p-2"
                              type="checkbox"
                              id="formCheck6"
                            />
                            <FaRegEdit
                              onClick={editGuestChangeState}
                              style={{
                                padding: "5px",
                                backgroundColor: "#FFBE07",
                                fontSize: "20px",
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Muhammad Riaz Ahmad</td>
                        <td>03223456789086</td>
                        <td>i live in sahiwal and i live in lahore </td>
                        <td>
                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ gap: "2px" }}>
                            <Input
                              className="form-check-input p-2"
                              type="checkbox"
                              id="formCheck6"
                            />
                            <FaRegEdit
                              style={{
                                padding: "5px",
                                backgroundColor: "#FFBE07",
                                fontSize: "20px",
                              }}
                            />
                          </div>
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>1</td>
                        <td>Muhammad Riaz Ahmad</td>
                        <td>03223456789086</td>
                        <td>i live in sahiwal and i live in lahore </td>
                        <td>
                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ gap: "2px" }}>
                            <Input
                              className="form-check-input p-2"
                              type="checkbox"
                              id="formCheck6"
                            />
                            <FaRegEdit
                              style={{
                                padding: "5px",
                                backgroundColor: "#FFBE07",
                                fontSize: "20px",
                              }}
                            />
                          </div>
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>1</td>
                        <td>Muhammad Riaz Ahmad</td>
                        <td>03223456789086</td>
                        <td>i live in sahiwal and i live in lahore </td>
                        <td>
                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ gap: "2px" }}>
                            <Input
                              className="form-check-input p-2"
                              type="checkbox"
                              id="formCheck6"
                            />
                            <FaRegEdit
                              style={{
                                padding: "5px",
                                backgroundColor: "#FFBE07",
                                fontSize: "20px",
                              }}
                            />
                          </div>
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>1</td>
                        <td>Muhammad Riaz Ahmad</td>
                        <td>03223456789086</td>
                        <td>i live in sahiwal and i live in lahore </td>
                        <td>
                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ gap: "2px" }}>
                            <Input
                              className="form-check-input p-2"
                              type="checkbox"
                              id="formCheck6"
                            />
                            <FaRegEdit
                              style={{
                                padding: "5px",
                                backgroundColor: "#FFBE07",
                                fontSize: "20px",
                              }}
                            />
                          </div>
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>1</td>
                        <td>Muhammad Riaz Ahmad</td>
                        <td>03223456789086</td>
                        <td>i live in sahiwal and i live in lahore </td>
                        <td>
                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ gap: "2px" }}>
                            <Input
                              className="form-check-input p-2"
                              type="checkbox"
                              id="formCheck6"
                            />
                            <FaRegEdit
                              style={{
                                padding: "5px",
                                backgroundColor: "#FFBE07",
                                fontSize: "20px",
                              }}
                            />
                          </div>
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>1</td>
                        <td>Muhammad Riaz Ahmad</td>
                        <td>03223456789086</td>
                        <td>i live in sahiwal and i live in lahore </td>
                        <td>
                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ gap: "2px" }}>
                            <Input
                              className="form-check-input p-2"
                              type="checkbox"
                              id="formCheck6"
                            />
                            <FaRegEdit
                              style={{
                                padding: "5px",
                                backgroundColor: "#FFBE07",
                                fontSize: "20px",
                              }}
                            />
                          </div>
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>1</td>
                        <td>Muhammad Riaz Ahmad</td>
                        <td>03223456789086</td>
                        <td>i live in sahiwal and i live in lahore </td>
                        <td>
                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ gap: "2px" }}>
                            <Input
                              className="form-check-input p-2"
                              type="checkbox"
                              id="formCheck6"
                            />
                            <FaRegEdit
                              style={{
                                padding: "5px",
                                backgroundColor: "#FFBE07",
                                fontSize: "20px",
                              }}
                            />
                          </div>
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>1</td>
                        <td>Muhammad Riaz Ahmad</td>
                        <td>03223456789086</td>
                        <td>i live in sahiwal and i live in lahore </td>
                        <td>
                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ gap: "2px" }}>
                            <Input
                              className="form-check-input p-2"
                              type="checkbox"
                              id="formCheck6"
                            />
                            <FaRegEdit
                              style={{
                                padding: "5px",
                                backgroundColor: "#FFBE07",
                                fontSize: "20px",
                              }}
                            />
                          </div>
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>1</td>
                        <td>Muhammad Riaz Ahmad</td>
                        <td>03223456789086</td>
                        <td>i live in sahiwal and i live in lahore </td>
                        <td>
                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ gap: "2px" }}>
                            <Input
                              className="form-check-input p-2"
                              type="checkbox"
                              id="formCheck6"
                            />
                            <FaRegEdit
                              style={{
                                padding: "5px",
                                backgroundColor: "#FFBE07",
                                fontSize: "20px",
                              }}
                            />
                          </div>
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>1</td>
                        <td>Muhammad Riaz Ahmad</td>
                        <td>03223456789086</td>
                        <td>i live in sahiwal and i live in lahore </td>
                        <td>
                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ gap: "2px" }}>
                            <Input
                              className="form-check-input p-2"
                              type="checkbox"
                              id="formCheck6"
                            />
                            <FaRegEdit
                              style={{
                                padding: "5px",
                                backgroundColor: "#FFBE07",
                                fontSize: "20px",
                              }}
                            />
                          </div>
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>1</td>
                        <td>Muhammad Riaz Ahmad</td>
                        <td>03223456789086</td>
                        <td>i live in sahiwal and i live in lahore </td>
                        <td>
                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ gap: "2px" }}>
                            <Input
                              className="form-check-input p-2"
                              type="checkbox"
                              id="formCheck6"
                            />
                            <FaRegEdit
                              style={{
                                padding: "5px",
                                backgroundColor: "#FFBE07",
                                fontSize: "20px",
                              }}
                            />
                          </div>
                        </td>
                      </tr>
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
        className="border-bottom w-75  ">
        <OffcanvasHeader toggle={addGuestChangeState} id="offcanvasRightLabel">
          <h1>Add Guest</h1>
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
                      className="form-label">
                      Guest Email
                    </Label>
                    <input
                      type="email"
                      className="form-control"
                      id="billinginfo-firstName"
                      placeholder="Enter Email"
                      onChange={(e) => setGuestEmail(e.target.value)}
                    />
                    {errors.GuestEmail && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.GuestEmail}
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
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                    {errors.GuestName && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.GuestName}
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
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Name"
                      onChange={(e) => setGuestAge(e.target.value)}
                    />
                    {errors.GuestAge && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.GuestAge}
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
                      onChange={(e) => setGuestPhone(e.target.value)}
                    />
                    {errors.GuestPhone && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.GuestPhone}
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
                      id="billinginfo-email"
                      placeholder="Enter Address"
                      onChange={(e) => setGuestAddress(e.target.value)}
                    />
                    {errors.GuestAddress && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.GuestAddress}
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
                      value={GuestGender}
                      onChange={(selectedOption) =>
                        handleSelectGender(selectedOption)
                      }
                      placeholder={GuestGender ? GuestGender : "select Gender"}
                      options={GuestGenders}
                      id="gender"></Select>
                    {errors.GuestGender && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.GuestGender}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>

              <div className="hstack gap-2 justify-content-end my-5">
                <button
                  type="button"
                  className="btn bg-dark text-white"
                  onClick={addGuestChangeState}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  id="add-btn"
                  onClick={forAddGuestSubmit}>
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
        className="border-bottom w-75  ">
        <OffcanvasHeader toggle={editGuestChangeState} id="offcanvasRightLabel">
          <h1>Add Guest</h1>
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
                      className="form-label">
                      Guest Email
                    </Label>
                    <input
                      type="email"
                      className="form-control"
                      id="billinginfo-firstName"
                      placeholder="Enter Email"
                      onChange={(e) => setGuestEmail(e.target.value)}
                    />
                    {errors.GuestEmail && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.GuestEmail}
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
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                    {errors.GuestName && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.GuestName}
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
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Name"
                      onChange={(e) => setGuestAge(e.target.value)}
                    />
                    {errors.GuestAge && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.GuestAge}
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
                      onChange={(e) => setGuestPhone(e.target.value)}
                    />
                    {errors.GuestPhone && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.GuestPhone}
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
                      id="billinginfo-email"
                      placeholder="Enter Address"
                      onChange={(e) => setGuestAddress(e.target.value)}
                    />
                    {errors.GuestAddress && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.GuestAddress}
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
                      value={GuestGender}
                      onChange={(selectedOption) =>
                        handleSelectGender(selectedOption)
                      }
                      placeholder={GuestGender ? GuestGender : "select Gender"}
                      options={GuestGenders}
                      id="gender"></Select>
                    {errors.GuestGender && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.GuestGender}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>

              <div className="hstack gap-2 justify-content-end my-5">
                <button
                  type="button"
                  className="btn bg-dark text-white"
                  onClick={editGuestChangeState}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  id="add-btn"
                  onClick={forAddGuestSubmit}>
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
