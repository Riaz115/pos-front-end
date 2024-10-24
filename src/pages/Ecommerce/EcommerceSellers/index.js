import React, { useEffect, useState } from "react";

//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { CardBody, Container, Card, Row, Col, Input, Label } from "reactstrap";

const EcommerceSellers = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb permissionsText="All Permissions" />

          <h3 className="my-3 text-capitalize">
            {" "}
            All Permisisons for Users And User Roles{" "}
          </h3>
          <Row>
            <div
              className=" border bg-light my-2 py-3  px-2  rounded p-2 text-capitalize "
              style={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.5)" }}>
              <Col sm={12}>
                <h4>User Role</h4>
                <h2>Oder Taker</h2>
              </Col>
            </div>
            <div className="d-flex align-items-center justify-content-between border rounded my-2 py-3  px-2 bg-light">
              <Col sm={2}>
                <p className="m-0 fw-bold"> items</p>
              </Col>
              <Col sm={10}>
                <div className="d-flex flex-wrap  align-items-center justify-content-center">
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      All Items
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      add new
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      eidt own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      edit any
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete any
                    </Label>
                  </p>{" "}
                </div>
              </Col>
            </div>
            <div className="d-flex align-items-center justify-content-between border rounded my-2 py-3  px-2 bg-light">
              <Col sm={2}>
                <p className="m-0 fw-bold">Catagories</p>
              </Col>
              <Col sm={10}>
                <div className="d-flex flex-wrap  align-items-center justify-content-center">
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      All Catagories
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      add new
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      eidt own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      edit any
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete any
                    </Label>
                  </p>{" "}
                </div>
              </Col>
            </div>
            <div className="d-flex align-items-center justify-content-between border rounded my-2 py-3  px-2 bg-light">
              <Col sm={2}>
                <p className="m-0 fw-bold">Kots</p>
              </Col>
              <Col sm={10}>
                <div className="d-flex flex-wrap  align-items-center justify-content-center">
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      All Kots
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      add new
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      eidt own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      edit any
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete any
                    </Label>
                  </p>{" "}
                </div>
              </Col>
            </div>
            <div className="d-flex align-items-center justify-content-between border rounded my-2 py-3  px-2 bg-light">
              <Col sm={2}>
                <p className="m-0 fw-bold">invoices</p>
              </Col>
              <Col sm={10}>
                <div className="d-flex flex-wrap  align-items-center justify-content-center">
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      All invoices
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      add new
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      eidt own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      edit any
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete any
                    </Label>
                  </p>{" "}
                </div>
              </Col>
            </div>
            <div className="d-flex align-items-center justify-content-between border rounded my-2 py-3  px-2 bg-light">
              <Col sm={2}>
                <p className="m-0 fw-bold">Users</p>
              </Col>
              <Col sm={10}>
                <div className="d-flex flex-wrap  align-items-center justify-content-center">
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      All Users
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      add new
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      eidt own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      edit any
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete any
                    </Label>
                  </p>{" "}
                </div>
              </Col>
            </div>
            <div className="d-flex align-items-center justify-content-between border rounded my-2 py-3  px-2 bg-light">
              <Col sm={2}>
                <p className="m-0 fw-bold">Guests</p>
              </Col>
              <Col sm={10}>
                <div className="d-flex flex-wrap  align-items-center justify-content-center">
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      All guest
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      add new
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      eidt own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      edit any
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete any
                    </Label>
                  </p>{" "}
                </div>
              </Col>
            </div>
            <div className="d-flex align-items-center justify-content-between border rounded my-2 py-3  px-2 bg-light">
              <Col sm={2}>
                <p className="m-0 fw-bold">Tables</p>
              </Col>
              <Col sm={10}>
                <div className="d-flex flex-wrap  align-items-center justify-content-center">
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      All Tables
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      add new
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      eidt own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      edit any
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete any
                    </Label>
                  </p>{" "}
                </div>
              </Col>
            </div>
            <div className="d-flex align-items-center justify-content-between border rounded my-2 py-3  px-2 bg-light">
              <Col sm={2}>
                <p className="m-0 fw-bold">Waiters</p>
              </Col>
              <Col sm={10}>
                <div className="d-flex flex-wrap  align-items-center justify-content-center">
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      All Waiters
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      add new
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      eidt own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      edit any
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete any
                    </Label>
                  </p>{" "}
                </div>
              </Col>
            </div>
            <div className="d-flex align-items-center justify-content-between border rounded my-2 py-3  px-2 bg-light">
              <Col sm={2}>
                <p className="m-0 fw-bold">Roles</p>
              </Col>
              <Col sm={10}>
                <div className="d-flex flex-wrap  align-items-center justify-content-center">
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      All Roles
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      add new
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      eidt own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete own
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      edit any
                    </Label>
                  </p>{" "}
                  <p
                    className="px-3 py-1 bg-light d-flex m-2"
                    style={{ gap: "5px" }}>
                    {" "}
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck6"
                    />
                    <Label className="form-check-label " htmlFor="formCheck6">
                      delete any
                    </Label>
                  </p>{" "}
                </div>
              </Col>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceSellers;
