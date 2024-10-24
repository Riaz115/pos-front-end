import React, { useState } from "react";
import { Card, Col, Container, Input, Label, Row, Button } from "reactstrap";
import AuthSlider from "../authCarousel";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import validator from "validator";
const CoverSignIn = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [UserEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  //this is for the validation and catachErros
  const CatchErros = () => {
    let isOk = true;
    let newErrors = {};

    if (!UserEmail.trim()) {
      newErrors.UserEmail = "Email is required";
      toast.error("Email is required");
      isOk = false;
    } else if (!validator.isEmail(UserEmail)) {
      newErrors.UserEmail = "Enter valid email";
      toast.error("Please enter valid emails");
      isOk = false;
    } else if (password.length < 8) {
      newErrors.password = "Password should be at least 8 letters";
      toast.error("Password should be at least 8 letters");
      isOk = false;
    }

    setErrors(newErrors);
    return isOk;
  };

  //this is for handleSubmit
  const forLoginSubmit = (e) => {
    e.preventDefault();
    if (CatchErros()) {
      let formData = {
        UserEmail,
        password,
      };
      console.log("ths is formdata", formData);
    }
  };
  return (
    <React.Fragment>
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>

        <div className="auth-page-content overflow-hidden pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="overflow-hidden">
                  <Row className="g-0">
                    <AuthSlider />

                    <Col lg={6}>
                      <div className="p-lg-5 p-4">
                        <div>
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p className="text-muted">
                            Sign in to continue to UniWeb Solutions.
                          </p>
                        </div>

                        <div className="mt-4">
                          <form action="/">
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
                              <div className="float-end">
                                <Link
                                  to="/auth-pass-reset-cover"
                                  className="text-muted">
                                  Forgot password?
                                </Link>
                              </div>
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

                            <div className="form-check">
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="auth-remember-check"
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="auth-remember-check">
                                Remember me
                              </Label>
                            </div>

                            <div className="mt-4">
                              <Button
                                color="success"
                                className="w-100"
                                onClick={forLoginSubmit}
                                type="submit">
                                Sign In
                              </Button>
                            </div>

                            <div className="mt-4 text-center">
                              <div className="signin-other-title">
                                <h5 className="fs-13 mb-4 title">
                                  Sign In with
                                </h5>
                              </div>

                              <div>
                                <Button
                                  color="primary"
                                  className="btn-icon me-1">
                                  <i className="ri-facebook-fill fs-16"></i>
                                </Button>
                                <Button
                                  color="danger"
                                  className="btn-icon me-1">
                                  <i className="ri-google-fill fs-16"></i>
                                </Button>
                                <Button color="dark" className="btn-icon me-1">
                                  <i className="ri-github-fill fs-16"></i>
                                </Button>
                                <Button color="info" className="btn-icon">
                                  <i className="ri-twitter-fill fs-16"></i>
                                </Button>
                              </div>
                            </div>
                          </form>
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            Don't have an account ?{" "}
                            <a
                              href="/auth-signup-cover"
                              className="fw-semibold text-primary text-decoration-underline">
                              {" "}
                              Signup
                            </a>{" "}
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

        <footer className="footer start-0">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center">
                  <p className="mb-0">
                    &copy; {new Date().getFullYear()} UniWeb Solutions Crafted
                    with
                    <i className="mdi mdi-heart text-danger"></i> by POS
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default CoverSignIn;
