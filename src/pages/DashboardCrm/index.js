import React, { useState } from "react";
import { Container, Col, Row, Input, Label } from "reactstrap";
import {
  FaUtensils,
  FaGlassWhiskey,
  FaCandyCane,
  FaPlus,
  FaRegEdit,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { UseRiazHook } from "../../RiazStore/RiazStore";

const DashboardCrm = () => {
  const [blueCounter, setblueCounter] = useState(5);
  const [forModifier, setForModifier] = useState(false);

  //this is for show guest function
  const { showForGuest, guestSearchChangeState, editGuestChangeState } =
    UseRiazHook();

  function countUP(id, prev_data_attr) {
    id(prev_data_attr + 1);
  }

  function countDown(id, prev_data_attr) {
    id(prev_data_attr - 1);
  }

  //this is for menu items
  const menuItems = [
    { name: "Tandoori Roti", price: "₹40" },
    { name: "Tandoori Butter Roti", price: "₹36" },
    { name: "Plain Naan", price: "₹45" },
    { name: "Butter Naan", price: "₹48" },
    { name: "Cheese Naan", price: "₹53" },
    { name: "Garlic Naan", price: "₹58" },
    { name: "Lachha Paratha", price: "₹83" },
    { name: "Stuffed Paratha", price: "₹93" },
    { name: "Roti Basket", price: "₹159" },
  ];

  //this is for catagories
  const categories = [
    "Technology",
    "Health",
    "Education",
    "Entertainment",
    "Sports",
    "Travel",
    "Food",
    "Fashion",
    "Business",
    "Art",
    "Technology",
    "Health",
    "Education",
    "Entertainment",
    "Sports",
    "Travel",
    "Food",
    "Fashion",
    "Business",
    "Art",
  ];

  //this is for modifiers
  const Modifiers = [
    { id: "Less Chilly", name: "Less Chilly" },
    { id: "Less Oil", name: "Less Oil" },
    { id: "Less Cheese", name: "Less Cheese" },
    { id: "Less Butter", name: "Less Butter" },
    { id: "Spicy", name: "Spicy" },
    { id: "Salty", name: "Salty" },
    { id: "Sweet", name: "Sweet" },
    { id: "Extra Butter", name: "Extra Butter" },
    { id: "Extra Cheese", name: "Extra Cheese" },
    { id: "Less Sugar", name: "Less Sugar" },
    { id: "Jain", name: "Jain" },
    { id: "With Ice Cream", name: "With Ice Cream" },
    { id: "Without Onion", name: "Without Onion" },
    { id: "Without Garlic", name: "Without Garlic" },
    { id: "Extra Chilly", name: "Extra Chilly" },
    { id: "extra sambhar", name: "extra sambhar" },
    { id: "No Green Chilli", name: "No Green Chilli" },
    { id: "1/2", name: "1/2" },
    { id: "Red chily", name: "Red chily" },
    { id: "Tata", name: "Tata" },
    { id: "Ta", name: "Ta" },
  ];

  return (
    <React.Fragment>
      <div
        className="page-content"
        style={{ overflow: "hidden", height: "100vh" }}>
        <Container fluid>
          <Row className="p-0 ">
            <Col lg={6}>
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ fontSize: "14px" }}>
                <p className="m-0 p-0 ">
                  Dine in <span className="fw-bold"> Table no 1</span>
                </p>
                <p className="m-0 p-0 ">
                  Guest
                  <span
                    className="fw-bold ps-1"
                    style={{
                      fontSize: "12px",
                    }}>
                    riaz shb and i am
                  </span>
                </p>

                <p className="m-0 p-0 ">
                  captain{" "}
                  <span
                    className="fw-bold"
                    style={{
                      fontSize: "12px",
                    }}>
                    riaz shb and i
                  </span>
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3 bg-white py-2">
                <div className="pe-auto search-box w-75">
                  <Input type="text" placeholder="search ..." />
                  <i className="ri-search-line search-icon"></i>
                </div>
                <div className="px-auto">1</div>
                <div className="px-auto">
                  <button type="button" className="btn btn-danger px-3">
                    <i className="ri-equalizer-fill me-1 align-bottom "></i>
                  </button>
                </div>
              </div>

              <div
                className="mt-2 table-responsive z-3"
                style={{
                  maxHeight: "50vh",
                  overflowY: "scroll",
                  gap: "1px",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}>
                <table className="table  table-hover table-light  ">
                  <thead>
                    <tr>
                      <th scope="col " style={{ fontSize: "12px" }}>
                        #
                      </th>
                      <th scope="col" style={{ fontSize: "12px" }}>
                        Name
                      </th>
                      <th scope="col" style={{ fontSize: "12px" }}>
                        Modifier
                      </th>
                      <th scope="col" style={{ fontSize: "12px" }}>
                        Quantity
                      </th>
                      <th scope="col" style={{ fontSize: "12px" }}>
                        Rate
                      </th>
                      <th scope="col" style={{ fontSize: "12px" }}>
                        amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontSize: "12px" }}>1</td>
                      <td style={{ fontSize: "12px" }}>pizza paratha taste</td>
                      <td style={{ fontSize: "12px" }}>
                        <FaPlus
                          className="cursor-pointer"
                          onClick={() => setForModifier(true)}
                        />
                      </td>
                      <td>
                        <div className="input-step step-primary">
                          <button
                            style={{ fontSize: "12px", backgroundColor: "red" }}
                            type="button"
                            className="minus"
                            onClick={() => {
                              countDown(setblueCounter, blueCounter);
                            }}>
                            –
                          </button>
                          <Input
                            type="number"
                            style={{ fontSize: "12px" }}
                            className="product-quantity"
                            value={blueCounter}
                            min="0"
                            max="100"
                            readOnly
                          />
                          <button
                            style={{
                              fontSize: "12px",
                              backgroundColor: "#0C96BC",
                            }}
                            type="button"
                            className="plus"
                            onClick={() => {
                              countUP(setblueCounter, blueCounter);
                            }}>
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ fontSize: "12px" }}>230.00</td>
                      <td style={{ fontSize: "12px" }}>1234.99</td>
                    </tr>

                    <tr>
                      <td style={{ fontSize: "12px" }}>1</td>
                      <td style={{ fontSize: "12px" }}>pizza paratha taste</td>
                      <td style={{ fontSize: "12px" }}>
                        <FaPlus />
                      </td>
                      <td>
                        <div className="input-step step-primary">
                          <button
                            style={{ fontSize: "12px", backgroundColor: "red" }}
                            type="button"
                            className="minus"
                            onClick={() => {
                              countDown(setblueCounter, blueCounter);
                            }}>
                            –
                          </button>
                          <Input
                            type="number"
                            style={{ fontSize: "12px" }}
                            className="product-quantity"
                            value={blueCounter}
                            min="0"
                            max="100"
                            readOnly
                          />
                          <button
                            style={{
                              fontSize: "12px",
                              backgroundColor: "#0C96BC",
                            }}
                            type="button"
                            className="plus"
                            onClick={() => {
                              countUP(setblueCounter, blueCounter);
                            }}>
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ fontSize: "12px" }}>230.00</td>
                      <td style={{ fontSize: "12px" }}>1234.99</td>
                    </tr>

                    <tr>
                      <td style={{ fontSize: "12px" }}>1</td>
                      <td style={{ fontSize: "12px" }}>pizza paratha taste</td>
                      <td style={{ fontSize: "12px" }}>
                        <FaPlus />
                      </td>
                      <td>
                        <div className="input-step step-primary">
                          <button
                            style={{ fontSize: "12px", backgroundColor: "red" }}
                            type="button"
                            className="minus"
                            onClick={() => {
                              countDown(setblueCounter, blueCounter);
                            }}>
                            –
                          </button>
                          <Input
                            type="number"
                            style={{ fontSize: "12px" }}
                            className="product-quantity"
                            value={blueCounter}
                            min="0"
                            max="100"
                            readOnly
                          />
                          <button
                            style={{
                              fontSize: "12px",
                              backgroundColor: "#0C96BC",
                            }}
                            type="button"
                            className="plus"
                            onClick={() => {
                              countUP(setblueCounter, blueCounter);
                            }}>
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ fontSize: "12px" }}>230.00</td>
                      <td style={{ fontSize: "12px" }}>1234.99</td>
                    </tr>

                    <tr>
                      <td style={{ fontSize: "12px" }}>1</td>
                      <td style={{ fontSize: "12px" }}>pizza paratha taste</td>
                      <td style={{ fontSize: "12px" }}>
                        <FaPlus />
                      </td>
                      <td>
                        <div className="input-step step-primary">
                          <button
                            style={{ fontSize: "12px", backgroundColor: "red" }}
                            type="button"
                            className="minus"
                            onClick={() => {
                              countDown(setblueCounter, blueCounter);
                            }}>
                            –
                          </button>
                          <Input
                            type="number"
                            style={{ fontSize: "12px" }}
                            className="product-quantity"
                            value={blueCounter}
                            min="0"
                            max="100"
                            readOnly
                          />
                          <button
                            style={{
                              fontSize: "12px",
                              backgroundColor: "#0C96BC",
                            }}
                            type="button"
                            className="plus"
                            onClick={() => {
                              countUP(setblueCounter, blueCounter);
                            }}>
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ fontSize: "12px" }}>230.00</td>
                      <td style={{ fontSize: "12px" }}>1234.99</td>
                    </tr>

                    <tr>
                      <td style={{ fontSize: "12px" }}>1</td>
                      <td style={{ fontSize: "12px" }}>pizza paratha taste</td>
                      <td style={{ fontSize: "12px" }}>
                        <FaPlus />
                      </td>
                      <td>
                        <div className="input-step step-primary">
                          <button
                            style={{ fontSize: "12px", backgroundColor: "red" }}
                            type="button"
                            className="minus"
                            onClick={() => {
                              countDown(setblueCounter, blueCounter);
                            }}>
                            –
                          </button>
                          <Input
                            type="number"
                            style={{ fontSize: "12px" }}
                            className="product-quantity"
                            value={blueCounter}
                            min="0"
                            max="100"
                            readOnly
                          />
                          <button
                            style={{
                              fontSize: "12px",
                              backgroundColor: "#0C96BC",
                            }}
                            type="button"
                            className="plus"
                            onClick={() => {
                              countUP(setblueCounter, blueCounter);
                            }}>
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ fontSize: "12px" }}>230.00</td>
                      <td style={{ fontSize: "12px" }}>1234.99</td>
                    </tr>

                    <tr>
                      <td style={{ fontSize: "12px" }}>1</td>
                      <td style={{ fontSize: "12px" }}>pizza paratha taste</td>
                      <td style={{ fontSize: "12px" }}>
                        <FaPlus />
                      </td>
                      <td>
                        <div className="input-step step-primary">
                          <button
                            style={{ fontSize: "12px", backgroundColor: "red" }}
                            type="button"
                            className="minus"
                            onClick={() => {
                              countDown(setblueCounter, blueCounter);
                            }}>
                            –
                          </button>
                          <Input
                            type="number"
                            style={{ fontSize: "12px" }}
                            className="product-quantity"
                            value={blueCounter}
                            min="0"
                            max="100"
                            readOnly
                          />
                          <button
                            style={{
                              fontSize: "12px",
                              backgroundColor: "#0C96BC",
                            }}
                            type="button"
                            className="plus"
                            onClick={() => {
                              countUP(setblueCounter, blueCounter);
                            }}>
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ fontSize: "12px" }}>230.00</td>
                      <td style={{ fontSize: "12px" }}>1234.99</td>
                    </tr>

                    <tr>
                      <td style={{ fontSize: "12px" }}>1</td>
                      <td style={{ fontSize: "12px" }}>pizza paratha taste</td>
                      <td style={{ fontSize: "12px" }}>
                        <FaPlus />
                      </td>
                      <td>
                        <div className="input-step step-primary">
                          <button
                            style={{ fontSize: "12px", backgroundColor: "red" }}
                            type="button"
                            className="minus"
                            onClick={() => {
                              countDown(setblueCounter, blueCounter);
                            }}>
                            –
                          </button>
                          <Input
                            type="number"
                            style={{ fontSize: "12px" }}
                            className="product-quantity"
                            value={blueCounter}
                            min="0"
                            max="100"
                            readOnly
                          />
                          <button
                            style={{
                              fontSize: "12px",
                              backgroundColor: "#0C96BC",
                            }}
                            type="button"
                            className="plus"
                            onClick={() => {
                              countUP(setblueCounter, blueCounter);
                            }}>
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ fontSize: "12px" }}>230.00</td>
                      <td style={{ fontSize: "12px" }}>1234.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="mt-2  d-flex align-items-center justify-content-between p-2 "
                style={{ backgroundColor: "#E6E6E6" }}>
                <h6>Total Items 3</h6>
                <h6>Sub Total: 305.00</h6>
              </div>
              <div
                className="d-flex align-items-center justify-content-between mt-2"
                style={{ gap: "2px" }}>
                <Link
                  onClick={guestSearchChangeState}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                  className="w-100 py-3">
                  Guest
                </Link>
                <Link
                  style={{
                    backgroundColor: "#E84743",
                    color: "white",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                  className="w-100 py-3">
                  Tables
                </Link>
                <Link
                  style={{
                    backgroundColor: "#D59E00",
                    color: "black",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                  className="w-100 py-3">
                  KOT Print
                </Link>
                <Link
                  style={{
                    backgroundColor: "#1B8339",
                    color: "white",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                  className="w-100 py-3">
                  save
                </Link>
              </div>
            </Col>
            <Col lg={2} md={4}>
              <div
                className="d-flex align-items-center justify-content-between flex-column "
                style={{ gap: "1px" }}>
                <div
                  className="w-100 px-2 py-2   text-white"
                  style={{
                    backgroundColor: "#C32C18",
                    color: "white",
                  }}>
                  Catagories
                </div>
                <div
                  className="d-flex flex-column w-100 "
                  style={{
                    height: "100vh",
                    overflowY: "scroll",
                    paddingBottom: "150px",
                    gap: "1px",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}>
                  {categories.map((item, index) => (
                    <div
                      className="w-100 p-2  text-white"
                      key={index}
                      style={{
                        backgroundColor: "#322595",
                        color: "white",
                      }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col lg={4} md={8}>
              <div
                className="d-flex align-items-center "
                style={{ fontSize: "14px", color: "white", gap: "1px" }}>
                <div
                  style={{ backgroundColor: "#F5B800" }}
                  className=" text-center py-2  w-100 cursor-pointer">
                  <FaUtensils /> Food
                </div>
                <div
                  style={{ backgroundColor: "#F5B800" }}
                  className=" text-center py-2 w-100 cursor-pointer">
                  <FaGlassWhiskey /> Drinks
                </div>
                <div
                  style={{ backgroundColor: "#F5B800" }}
                  className=" text-center py-2 w-100 cursor-pointer">
                  <FaCandyCane /> Sweets
                </div>
              </div>
              <div className="input-group mt-2 w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name"
                />
              </div>
              <div
                className="container mt-2  "
                style={{
                  height: "100vh",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}>
                <div className="row">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      className=" col-md-4 col-sm-6 position-relative cursor-pointer   d-flex align-items-center justify-content-center  py-4 px-2"
                      style={{
                        border: "2px solid white",
                        color: "white",
                        fontSize: "12px",
                        backgroundColor: "#4532A1",
                      }}>
                      <p className="m-0 text-center">{item.name}</p>
                      <p
                        className="position-absolute px-1 text-center m-0"
                        style={{
                          bottom: "1px",
                          left: "1px",
                          color: "black",
                          backgroundColor: "white",
                        }}>
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>

          {forModifier && (
            <div
              className="d-flex align-items-center justify-content-center position-fixed"
              style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 5000,
              }}>
              <div
                className="d-flex  flex-column bg-white  pb-4 "
                style={{
                  width: "800px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}>
                <div
                  className=" p-1  d-flex justify-content-between align-items-center  mb-2"
                  style={{ fontSize: "14px", backgroundColor: "#E3614D" }}>
                  <p className="p-0 m-0 text-white">Modifier</p>
                  <p
                    className="m-0 p-2 color-dark cursor-pointer"
                    onClick={() => setForModifier(false)}>
                    x
                  </p>
                </div>
                <div className="mt-1 p-1">
                  <form>
                    <div className="form-group">
                      <div className="row">
                        {Modifiers.map((item, index) => (
                          <div className="col-md-2 my-2" key={index}>
                            <div
                              className="form-check d-flex align-items-center"
                              style={{ gap: "5px" }}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={item.id}
                              />
                              <label
                                className="form-check-label"
                                for={item.id}
                                style={{
                                  fontSize: "12px",
                                  textAlign: "center",
                                }}>
                                {item.name}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="d-flex  flex-column">
                      <div className="my-2">
                        <Link
                          className="py-1 px-3 mx-1  text-white  text-decoration-none"
                          style={{ backgroundColor: " #0275FA" }}>
                          Select
                        </Link>
                      </div>
                      <div className="pe-auto search-box w-50 my-2">
                        <Input type="text" placeholder="modify...." />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                      <div className="my-2">
                        <Link
                          onClick={() => setForModifier(false)}
                          className="py-2 px-3 mx-1  text-white  text-decoration-none"
                          style={{ backgroundColor: " #0275FA" }}>
                          Save & Select
                        </Link>
                        <Link
                          onClick={() => setForModifier(false)}
                          className="py-2 px-3 mx-1  text-white  text-decoration-none"
                          style={{ backgroundColor: " #E3614D" }}>
                          Close
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* this is for guest */}

          {/* {showForGuest && (
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
                      onClick={editGuestChangeState}
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
                    <Input
                      type="text"
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
                                  onClick={() => setShowForEditGuest(true)}
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
          )} */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardCrm;
