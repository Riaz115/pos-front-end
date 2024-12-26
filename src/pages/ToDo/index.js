import React, { useState, useEffect, useCallback } from "react";
import { Col, Container, Row } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UseRiazHook } from "../../RiazStore/RiazStore";
import { FaTrash } from "react-icons/fa";

const ToDoList = () => {
  const [kotData, setKotData] = useState({});
  const [kotsAllItems, setKotAllItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState(
    kotsAllItems.map((item) => item.id)
  );

  //this is for navigation
  const navigate = useNavigate();

  //this is for getting from my custome hook
  const {
    myUrl,
    forTableData,
    counterAreaId,
    userData,
    restData,
    forGettingTableData,
    setForTableId,
    counterId,
    formatAmount,
  } = UseRiazHook();

  //this is for getting id of table and kot id
  const { id, tableid } = useParams();

  useEffect(() => {
    setForTableId(tableid);
  }, []);

  // Function to handle checkbox change
  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(id)
        ? prevCheckedItems.filter((itemId) => itemId !== id)
        : [...prevCheckedItems, id]
    );
  };

  //this is for getting kot data
  const forGettingKotDataForEdit = async () => {
    const url = `${myUrl}/get/${tableid}/kotdataforedit/${id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setKotAllItems(data.kot.orderItems);
        setCheckedItems(data.kot.orderItems.map((item) => item._id));
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the getting data kot for edit items", err);
    }
  };

  //this is for controll rendering of get data of kot for edit
  useEffect(() => {
    forGettingKotDataForEdit();
    forGettingTableData();
  }, []);

  // Function to increase quantity
  const increaseQuantity = (id) => {
    setKotAllItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease quantity
  const decreaseQuantity = (id) => {
    let newItem = {};
    setKotAllItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  //this is for edit the kot and send it to backend
  const forVoidKotItems = async () => {
    let orderData = {};
    if (kotsAllItems) {
      orderData = {
        orderItems: kotsAllItems.map((item) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          items: item.items,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
          modifier: item.modifier || null,
        })),
      };
    } else {
      orderData = {};
    }

    const url = `${myUrl}/edit/${tableid}/kotitems/${id}`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        if (forTableData?.tableType === "dine-in") {
          navigate(`/area/${counterId}/tables`);
        } else if (forTableData?.tableType === "take-away") {
          navigate(`/take-away/table/${counterId}`);
        } else if (forTableData?.tableType === "delivery") {
          navigate(`/delivery/tables/${counterId}`);
        }
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the edit kot function", err);
    }
  };

  //this is for remove items from table and select items list
  const removeSelectedItem = (id) => {
    const updatedItems = kotsAllItems.filter((item) => item._id !== id);
    setKotAllItems(updatedItems);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="p-0">
            <Col lg={6}>
              <div
                className="d-flex align-items-center justify-content-between p-2"
                style={{
                  fontSize: "12px",
                  padding: "2px",
                  backgroundColor: "#e2dad9",
                }}
              >
                <p className="m-0 p-0 ">
                  {" "}
                  table no{" "}
                  <span
                    className="fw-bold"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {forTableData?.tableNo}
                  </span>
                </p>
                <p className="m-0 p-0 ">
                  captain
                  <span
                    className="fw-bold"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {userData?.name} riaz shb
                  </span>
                </p>

                <p className="m-0 p-0 ">
                  No of Person{" "}
                  <span
                    className="fw-bold"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {forTableData?.currentOrder
                      ? forTableData.currentOrder.persons
                      : ""}
                  </span>
                </p>
              </div>

              <div
                className="mt-2 table-responsive z-3"
                style={{
                  gap: "1px",
                }}
              >
                <table class="table  table-hover table-light  ">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Item Name
                      </th>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Quantity
                      </th>

                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Rate
                      </th>

                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody style={{ fontSize: "12px" }}>
                    {kotsAllItems.map((item, index) => (
                      <tr key={index}>
                        <td> {index + 1}</td>
                        <td>
                          {!checkedItems.includes(item._id) && (
                            <button
                              className="mx-1"
                              style={{
                                border: "none",
                                cursor: "pointer",
                              }}
                              onClick={() => removeSelectedItem(item._id)}
                            >
                              <FaTrash style={{ color: "red" }} />
                            </button>
                          )}

                          {item.name}
                        </td>
                        <td>
                          {checkedItems.includes(item._id) ? (
                            item.quantity
                          ) : (
                            <div className="input-step step-primary text-center">
                              <button
                                style={{
                                  fontSize: "12px",
                                  backgroundColor: "red",
                                }}
                                type="button"
                                className="minus"
                                onClick={() => decreaseQuantity(item?._id)}
                              >
                                –
                              </button>
                              <input
                                type="number"
                                style={{
                                  fontSize: "12px",
                                  textAlign: "center",
                                  width: "50px",
                                }}
                                value={item.quantity}
                                readOnly
                              />
                              <button
                                style={{
                                  fontSize: "12px",
                                  backgroundColor: "#0C96BC",
                                }}
                                type="button"
                                className="plus"
                                onClick={() => increaseQuantity(item._id)}
                              >
                                +
                              </button>
                            </div>
                          )}
                        </td>
                        <td>{formatAmount(item?.price)}</td>
                        <td>{formatAmount(item.totalPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
            <Col lg={6}>
              <div
                className=" p-1"
                style={{
                  fontSize: "12px",
                  padding: "2px",
                  backgroundColor: "#e2dad9",
                }}
              >
                <h5 className="p-0 m-0">All Items of this kot</h5>
              </div>

              <div
                className="mt-2 table-responsive z-3"
                style={{
                  gap: "1px",
                }}
              >
                <table class="table  table-hover table-light  ">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        check
                      </th>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Item Name
                      </th>
                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Quantity
                      </th>

                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Rate
                      </th>

                      <th
                        scope="col"
                        style={{ fontSize: "12px" }}
                        className="fw-bold"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody style={{ fontSize: "12px" }}>
                    {kotsAllItems.map((item, index) => (
                      <tr key={index} l>
                        <td>
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(item._id)}
                            onChange={() => handleCheckboxChange(item._id)}
                            className="p-2"
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{formatAmount(item?.price)}</td>
                        <td>{formatAmount(item?.totalPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
            <Col sm={12}>
              <div
                className="d-flex align-items-center  justify-content-between mt-1 "
                style={{ backgroundColor: "#E2DAD9" }}
              >
                <div
                  className="d-flex "
                  style={{ gap: "5px", backgroundColor: "#E2DAD9" }}
                >
                  <button
                    style={{
                      backgroundColor: "#E84743",
                      color: "white",
                      textDecoration: "none",
                      textAlign: "center",
                      border: "none",
                    }}
                    className="px-4 py-2 border-none"
                    onClick={forVoidKotItems}
                  >
                    Save
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ToDoList;
