import React, { useState, useEffect } from "react";
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

import SimpleBar from "simplebar-react";
import multiUser from "../../../assets/images/users/multi-user.jpg";
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import { useParams } from "react-router-dom";

const Kanbanboard = () => {
  const [editImage, setEditImage] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [allComboItems, setAllComboItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRight, setIsRight] = useState(false);
  const [isEditItem, setIsEditItem] = useState(false);
  const [itemId, setItemId] = useState("");
  const [qty, setQty] = useState("");
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [errors, setErrors] = useState({});

  // this is for search items when making combo deal
  const filteredItems = allMenuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //this is for getting data from my hook
  const { myUrl } = UseRiazHook();

  //this is for getting rest id
  const { id } = useParams();

  //this is for add item
  const toggleRightCanvas = () => {
    setIsRight(!isRight);
  };

  //this is for get all items
  const forGetAllMenuItems = async () => {
    const url = `${myUrl}//get-all-menuitems/${id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllMenuItems(data.updatedrestMenuItems);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
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

  //this is for getting all combo items data
  const forGetAllComboItems = async () => {
    const url = `${myUrl}/forgetalldata/${id}/comboitem`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllComboItems(data.updatedrestComboItems);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the getting all data of combos", err);
    }
  };

  //this is for controll rendering of the get of all combo items
  useEffect(() => {
    forGetAllComboItems();
  }, []);

  //this is for catchErrors of add combo items
  const forCatcErorComboItem = () => {
    let isOk = true;
    let newErrors = {};

    if (!name.trim()) {
      isOk = false;
      newErrors.name = "Please Enter Name";
      toast.error("please enter the name");
    } else if (price.length < 0) {
      isOk = false;
      newErrors.price = "Please Enter price";
      toast.error("please enter the price");
    } else if (items.length < 0) {
      isOk = false;
      newErrors.items = "Please Select Items";
      toast.error("please Select Items");
    } else if (qty === "") {
      isOk = false;
      newErrors.qty = "Please Enter quantity";
      toast.error("please enter quantity");
    } else if (!desc.trim()) {
      isOk = false;
      newErrors.desc = "Please enter description";
      toast.error("please enter description");
    } else if (image === "") {
      isOk = false;
      newErrors.image = "Please upload image";
      toast.error("please upload image");
    }

    setErrors(newErrors);
    return isOk;
  };

  //this is forall combo items
  const forAddComboItemClickBtn = (e) => {
    e.preventDefault();

    if (forCatcErorComboItem()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      items.forEach((itemId) => {
        formData.append("items[]", itemId); // Each item as a separate entry
      });
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("qty", qty);

      const forAddCombo = async () => {
        const url = `${myUrl}/foradd/${id}/combo`;
        const options = {
          method: "POST",
          body: formData,
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            toast.success(data.msg);
            forGetAllComboItems();
            setIsRight(false);
          } else {
            toast.error(data.msg);
          }
        } catch (err) {
          console.log("there is error in the add combo item function", err);
        }
      };

      forAddCombo();
    }
  };

  //this is for get data for edit combo item
  const getDataForEditComboItem = async (id) => {
    const url = `${myUrl}/getdataforedit/${id}/comboitem`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setName(data.myItem.name);
        setPrice(data.myItem.price);
        setDesc(data.myItem.desc);
        setEditImage(data.myItem.image);
        setQty(data.myItem.qty);
        setItems(data.myItem.items.map((item) => item.id));
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in get combo item data for update", err);
    }
  };

  //this is for click on edit button
  const forClickOnEditBtn = (id) => {
    forEditItemPartShow(true);
    getDataForEditComboItem(id);
    setItemId(id);
  };

  //this is for edit the combo item
  const handleEditDealSubmit = (e) => {
    e.preventDefault();

    if (forCatcErorComboItem()) {
      if (editImage !== "") {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        items.forEach((itemId) => {
          formData.append("items[]", itemId);
        });
        formData.append("desc", desc);
        formData.append("image", editImage);
        formData.append("qty", qty);

        const forEditCombo = async () => {
          const url = `${myUrl}/editcomboitem/${itemId}`;
          const options = {
            method: "PATCH",
            body: formData,
          };

          try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
              console.log("ok data", data);
              toast.success(data.msg);
              forGetAllComboItems();
              forEditItemPartShow(false);
            } else {
              toast.error(data.msg);
            }
          } catch (err) {
            console.log("there is error in the edit combo item function", err);
          }
        };

        forEditCombo();
      }
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb allItemsText="All Deals" />

          <div class="container mt-0">
            <div class="row">
              <div class="col-12 col-md-3 mb-3">
                <Flatpickr
                  className="form-control"
                  id="datepicker-publish-input"
                  placeholder="Select date"
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    mode: "multiple",
                    dateFormat: "d.m.y",
                  }}
                />
              </div>
              <div class="col-12 col-md-3 mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search by Name"
                />
              </div>
              <div class="col-12 col-md-3 mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search by Number"
                />
              </div>
              <div class="col-12 col-md-3 mb-3">
                <Button
                  className="add-btn bg-dark text-white px-4 py-1 border-none cursor-pointer
"
                  id="create-btn"
                  onClick={toggleRightCanvas}>
                  <i className="ri-add-line align-bottom me-1"></i> Add Deal
                </Button>
              </div>
            </div>
          </div>

          <Row>
            <Col xl={12}>
              <div className="table-responsive mt-4 mt-xl-0">
                <Table className="table-success table-striped table-nowrap align-middle mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Deal Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">items</th>
                      <th scope="col">quantity</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allComboItems.map((item, index) => (
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
                        <td>${item.price}</td>
                        <td>
                          {item.items.map((item, index) => (
                            <span key={index}>{item.name}, </span>
                          ))}
                        </td>
                        <td>{item.qty}</td>
                        <td>
                          <div className="hstack gap-3 flex-wrap">
                            <button
                              onClick={() => forClickOnEditBtn(item._id)}
                              className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                              style={{
                                padding: "4px 8px",
                                backgroundColor: "#E6F7FC",
                              }}>
                              <i className="ri-pencil-fill align-bottom" />
                            </button>
                            <button
                              className="btn btn-sm btn-soft-danger remove-list delete-btn"
                              style={{
                                padding: "4px 8px",
                                backgroundColor: "#FEEDE9",
                                color: "red",
                              }}>
                              <i className="ri-delete-bin-5-fill align-bottom" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* this is for right off canvas for add item */}
      <Offcanvas
        isOpen={isRight}
        direction="end"
        toggle={toggleRightCanvas}
        id="offcanvasRight"
        className="border-bottom w-75">
        <OffcanvasHeader toggle={toggleRightCanvas} id="offcanvasRightLabel">
          <h1>Add Deal</h1>
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
                    {errors.image && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.image}
                      </p>
                    )}
                    <h5 className="fs-13 mt-3">Deal Image</h5>
                  </div>
                </Col>

                <Col sm={12}>
                  <div className="mb-3">
                    <Label
                      htmlFor="billinginfo-firstName"
                      className="form-label">
                      Item Name
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="billinginfo-firstName"
                      placeholder="Enter Item name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.name}
                      </p>
                    )}
                  </div>
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
                    {errors.price && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.price}
                      </p>
                    )}
                  </div>
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Quantity
                    </Label>
                    <input
                      type="number"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Price"
                      onChange={(e) => setQty(e.target.value)}
                    />
                    {errors.qty && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.qty}
                      </p>
                    )}
                  </div>
                </Col>

                <Col sm={12}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-address" className="form-label">
                      Description
                    </Label>
                    <textarea
                      className="form-control"
                      id="billinginfo-address"
                      placeholder="Enter Item Description"
                      onChange={(e) => setDesc(e.target.value)}
                      rows="3"></textarea>
                  </div>
                  {errors.desc && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        paddingLeft: "5px",
                      }}>
                      {errors.desc}
                    </p>
                  )}
                </Col>

                <Col sm={12}>
                  <div>
                    <label>Select Items</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ marginBottom: "10px" }} // Optional styling
                    />
                    {errors.items && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.items}
                      </p>
                    )}
                    <Row>
                      {filteredItems.map((item, index) => (
                        <Col md={6} key={index} className="my-1">
                          <input
                            className="p-1 mx-2"
                            type="checkbox"
                            value={item._id}
                            checked={items.includes(item._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setItems([...items, item._id]);
                              } else {
                                setItems(items.filter((id) => id !== item._id));
                              }
                            }}
                          />
                          <span className="mx-2 fs-5">{item.name}</span>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Col>
              </Row>

              <div className="hstack gap-2 justify-content-end my-5">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={toggleRightCanvas}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  id="add-btn"
                  onClick={(e) => forAddComboItemClickBtn(e)}>
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
        className="border-bottom w-75">
        <OffcanvasHeader toggle={forEditItemPartShow} id="offcanvasRightLabel">
          <h1>Edit Deal</h1>
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

                <Col sm={12}>
                  <div className="mb-3">
                    <Label
                      htmlFor="billinginfo-firstName"
                      className="form-label">
                      Item Name
                    </Label>
                    <input
                      type="text"
                      value={name}
                      className="form-control"
                      id="billinginfo-firstName"
                      placeholder="Enter Item name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
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
                </Col>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Quantity
                    </Label>
                    <input
                      type="number"
                      value={qty}
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Price"
                      onChange={(e) => setQty(e.target.value)}
                    />
                    {errors.qty && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "5px",
                        }}>
                        {errors.qty}
                      </p>
                    )}
                  </div>
                </Col>

                <Col sm={12}>
                  <div>
                    <label>Select Items</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ marginBottom: "10px" }}
                    />

                    <Row>
                      {filteredItems.map((item, index) => (
                        <Col md={6} key={index} className="my-1">
                          <input
                            className="p-1 mx-2"
                            type="checkbox"
                            value={item._id}
                            // Check if the item is selected
                            checked={items.includes(item._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                // Add item to the selected list if checked
                                setItems([...items, item._id]);
                              } else {
                                // Remove item from the selected list if unchecked
                                setItems(items.filter((id) => id !== item._id));
                              }
                            }}
                          />
                          <span className="mx-2 fs-5">{item.name}</span>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Col>
              </Row>

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
                  rows="3"></textarea>
              </div>
              <div className="hstack gap-2 justify-content-end my-5">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={forEditItemPartShow}>
                  Close
                </button>
                <button
                  type="submit"
                  onClick={(e) => handleEditDealSubmit(e)}
                  className="btn btn-primary"
                  id="add-btn">
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

export default Kanbanboard;
