import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Input,
  Table,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Label,
  Form,
} from "reactstrap";
import Select from "react-select";
import SimpleBar from "simplebar-react";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import myImage from "../../../assets/images/users/avatar-1.jpg";
import { UseRiazHook } from "../../../RiazStore/RiazStore";

const DashboardCrypto = () => {
  //this is my code
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
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="bg-light-dark mt-2 mb-4">Manage Guest</h5>
              <div>
                <Button
                  className="add-btn btn-warning text-white px-3 me-2 py-2 border-none"
                  id="create-btn">
                  <i className="ri-download-line align-bottom me-1"></i>
                  Export to excel
                </Button>
                <Button
                  className="add-btn bg-dark text-white px-3 py-2 border-none"
                  onClick={addGuestChangeState}
                  id="create-btn">
                  <i className="ri-add-line align-bottom me-1"></i> Add Guest
                </Button>
              </div>
            </div>
            <hr></hr>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="bg-light-dark mt-2 mb-4">Search Guest</h6>
              <div>
                <Button
                  className="add-btn primary text-white px-3 py-2 border-none"
                  id="create-btn">
                  <i className="ri-search-line align-bottom me-1"></i> Search
                </Button>
              </div>
            </div>

            <Form>
              <Row>
                <Col md={6} xs={12} className="mb-3">
                  <Label for="kotType" style={{ fontWeight: "bold" }}>
                    Mobile No
                  </Label>
                  <Input
                    type="text"
                    id="kotType"
                    placeholder="Enter mobile number"
                  />
                </Col>

                <Col md={6} xs={12} className="mb-3">
                  <Label for="additionalInfo" style={{ fontWeight: "bold" }}>
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="additionalInfo"
                    placeholder="Enter name"
                  />
                </Col>
              </Row>
            </Form>
          </div>

          <hr />

          {/* Table Section */}
          <div className="table-responsive mt-4">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Mobile no</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>for testing and i am for</td>
                  <td>25</td>
                  <td>Male</td>
                  <td>chak no 115 9.l sahiwal and live in pakistan</td>
                  <td>35645788997554</td>
                  <td>iamfortestingemail@gmail.com</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        onClick={editGuestChangeState}
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
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
                  </td>
                </tr>{" "}
                <tr>
                  <td>1</td>
                  <td>for testing and i am for</td>
                  <td>25</td>
                  <td>Male</td>
                  <td>chak no 115 9.l sahiwal and live in pakistan</td>
                  <td>35645788997554</td>
                  <td>iamfortestingemail@gmail.com</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        onClick={editGuestChangeState}
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
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
                  </td>
                </tr>{" "}
                <tr>
                  <td>1</td>
                  <td>for testing and i am for</td>
                  <td>25</td>
                  <td>Male</td>
                  <td>chak no 115 9.l sahiwal and live in pakistan</td>
                  <td>35645788997554</td>
                  <td>iamfortestingemail@gmail.com</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        onClick={editGuestChangeState}
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
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
                  </td>
                </tr>{" "}
                <tr>
                  <td>1</td>
                  <td>for testing and i am for</td>
                  <td>25</td>
                  <td>Male</td>
                  <td>chak no 115 9.l sahiwal and live in pakistan</td>
                  <td>35645788997554</td>
                  <td>iamfortestingemail@gmail.com</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        onClick={editGuestChangeState}
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
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
                  </td>
                </tr>{" "}
                <tr>
                  <td>1</td>
                  <td>for testing and i am for</td>
                  <td>25</td>
                  <td>Male</td>
                  <td>chak no 115 9.l sahiwal and live in pakistan</td>
                  <td>35645788997554</td>
                  <td>iamfortestingemail@gmail.com</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        onClick={editGuestChangeState}
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
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
                  </td>
                </tr>{" "}
                <tr>
                  <td>1</td>
                  <td>for testing and i am for</td>
                  <td>25</td>
                  <td>Male</td>
                  <td>chak no 115 9.l sahiwal and live in pakistan</td>
                  <td>35645788997554</td>
                  <td>iamfortestingemail@gmail.com</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        onClick={editGuestChangeState}
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
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
                  </td>
                </tr>{" "}
                <tr>
                  <td>1</td>
                  <td>for testing and i am for</td>
                  <td>25</td>
                  <td>Male</td>
                  <td>chak no 115 9.l sahiwal and live in pakistan</td>
                  <td>35645788997554</td>
                  <td>iamfortestingemail@gmail.com</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        onClick={editGuestChangeState}
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
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
                  </td>
                </tr>{" "}
                <tr>
                  <td>1</td>
                  <td>for testing and i am for</td>
                  <td>25</td>
                  <td>Male</td>
                  <td>chak no 115 9.l sahiwal and live in pakistan</td>
                  <td>35645788997554</td>
                  <td>iamfortestingemail@gmail.com</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        onClick={editGuestChangeState}
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
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
                  </td>
                </tr>{" "}
                <tr>
                  <td>1</td>
                  <td>for testing and i am for</td>
                  <td>25</td>
                  <td>Male</td>
                  <td>chak no 115 9.l sahiwal and live in pakistan</td>
                  <td>35645788997554</td>
                  <td>iamfortestingemail@gmail.com</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        onClick={editGuestChangeState}
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
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
                  </td>
                </tr>{" "}
                <tr>
                  <td>1</td>
                  <td>for testing and i am for</td>
                  <td>25</td>
                  <td>Male</td>
                  <td>chak no 115 9.l sahiwal and live in pakistan</td>
                  <td>35645788997554</td>
                  <td>iamfortestingemail@gmail.com</td>
                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <button
                        onClick={editGuestChangeState}
                        className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
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
                  </td>
                </tr>{" "}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardCrypto;
