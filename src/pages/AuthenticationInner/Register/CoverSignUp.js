import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Row,
  FormFeedback,
  Input,
  Button,
  Label,
} from "reactstrap";
import { toast } from "react-toastify";
import AuthSlider from "../authCarousel";
import multiUser from "../../../assets/images/users/multi-user.jpg";
import validator from "validator";

const CoverSignUp = () => {
  const [userImage, setuserImage] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setForConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  //this is for the validation and catachErros
  const CatchErros = () => {
    let isOk = true;
    let newErrors = {};

    if (!userName.trim()) {
      newErrors.userName = "Name is required";
      toast.error("user name is required");
      isOk = false;
    } else if (!UserEmail.trim()) {
      newErrors.UserEmail = "Email is required";
      toast.error("Email is required");
      isOk = false;
    } else if (!isEmail(UserEmail)) {
      newErrors.UserEmail = "Enter valid email";
      toast.error("Please enter valid emails");
      isOk = false;
    } else if (password.length < 8) {
      newErrors.password = "Password should be at least 8 letters";
      toast.error("Password should be at least 8 letters");
      isOk = false;
    } else if (password !== confirmPassowrd) {
      newErrors.confirmPassowrd = "incorrect password";
      toast.error("incorrect password");
    }

    setErrors(newErrors);
    return isOk;
  };

  //this is for handleSubmit
  const forSignUpSubmit = (e) => {
    e.preventDefault();
    if (CatchErros()) {
      let formData = new FormData();
      formData.append("name", userName);
      formData.append("email", UserEmail);
      formData.append("password", password);
      formData.append("image", userImage);

      console.log(formData, "this is for form data");
    }
  };

  //   enableReinitialize: true,

  //   initialValues: {
  //     password: "",
  //   },
  //   validationSchema: Yup.object({
  //     password: Yup.string()
  //       .min(8, "Password must be at least 8 characters")
  //       .matches(RegExp("(.*[a-z].*)"), "At least lowercase letter")
  //       .matches(RegExp("(.*[A-Z].*)"), "At least uppercase letter")
  //       .matches(RegExp("(.*[0-9].*)"), "At least one number")
  //       .required("This field is required"),
  //   }),
  //   onSubmit: (values) => {
  //     // console.log(values);
  //   },
  // });

  return (
    <React.Fragment>
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="overflow-hidden m-0">
                  <Row className="justify-content-center g-0">
                    <AuthSlider />

                    <Col lg={6}>
                      <div className="p-lg-5 p-4">
                        <div>
                          <h5 className="text-primary">Register Account</h5>
                          <p className="text-muted">
                            Get your UniWeb Solutions POS account now.
                          </p>
                        </div>

                        <div className="mt-4">
                          <form
                            className="needs-validation"
                            noValidate
                            action="index">
                            <div className="text-center">
                              <div className="position-relative d-inline-block">
                                <div className="position-absolute bottom-0 end-0">
                                  <Label
                                    htmlFor="company-logo-input"
                                    className="mb-0">
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
                                      setuserImage(file);
                                    }}
                                  />
                                </div>
                                <div className="avatar-lg p-1">
                                  <div className="avatar-title bg-light rounded-circle">
                                    <img
                                      src={
                                        userImage
                                          ? URL.createObjectURL(userImage)
                                          : multiUser
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

                            <div className="mb-3">
                              <label htmlFor="username" className="form-label">
                                Username <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter username"
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

                            <div className="mb-3">
                              <label htmlFor="useremail" className="form-label">
                                Email <span className="text-danger">*</span>
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="useremail"
                                placeholder="Enter email address"
                                onChange={(e) => setUserEmail(e.target.value)}
                              />
                              {errors.UserEmail && (
                                <p
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    paddingLeft: "5px",
                                  }}>
                                  {errors.UserEmail}
                                </p>
                              )}
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="password-input">
                                Password
                              </label>
                              <div className="position-relative auth-pass-inputgroup">
                                <Input
                                  type={passwordShow ? "text" : "password"}
                                  className="form-control pe-5 password-input"
                                  placeholder="Enter password"
                                  id="password-input"
                                  name="password"
                                  onChange={(e) => setPassword(e.target.value)}
                                />

                                <Button
                                  color="link"
                                  onClick={() => setPasswordShow(!passwordShow)}
                                  className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                  type="button"
                                  id="password-addon">
                                  <i className="ri-eye-fill align-middle"></i>
                                </Button>
                                {errors.password && (
                                  <p
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      paddingLeft: "5px",
                                    }}>
                                    {errors.password}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="password-input">
                                Password
                              </label>
                              <div className="position-relative auth-pass-inputgroup">
                                <Input
                                  type={
                                    confirmPasswordShow ? "text" : "password"
                                  }
                                  className="form-control pe-5 password-input"
                                  placeholder="Enter password"
                                  id="password-input"
                                  name="password"
                                  onChange={(e) =>
                                    setForConfirmPassword(e.target.value)
                                  }
                                />

                                <Button
                                  color="link"
                                  onClick={() =>
                                    setConfirmPasswordShow(!confirmPasswordShow)
                                  }
                                  className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                  type="button"
                                  id="password-addon">
                                  <i className="ri-eye-fill align-middle"></i>
                                </Button>
                                {errors.confirmPassowrd && (
                                  <p
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      paddingLeft: "5px",
                                    }}>
                                    {errors.confirmPassowrd}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="mb-0 fs-12 text-muted fst-italic">
                                By registering you agree to the UniWeb Solutions
                                POS
                                <Link
                                  to="#"
                                  className=" ps-1 text-primary text-decoration-underline fst-normal fw-medium">
                                  Terms of Use
                                </Link>
                              </p>
                            </div>

                            <div className="mt-4">
                              <button
                                className="btn btn-success w-100"
                                onClick={forSignUpSubmit}
                                type="submit">
                                Sign Up
                              </button>
                            </div>

                            <div className="mt-4 text-center">
                              <div className="signin-other-title">
                                <h5 className="fs-13 mb-4 title text-muted">
                                  Create account with
                                </h5>
                              </div>

                              <div>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-icon waves-effect waves-light me-1">
                                  <i className="ri-facebook-fill fs-16"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-icon waves-effect waves-light me-1">
                                  <i className="ri-google-fill fs-16"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-dark btn-icon waves-effect waves-light me-1">
                                  <i className="ri-github-fill fs-16"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-info btn-icon waves-effect waves-light">
                                  <i className="ri-twitter-fill fs-16"></i>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            Already have an account ?{" "}
                            <Link
                              to="/auth-signin-cover"
                              className="fw-semibold text-primary text-decoration-underline">
                              {" "}
                              Signin
                            </Link>{" "}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <footer className="footer">
          <Container>
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <p className="mb-0">
                    &copy; {new Date().getFullYear()}UniWeb Solutions Crafted
                    with <i className="mdi mdi-heart text-danger"></i> by POS
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default CoverSignUp;
