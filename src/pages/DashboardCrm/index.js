import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Col,
  Row,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Form,
} from "reactstrap";
import {
  FaUtensils,
  FaGlassWhiskey,
  FaCandyCane,
  FaPlus,
  FaRegEdit,
  FaTrash,
} from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";
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
  const [showPrint, setShowPrint] = useState(false);
  const [kotData, setKotData] = useState({});
  const [forPrint, setForPrint] = useState(false);
  const [myDate, setMyDate] = useState("");
  const [myTime, setMyTime] = useState("");
  const [editDealModal, setEditDealModal] = useState(false);
  const [dealItems, setDealItems] = useState([]);
  const [showDealItemWithInput, setShowDealItemWithInput] = useState("");
  const [dealFilteredItems, setDealFilteredItems] = useState([]);
  const [selectedDealId, setSelectedDealId] = useState("");

  //this is for show guest function
  const {
    guestSearchChangeState,
    myUrl,
    restId,
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

  //this is for toggleEditDeal edit deal modal
  const toggleEditDeal = () => {
    setEditDealModal(!editDealModal);
  };

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

  //this is for deal items onchange handler
  const dealItemOnchangeHandler = (e) => {
    setShowDealItemWithInput(e.target.value);
    const search = e.target.value.toLowerCase();
    if (search) {
      const filteredItems = items.filter((data) =>
        Object.values(data).some(
          (field) =>
            typeof field === "string" && field.toLowerCase().includes(search)
        )
      );
      setDealFilteredItems(filteredItems);
    } else {
      setDealFilteredItems(items);
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

  //this is for get all menu items
  const forGetAllMenuItems = async () => {
    const url = `${myUrl}/get-all-menuitems/${restId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setItems(data.allItems);
        setFilteredItems(data.allItems);
        setDealFilteredItems(data.allItems);
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

  //this is for get all filter catagories
  const filterCategories = (mainCategory) => {
    forGetAllMenuItems();
    setSelectedCategory(mainCategory);
    const filtered = catagories.filter(
      (item) => item.maincatagory === mainCategory
    );
    setFilteredCategories(filtered);
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

  //this is for add item to deal items
  const forAddItemToDealItems = (item) => {
    if (!selectedItems.some((selectedItem) => selectedItem._id === item._id)) {
      setDealItems((prevItems) => [
        ...prevItems,
        {
          ...item,
          qty: 1,
          id: item._id,
        },
      ]);
    }
    setShowDealItemWithInput("");
  };

  //this is for remove items from table and select items list
  const removeSelectedItem = (id) => {
    const updatedItems = selectedItems.filter((item) => item._id !== id);
    setSelectedItems(updatedItems);
  };

  //this is for remove item from the select items of the deal
  const removeItemOfSelectItemsOfDeal = (id) => {
    const updatedItems = dealItems.filter((item) => item._id !== id);
    setDealItems(updatedItems);
  };

  // Function to increase quantity
  const increaseQuantity = (id) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  //this is for increase quantity of the deal item
  const increaseDealItemQty = (id) => {
    setDealItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
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

  //this is for decrease the quantity of the deal item
  const decreaseDealItemQty = (id) => {
    setDealItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  //this is for calculate total price
  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

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

  //this is for on click on the kot buttons
  const forClickOnKotPrintEtc = () => {
    setShowPrint(false);
    setForPrint(false);
    if (tableData?.tableType === "dine-in") {
      navigate(`/area/${counterId}/tables`);
    } else if (tableData?.tableType === "take-away") {
      navigate(`/take-away/table/${counterId}`);
    } else if (tableData?.tableType === "delivery") {
      navigate(`/delivery/tables/${counterId}`);
    }
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
            items: item.items,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
            modifier: item.modifier || null,
          })),
          guestData,
        };

        console.log("form data", orderData);
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
              console.log("data", data);
              setKotData(data.newKOT);
              setSelectedItems([]);
              localStorage.removeItem(`selectedItems_${id}`);
              setPersons("");
              localStorage.removeItem("person");
              forGettingTableData();
              setForSettlement(false);
              setShowPrint(true);
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
              console.log("kot data with ruaz", data);
              setForMultiPaymentOpen(false);
              setKotData(data.myNewKOT);
              setForSettlement(false);
              if (forPrint) {
                setShowPrint(true);
              } else {
                forClickOnKotPrintEtc();
              }
            }
          } else {
            console.log("data", data);
            setNewTableData(data?.table);
            toast.error(data.msg);
            console.log(" err data ", data.table.currentOrder);

            getDataforEditTable();
          }
        } catch (err) {
          console.log("there is error in the payment method", err);
        }
      }
    } else {
      paymentData = {
        orderItems: selectedItems.map((item) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          items: item.items,
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
          setKotData(data.myNewKOT);
          setNewTableData(data?.table);
          setSelectedItems([]);
          localStorage.removeItem(`selectedItems_${id}`);
          setPersons("");
          localStorage.removeItem("person");
          setForSettlement(false);
          if (forPrint) {
            setShowPrint(true);
          } else {
            forClickOnKotPrintEtc();
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

  //this is for the date and time formate
  const formatDateTime = (date, format, timezone) => {
    const d = new Date(date);

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: timezone,
    };

    const dateFormatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = dateFormatter.format(d);

    const parts = formattedDate.split(", ");
    const datePart = parts[0];
    const timePart = parts[1];

    let finalFormattedDate;
    const [day, month, year] = datePart.split("/");
    const [hour, minute, second] = timePart.split(":");

    switch (format) {
      case "D/M/Y":
        finalFormattedDate = `${day}/${month}/${year}`;
        break;
      case "M/Y/D":
        finalFormattedDate = `${month}/${year}/${day}`;
        break;
      case "Y/M/D":
        finalFormattedDate = `${year}/${month}/${day}`;
        break;
      case "Y-M-D":
        finalFormattedDate = `${year}-${month}-${day}`;
        break;
      case "M-D-Y":
        finalFormattedDate = `${month}-${day}-${year}`;
        break;
      default:
        finalFormattedDate = datePart;
    }

    setMyDate(finalFormattedDate);
    setMyTime(`${hour}:${minute} ${timePart.split(" ")[1]}`);
    return `${finalFormattedDate} ${hour}:${minute} ${timePart.split(" ")[1]}`;
  };

  //this is for current data
  const currentDate = new Date().toLocaleDateString("en-US", {
    timeZone: "UTC",
  });

  //this is for calling only once
  useEffect(() => {
    formatDateTime(
      currentDate,
      restData?.dateFormate,
      restData?.selectedTimezone
    );
  }, []);

  //this is for getting data from select item
  const forClickOnEditButtonOfDeal = (id) => {
    setEditDealModal(true);
    setSelectedDealId(id);
    const dealData = selectedItems.find((item) => item._id === id);
    if (dealData) {
      setDealItems(dealData.items);
      console.log("Deal Data Found:", dealData.items);
      // You can now use dealData for further processing
    } else {
      console.log("No matching deal found for the given ID");
    }
  };

  //this is for save deal edited items to the selectitems
  const forSaveDealEditedItems = (e) => {
    e.preventDefault();
    const updatedDeal = selectedItems.find(
      (item) => item._id === selectedDealId
    );

    if (updatedDeal) {
      // Update the items array of the found deal
      updatedDeal.items = dealItems;

      // After updating, set the new selectedItems (you can also save it in your backend here)
      setSelectedItems([...selectedItems]); // This will trigger a re-render with updated items
      console.log("Updated deal items:", updatedDeal.items);
      toggleEditDeal();
    } else {
      console.log("Deal not found for the given ID.");
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
                  {myDate} , {myTime}
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
                      <th scope="col" style={{ fontSize: "12px" }}>
                        Edit
                      </th>
                    </tr>
                  </thead>

                  {/* <tbody>

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
                        <td>
                          {item?.items.length > 0 ? (
                            <button className="my-custome-button-edit">
                              <i className="ri-pencil-fill align-bottom" />
                            </button>
                          ) : (
                            <button className="my-custome-button-edit" disabled>
                              <i className="ri-pencil-fill align-bottom" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody> */}

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
                        <td>
                          <button
                            onClick={() => forClickOnEditButtonOfDeal(item._id)}
                            className={
                              item.items && item.items.length > 0
                                ? "my-custome-button-edit"
                                : "border-none"
                            }
                            style={
                              !(item.items && item.items.length > 0)
                                ? {
                                    border: "none",
                                    outline: "none",
                                    background: "none",
                                    cursor: "default",
                                  }
                                : {}
                            }
                            disabled={!(item.items && item.items.length > 0)}
                          >
                            <i className="ri-pencil-fill align-bottom" />
                          </button>
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
                {tableData?.tableType === "delivery" ? (
                  <Link
                    style={{
                      backgroundColor: "#D59E00",
                      color: "black",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    className="w-100 py-3"
                  >
                    Rider
                  </Link>
                ) : (
                  <Link
                    onClick={(e) => {
                      setForPrint(true);
                      forAddOrderSubmit(e);
                    }}
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
                )}

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
            zIndex: 999,
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
            <div className="p-2 ">
              <div className="d-flex align-items-center justify-content-between">
                <div className="m-0 p-0 ">
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
                    onClick={() => {
                      if (forTableData?.currentOrder.guest) {
                        forClickOnPaymentMethod("multi", "credit");
                      } else {
                        toast.error(
                          "please select guest for this debit amount"
                        );
                      }
                    }}
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
                </div>{" "}
                <div>
                  <button
                    onClick={() => {
                      guestSearchChangeState();
                      forGettingTableData();
                    }}
                    className="py-1 px-2 "
                    style={{
                      backgroundColor: "#F5B800",
                      marginLeft: "auto",
                      border: "none",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    Guest
                  </button>
                </div>
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

      {/* this is for the print kot */}
      {showPrint && (
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
            className="d-flex  flex-column bg-white  pb-4 "
            style={{
              width: "400px",
              maxHeight: "500px",
              overflowY: "auto",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className=" p-1  d-flex justify-content-end align-items-center  mb-2"
              style={{ fontSize: "14px", backgroundColor: "#E3614D" }}
            >
              <p
                className="m-0 px-2 py-1 color-dark cursor-pointer "
                onClick={forClickOnKotPrintEtc}
              >
                x
              </p>
            </div>
            <div className="mt-1 p-1">
              <div className="m-0">
                <h4 className="text-center m-0 p-0">KOT</h4>
                <div
                  style={{
                    borderTop: "1px dotted #000",
                    marginTop: "5px", // adjust spacing as needed
                  }}
                ></div>
              </div>
              <div className="d-flex align-items-center justify-content-evenly my-2">
                <p className="p-0 m-0">KOT NO ({kotData?.kotNo})</p>
                <p className="p-0 m-0">
                  Invoice NO{" "}
                  <span className="text-bold">({kotData?.kotOrderNo})</span>{" "}
                </p>
              </div>
              <div
                style={{
                  borderTop: "1px dotted #000",
                }}
              ></div>
            </div>
            <div className="p-1">
              <table className="table  table-hover table-light  ">
                <thead>
                  <tr>
                    <th scope="col " style={{ border: "1px solid black" }}>
                      #
                    </th>
                    <th scope="col" style={{ border: "1px solid black" }}>
                      Name
                    </th>
                    <th scope="col" style={{ border: "1px solid black" }}>
                      Qty
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {kotData?.orderItems?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td
                          style={{
                            border: "1px solid black",
                            padding: "7px",
                          }}
                        >
                          {index + 1}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            padding: "7px",
                          }}
                        >
                          <strong>{item.name}</strong>
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            padding: "7px",
                          }}
                        >
                          {item.quantity}
                        </td>
                      </tr>

                      {/* Check if the item has sub-items (deal) */}
                      {item.items &&
                        item.items.length > 0 &&
                        item.items.map((subItem, subIndex) => (
                          <tr key={`${index}-${subIndex}`}>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "7px",
                              }}
                            >
                              {index + 1}.{subIndex + 1}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "7px",
                              }}
                            >
                              {subItem.name}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "7px",
                              }}
                            >
                              {subItem.qty}
                            </td>
                          </tr>
                        ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex align-items-center justify-content-end px-2">
              <button
                onClick={forClickOnKotPrintEtc}
                style={{
                  backgroundColor: "#F5B800",
                  color: "black",
                  textDecoration: "none",
                  textAlign: "center",
                  border: "none",
                }}
                className="px-3 py-1 mx-1"
              >
                <AiFillPrinter style={{ marginRight: "5px" }} />
                Print
              </button>
              <button
                onClick={forClickOnKotPrintEtc}
                style={{
                  backgroundColor: "#E84743",
                  color: "white",
                  textDecoration: "none",
                  textAlign: "center",
                  border: "none",
                }}
                className="px-3 py-1 mx-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* this is for edit the deal */}
      <Modal
        id="showModal"
        isOpen={editDealModal}
        toggle={toggleEditDeal}
        centered
        size="lg"
      >
        <ModalHeader className="bg-info-subtle p-3" toggle={toggleEditDeal}>
          Edit deal
        </ModalHeader>
        <Form className="tablelist-form">
          <ModalBody>
            <div className="d-flex align-items-center justify-content-between mt-0 bg-white py-0 position-relative">
              <div className="pe-auto search-box w-100">
                <Input
                  type="text"
                  placeholder="search ..."
                  onChange={dealItemOnchangeHandler}
                />
                <i className="ri-search-line search-icon"></i>
              </div>

              {showDealItemWithInput && (
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
                      {dealFilteredItems.map((item, index) => (
                        <tr
                          key={index}
                          style={{ cursor: "pointer" }}
                          onClick={() => forAddItemToDealItems(item)}
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
                      Quantity
                    </th>
                    <th scope="col" style={{ fontSize: "12px" }}>
                      Remove
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {dealItems.map((item, index) => (
                    <tr key={index}>
                      <td style={{ fontSize: "12px" }}>{index + 1}</td>
                      <td> {item?.name}</td>
                      <td>
                        <div className="input-step step-primary">
                          <button
                            style={{
                              fontSize: "12px",
                              backgroundColor: "red",
                            }}
                            type="button"
                            className="minus"
                            onClick={() => decreaseDealItemQty(item?._id)}
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
                            value={item?.qty}
                            readOnly
                          />
                          <button
                            style={{
                              fontSize: "12px",
                              backgroundColor: "#0C96BC",
                            }}
                            type="button"
                            className="plus"
                            onClick={() => increaseDealItemQty(item._id)}
                          >
                            +
                          </button>
                        </div>
                      </td>{" "}
                      <td style={{ fontSize: "12px" }}>
                        <button
                          className="mx-1"
                          style={{
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            removeItemOfSelectItemsOfDeal(item._id);
                          }}
                        >
                          <FaTrash style={{ color: "red" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <Button
                onClick={(e) => forSaveDealEditedItems(e)}
                color="success"
                id="add-btn"
              >
                Save Deal
              </Button>
            </div>
          </ModalFooter>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default DashboardCrm;
