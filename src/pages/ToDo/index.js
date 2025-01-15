import React, { useState, useEffect, useCallback } from "react";
import { Col, Container, Row, Input } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UseRiazHook } from "../../RiazStore/RiazStore";
import { FaTrash } from "react-icons/fa";

const ToDoList = () => {
  const [kotData, setKotData] = useState({});
  const [kotsAllItems, setKotAllItems] = useState([]);
  const [kotPrevItems, setKotPrevItems] = useState([]);
  const [voidItemReasonPart, setVoidItemReason] = useState(false);
  const [voidReason, setVoidReason] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
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
    if (checkedItems.includes(id)) {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((itemId) => itemId !== id)
      );
      setSelectedItemId(id);
      setVoidItemReason(true);
    } else {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, id]);
    }
  };

  //these are some reasons for select
  const voidItemReasons = [
    { value: "bad taste", name: "Bad Taste" },
    { value: "wrong Punch", name: "Wrong Punch" },
    { value: "extra quantity", name: "extra quantity" },
    { value: "cutomer mind change", name: "customer mind change" },
  ];

  //this is for getting kot data
  const forGettingKotDataForEdit = async () => {
    const url = `${myUrl}/get/${tableid}/kotdataforedit/${id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setKotAllItems(data.kot.orderItems);
        setKotPrevItems(data.kot.orderItems);
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

  // // Function to increase quantity
  const increaseQuantity = (id) => {
    const itemToUpdate = kotsAllItems.find((item) => item._id === id);
    const correspondingItem = kotPrevItems.find((item) => item._id === id);

    if (
      itemToUpdate &&
      correspondingItem &&
      itemToUpdate.quantity < correspondingItem.quantity
    ) {
      setKotAllItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  //this is for disabled the button
  const isButtonDisabled = (id) => {
    const itemToUpdate = kotsAllItems.find((item) => item._id === id);
    const correspondingItem = kotPrevItems.find((item) => item._id === id);

    return (
      itemToUpdate &&
      correspondingItem &&
      itemToUpdate.quantity >= correspondingItem.quantity
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
          id: item.id,
          name: item.name,
          price: item.price,
          items: item.items,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
          modifier: item.modifier || null,
          reason: item.voidReason || null,
        })),
      };
    } else {
      orderData = {};
    }

    console.log("order data", orderData);

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
    const updatedItems = kotsAllItems.map((item) =>
      item._id === id ? { ...item, quantity: 0 } : item
    );
    setKotAllItems(updatedItems);
  };

  //this is for save void reason
  const saveVoidReason = () => {
    setKotAllItems((prevItems) =>
      prevItems.map((item) =>
        item._id === selectedItemId ? { ...item, voidReason } : item
      )
    );
    setVoidItemReason(false);
    setVoidReason("");
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
                          {item.voidReason &&
                            item.voidReason.trim() !== "" &&
                            item.quantity > 0 && (
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
                          {item.voidReason && item.voidReason.trim() !== "" ? (
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
                                onClick={() => increaseQuantity(item?._id)}
                                style={{
                                  fontSize: "12px",
                                  backgroundColor: "#4D5156",
                                }}
                                type="button"
                                className="plus"
                                disabled={isButtonDisabled(item?._id)}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            item.quantity
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

      {/* this is for open void item reason part */}
      {voidItemReasonPart && (
        <div
          className="d-flex align-items-center justify-content-center position-fixed px-2"
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 5000,
          }}
        >
          <div
            className="d-flex flex-column bg-white pb-4"
            style={{
              width: "800px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="p-1 d-flex justify-content-between align-items-center mb-2"
              style={{ fontSize: "14px", backgroundColor: "#E3614D" }}
            >
              <h5 className="p-0 m-0 text-white">Void Item Reason</h5>
              <p
                className="m-0 p-2 color-dark cursor-pointer"
                onClick={() => setVoidItemReason(false)}
              >
                x
              </p>
            </div>
            <div className="mt-1 p-1">
              <form>
                <div className="form-group">
                  <div className="px-2 row d-flex flex-wrap">
                    {voidItemReasons.map((voiditem, index) => (
                      <div
                        onClick={() => setVoidReason(voiditem.value)}
                        key={index}
                        className="my-2 cursor-pointer   col-sm-3 d-flex align-items-center justify-content-center text-white bg-danger px-3 py-1 mx-1 my-1"
                        style={{ borderRadius: "5px" }}
                      >
                        {voiditem.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pe-auto search-box mx-2 my-2 w-75">
                  <Input
                    type="text"
                    placeholder="Enter Reason "
                    value={voidReason}
                    onChange={(e) => setVoidReason(e.target.value)}
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>

                <div className="d-flex flex-column m-2">
                  <div className="my-2">
                    <button
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        textDecoration: "none",
                        textAlign: "center",
                      }}
                      className="py-2 px-5 border-none"
                      onClick={saveVoidReason}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ToDoList;
