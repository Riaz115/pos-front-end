import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import ParticlesAuth from "../ParticlesAuth";
//import images
import logoLight from "../../../assets/images/logo-light.png";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import { toast } from "react-toastify";

const BasicLockScreen = () => {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "riaz") {
      navigate("/dashboard");
    } else {
      toast.error("please enter valid password");
    }
  };

  return (
    <React.Fragment>
      <div className="auth-page-content">
        <div className="auth-page-wrapper">
          <ParticlesAuth>
            <div className="auth-page-content">
              <Container>
                <Row>
                  <Col lg={12}>
                    <div className="text-center mt-sm-5 mb-4 text-white-50">
                      <div>
                        <Link
                          to="/dashboard"
                          className="d-inline-block auth-logo">
                          <img src={logoLight} alt="" height="20" />
                        </Link>
                      </div>
                      <p className="mt-3 fs-15 fw-medium">
                        UniWeb Solutions POS
                      </p>
                    </div>
                  </Col>
                </Row>

                <Row className="justify-content-center">
                  <Col md={8} lg={6} xl={5}>
                    <Card className="mt-4">
                      <CardBody className="p-4">
                        <div className="text-center mt-2">
                          <h5 className="text-primary">Lock Screen</h5>
                          <p className="text-muted">
                            Enter your password to unlock the screen!
                          </p>
                        </div>
                        <div className="user-thumb text-center">
                          <img
                            src={avatar1}
                            className="rounded-circle img-thumbnail avatar-lg"
                            alt="thumbnail"
                          />
                          <h5 className="font-size-15 mt-3">
                            Muhammad Riaz Ahmad Shb
                          </h5>
                        </div>
                        <div className="p-2 mt-4">
                          <form>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="userpassword">
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="userpassword"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                            </div>
                            <div className="mb-2 mt-4">
                              <Button
                                color="success"
                                onClick={handleSubmit}
                                className="w-100"
                                type="submit">
                                Unlock
                              </Button>
                            </div>
                          </form>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </ParticlesAuth>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BasicLockScreen;
