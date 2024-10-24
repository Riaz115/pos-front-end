import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import ParticlesAuth from "../ParticlesAuth";

//import images
import logoLight from "../../../assets/images/logo-light.png";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import { toast } from "react-toastify";

const BasicSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErorrs] = useState("");

  //this is for navigation
  const naviagte = useNavigate();

  //this is for getting data form my custome hook
  const { setTokenToLocalStorage, myUrl } = UseRiazHook();

  //this is for catch errors
  const forCatchErrors = () => {
    let isOk = true;
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Please Enter Email";
      toast.error("Please Enter Email");
      isOk = false;
    } else if (!password.trim()) {
      newErrors.password = "Please Enter Password";
      toast.error("Please Enter Password");
      isOk = false;
    }

    setErorrs(newErrors);
    return isOk;
  };

  //this is for click on the login button
  const forClickLoginButton = (e) => {
    e.preventDefault();
    if (forCatchErrors()) {
      let formData = {
        email,
        password,
      };

      //this is for login function
      const forLogin = async () => {
        const url = `${myUrl}/login`;
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
            setTokenToLocalStorage(data.token);
            console.log("token in sing in", data.token);
            naviagte("/my-dashboard");
          } else {
            toast.error(data.msg);
          }
        } catch (err) {
          console.log("there is error in the login function", err);
        }
      };

      forLogin();
    }
  };

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                      <img src={logoLight} alt="" height="20" />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">UniWeb Solutions POS</p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">
                        Sign in to continue to UniWeb.
                      </p>
                    </div>
                    <div className="p-2 mt-4">
                      <form action="#">
                        <div className="mb-3">
                          <Label htmlFor="username" className="form-label">
                            Email
                          </Label>
                          <Input
                            type="email"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {errors.email && (
                            <p
                              style={{
                                fontSize: "12px",
                                color: "red",
                                paddingLeft: "5px",
                              }}>
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link
                              to="/auth-pass-reset-basic"
                              className="text-muted">
                              Forgot password?
                            </Link>
                          </div>
                          <Label
                            className="form-label"
                            htmlFor="password-input">
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              type="password"
                              className="form-control pe-5 password-input"
                              placeholder="Enter password"
                              id="password-input"
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />

                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon">
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                          {errors.password && (
                            <p
                              style={{
                                fontSize: "12px",
                                color: "red",
                                paddingLeft: "5px",
                              }}>
                              {errors.password}
                            </p>
                          )}
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
                            onClick={(e) => forClickLoginButton(e)}
                            className="btn btn-success w-100"
                            type="submit">
                            Sign In
                          </Button>
                        </div>

                        <div className="mt-4 text-center">
                          <div className="signin-other-title">
                            <h5 className="fs-13 mb-4 title">Sign In with</h5>
                          </div>
                          <div>
                            <Button color="primary" className="btn-icon">
                              <i className="ri-facebook-fill fs-16"></i>
                            </Button>{" "}
                            <Button color="danger" className="btn-icon">
                              <i className="ri-google-fill fs-16"></i>
                            </Button>{" "}
                            <Button color="dark" className="btn-icon">
                              <i className="ri-github-fill fs-16"></i>
                            </Button>{" "}
                            <Button color="info" className="btn-icon">
                              <i className="ri-twitter-fill fs-16"></i>
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </CardBody>
                </Card>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Don't have an account ?{" "}
                    <Link
                      to="/auth-signup-basic"
                      className="fw-semibold text-primary text-decoration-underline">
                      {" "}
                      Signup{" "}
                    </Link>{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default BasicSignIn;
