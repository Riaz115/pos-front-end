import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Container,
  Row,
  Input,
  Table,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Label,
} from "reactstrap";
import Select from "react-select";
import SimpleBar from "simplebar-react";
import multiUser from "../../../assets/images/users/multi-user.jpg";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import { useParams } from "react-router-dom";
import { options } from "@fullcalendar/core/preact.js";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Common/Loader";
import DeleteModal from "../../../Components/Common/DeleteModal";
import BasicSuccessMsg from "../../AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import Pagination from "../../../Components/Common/Pagination";

const BasicTables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [allCatagories, setAllCatagories] = useState([]);
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [isRight, setIsRight] = useState(false);
  const [isEditItem, setIsEditItem] = useState(false);
  const [catagory, setCatagory] = useState("");
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [allFilteredMenuItems, setAllFilteredMenuItems] = useState([]);
  const [itemId, setItemId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [qty, setQty] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [allStockItems, setAllStockItems] = useState([]);
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [idForDelete, setIdForDelete] = useState("");

  //this is for getting data from my hook
  const { myUrl, formatAmount } = UseRiazHook();

  //this is for getting rest id
  const { id } = useParams();

  //this is for all catagoreis
  const forAllCatagories = allCatagories.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  //this is for pagination
  const perPageData = 50;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  //this is for page current data
  const currentdata = useMemo(
    () => allMenuItems?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  //this is for first time load and set data
  useEffect(() => {
    setAllFilteredMenuItems(allMenuItems.slice(0, perPageData));
  }, [allMenuItems]);

  //this is for set current data of page
  useEffect(() => {
    setAllFilteredMenuItems(currentdata);
  }, [currentdata]);

  //this is for search from menu items
  const OnchangeHandler = (e, type) => {
    let search;
    if (type === "name") {
      search = e.target.value;
      const filteredUsers = allMenuItems.filter((item) =>
        item?.name?.toString().includes(search)
      );
      setAllFilteredMenuItems(filteredUsers);
    } else if (type === "price") {
      search = e.target.value;
      const filteredUsers = allMenuItems.filter((item) =>
        item?.price?.toString().includes(search)
      );
      setAllFilteredMenuItems(filteredUsers);
    } else if (type === "catagory") {
      search = e.target.value;
      const filteredUsers = allMenuItems.filter((item) =>
        item?.catagory?.toString().includes(search)
      );
      setAllFilteredMenuItems(filteredUsers);
    } else {
      setAllFilteredMenuItems(allMenuItems);
    }
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (itemId, checked, qtyType) => {
    setItems((prevItems) => {
      if (checked) {
        return [...prevItems, { id: itemId, qty: 1, qtyType }];
      } else {
        return prevItems.filter((item) => item.id !== itemId);
      }
    });
  };

  // Handle quantity change
  const handleQuantityChange = (id, value) => {
    const qty = value.replace(/^0+/, "") || "";
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  // Handle option change
  const handleOptionChange = (itemId, selectedOption) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, qtyType: selectedOption } : item
      )
    );
  };
  //thi is for getting all stock items
  const forGettingAllStockItems = async () => {
    const url = `${myUrl}/restaurent/${id}/all/stock/items`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllStockItems(data.restStockITems);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the getting the all stock items function",
        err
      );
    }
  };

  //this is for controll rendering
  useEffect(() => {
    forGettingAllStockItems();
  }, []);

  // this is for search items when making menu item
  const filteredItems = allStockItems?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //this is for getting all catagories of the restaurent
  const forGettingAllCatagories = async () => {
    const url = `${myUrl}/get-all-catagories/${id}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllCatagories(data.catagories);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in getting all catagories function", err);
    }
  };

  //this is for control rendering
  useEffect(() => {
    forGettingAllCatagories();
  }, []);

  //this is for selecting the catagory
  function handleSelectCatagory(selectedOption) {
    setCatagory(selectedOption.value);
  }

  //this is for add item
  const toggleRightCanvas = () => {
    setIsRight(!isRight);
  };

  //this is for get all items
  const forGetAllMenuItems = async () => {
    setLoading(true);
    const url = `${myUrl}//get-all-menuitems/${id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllMenuItems(data.allItems);
        setAllFilteredMenuItems(data.allItems);
        setLoading(false);
      } else {
        console.log("err data", data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log("there is error in the get all menu items function", err);
    }
  };

  //this is for controll rendering of get all items of restaurent
  useEffect(() => {
    forGetAllMenuItems();
  }, []);

  //this is for edit item part show
  const forEditItemPartShow = () => {
    setIsEditItem(!isEditItem);
  };

  //this is for catch errors for add item
  const CatchErrorAddItem = () => {
    let isOk = true;

    let newErrors = {};

    if (!name.trim()) {
      toast.error("Please enter item name");
      newErrors.name = "Please enter item name";
      isOk = false;
    } else if (price.length < 0) {
      toast.error("please enter item price");
      newErrors.price = "please enter item price";
      isOk = false;
    } else if (!catagory.trim()) {
      toast.error("please select catagory");
      newErrors.catagory = "please select catagory";
      isOk = false;
    } else if (!desc.trim()) {
      toast.error("please enter item description");
      newErrors.desc = "please enter item description";
      isOk = false;
    } else if (items.length === 0) {
      toast.error("please select at one item");
      newErrors.items = "Please Select At Least One Item";
      isOk = true;
    }

    setErrors(newErrors);
    return isOk;
  };

  //this is for catch error of edit part
  const CatchErrorEditItem = () => {
    let isOk = true;
    let newErrors = {};

    if (!name.trim()) {
      toast.error("Please enter item name");
      newErrors.name = "Please enter item name";
      isOk = false;
    } else if (price.length < 0) {
      toast.error("please enter item price");
      newErrors.price = "please enter item price";
      isOk = false;
    } else if (!catagory.trim()) {
      toast.error("please select catagory");
      newErrors.catagory = "please select catagory";
      isOk = false;
    } else if (!desc.trim()) {
      toast.error("please enter item description");
      newErrors.desc = "please enter item description";
      isOk = false;
    } else if (items.length === 0) {
      toast.error("please select at one item");
      newErrors.items = "Please Select At Least One Item";
      isOk = true;
    }

    setErrors(newErrors);
    return isOk;
  };

  //this is for handleSubmit
  const forAddItemSubmit = (e) => {
    e.preventDefault();
    if (CatchErrorAddItem()) {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("catagory", catagory);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("qty", qty);
      formData.append("stockItems", JSON.stringify(items));

      //this is for add items
      const forAddMenuItem = async () => {
        const url = `${myUrl}/foraddmenuitem/${id}/addmenuitem`;
        const options = {
          method: "POST",
          body: formData,
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            toast.success(data.msg);
            forGetAllMenuItems();
            setIsRight(false);
            setImage("");
            setSuccessModal(true);
          } else {
            toast.error(data.msg);
          }
        } catch (err) {
          console.log("there is error in the add menu items functon", err);
        }
      };

      forAddMenuItem();
    }
  };

  //this is for get data for edit item
  const getDataForEditItem = async (id) => {
    const url = `${myUrl}/getdataforedit/${id}/menuitem`;
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setName(data?.myItem?.name);
        setPrice(data?.myItem?.price);
        setCatagory(data?.myItem?.catagory);
        setDesc(data?.myItem?.desc);
        setEditImage(data?.myItem?.image);
        setItems(data?.myItem?.stockItems);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get data for edit item");
    }
  };

  //this is for click on edit button
  const forClickOnEditButton = (id) => {
    setIsEditItem(true);
    setItemId(id);
    getDataForEditItem(id);
  };

  //this is for edit item submit
  const forEditItemSubmit = (e) => {
    e.preventDefault();
    if (CatchErrorEditItem()) {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("catagory", catagory);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("qty", qty);
      formData.append("stockItems", JSON.stringify(items));

      //this is for update the menu item
      const forUpdateMenuItem = async () => {
        const url = `${myUrl}/editmenuitem/${itemId}`;
        const options = {
          method: "PATCH",
          body: formData,
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            toast.success(data.msg);
            forGetAllMenuItems();
            setIsEditItem(false);
            setImage("");
            setSuccessModal(true);
          } else {
            toast.error(data.msg);
          }
        } catch (err) {
          console.log("there is error in the update item function", err);
        }
      };
      forUpdateMenuItem();
    }
  };

  //this is for click on the delete button
  const forClickOnDeleteButton = async (id) => {
    setDeleteModal(true);
    setIdForDelete(id);
  };

  //this is for delete the menu item
  const forDeleteMenuItem = async () => {
    const url = `${myUrl}/delete/${idForDelete}/menuitem`;
    const options = {
      method: "DELETE",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setDeleteModal(false);
        toast.success(data.msg);
        forGetAllMenuItems();
        setSuccessModal(true);
      } else {
        console.log("err data", data);
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("there is error in delete item function", err);
    }
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={forDeleteMenuItem}
        onCloseClick={() => setDeleteModal(false)}
      />

      <BasicSuccessMsg
        show={successModal}
        onCloseClick={() => setSuccessModal(false)}
      />
      <div className="page-content">
        <Col sm={12}>
          <div className="d-flex align-items-center justify-content-between mt-0 ">
            <div>
              <h5>All Menu Items</h5>
            </div>

            <div>
              <Link
                onClick={toggleRightCanvas}
                style={{
                  backgroundColor: "#0000FF",
                  color: "white",
                  textDecoration: "none",
                  textAlign: "center",

                  fontSize: "14px",
                }}
                className="px-3 mx-1 py-1"
              >
                <i className="ri-add-circle-line align-middle me-1"></i> Add
                Item
              </Link>
            </div>
          </div>
        </Col>
        <hr></hr>
        <Container fluid>
          <Row>
            <Col md={4} xs={12} className="mb-3">
              <Label for="kotType" style={{ fontWeight: "bold" }}>
                Item Name
              </Label>
              <Input
                type="text"
                id="kotType"
                onChange={(e) => OnchangeHandler(e, "name")}
                placeholder="Enter Item Name"
              />
            </Col>

            <Col md={4} xs={12} className="mb-3">
              <Label for="additionalInfo" style={{ fontWeight: "bold" }}>
                Price
              </Label>
              <Input
                type="text"
                onChange={(e) => OnchangeHandler(e, "price")}
                id="additionalInfo"
                placeholder="Enter Item Price"
              />
            </Col>
            <Col md={4} xs={12} className="mb-3">
              <Label for="additionalInfo" style={{ fontWeight: "bold" }}>
                Catagory
              </Label>
              <Input
                type="text"
                onChange={(e) => OnchangeHandler(e, "catagory")}
                id="additionalInfo"
                placeholder="Enter Item Catagory"
              />
            </Col>
          </Row>

          <Row>
            <Col xl={12}>
              <div className="table-responsive mt-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item Name</th>
                      <th>Qty Type</th>
                      <th>Price</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="7">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100px",
                            }}
                          >
                            <Loader />
                            <span style={{ marginLeft: "10px" }}>
                              Loading...
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      allFilteredMenuItems?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="d-flex gap-2 align-items-center">
                              <div className="flex-shrink-0">
                                <img
                                  src={item.image ? item.image : multiUser}
                                  alt=""
                                  className="avatar-xs rounded-circle"
                                />
                              </div>
                              <div className="flex-grow-1">{item.name}</div>
                            </div>
                          </td>

                          <td>{formatAmount(item.price)}</td>
                          <td>{item.catagory}</td>
                          <td>
                            {" "}
                            <button
                              className="my-custome-button-edit"
                              onClick={() => forClickOnEditButton(item._id)}
                            >
                              <i className="ri-pencil-fill align-bottom" />
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => forClickOnDeleteButton(item._id)}
                              className="my-custome-button-delete"
                            >
                              <i className="ri-delete-bin-5-fill align-bottom" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>

        <div className="my-3 p-3">
          <Pagination
            perPageData={perPageData}
            data={allMenuItems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      {/* this is for right off canvas for add item */}
      <Offcanvas
        isOpen={isRight}
        direction="end"
        toggle={toggleRightCanvas}
        id="offcanvasRight"
        className="border-bottom w-75"
      >
        <OffcanvasHeader toggle={toggleRightCanvas} id="offcanvasRightLabel">
          <h1>Add Menu Item</h1>
        </OffcanvasHeader>
        <OffcanvasBody className="p-0 overflow-scroll">
          <SimpleBar style={{ height: "100vh" }}>
            <div className="px-5 py-3">
              <Row>
                <Col lg={12}>
                  <div className="text-center">
                    <div className="position-relative d-inline-block">
                      <div className="position-absolute bottom-0 end-0">
                        <Label htmlFor="company-logo-input" className="mb-0">
                          <div className="avatar-xs cursor-pointer">
                            <div className="avatar-title bg-light border rounded-circle text-muted">
                              <i className="ri-image-fill"></i>
                            </div>
                          </div>
                        </Label>
                        <Input
                          name="img"
                          className="form-control d-none"
                          id="company-logo-input"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setImage(file);
                          }}
                        />
                      </div>
                      <div className="avatar-lg p-1">
                        <div className="avatar-title bg-light rounded-circle">
                          <img
                            src={image ? URL.createObjectURL(image) : multiUser}
                            alt="multiUser"
                            id="companylogo-img"
                            className="avatar-md rounded-circle object-fit-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <h5 className="fs-13 mt-3">Item Image</h5>
                  </div>
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label
                      htmlFor="billinginfo-firstName"
                      className="form-label"
                    >
                      Item Name
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="billinginfo-firstName"
                      placeholder="Enter Item name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {errors.name && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.name}
                    </p>
                  )}
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Price
                    </Label>
                    <input
                      type="number"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  {errors.price && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.price}
                    </p>
                  )}
                </Col>

                <Col sm={12}>
                  <div className="mb-3">
                    <Label htmlFor="catagory" className="form-label">
                      Catagory
                    </Label>
                    <Select
                      onChange={(selectedOption) =>
                        handleSelectCatagory(selectedOption)
                      }
                      placeholder={catagory ? catagory : "select catagroy"}
                      options={forAllCatagories}
                      id="country"
                    ></Select>
                  </div>
                  {errors.catagory && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.catagory}
                    </p>
                  )}
                </Col>

                <Col sm={12}>
                  {" "}
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-address" className="form-label">
                      Description
                    </Label>
                    <textarea
                      className="form-control"
                      id="billinginfo-address"
                      placeholder="Enter Item Description"
                      onChange={(e) => setDesc(e.target.value)}
                      rows="3"
                    ></textarea>
                  </div>
                  {errors.desc && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.desc}
                    </p>
                  )}
                </Col>

                <Col sm={12}>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Select Items
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ marginBottom: "10px" }}
                    />
                    {errors.items && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.items}
                      </p>
                    )}

                    <Row>
                      {filteredItems?.map((item) => {
                        const selectedItem = items.find(
                          (i) => i.id === item._id
                        );
                        const qtyTypeOptions =
                          item.qtyType === "kilogram"
                            ? ["kilogram", "gram", "milligram"]
                            : item.qtyType === "liter"
                            ? ["liter", "milliliter"]
                            : item.qtyType === "flat"
                            ? ["flat"]
                            : [];

                        return (
                          <Col md={6} key={item._id} className="my-1">
                            <div className="d-flex align-items-center">
                              <label
                                className="d-flex align-items-center mb-0"
                                style={{ fontSize: "12px", fontWeight: "500" }}
                              >
                                <input
                                  className="p-1 mx-2"
                                  type="checkbox"
                                  value={item._id}
                                  checked={Boolean(selectedItem)}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      item._id,
                                      e.target.checked,
                                      item.qtyType
                                    )
                                  }
                                />
                                <span>{item.name}</span>
                              </label>
                              {selectedItem && (
                                <div className="d-flex align-items-center mx-2">
                                  <input
                                    type="number"
                                    value={selectedItem.qty || ""}
                                    min="1"
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        item._id,
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    style={{
                                      width: "70px",
                                      height: "35px",
                                      padding: "4px",
                                      backgroundColor: "#f8f9fa",
                                      borderRadius: "5px",
                                    }}
                                  />
                                  <select
                                    className="form-control mx-2"
                                    style={{
                                      width: "120px",
                                      height: "35px",
                                      padding: "4px",
                                      backgroundColor: "#f8f9fa",
                                      borderRadius: "5px",
                                    }}
                                    value={selectedItem.qtyType || ""}
                                    onChange={(e) =>
                                      handleOptionChange(
                                        item._id,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">Select</option>
                                    {qtyTypeOptions.map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </Col>
              </Row>

              <div className="hstack gap-2 justify-content-end my-5">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={toggleRightCanvas}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  id="add-btn"
                  onClick={(e) => forAddItemSubmit(e)}
                >
                  Add Item
                </button>
              </div>
            </div>
          </SimpleBar>
        </OffcanvasBody>
      </Offcanvas>

      {/* this is for right off canvas  for edit item*/}
      <Offcanvas
        isOpen={isEditItem}
        direction="end"
        toggle={forEditItemPartShow}
        id="offcanvasRight"
        className="border-bottom w-75"
      >
        <OffcanvasHeader toggle={forEditItemPartShow} id="offcanvasRightLabel">
          <h1>Edit Item</h1>
        </OffcanvasHeader>
        <OffcanvasBody className="p-0 overflow-scroll">
          <SimpleBar style={{ height: "100vh" }}>
            <div className="px-5 py-3">
              <Row>
                <Col lg={12}>
                  <div className="text-center">
                    <div className="position-relative d-inline-block">
                      <div className="position-absolute bottom-0 end-0">
                        <Label htmlFor="company-logo-input" className="mb-0">
                          <div className="avatar-xs cursor-pointer">
                            <div className="avatar-title bg-light border rounded-circle text-muted">
                              <i className="ri-image-fill"></i>
                            </div>
                          </div>
                        </Label>
                        <Input
                          name="img"
                          className="form-control d-none"
                          id="company-logo-input"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setImage(file);
                            setEditImage(URL.createObjectURL(file));
                          }}
                        />
                      </div>
                      <div className="avatar-lg p-1">
                        <div className="avatar-title bg-light rounded-circle">
                          <img
                            src={editImage || multiUser}
                            alt="multiUser"
                            id="companylogo-img"
                            className="avatar-md rounded-circle object-fit-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <h5 className="fs-13 mt-3">Item Image</h5>
                  </div>
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label
                      htmlFor="billinginfo-firstName"
                      className="form-label"
                    >
                      Item Name
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="billinginfo-firstName"
                      placeholder="Enter Item name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {errors.name && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.name}
                    </p>
                  )}
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Price
                    </Label>
                    <input
                      type="number"
                      value={price}
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  {errors.price && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.price}
                    </p>
                  )}
                </Col>

                <Col sm={12}>
                  <div className="mb-3">
                    <Label htmlFor="catagory" className="form-label">
                      Catagory
                    </Label>
                    <Select
                      value={catagory}
                      onChange={(selectedOption) =>
                        handleSelectCatagory(selectedOption)
                      }
                      placeholder={catagory ? catagory : "select catagroy"}
                      options={forAllCatagories}
                      id="country"
                    ></Select>
                  </div>
                  {errors.catagory && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.catagory}
                    </p>
                  )}
                </Col>

                <Col sm={12}>
                  {" "}
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-address" className="form-label">
                      Description
                    </Label>
                    <textarea
                      className="form-control"
                      id="billinginfo-address"
                      value={desc}
                      placeholder="Enter Item Description"
                      onChange={(e) => setDesc(e.target.value)}
                      rows="3"
                    ></textarea>
                  </div>
                  {errors.desc && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}
                    >
                      {errors.desc}
                    </p>
                  )}
                </Col>

                <Col sm={12}>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Select Items
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ marginBottom: "10px" }}
                    />
                    {errors.items && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}
                      >
                        {errors.items}
                      </p>
                    )}

                    <Row>
                      {filteredItems?.map((item) => {
                        const selectedItem = items.find(
                          (i) => i.id === item._id
                        );
                        const qtyTypeOptions =
                          item.qtyType === "kilogram"
                            ? ["kilogram", "gram", "milligram"]
                            : item.qtyType === "liter"
                            ? ["liter", "milliliter"]
                            : item.qtyType === "flat"
                            ? ["flat"]
                            : [];

                        return (
                          <Col md={6} key={item._id} className="my-1">
                            <div className="d-flex align-items-center">
                              <label
                                className="d-flex align-items-center mb-0"
                                style={{ fontSize: "12px", fontWeight: "500" }}
                              >
                                <input
                                  className="p-1 mx-2"
                                  type="checkbox"
                                  value={item._id}
                                  checked={Boolean(selectedItem)}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      item._id,
                                      e.target.checked,
                                      item.qtyType
                                    )
                                  }
                                />
                                <span>{item.name}</span>
                              </label>
                              {selectedItem && (
                                <div className="d-flex align-items-center mx-2">
                                  <input
                                    type="number"
                                    value={selectedItem.qty || ""}
                                    min="1"
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        item._id,
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    style={{
                                      width: "70px",
                                      height: "35px",
                                      padding: "4px",
                                      backgroundColor: "#f8f9fa",
                                      borderRadius: "5px",
                                    }}
                                  />
                                  <select
                                    className="form-control mx-2"
                                    style={{
                                      width: "120px",
                                      height: "35px",
                                      padding: "4px",
                                      backgroundColor: "#f8f9fa",
                                      borderRadius: "5px",
                                    }}
                                    value={selectedItem.qtyType || ""}
                                    onChange={(e) =>
                                      handleOptionChange(
                                        item._id,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">Select</option>
                                    {qtyTypeOptions.map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </Col>
              </Row>

              <div className="hstack gap-2 justify-content-end my-5">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={forEditItemPartShow}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="add-btn"
                  onClick={(e) => forEditItemSubmit(e)}
                >
                  Edit Item
                </button>
              </div>
            </div>
          </SimpleBar>
        </OffcanvasBody>
      </Offcanvas>
    </React.Fragment>
  );
};

export default BasicTables;
