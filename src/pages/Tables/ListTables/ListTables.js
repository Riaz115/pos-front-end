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
import Select from "react-select";
import SimpleBar from "simplebar-react";
import multiUser from "../../../assets/images/users/multi-user.jpg";
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import { useParams } from "react-router-dom";
import { options } from "@fullcalendar/core/preact.js";

const BasicTables = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [allCatagories, setAllCatagories] = useState([]);
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [isRight, setIsRight] = useState(false);
  const [isEditItem, setIsEditItem] = useState(false);
  const [catagory, setCatagory] = useState("");
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [itemId, setItemId] = useState("");
  const [editImage, setEditImage] = useState("");

  //this is for getting data from my hook
  const { myUrl } = UseRiazHook();

  //this is for getting rest id
  const { id } = useParams();

  //this is for all catagoreis
  const forAllCatagories = allCatagories.map((item) => ({
    label: item.name,
    value: item.name,
  }));

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

  //this is for catch errors for add item
  const CatchErrorAddItem = () => {
    let isOk = true;

    if (!name.trim()) {
      toast.error("Please enter item name");
      isOk = false;
    } else if (!price.trim()) {
      toast.error("please enter item price");
      isOk = false;
    } else if (!catagory.trim()) {
      toast.error("please select catagory");
      isOk = false;
    } else if (!desc.trim()) {
      toast.error("please enter item description");
      isOk = false;
    }

    return isOk;
  };

  //this is for catch error of edit part
  const CatchErrorEditItem = () => {
    let isOk = true;

    if (!name.trim()) {
      toast.error("Please enter item name");
      isOk = false;
    } else if (price.length < 0) {
      toast.error("please enter item price");
      isOk = false;
    } else if (!catagory.trim()) {
      toast.error("please select catagory");
      isOk = false;
    } else if (!desc.trim()) {
      toast.error("please enter item description");
      isOk = false;
    }

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
        setName(data.myItem.name),
          setPrice(data.myItem.price),
          setCatagory(data.myItem.catagory),
          setDesc(data.myItem.desc),
          setEditImage(data.myItem.image);
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

  //this is for delete the menu item
  const forDeleteMenuItem = async (id) => {
    const url = `${myUrl}/delete/${id}/menuitem`;
    const options = {
      method: "DELETE",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        console.log("ok data", data);
        toast.success(data.msg);
        forGetAllMenuItems();
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
      <div className="page-content">
        <Container fluid>
          <BreadCrumb allItemsText="All Items" />

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
                  <i className="ri-add-line align-bottom me-1"></i> Add Item
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
                      <th scope="col">Item Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Catagory</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allMenuItems.map((item, index) => (
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
                        <td>{item.catagory}</td>

                        <td>
                          <div className="hstack gap-3 flex-wrap">
                            <button
                              className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                              onClick={() => forClickOnEditButton(item._id)}
                              style={{
                                padding: "4px 8px",
                                backgroundColor: "#E6F7FC",
                              }}>
                              <i className="ri-pencil-fill align-bottom" />
                            </button>
                            <button
                              onClick={() => forDeleteMenuItem(item._id)}
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
          <h1>Add Item</h1>
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
                  </div>
                </Col>
              </Row>

              <Row>
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
                </Col>

                <Col sm={6}>
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
                      id="country"></Select>
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
                  placeholder="Enter Item Description"
                  onChange={(e) => setDesc(e.target.value)}
                  rows="3"></textarea>
              </div>
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
                  onClick={(e) => forAddItemSubmit(e)}>
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
              </Row>

              <Row>
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
                      id="country"></Select>
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
                  className="btn btn-primary"
                  id="add-btn"
                  onClick={(e) => forEditItemSubmit(e)}>
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
