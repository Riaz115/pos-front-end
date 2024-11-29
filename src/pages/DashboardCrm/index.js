import React, { useEffect, useRef, useState } from "react";
import { Container, Col, Row, Input, Label } from "reactstrap";
import {
  FaUtensils,
  FaGlassWhiskey,
  FaCandyCane,
  FaPlus,
  FaRegEdit,
  FaTrash,
} from "react-icons/fa";

import { Link, useNavigate, useParams } from "react-router-dom";
import { UseRiazHook } from "../../RiazStore/RiazStore";
import { toast } from "react-toastify";

const DashboardCrm = () => {
  const [forModifier, setForModifier] = useState(false);
  const [catagories, setCatagories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showItemWithInput, setShowItemsWithInput] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedModifiers, setSelectedModifiers] = useState([]);
  const [tableData, setTableDAta] = useState({});
  const [inputModifier, setInputModifier] = useState("");
  const [forSettlement, setForSettlement] = useState(false);
  const [allDeals, setAllDeals] = useState([]);
  const [forMultiPaymentOpen, setForMultiPaymentOpen] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [payDetail, setPayDetail] = useState("");
  const [newTableData, setNewTableData] = useState([]);

  //this is for show guest function
  const {
    guestSearchChangeState,
    myUrl,
    restId,
    counterAreaId,
    counterId,
    userData,
    restData,
    setPersons,
    guestData,
    token,
    forTableData,
    setForTableData,
    setForTableId,
    forGettingTableData,
  } = UseRiazHook();

  //this is for getting table id
  const { id } = useParams();
  useEffect(() => {
    setForTableId(id);
  }, [id]);

  //this is for navigate
  const navigate = useNavigate();

  //this is for current data
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  //this is for search items
  const OnchangeHandler = (e) => {
    setShowItemsWithInput(e.target.value);
    const search = e.target.value.toLowerCase();
    if (search) {
      const filteredItems = items.filter((data) =>
        Object.values(data).some(
          (field) =>
            typeof field === "string" && field.toLowerCase().includes(search)
        )
      );
      setFilteredItems(filteredItems);
    } else {
      setFilteredItems(items);
    }
  };

  //this is for get all catagories
  const forGetAllCatagories = async () => {
    const url = `${myUrl}/get-all-catagories/${restId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setCatagories(data.catagories);
        setFilteredCategories(data.catagories);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in get all catagories function for order punch",
        err
      );
    }
  };

  //this is for controll rendering of get all catagories function
  useEffect(() => {
    forGetAllCatagories();
  }, []);

  //this is for get data for edit
  const getDataforEditTable = async () => {
    const url = `${myUrl}/getdata/${id}/table`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setTableDAta(data.tableData);
        setForTableData(data.tableData);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get table data for edit", err);
    }
  };

  //this is for controll rendering
  useEffect(() => {
    if (id) {
      getDataforEditTable();
    }
  }, []);

  //this is for get all filter catagories
  const filterCategories = (mainCategory) => {
    setSelectedCategory(mainCategory);
    const filtered = catagories.filter(
      (item) => item.maincatagory === mainCategory
    );
    setFilteredCategories(filtered);
  };

  //this is for get all menu items
  const forGetAllMenuItems = async () => {
    const url = `${myUrl}/get-all-menuitems/${restId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setItems(data.allItems);
        setFilteredItems(data.allItems);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in get all items function for order punch",
        err
      );
    }
  };

  //this is for controll rendering of get all items
  useEffect(() => {
    forGetAllMenuItems();
  }, []);

  //this is for filter the items on click catagory
  const filterItemsByCategory = (categoryId) => {
    const category = catagories.find((cat) => cat._id === categoryId);
    if (category) {
      const categoryName = category.name;
      setSelectedCategory(categoryName);

      const filtered = items.filter((item) => item.catagory === categoryName);
      setFilteredItems(filtered);
    }
  };

  //this is for modifiers
  const Modifiers = [
    { value: "Less Chilly", name: "Less Chilly" },
    { value: "Less Oil", name: "Less Oil" },
    { value: "Less Cheese", name: "Less Cheese" },
    { value: "Less Butter", name: "Less Butter" },
    { value: "Spicy", name: "Spicy" },
    { value: "Salty", name: "Salty" },
    { value: "Sweet", name: "Sweet" },
    { value: "Extra Butter", name: "Extra Butter" },
    { value: "Extra Cheese", name: "Extra Cheese" },
    { value: "Less Sugar", name: "Less Sugar" },
    { value: "Jain", name: "Jain" },
    { value: "With Ice Cream", name: "With Ice Cream" },
    { value: "Without Onion", name: "Without Onion" },
    { value: "Without Garlic", name: "Without Garlic" },
    { value: "Extra Chilly", name: "Extra Chilly" },
    { value: "extra sambhar", name: "extra sambhar" },
    { value: "No Green Chilli", name: "No Green Chilli" },
    { value: "1/2", name: "1/2" },
    { value: "Red chily", name: "Red chily" },
    { value: "Tata", name: "Tata" },
    { value: "Ta", name: "Ta" },
  ];

  // Function to add items to the selected items array
  const addItemToTable = (item) => {
    if (!selectedItems.some((selectedItem) => selectedItem._id === item._id)) {
      const totalPrice = item.price; // Assuming initial quantity is 1
      setSelectedItems((prevItems) => [
        ...prevItems,
        {
          ...item,
          quantity: 1,
          totalPrice: totalPrice,
          modifier: [], // Initialize with an empty array or null
        },
      ]);
    }
  };

  //this is for remove items from table and select items list
  const removeSelectedItem = (id) => {
    const updatedItems = selectedItems.filter((item) => item._id !== id);
    setSelectedItems(updatedItems);
  };

  // Function to increase quantity
  const increaseQuantity = (id) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease quantity
  const decreaseQuantity = (id) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  //this is for calculate total price
  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  // //this is forj settle the order of the table
  // const forSettleTheOrderOfTable = async (paymentMethod) => {
  //   if (!paymentMethod) {
  //     toast.error("Please select a payment method.");
  //     return;
  //   }

  //   let paymentData = {
  //     paymentMethod: paymentMethod,
  //   };

  //   const url = `${myUrl}/add/${id}/savepaymentmethod`;
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //     body: JSON.stringify(paymentData),
  //   };

  //   try {
  //     const response = await fetch(url, options);
  //     const data = await response.json();
  //     if (response.ok) {
  //       const orderData = {
  //         orderItems: selectedItems.map((item) => ({
  //           id: item._id,
  //           name: item.name,
  //           price: item.price,
  //           quantity: item.quantity,
  //           totalPrice: item.price * item.quantity,
  //           modifier: item.modifier || null,
  //         })),
  //         guestData,
  //       };

  //       // Submit the KOT data
  //       const orderUrl = `${myUrl}/add/${id}/kot/${restId}`;
  //       const orderOptions = {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token,
  //         },
  //         body: JSON.stringify(orderData),
  //       };

  //       const orderResponse = await fetch(orderUrl, orderOptions);
  //       if (orderResponse.ok) {
  //         setSelectedItems([]);
  //         localStorage.removeItem(`selectedItems_${id}`);
  //         setPersons("");
  //         localStorage.removeItem("person");
  //         // Navigate to relevant page
  //         if (tableData?.tableType === "dine-in") {
  //           navigate(`/area/${counterId}/tables`);
  //         } else if (tableData?.tableType === "take-away") {
  //           navigate(`/take-away/table/${counterId}`);
  //         } else if (tableData?.tableType === "delivery") {
  //           navigate(`/delivery/tables/${counterId}`);
  //         }
  //       } else {
  //         console.log("Error in submitting KOT data", orderResponse);
  //       }
  //     } else {
  //       console.log("Error: ", data);
  //     }
  //   } catch (err) {
  //     console.log("Error: ", err);
  //   }
  // };

  //this is for catch errors for add order
  const CatchErrorForAddOrder = () => {
    let isOk = true;

    if (selectedItems === null) {
      isOk = false;
      toast.error("Please select an item ID.");
    } else if (selectedItems.length === 0) {
      isOk = false;
      toast.error("Please select an item ID.");
    } else if (
      forTableData?.tableType !== "dine-in" &&
      forTableData?.currentOrder?.guest === undefined
    ) {
      isOk = false;
      toast.error("Please select guest for this take away order");
    } else if (restData?.payemtPreOrPost === "pre") {
      setForSettlement(true);
      isOk = false;
    }

    return isOk;
  };

  //this is for add data to add order
  const forAddOrderSubmit = (e) => {
    e.preventDefault();
    if (CatchErrorForAddOrder()) {
      if (restData?.paymentMethod === "pre") {
        getDataforEditTable();
        setForSettlement(true);
      } else {
        const orderData = {
          orderItems: selectedItems.map((item) => ({
            id: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
            modifier: item.modifier || null,
          })),
          guestData,
        };

        // Call the add order function for post payment
        const forAddOrder = async () => {
          const url = `${myUrl}/add/${id}/kot/${restId}`;
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(orderData),
          };

          try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
              setSelectedItems([]);
              localStorage.removeItem(`selectedItems_${id}`);
              setPersons("");
              localStorage.removeItem("person");
              if (tableData?.tableType === "dine-in") {
                navigate(`/area/${counterId}/tables`);
              } else if (tableData?.tableType === "take-away") {
                navigate(`/take-away/table/${counterId}`);
              } else if (tableData?.tableType === "delivery") {
                navigate(`/delivery/tables/${counterId}`);
              }
            } else {
              console.log("Error: ", data);
            }
          } catch (err) {
            console.log("Error: ", err);
          }
        };
        forAddOrder();
      }
    }
  };

  // //this is forj settle the order of the table
  const forSettleTheOrderOfTable = async (typ, metod) => {
    let paymentData = {};
    if (typ === "multi") {
      if (inputValue === null) {
        toast.error("please enter amount ");
      } else {
        paymentData = {
          guestData,
          paymentMethod: metod,
          amount: inputValue,
          detail: payDetail,
          frontEndType: typ,
        };
        const url = `${myUrl}/add/${id}/kot/${restId}`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(paymentData),
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            setNewTableData(data?.table);
            forGettingTableData();
            getDataforEditTable();
            if (data?.table?.currentOrder?.remainAmount === 0) {
              setSelectedItems([]);
              localStorage.removeItem(`selectedItems_${id}`);
              setPersons("");
              localStorage.removeItem("person");
              if (tableData?.tableType === "dine-in") {
                navigate(`/area/${counterId}/tables`);
              } else if (tableData?.tableType === "take-away") {
                navigate(`/take-away/table/${counterId}`);
              } else if (tableData?.tableType === "delivery") {
                navigate(`/delivery/tables/${counterId}`);
              }
            }
          } else {
            setNewTableData(data?.table);
            console.log(" err data ", data.table.currentOrder);

            getDataforEditTable();
            console.log("table data", tableData);
          }
        } catch (err) {
          console.log("there is error in the for add parcerl function", err);
        }
      }
    } else {
      paymentData = {
        orderItems: selectedItems.map((item) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
          modifier: item.modifier || null,
        })),
        guestData,
        paymentMethod: metod,
        frontEndType: typ,
      };
      const url = `${myUrl}/add/${id}/kot/${restId}`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(paymentData),
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          setNewTableData(data?.table);
          setSelectedItems([]);
          localStorage.removeItem(`selectedItems_${id}`);
          setPersons("");
          localStorage.removeItem("person");
          if (tableData?.tableType === "dine-in") {
            navigate(`/area/${counterId}/tables`);
          } else if (tableData?.tableType === "take-away") {
            navigate(`/take-away/table/${counterId}`);
          } else if (tableData?.tableType === "delivery") {
            navigate(`/delivery/tables/${counterId}`);
          }
        } else {
          setNewTableData(data?.table);
        }
      } catch (err) {
        console.log("there is error in the for add parcerl function", err);
      }
    }
  };

  //this is for click on the payment method
  const forClickOnPaymentMethod = (typ, metod) => {
    forSettleTheOrderOfTable(typ, metod);
    forGettingTableData();
  };

  // Function to handle opening the modifier modal
  const openModifierModal = (itemId) => {
    setSelectedItemId(itemId); // Set the selected item ID
    setForModifier(true); // Open the modifier modal
  };

  // Function to handle modifier selection
  const handleModifierChange = (modifier) => {
    setSelectedModifiers((prev) =>
      prev.includes(modifier)
        ? prev.filter((mod) => mod !== modifier)
        : [...prev, modifier]
    );
  };

  // Function to save selected modifiers for the current item
  const saveModifiersForItem = () => {
    if (selectedItemId) {
      setSelectedItems((prevItems) =>
        prevItems.map((item) =>
          item._id === selectedItemId
            ? {
                ...item,
                modifier: inputModifier
                  ? [...selectedModifiers, inputModifier]
                  : selectedModifiers,
              }
            : item
        )
      );
      setForModifier(false); // Close the modal
      setSelectedModifiers([]); // Reset modifier selection
    }
  };

  //this is for search input style
  const overlayStyle = {
    position: "absolute",
    zIndex: 10,
    width: "75%",
    top: "50px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflowY: "auto",
    maxHeight: "200px",
  };

  // Retrieve selected items from localStorage on component mount
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem(`selectedItems_${id}`));
    if (savedItems) {
      setSelectedItems(savedItems);
    }
  }, []);

  // Update localStorage whenever selectedItems changes
  useEffect(() => {
    localStorage.setItem(`selectedItems_${id}`, JSON.stringify(selectedItems));
  }, [selectedItems]);

  //this is for back to table button
  const handleNavigation = () => {
    if (tableData?.tableType === "dine-in") {
      navigate(`/area/${counterId}/tables`);
    } else if (tableData?.tableType === "take-away") {
      navigate(`/take-away/table/${counterId}`);
    } else if (tableData?.tableType === "delivery") {
      navigate(`/delivery/tables/${counterId}`);
    }
  };

  //this is for getting all combo items or dealrs
  const forGetAllDeals = async () => {
    const url = `${myUrl}/forgetalldata/${restId}/comboitem`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        console.log("ok data", data.updatedrestComboItems);
        setFilteredItems(data.updatedrestComboItems);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in get all combo items function in dashboard crm files",
        err
      );
    }
  };

  //this is for multi payment
  const formultiPayment = () => {
    setForMultiPaymentOpen(true);
    setForSettlement(false);
    getDataforEditTable();
    forSettleTheOrderOfTable();
    console.log("table data", tableData);
  };

  //this is for click on the multipayment submit button
  const forClickOnSubmitClickOfMultipayment = async () => {
    const url = `${myUrl}/add/${id}/kot/${restId}`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        console.log("data", data);
        console.log("table data", tableData);
        forGettingTableData();
        getDataforEditTable();
        if (forTableData?.currentOrder?.remainAmount === 0) {
          setSelectedItems([]);
          localStorage.removeItem(`selectedItems_${id}`);
          setPersons("");
          localStorage.removeItem("person");
          if (tableData?.tableType === "dine-in") {
            navigate(`/area/${counterId}/tables`);
          } else if (tableData?.tableType === "take-away") {
            navigate(`/take-away/table/${counterId}`);
          } else if (tableData?.tableType === "delivery") {
            navigate(`/delivery/tables/${counterId}`);
          }
        }
      } else {
        console.log(" err data ", data);

        getDataforEditTable();
        console.log("table data", tableData);
      }
    } catch (err) {
      console.log("there is error in the for add parcerl function", err);
    }
  };

  return (
    <React.Fragment>
      <div
        className="page-content"
        style={{ overflow: "hidden", height: "100vh" }}
      >
        <Container fluid>
          <Row className="p-0 ">
            <Col lg={6}>
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ fontSize: "14px" }}
              >
                <p className="m-0 p-0 ">
                  {tableData?.tableType}
                  <span className="fw-bold">
                    {" "}
                    Table no {tableData ? tableData.tableNo : ""}
                  </span>
                </p>
                <p className="m-0 p-0 ">
                  {" "}
                  <span
                    className="fw-bold px-2"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    KOT{" "}
                    {tableData.currentOrder
                      ? tableData.currentOrder.kots.length + 1
                      : ""}
                  </span>
                  {tableData?.tableType === "dine-in" &&
                    ` PAX
                 ${
                   tableData.currentOrder ? tableData.currentOrder.persons : ""
                 }`}
                  <span
                    className="fw-bold px-2"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Date
                  </span>
                  {currentDate},{currentTime}
                </p>

                <p className="m-0 p-0">
                  {tableData?.tableType === "dine-in" ? (
                    <>
                      Captain:{" "}
                      <span
                        className="fw-bold"
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        {userData ? userData.name : ""}
                      </span>
                    </>
                  ) : (
                    <>
                      Guest:{" "}
                      <span
                        className="fw-bold"
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        {forTableData?.currentOrder?.guest?.name}
                      </span>
                    </>
                  )}
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3 bg-white py-2 position-relative">
                <div className="pe-auto search-box w-75">
                  <Input
                    type="text"
                    placeholder="search ..."
                    onChange={OnchangeHandler}
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>

                {showItemWithInput && (
                  <div style={overlayStyle}>
                    <table className="table table-striped table-hover mb-0">
                      <thead>
                        <tr
                          style={{ backgroundColor: "#007bff", color: "white" }}
                        >
                          <th style={{ padding: "10px", textAlign: "left" }}>
                            Qty
                          </th>
                          <th style={{ padding: "10px", textAlign: "left" }}>
                            Name
                          </th>
                          <th style={{ padding: "10px", textAlign: "left" }}>
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.map((item, index) => (
                          <tr
                            key={index}
                            style={{ cursor: "pointer" }}
                            onClick={() => addItemToTable(item)}
                          >
                            <td style={{ padding: "10px", textAlign: "left" }}>
                              {index + 1}
                            </td>
                            <td style={{ padding: "10px", textAlign: "left" }}>
                              {item.name}
                            </td>
                            <td style={{ padding: "10px", textAlign: "left" }}>
                              {restData.currencyPosition === "before"
                                ? `${
                                    restData.restCurrencySymbol
                                  }${item.price.toFixed(restData.precision)}`
                                : `${item.price.toFixed(restData.precision)}${
                                    restData.restCurrencySymbol
                                  }`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

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
                }}
              >
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
                    {selectedItems.map((item, index) => (
                      <tr key={index}>
                        <td style={{ fontSize: "12px" }}>{index + 1}</td>
                        <td style={{ fontSize: "12px" }}>
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
                          {item.name}{" "}
                        </td>
                        <td style={{ fontSize: "12px" }}>
                          {item.modifier && item.modifier.length > 0 ? (
                            item.modifier.map((mod, idx) => (
                              <span key={idx} style={{ marginRight: "5px" }}>
                                {mod},
                              </span>
                            ))
                          ) : (
                            <FaPlus
                              className="cursor-pointer"
                              onClick={() => openModifierModal(item._id)}
                            />
                          )}
                        </td>
                        <td>
                          <div className="input-step step-primary">
                            <button
                              style={{
                                fontSize: "12px",
                                backgroundColor: "red",
                              }}
                              type="button"
                              className="minus"
                              onClick={() => decreaseQuantity(item._id)}
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
                        </td>
                        <td style={{ fontSize: "12px" }}>
                          {" "}
                          {restData.currencyPosition === "before"
                            ? `${
                                restData.restCurrencySymbol
                              }${item.price.toFixed(restData.precision)}`
                            : `${item.price.toFixed(restData.precision)}${
                                restData.restCurrencySymbol
                              }`}
                        </td>
                        <td style={{ fontSize: "12px" }}>
                          {restData.currencyPosition === "before"
                            ? `${restData.restCurrencySymbol}${(
                                item.price * item.quantity
                              ).toFixed(restData.precision)}`
                            : `${(item.price * item.quantity).toFixed(
                                restData.precision
                              )}${restData.restCurrencySymbol}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className="mt-2  d-flex align-items-center justify-content-between p-2 "
                style={{ backgroundColor: "#E6E6E6" }}
              >
                <h6>Total Items {selectedItems.length}</h6>
                <h6>
                  Sub Total:{" "}
                  {restData.currencyPosition === "before"
                    ? `${
                        restData.restCurrencySymbol
                      }${calculateTotalPrice().toFixed(restData.precision)}`
                    : `${calculateTotalPrice().toFixed(restData.precision)}${
                        restData.restCurrencySymbol
                      }`}{" "}
                </h6>
              </div>
              <div
                className="d-flex align-items-center justify-content-between mt-2"
                style={{ gap: "2px" }}
              >
                <Link
                  onClick={guestSearchChangeState}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                  className="w-100 py-3"
                >
                  Guest
                </Link>
                <button
                  onClick={handleNavigation}
                  style={{
                    backgroundColor: "#E84743",
                    color: "white",
                    textDecoration: "none",
                    textAlign: "center",
                    border: "none",
                  }}
                  className="w-100 py-3"
                >
                  Tables
                </button>
                <Link
                  style={{
                    backgroundColor: "#D59E00",
                    color: "black",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                  className="w-100 py-3"
                >
                  KOT Print
                </Link>
                <button
                  onClick={(e) => forAddOrderSubmit(e)}
                  style={{
                    backgroundColor: "#1B8339",
                    color: "white",
                    textDecoration: "none",
                    textAlign: "center",
                    border: "none",
                  }}
                  className="w-100 py-3"
                >
                  save
                </button>
              </div>
            </Col>
            <Col lg={2} md={4}>
              <div
                className="d-flex align-items-center justify-content-between flex-column "
                style={{ gap: "1px" }}
              >
                <div
                  className="w-100 px-2 py-2   text-white"
                  style={{
                    backgroundColor: "#C32C18",
                    color: "white",
                  }}
                >
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
                  }}
                >
                  {filteredCategories.map((item, index) => (
                    <div
                      className="w-100 p-2  text-white cursor-pointer"
                      onClick={() => filterItemsByCategory(item._id)}
                      key={index}
                      style={{
                        backgroundColor: "#322595",
                        color: "white",
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col lg={4} md={8}>
              <div
                className="d-flex align-items-center "
                style={{ fontSize: "14px", color: "white", gap: "1px" }}
              >
                <div
                  onClick={() => filterCategories("food")}
                  style={{ backgroundColor: "#F5B800" }}
                  className=" text-center py-2  w-100 cursor-pointer"
                >
                  <FaUtensils /> Food
                </div>
                <div
                  onClick={() => filterCategories("drinks")}
                  style={{ backgroundColor: "#F5B800" }}
                  className=" text-center py-2 w-100 cursor-pointer"
                >
                  <FaGlassWhiskey /> Drinks
                </div>
                <div
                  // onClick={() => filterCategories("sweets")}
                  onClick={forGetAllDeals}
                  style={{ backgroundColor: "#F5B800" }}
                  className=" text-center py-2 w-100 cursor-pointer"
                >
                  <FaCandyCane /> Deals
                </div>
              </div>
              <div className="input-group mt-2 w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name"
                  onChange={OnchangeHandler}
                />
              </div>
              <div
                className="container mt-2  "
                style={{
                  height: "100vh",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="row">
                  {filteredItems.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => addItemToTable(item)}
                      className=" col-md-4 col-sm-6 position-relative cursor-pointer   d-flex align-items-center justify-content-center  py-4 px-2"
                      style={{
                        border: "2px solid white",
                        color: "white",
                        fontSize: "12px",
                        backgroundImage: item.image
                          ? `url(${item.image})`
                          : "none",
                        backgroundColor: item.image ? "transparent" : "#322595",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <p className="m-0 text-center">{item.name}</p>
                      <p
                        className="position-absolute px-1 text-center m-0"
                        style={{
                          bottom: "1px",
                          left: "1px",
                          color: "black",
                          backgroundColor: "white",
                        }}
                      >
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
                  <p className="p-0 m-0 text-white">Modifier</p>
                  <p
                    className="m-0 p-2 color-dark cursor-pointer"
                    onClick={() => setForModifier(false)}
                  >
                    x
                  </p>
                </div>
                <div className="mt-1 p-1">
                  <form>
                    <div className="form-group">
                      <div className="row">
                        {Modifiers.map((modifier, index) => (
                          <div className="col-md-2 my-2" key={index}>
                            <div
                              className="form-check d-flex align-items-center"
                              style={{ gap: "5px" }}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={modifier.value}
                                checked={selectedModifiers.includes(
                                  modifier.value
                                )}
                                onChange={() =>
                                  handleModifierChange(modifier.value)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={modifier.value}
                                style={{
                                  fontSize: "12px",
                                  textAlign: "center",
                                }}
                              >
                                {modifier.name}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pe-auto search-box mx-2 my-2 w-75">
                      <Input
                        type="text"
                        placeholder="add modifier ..."
                        value={inputModifier}
                        onChange={(e) => setInputModifier(e.target.value)}
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>

                    <div className="d-flex flex-column m-2">
                      <div className="my-2">
                        <button
                          onClick={saveModifiersForItem}
                          style={{
                            backgroundColor: "black",
                            color: "white",
                            textDecoration: "none",
                            textAlign: "center",
                          }}
                          className="px-3 py-2"
                        >
                          Save & Select
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>

      {/* this is for settlement */}
      {forSettlement && (
        <div
          className="d-flex align-items-center justify-content-center position-fixed"
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
            className="d-flex  flex-column bg-white pb-4"
            style={{
              borderRadius: "5px",
              width: "450px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h5 className="py-3 px-1 bg-danger text-white">Payment Mode</h5>
            <div
              className="d-flex align-items-center justify-content-between "
              style={{ padding: "2px 5px", gap: "5px" }}
            >
              <div
                onClick={() => forSettleTheOrderOfTable("single", "cash")}
                className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                style={{ height: "100px", backgroundColor: "#1F9642" }}
              >
                Cash
              </div>
              <div
                onClick={() => forSettleTheOrderOfTable("single", "card")}
                className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                style={{ height: "100px", backgroundColor: "#FFBD00" }}
              >
                Card
              </div>
              <div
                onClick={() => forSettleTheOrderOfTable("single", "paytm")}
                className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                style={{ height: "100px", backgroundColor: "#0A97BB" }}
              >
                PayTM
              </div>
            </div>
            <div
              className="d-flex align-items-center justify-content-between "
              style={{ padding: "2px 5px", gap: "5px" }}
            >
              <div
                onClick={() => forSettleTheOrderOfTable("single", "upi")}
                className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                style={{ height: "100px", backgroundColor: "#0172F0" }}
              >
                UPI
              </div>
              <div
                onClick={formultiPayment}
                className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                style={{ height: "100px", backgroundColor: "#030507" }}
              >
                Multi Payment
              </div>
              <div
                onClick={() => setForSettlement(!forSettlement)}
                className="d-flex align-items-center justify-content-center text-center cursor-pointer fs-5  text-white w-100"
                style={{ height: "100px", backgroundColor: "#DB433F" }}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}

      {/* this is for multipayment */}
      {forMultiPaymentOpen && (
        <div
          className="mx-3 d-flex align-items-center justify-content-center position-fixed"
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
            className="d-flex  flex-column bg-white  pb-4 "
            style={{
              width: "900px",
              height: "80vh",
              overflowY: "scroll",
              overflowX: "scroll",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className=" p-1  d-flex justify-content-between align-items-center  mb-2"
              style={{ fontSize: "14px", backgroundColor: "#E3614D" }}
            >
              <p className="p-0 m-0 text-white">Payment</p>
              <p
                className="m-0 p-2 color-dark cursor-pointer"
                onClick={() => setForMultiPaymentOpen(false)}
              >
                x
              </p>
            </div>
            <div className="p-2">
              <div className="m-0 p-0">
                <button
                  onClick={() => forClickOnPaymentMethod("multi", "cash")}
                  className="py-1 px-2"
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Cash
                </button>
                <button
                  onClick={() => forClickOnPaymentMethod("multi", "card")}
                  className="py-1 px-2"
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Card
                </button>
                <button
                  className="py-1 px-2"
                  onClick={() => forClickOnPaymentMethod("multi", "advance")}
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Advance
                </button>
                <button
                  onClick={() => forClickOnPaymentMethod("multi", "paytm")}
                  className="py-1 px-2"
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  PayTM
                </button>
                <button
                  onClick={() =>
                    forClickOnPaymentMethod("multi", "check payment")
                  }
                  className="py-1 px-2"
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Check Payment
                </button>
                <button
                  onClick={() => forClickOnPaymentMethod("multi", "credit")}
                  className="py-1 px-2"
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Credit
                </button>
                <button
                  onClick={() =>
                    forClickOnPaymentMethod("multi", "post to room")
                  }
                  className="py-1 px-2"
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Post to room
                </button>
                <button
                  onClick={() => forClickOnPaymentMethod("multi", "upi")}
                  className="py-1 px-2"
                  style={{
                    backgroundColor: "#0A97BA",
                    margin: "1px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  upi
                </button>
              </div>
              <hr className="p-0 m-0"></hr>

              <div
                className="d-flex"
                style={{
                  gap: "10px",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div
                  className="p-0 mt-1 "
                  style={{
                    border: "1px solid #B3C8CF",
                    width: "500px",
                  }}
                >
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 " style={{ fontWeight: "600" }}>
                        Invoice Total
                      </p>
                    </div>{" "}
                    <div
                      className="p-2 w-75"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 " style={{ fontWeight: "600" }}>
                        {restData.currencyPosition === "before"
                          ? `${
                              restData.restCurrencySymbol
                            }${newTableData?.currentOrder?.totalAmount.toFixed(
                              restData.precision
                            )}`
                          : `${newTableData?.currentOrder?.totalAmount.toFixed(
                              restData.precision
                            )}${restData.restCurrencySymbol}`}{" "}
                      </p>
                    </div>{" "}
                  </div>{" "}
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary">Amount</p>
                    </div>{" "}
                    <div
                      className="p-2 w-75"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                      }}
                    >
                      <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="px-2 m-0"
                        style={{
                          border: "1px solid #B3C8CF",
                          borderRadius: "5px",
                        }}
                      />
                    </div>{" "}
                  </div>{" "}
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary">Paid Amount</p>
                    </div>{" "}
                    <div
                      className="p-2 w-75"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                      }}
                    >
                      <input
                        type="number"
                        className="px-2 m-0"
                        value={
                          tableData?.currentOrder?.paidAmount
                            ? tableData?.currentOrder?.paidAmount
                            : 0
                        }
                        style={{
                          border: "1px solid #B3C8CF",
                          borderRadius: "5px",
                        }}
                      />
                    </div>{" "}
                  </div>{" "}
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary">Return Amount</p>
                    </div>{" "}
                    <div
                      className="p-2 w-75"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                      }}
                    >
                      <input
                        type="number"
                        value={newTableData?.currentOrder?.remainAmount}
                        className="px-2 m-0"
                        style={{
                          border: "1px solid #B3C8CF",
                          borderRadius: "5px",
                        }}
                      />
                    </div>{" "}
                  </div>{" "}
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary">Payment Detail</p>
                    </div>{" "}
                    <div
                      className="p-2 w-75"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                      }}
                    >
                      <textarea
                        onChange={(e) => setPayDetail(e.target.value)}
                        style={{ border: "1px solid #B3C8CF" }}
                        className="w-100 p-1"
                        rows="5"
                        placeholder="Yahan likhein..."
                      ></textarea>
                    </div>{" "}
                  </div>{" "}
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary"></p>
                    </div>{" "}
                    <div className="p-0 w-75"></div>{" "}
                  </div>{" "}
                </div>

                <div
                  className=" text-center p-3"
                  style={{
                    width: "300px",
                  }}
                >
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(10)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(10).toFixed(
                            restData.precision
                          )}`
                        : `${(10).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                    <button
                      onClick={() => setInputValue(20)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(20).toFixed(
                            restData.precision
                          )}`
                        : `${(20).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                  </div>
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(50)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(50).toFixed(
                            restData.precision
                          )}`
                        : `${(50).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                    <button
                      onClick={() => setInputValue(100)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(100).toFixed(
                            restData.precision
                          )}`
                        : `${(100).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                  </div>{" "}
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(200)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(200).toFixed(
                            restData.precision
                          )}`
                        : `${(200).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                    <button
                      onClick={() => setInputValue(500)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(500).toFixed(
                            restData.precision
                          )}`
                        : `${(500).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                  </div>{" "}
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(1000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(1000).toFixed(
                            restData.precision
                          )}`
                        : `${(1000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                    <button
                      onClick={() => setInputValue(2000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(2000).toFixed(
                            restData.precision
                          )}`
                        : `${(2000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                  </div>
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(3000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(3000).toFixed(
                            restData.precision
                          )}`
                        : `${(3000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                    <button
                      onClick={() => setInputValue(4000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(4000).toFixed(
                            restData.precision
                          )}`
                        : `${(4000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                  </div>{" "}
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(5000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(5000).toFixed(
                            restData.precision
                          )}`
                        : `${(5000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                    <button
                      onClick={() => setInputValue(10000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {" "}
                      {restData.currencyPosition === "before"
                        ? `${restData.restCurrencySymbol}${(10000).toFixed(
                            restData.precision
                          )}`
                        : `${(10000).toFixed(restData.precision)}${
                            restData.restCurrencySymbol
                          }`}{" "}
                    </button>
                  </div>{" "}
                  <div
                    className="mt-2 mb-1 d-flex align-items-center  "
                    style={{ width: "300px" }}
                  >
                    <button
                      // disabled={forTableData?.currentOrder?.remainAmount > 0}
                      onClick={() => {
                        if (forTableData?.currentOrder?.remainAmount > 0) {
                          toast.error("Please pay the total bill");
                        }
                      }}
                      style={{
                        border: "none",
                        width: "295px",
                        backgroundColor: "black",
                      }}
                      className="py-2 mx-1 px-4 text-white"
                    >
                      {forTableData?.currentOrder?.remainAmount > 0
                        ? "Enter Amount"
                        : "Payment Complete"}{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DashboardCrm;
