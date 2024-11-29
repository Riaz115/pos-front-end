import React, { useEffect, useState } from "react";

import {
  Col,
  Container,
  Row,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Select from "react-select";
import country from "../../common/data/country";
import allStatesForTimeZone from "../EmailInbox/allStatesForTimeZone";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import { UseRiazHook } from "../../RiazStore/RiazStore";
import { useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const FileManager = () => {
  const [myCountry, setMyCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [dateFormate, setDateFormate] = useState("");
  const [timeData, setTimeData] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [currencyPosition, setCurrencyPosition] = useState("");
  const [precision, setPrecision] = useState("");
  const [decimalSprator, setDecimalSprator] = useState("");
  const [thousandSapreater, setThousandSapreator] = useState("");
  const [orderType, setOrderType] = useState("");
  const [deliveryPartner, setDeliveryPartner] = useState("");
  const [defalutWaiter, setDefaultWaiter] = useState("");
  const [defaultCustomer, setDefaultCustomer] = useState("");
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState("");
  const [posTooltip, setPosTooltip] = useState("");
  const [menuTooltip, setMenuTooltip] = useState("");
  const [payemtPreOrPost, setPaymentPreOrPost] = useState("");
  const [restName, setRestName] = useState("");
  const [restAddress, setRestAddress] = useState("");
  const [restPhone, setRestPhone] = useState("");
  const [restEmail, setRestEmail] = useState("");
  const [restLogo, setRestLogo] = useState("");
  const [restCity, setRestCity] = useState("");
  const [restState, setRestState] = useState("");
  const [restWebsite, setRestWebsite] = useState("");
  const [restCurrencySymbol, setRestCurrencySymbol] = useState("");
  const [errors, setErrors] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [serviceChargesAmount, setServiceChargesAmount] = useState("");
  const [deliveryChargesAmount, setDeliveryChargesAmount] = useState(0);
  const [typeOfServiceCharges, setTypeOfServiceCharges] = useState("");
  const [typeOfDeliveryCharges, setTypeOfDeliveryCharges] = useState("");
  const [gstTexAmount, setGstTexAmount] = useState(0);
  const [gstTexType, setGstTexType] = useState("");

  //this is data from my hook
  const { myUrl, token } = UseRiazHook();

  //this is for getting rest id
  const { id } = useParams();

  //this is for states options
  const forStatesOptions = allStatesForTimeZone.map((everyState) => ({
    label: everyState,
    value: everyState,
  }));

  //this is for select country
  const forSelectCountry = async (myCountryOption) => {
    if (myCountryOption && myCountryOption.countryName) {
      setMyCountry(myCountryOption.countryName);
    } else {
      setMyCountry("null");
    }
  };

  //this is for country flags etc
  const formatOptionLabel = ({ flagImg, countryName }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={flagImg} // Update this to the actual flag image path or URL
        alt={countryName}
        style={{ width: "20px", height: "15px", marginRight: "8px" }} // Adjust size as needed
      />
      <span>{countryName}</span>
    </div>
  );

  //this is for all countries
  useEffect(() => {
    const forAllCountries = country.map((item) => ({
      value: item.countryName,
      label: item.countryName,
      myCode: item.myCode,
      flagImg: item.flagImg,
    }));

    setCountries(forAllCountries);
  }, []);

  //this is user Gender List
  const DateFormateOptions = [
    {
      options: [
        { label: "Select Date Formate...", value: "Select Date Formate" },
        { label: "D/M/Y", value: "D/M/Y" },
        { label: "M/D/Y", value: "M/D/Y" },
        { label: "Y/M/D", value: "Y/M/D" },
      ],
    },
  ];

  //this is for select user gender
  function handleSelectDateFormate(selectedOption) {
    setDateFormate(selectedOption);
  }

  //this is for fetch time
  const forFetchTime = async (userState) => {
    try {
      const response = await fetch(
        `http://worldtimeapi.org/api/timezone/${userState}`
      );
      const data = await response.json();

      if (response.ok) {
        setTimeData(data.datetime);
      } else {
        console.log("error", response.statusText);
      }
    } catch (err) {
      console.error("there is error ", err);
    }
  };

  //this is for select state for time zone
  const handleChange = (selectedOption) => {
    setSelectedTimezone(selectedOption.value);
    forFetchTime(selectedOption.value);
    console.log("Selected timezone:", selectedOption);
  };

  //this is for catch errors for add restaurent
  const forAddNewResTaurentCatchErrors = () => {
    let isOk = true;
    let newErrors = {};

    if (!restName.trim()) {
      isOk = false;
      newErrors.restName = "Name is required";
      toast.error("Name is Required");
    } else if (!restEmail.trim()) {
      isOk = false;
      newErrors.restEmail = "Email is required";
      toast.error("Email is Required");
    } else if (!isEmail(restEmail)) {
      isOk = false;
      newErrors.restEmail = "Please Enter Valid Email";
      toast.error("Please Enter Valid Email");
    } else if (restPhone.length < 11) {
      isOk = false;
      newErrors.restPhone = "Number Should be minimum 11 characters";
      toast.error("Number Must Should be greater than 11 letters");
    } else if (!myCountry.trim()) {
      isOk = false;
      newErrors.myCountry = "Country is Required";
      toast.error("Country is required");
    } else if (!restState.trim()) {
      isOk = false;
      newErrors.restState = "State is Required";
      toast.error("State is required");
    } else if (!restCity.trim()) {
      isOk = false;
      newErrors.restCity = "City is Required";
      toast.error("City is Required");
    } else if (!restAddress.trim()) {
      isOk = false;
      newErrors.restAddress = "Addres is Required";
      toast.error("Address is required");
    } else if (!dateFormate.trim()) {
      isOk = false;
      newErrors.dateFormate = "Date Formate is Required";
      toast.error("Date Foramte is required");
    } else if (!selectedTimezone.trim()) {
      isOk = false;
      newErrors.selectedTimezone = "Timezone is Required";
      toast.error("Timezone is required");
    } else if (!restCurrencySymbol.trim()) {
      isOk = false;
      newErrors.restCurrencySymbol = "Currency Symbol is Required";
      toast.error("Currency Symbol is required");
    } else if (!currencyPosition.trim()) {
      isOk = false;
      newErrors.currencyPosition = "Currency Position is Required";
      toast.error("Currency Position is Required");
    } else if (!precision.trim()) {
      isOk = false;
      newErrors.precision = "Percision is required";
      toast.error("percision is required");
    } else if (!decimalSprator.trim()) {
      isOk = false;
      newErrors.decimalSprator = "Deciaml Seprator is required";
      toast.error("Deciaml Seprator is required");
    } else if (!thousandSapreater.trim()) {
      isOk = false;
      newErrors.thousandSapreater = "Thousands Seprator is required";
      toast.error("Thousands Seprator is required");
    } else if (!orderType.trim()) {
      isOk = false;
      newErrors.orderType = "Order Type is Required";
      toast.error("Order type is required");
    } else if (!deliveryPartner.trim()) {
      isOk = false;
      newErrors.deliveryPartner = "Delivery Partner is required";
      toast.error("Delivery partner is required");
    } else if (!defalutWaiter.trim()) {
      isOk = false;
      newErrors.defalutWaiter = "Default Waiter is Required";
      toast.error("Default waiter is required");
    } else if (!defaultCustomer.trim()) {
      isOk = false;
      newErrors.defaultCustomer = "default Customer is required";
    } else if (!defaultPaymentMethod.trim()) {
      isOk = false;
      newErrors.defaultPaymentMethod = "Default Payment method is required";
      toast.error("Default Payment method is required");
    } else if (!posTooltip.trim()) {
      isOk = false;
      newErrors.posTooltip = "Please Select Show Or Hide";
      toast.error("Please Select Show Or Hide");
    } else if (!menuTooltip.trim()) {
      isOk = false;
      newErrors.menuTooltip = "Please Select Hide or Show";
      toast.error("Please Select Show Or Hide");
    } else if (!payemtPreOrPost.trim()) {
      isOk = false;
      newErrors.payemtPreOrPost = "Please Select Pre or Post";
      toast.error("Please Select pre Or post");
    } else if (!typeOfServiceCharges.trim()) {
      isOk = false;
      newErrors.typeOfServiceCharges = "Please Fill This Input";
      toast.error("Please select service  charges");
    } else if (!serviceChargesAmount === "") {
      isOk = false;
      newErrors.serviceChargesAmount = "Please enter service charges amount";
      toast.error("Please fill services charges input");
    } else if (!typeOfDeliveryCharges.trim()) {
      isOk = false;
      newErrors.typeOfDeliveryCharges =
        "Please Select type of delivery charges";
      toast.error("Please select type of delivery charges");
    } else if (!deliveryChargesAmount === "") {
      isOk = false;
      newErrors.deliveryChargesAmount = "Please Fill This Input";
      toast.error("Please enter delivery charges");
    } else if (!gstTexType.trim()) {
      isOk = false;
      newErrors.gstTexType = "Please select the food tex type";
      toast.error("Please select the food tex type");
    } else if (!gstTexAmount === "") {
      isOk = false;
      newErrors.gstTexAmount = "Please enter the food tex amount";
      toast.error("Please enter the food tex amount");
    }

    setErrors(newErrors);
    return isOk;
  };

  //this is for add Submit
  const forEditRestSubmit = (e) => {
    e.preventDefault();
    if (forAddNewResTaurentCatchErrors()) {
      let formData = new FormData();

      formData.append("restName", restName);
      formData.append("restEmail", restEmail);
      formData.append("restLogo", restLogo);
      formData.append("restPhone", restPhone);
      formData.append("myCountry", myCountry);
      formData.append("restState", restState);
      formData.append("restCity", restCity);
      formData.append("restAddress", restAddress);
      formData.append("restWebsite", restWebsite);
      formData.append("dateFormate", dateFormate);
      formData.append("selectedTimezone", selectedTimezone);
      formData.append("restCurrencySymbol", restCurrencySymbol);
      formData.append("currencyPosition", currencyPosition);
      formData.append("precision", precision);
      formData.append("decimalSprator", decimalSprator);
      formData.append("thousandSapreater", thousandSapreater);
      formData.append("orderType", orderType);
      formData.append("deliveryPartner", deliveryPartner);
      formData.append("defalutWaiter", defalutWaiter);
      formData.append("defaultCustomer", defaultCustomer);
      formData.append("defaultPaymentMethod", defaultPaymentMethod);
      formData.append("posTooltip", posTooltip);
      formData.append("menuTooltip", menuTooltip);
      formData.append("payemtPreOrPost", payemtPreOrPost);
      formData.append("typeOfServiceCharges", typeOfServiceCharges);
      formData.append("serviceChargesAmount", serviceChargesAmount);
      formData.append("typeOfDeliveryCharges", typeOfDeliveryCharges);
      formData.append("deliveryChargesAmount", deliveryChargesAmount);
      formData.append("gstTexType", gstTexType);
      formData.append("gstTexAmount", gstTexAmount);

      //this is function for add restaurent
      const forEditRetaurent = async () => {
        const url = `${myUrl}/editRestaurent/${id}`;
        const options = {
          method: "PATCH",
          body: formData,
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();

          if (response.ok) {
            toast.success(data.msg);
          } else {
            toast.error(data.msg);
          }
        } catch (err) {
          console.error("there is error in the add restaurent function", err);
        }
      };

      forEditRetaurent();
    }
  };

  //this is for edit rest link
  const getDataForEditRest = async () => {
    const url = `${myUrl}/getRestDataforEdit/${id}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        setRestName(data.myRest.restName);
        setRestEmail(data.myRest.restEmail);
        setRestLogo(data.restLogo);
        setRestPhone(data.myRest.restPhone);
        setMyCountry(data.myRest.myCountry);
        setRestState(data.myRest.restState);
        setRestCity(data.myRest.restCity);
        setRestAddress(data.myRest.restAddress);
        setRestWebsite(data.myRest.restWebsite);
        setDateFormate(data.myRest.dateFormate);
        setSelectedTimezone(data.myRest.selectedTimezone);
        setRestCurrencySymbol(data.myRest.restCurrencySymbol);
        setCurrencyPosition(data.myRest.currencyPosition);
        setPrecision(data.myRest.precision);
        setDecimalSprator(data.myRest.decimalSprator);
        setThousandSapreator(data.myRest.thousandSapreater);
        setOrderType(data.myRest.orderType);
        setDeliveryPartner(data.myRest.deliveryPartner);
        setDefaultWaiter(data.myRest.defalutWaiter);
        setDefaultCustomer(data.myRest.defaultCustomer);
        setDefaultPaymentMethod(data.myRest.defaultPaymentMethod);
        setPosTooltip(data.myRest.posTooltip);
        setMenuTooltip(data.myRest.menuTooltip);
        setPaymentPreOrPost(data.myRest.payemtPreOrPost);
        setServiceChargesAmount(data.myRest.serviceChargesAmount);
        setDeliveryChargesAmount(data.myRest.deliveryChargesAmount);
        setTypeOfServiceCharges(data.myRest.typeOfServiceCharges);
        setTypeOfDeliveryCharges(data.myRest.typeOfDeliveryCharges);
        setGstTexAmount(data.myRest.gstTexAmount);
        setGstTexType(data.myRest.gstTexType);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get rest data for edit function", err);
    }
  };

  //this is for get rest data
  useEffect(() => {
    getDataForEditRest();
  }, []);

  //this is for show and open modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h2 className="text-muted px-3 py-2">Settings</h2>
          <div
            className=" p-3 rounded-2 "
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <Row>
              <Col lg={4} xl={3} md={6} className="my-2">
                <div>
                  <Label
                    htmlFor="basiInput"
                    className="form-label ps-1"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Name
                  </Label>
                  <Input
                    type="text"
                    value={restName}
                    className="form-control"
                    placeholder="Enter Rest Name"
                    onChange={(e) => setRestName(e.target.value)}
                    id="basiInput"
                  />
                  {errors.restName && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.restName}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div>
                  <Label
                    htmlFor="basiInput"
                    className="form-label ps-1"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Email
                  </Label>
                  <Input
                    type="email"
                    className="form-control"
                    placeholder="Enter Restaurent Email"
                    value={restEmail}
                    id="basiInput"
                    onChange={(e) => setRestEmail(e.target.value)}
                  />
                  {errors.restEmail && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.restEmail}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div>
                  <Label
                    htmlFor="basiInput"
                    className="form-label ps-1 d-flex justify-content-between align-items-center"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Restaurent Logo
                    <Button
                      className="py-0 px-2 "
                      onClick={toggleModal}
                      style={{ margin: "0px", backgroundColor: "#7367F0" }}
                    >
                      show
                    </Button>
                  </Label>
                  <Input
                    type="file"
                    className="form-control"
                    placeholder={restLogo}
                    id="basiInput"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setRestLogo(file);
                    }}
                  />
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div>
                  <Label
                    htmlFor="basiInput"
                    className="form-label ps-1"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Phone Number
                  </Label>
                  <Input
                    type="Number"
                    className="form-control"
                    value={restPhone}
                    placeholder="Enter Restaurent Name"
                    id="basiInput"
                    onChange={(e) => setRestPhone(e.target.value)}
                  />
                  {errors.restPhone && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.restPhone}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="choices-single-no-search"
                    className="form-label text-muted"
                  >
                    Country
                  </Label>

                  <Select
                    isClearable={true}
                    value={myCountry}
                    placeholder={myCountry ? myCountry : "Select Country"}
                    onChange={(selectedOption) => {
                      forSelectCountry(selectedOption);
                    }}
                    options={country}
                    formatOptionLabel={formatOptionLabel}
                    getOptionLabel={(option) => option.countryName}
                  />
                  {errors.myCountry && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.myCountry}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div>
                  <Label
                    htmlFor="basiInput"
                    className="form-label ps-1"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    State
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Restaurent State"
                    value={restState}
                    id="basiInput"
                    onChange={(e) => setRestState(e.target.value)}
                  />
                  {errors.restState && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.restState}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div>
                  <Label
                    htmlFor="basiInput"
                    className="form-label ps-1"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    city
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Restaurent City"
                    value={restCity}
                    id="basiInput"
                    onChange={(e) => setRestCity(e.target.value)}
                  />
                  {errors.restCity && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.restCity}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div>
                  <Label
                    htmlFor="basiInput"
                    className="form-label ps-1"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Address
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Restaurent Name"
                    value={restAddress}
                    id="basiInput"
                    onChange={(e) => setRestAddress(e.target.value)}
                  />
                  {errors.restAddress && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.restAddress}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div>
                  <Label
                    htmlFor="basiInput"
                    className="form-label ps-1"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Website
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Restaurent Name"
                    value={restWebsite}
                    id="basiInput"
                    onChange={(e) => setRestWebsite(e.target.value)}
                  />
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Select Date Formate
                  </Label>
                  <Select
                    value={dateFormate}
                    onChange={(selectedOption) =>
                      handleSelectDateFormate(selectedOption.value)
                    }
                    placeholder={
                      dateFormate ? dateFormate : "select Date Formate"
                    }
                    options={DateFormateOptions}
                    id="dateFormate"
                  ></Select>
                  {errors.dateFormate && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.dateFormate}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div>
                  <Label
                    htmlFor="basiInput"
                    className="form-label ps-1"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Time Zone
                  </Label>
                  <Select
                    value={selectedTimezone}
                    onChange={handleChange}
                    options={forStatesOptions}
                    placeholder={
                      selectedTimezone ? selectedTimezone : "Select time zone"
                    }
                  />
                  {errors.selectedTimezone && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.selectedTimezone}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div>
                  <Label
                    htmlFor="basiInput"
                    className="form-label ps-1"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Currency symbol
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Restaurent Name"
                    value={restCurrencySymbol}
                    id="basiInput"
                    onChange={(e) => setRestCurrencySymbol(e.target.value)}
                  />
                  {errors.restCurrencySymbol && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.restCurrencySymbol}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Currency Position
                  </Label>
                  <Select
                    value={currencyPosition}
                    onChange={(selectedOption) => {
                      setCurrencyPosition(selectedOption.value);
                    }}
                    options={[
                      { value: "before", label: "Before Amount" },
                      { value: "after", label: "after Amount" },
                    ]}
                    placeholder={
                      currencyPosition
                        ? currencyPosition
                        : "select Currency postion"
                    }
                  />
                  {errors.currencyPosition && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.currencyPosition}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Precision
                  </Label>
                  <Select
                    value={precision}
                    onChange={(selectedOption) => {
                      setPrecision(selectedOption.value);
                    }}
                    options={[
                      { value: "2", label: "2 digit" },
                      { value: "3", label: "3 digit" },
                    ]}
                    placeholder={precision ? precision : "Select precision"}
                  />
                  {errors.precision && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.precision}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Decimal Sepreator
                  </Label>
                  <Select
                    value={decimalSprator}
                    onChange={(selectedOption) => {
                      setDecimalSprator(selectedOption.value);
                    }}
                    options={[
                      { value: "comma", label: "comma(,)" },
                      { value: "dot", label: "dot(.)" },
                      { value: "space", label: "Space" },
                    ]}
                    placeholder={
                      decimalSprator
                        ? decimalSprator
                        : "select decimal spreator"
                    }
                  />
                  {errors.decimalSprator && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.decimalSprator}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Thousand Sepreator
                  </Label>
                  <Select
                    value={thousandSapreater}
                    onChange={(selectedOption) => {
                      setThousandSapreator(selectedOption.value);
                    }}
                    options={[
                      { value: "comma", label: "comma(,)" },
                      { value: "dot", label: "dot(.)" },
                      { value: "space", label: "Space" },
                    ]}
                    placeholder={
                      thousandSapreater
                        ? thousandSapreater
                        : "select thousand spreator"
                    }
                  />
                  {errors.thousandSapreater && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.thousandSapreater}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Default Order Type
                  </Label>
                  <Select
                    value={orderType}
                    onChange={(selectedOption) => {
                      setOrderType(selectedOption.value);
                    }}
                    options={[
                      { value: "dine", label: "Dine In" },
                      { value: "takeaway", label: "Take Away" },
                      { value: "delivery", label: "Delivery" },
                    ]}
                    placeholder={orderType ? orderType : "select order type"}
                  />
                  {errors.orderType && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.orderType}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Default Delivery Partner
                  </Label>
                  <Select
                    value={deliveryPartner}
                    onChange={(selectedOption) => {
                      setDeliveryPartner(selectedOption.value);
                    }}
                    options={[
                      { value: "none", label: "None" },
                      { value: "ali Raza", label: "Ali Raza" },
                      { value: "riaz Ahmad", label: "Riaz Ahmad" },
                      { value: "ali Raza", label: "Ali Raza" },
                      { value: "riaz Ahmad", label: "Riaz Ahmad" },
                      { value: "ali Raza", label: "Ali Raza" },
                      { value: "riaz Ahmad", label: "Riaz Ahmad" },
                    ]}
                    placeholder={
                      deliveryPartner ? deliveryPartner : "select order type"
                    }
                  />
                  {errors.deliveryPartner && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.deliveryPartner}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Default Waiter
                  </Label>
                  <Select
                    value={defalutWaiter}
                    onChange={(selectedOption) => {
                      setDefaultWaiter(selectedOption.value);
                    }}
                    options={[
                      { value: "ali Raza", label: "Ali Raza" },
                      { value: "riaz Ahmad", label: "Riaz Ahmad" },
                      { value: "ali Raza", label: "Ali Raza" },
                      { value: "riaz Ahmad", label: "Riaz Ahmad" },
                      { value: "ali Raza", label: "Ali Raza" },
                      { value: "riaz Ahmad", label: "Riaz Ahmad" },
                    ]}
                    placeholder={
                      defalutWaiter ? defalutWaiter : "select order type"
                    }
                  />
                  {errors.defalutWaiter && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.defalutWaiter}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Default Customer
                  </Label>
                  <Select
                    value={defaultCustomer}
                    onChange={(selectedOption) => {
                      setDefaultCustomer(selectedOption.value);
                    }}
                    options={[
                      { value: "ali Raza", label: "Ali Raza" },
                      { value: "riaz Ahmad", label: "Riaz Ahmad" },
                      { value: "ali Raza", label: "Ali Raza" },
                      { value: "riaz Ahmad", label: "Riaz Ahmad" },
                      { value: "ali Raza", label: "Ali Raza" },
                      { value: "riaz Ahmad", label: "Riaz Ahmad" },
                    ]}
                    placeholder={
                      defaultCustomer ? defaultCustomer : "select order type"
                    }
                  />
                  {errors.defaultCustomer && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.defaultCustomer}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Default Payment Method
                  </Label>
                  <Select
                    value={defaultPaymentMethod}
                    onChange={(selectedOption) => {
                      setDefaultPaymentMethod(selectedOption.value);
                    }}
                    options={[
                      { value: "cash", label: "cash" },
                      { value: "credit Card", label: "credit Card" },
                      { value: "debit Card", label: "debit Card" },
                      { value: "Bank Transfer", label: "Bank Transfer" },
                    ]}
                    placeholder={
                      defaultPaymentMethod
                        ? defaultPaymentMethod
                        : "select Payment Method"
                    }
                  />
                  {errors.defaultPaymentMethod && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.defaultPaymentMethod}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Place Order Tooltip(in POS)
                  </Label>
                  <Select
                    value={posTooltip}
                    onChange={(selectedOption) => {
                      setPosTooltip(selectedOption.value);
                    }}
                    options={[
                      { value: "show", label: "Show" },
                      { value: "hide", label: "Hide" },
                    ]}
                    placeholder={posTooltip ? posTooltip : "select pos tooltip"}
                  />
                  {errors.posTooltip && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.posTooltip}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Food Menu Tooltip(in POS)
                  </Label>
                  <Select
                    value={menuTooltip}
                    onChange={(selectedOption) => {
                      setMenuTooltip(selectedOption.value);
                    }}
                    options={[
                      { value: "show", label: "Show" },
                      { value: "hide", label: "Hide" },
                    ]}
                    placeholder={
                      menuTooltip ? menuTooltip : "select food menu tooltip"
                    }
                  />
                  {errors.menuTooltip && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.menuTooltip}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={4} xl={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Pre or Post Payment
                  </Label>
                  <Select
                    value={payemtPreOrPost}
                    onChange={(selectedOption) => {
                      setPaymentPreOrPost(selectedOption.value);
                    }}
                    options={[
                      { value: "pre", label: "pre" },
                      { value: "post", label: "post" },
                    ]}
                    placeholder={
                      payemtPreOrPost
                        ? payemtPreOrPost
                        : "select pre or post payment"
                    }
                  />
                  {errors.payemtPreOrPost && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.payemtPreOrPost}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Service Charges Type
                  </Label>
                  <Select
                    value={typeOfServiceCharges}
                    onChange={(selectedOption) => {
                      setTypeOfServiceCharges(selectedOption.value);
                    }}
                    options={[
                      { value: "number", label: "Number" },
                      { value: "percentage", label: "PercentAge" },
                    ]}
                    placeholder={
                      typeOfServiceCharges
                        ? typeOfServiceCharges
                        : "select service charges type"
                    }
                  />
                  {errors.currencyPosition && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.typeOfServiceCharges}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={3} md={6} className="my-2">
                <div>
                  <Label
                    htmlFor="basiInput"
                    className="form-label ps-1"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Service Charge (eg:10% or 10)
                  </Label>
                  <Input
                    type="number"
                    className="form-control"
                    placeholder="Enter Service charges amount"
                    value={serviceChargesAmount}
                    id="basiInput"
                    onChange={(e) => setServiceChargesAmount(e.target.value)}
                  />
                  {errors.serviceChargesAmount && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.serviceChargesAmount}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={3} md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Delivery Charges Type
                  </Label>
                  <Select
                    value={typeOfDeliveryCharges}
                    onChange={(selectedOption) => {
                      setTypeOfDeliveryCharges(selectedOption.value);
                    }}
                    options={[
                      { value: "number", label: "Number" },
                      { value: "percentage", label: "PercentAge" },
                    ]}
                    placeholder={
                      typeOfDeliveryCharges
                        ? typeOfDeliveryCharges
                        : "Select typeOfDeliveryCharges"
                    }
                  />
                  {errors.typeOfDeliveryCharges && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.typeOfDeliveryCharges}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col lg={3} md={6} className="my-2">
                <div>
                  <Label
                    htmlFor="basiInput"
                    className="form-label ps-1"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Delivery Charge Amount
                  </Label>
                  <Input
                    type="number"
                    className="form-control"
                    value={deliveryChargesAmount}
                    placeholder="Enter Delivery Charges Amount"
                    id="basiInput"
                    onChange={(e) => setDeliveryChargesAmount(e.target.value)}
                  />
                  {errors.deliveryChargesAmount && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.deliveryChargesAmount}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col md={6} className="my-2">
                <div className="mb-3">
                  <Label
                    htmlFor="dateFormate"
                    className="form-label"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Food Tex Type
                  </Label>
                  <Select
                    value={gstTexType}
                    onChange={(selectedOption) => {
                      setGstTexType(selectedOption.value);
                    }}
                    options={[
                      { value: "number", label: "Number" },
                      { value: "percentage", label: "PercentAge" },
                    ]}
                    placeholder={gstTexType ? gstTexType : "select Text Type"}
                  />
                  {errors.gstTexType && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.gstTexType}
                    </p>
                  )}
                </div>
              </Col>{" "}
              <Col md={6} className="my-2">
                <div>
                  <Label
                    htmlFor="basiInput"
                    className="form-label ps-1"
                    style={{
                      fontSize: "15px",
                      color: "#6C667F",
                      fontWeight: "400",
                    }}
                  >
                    Food Tex Amount
                  </Label>
                  <Input
                    type="number"
                    value={gstTexAmount}
                    className="form-control"
                    placeholder="10 or 10%"
                    id="basiInput"
                    onChange={(e) => setGstTexAmount(e.target.value)}
                  />
                  {errors.gstTexAmount && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.gstTexAmount}
                    </p>
                  )}
                </div>
              </Col>{" "}
            </Row>

            {/* this is for the submit */}
            <div className=" col-md-6 mx-auto my-3">
              <Button
                type="submit"
                onClick={forEditRestSubmit}
                className="add-btn bg-info  w-100 text-white px-3 py-2 border-none rounded-5"
              >
                Edit
              </Button>
            </div>
          </div>
        </Container>

        {/* this is fo/r show image  */}
        <Modal isOpen={showModal} toggle={toggleModal} centered>
          <ModalHeader
            toggle={toggleModal}
            className="py-auto"
            style={{ backgroundColor: "#F8F8F8" }}
            close={
              <FaTimes onClick={toggleModal} style={{ cursor: "pointer" }} />
            }
          >
            <span style={{ flex: 1, fontSize: "20px" }}>Invoice Logo</span>{" "}
            {/* Title */}
          </ModalHeader>
          <ModalBody
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {restLogo && (
              <img
                src={
                  typeof restLogo === "string"
                    ? restLogo
                    : URL.createObjectURL(restLogo)
                }
                alt="Restaurant Logo"
                style={{ width: "100%", height: "150px", objectFit: "contain" }} // Ensure image scales properly
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default FileManager;
