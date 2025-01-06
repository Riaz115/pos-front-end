import React, { useEffect, useState, useMemo } from "react";
import {
  Col,
  Container,
  Row,
  Label,
  Input,
  Table,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Form,
  Button,
} from "reactstrap";

import Select from "react-select";
import SimpleBar from "simplebar-react";
import DeleteModal from "../../../Components/Common/DeleteModal";
import BasicSuccessMsg from "../../AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import { Link, useParams } from "react-router-dom";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import { toast } from "react-toastify";
import imgLogo from "../../../assets/images/users/multi-user.jpg";
import Pagination from "../../../Components/Common/Pagination";
import Loader from "../../../Components/Common/Loader";

const CreateNFT = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isEditItem, setIsEditItem] = useState(false);
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [alertQty, setAlertQty] = useState(0);
  const [qtyType, setQtyType] = useState("");
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(false);
  const [allStockItems, setAllStockItems] = useState([]);
  const [allFilteredStockItems, setAllfilteredStockItems] = useState([]);
  const [idForAddQty, setIdForAddQty] = useState("");
  const [idForEdit, setIdForEdit] = useState("");
  const [idForDelete, setIdForDelete] = useState("");
  const [loading, setLoading] = useState(false);

  //this is for getting rest id from url
  const { id } = useParams();

  //this is getting data from my custome hook
  const { myUrl } = UseRiazHook();

  //this is for add modal
  const toggle = () => {
    setModal(!modal);
  };

  //this is for add item
  const toggleRightCanvas = () => {
    setIsRight(!isRight);
  };

  //this is for edit item part show
  const forEditItemPartShow = () => {
    setIsEditItem(!isEditItem);
  };

  //this is for pagination
  const perPageData = 50;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  //this is for page current data
  const currentdata = useMemo(
    () => allStockItems?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  //this is for first time load and set data
  useEffect(() => {
    setAllfilteredStockItems(allStockItems.slice(0, perPageData));
  }, [allStockItems]);

  //this is for set current data of page
  useEffect(() => {
    setAllfilteredStockItems(currentdata);
  }, [currentdata]);

  //this is for search from guests
  const OnchangeHandler = (e, type) => {
    let search;
    if (type === "name") {
      search = e.target.value;
      const filteredUsers = allStockItems.filter((item) =>
        item?.name?.toString().includes(search)
      );
      setAllfilteredStockItems(filteredUsers);
    } else if (type === "qtytype") {
      search = e.target.value;
      const filteredUsers = allStockItems.filter((item) =>
        item?.qtyType?.toString().includes(search)
      );
      setAllfilteredStockItems(filteredUsers);
    } else {
      setAllfilteredStockItems(allStockItems);
    }
  };

  // Options for quantity types
  const quantityTypes = [
    { value: "kilogram", label: "Kilogram (kg)" },
    { value: "gram", label: "Gram (g)" },
    { value: "liter", label: "Liter (L)" },
    { value: "mililiter", label: "Milliliter (ml)" },
    { value: "flat", label: "Flat (Count)" },
  ];

  // Handle selection change
  const handleSelectQuantityType = (selectedOption) => {
    setQtyType(selectedOption.value);
  };

  //thi is for getting all stock items
  const forGettingAllStockItems = async () => {
    setLoading(true);
    const url = `${myUrl}/restaurent/${id}/all/stock/items`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllStockItems(data.restStockITems);
        setAllfilteredStockItems(data.restStockITems);
        setLoading(false);
      } else {
        console.log("err data", data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
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

  //this is for catch errors
  const forCatchErrors = () => {
    let isOk = true;
    let newErrors = {};
    if (!name.trim()) {
      isOk = false;
      newErrors.name = "Please enter name";
      toast.error("Please enter name");
    } else if (!qtyType.trim()) {
      isOk = false;
      newErrors.qtyType = "Please select quantity type";
      toast.error("Please select quantity type");
    } else if (!stock) {
      isOk = false;
      newErrors.stock = "Please enter stock";
      toast.error("Please enter stock");
    } else if (!alertQty) {
      isOk = false;
      newErrors.alertQty = "Please enter alert quantity";
      toast.error("Please enter alert quantity");
    }

    setErrors(newErrors);
    return isOk;
  };

  //this is for add stock item
  const forAddStockItemSubmit = async (e) => {
    e.preventDefault();

    if (forCatchErrors()) {
      const formData = {
        name,
        stock,
        qtyType,
        alertQty,
      };

      const url = `${myUrl}/restuarent/${id}/add/stock/item`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          forGettingAllStockItems();
          toast.success(data.msg);
          setIsRight(false);
          setSuccessModal(true);
        } else {
          console.log("err data", data);
          toast.error(data.msg);
        }
      } catch (err) {
        console.log("there is error in the add stock item function", err);
      }
    }
  };

  //this is for click on the add item function
  const forClickOnAddClickFun = (id) => {
    setIdForAddQty(id);
    toggle();
  };

  //this is for add item quantity
  const forAddItemQuantity = async (e) => {
    e.preventDefault();
    if (!stock) {
      toast.error("Please enter the stock");
      return;
    } else {
      const formData = {
        stock,
      };
      const url = `${myUrl}/restaurent/item/${idForAddQty}/add/quantity`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          forGettingAllStockItems();
          toast.success(data.msg);
          toggle();
          setSuccessModal(true);
        } else {
          console.log("err data", data);
          toast.error(data.msg);
        }
      } catch (err) {
        console.log("there is error in the add quantity function", err);
      }
    }
  };

  //this is for getting data for edit the item
  const forGettingDataForEditItem = async (id) => {
    const url = `${myUrl}/restaurent/getdata/edit/${id}/stock/items`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setName(data.name);
        setQtyType(data.qtyType);
        setAlertQty(data.alertQty);
        setStock(data.stock);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get item dat for edit stock item",
        err
      );
    }
  };

  //this is for click on edit button
  const forClickOnEditButton = (id) => {
    setIsEditItem(true);
    setIdForEdit(id);
    forGettingDataForEditItem(id);
  };

  //this is for edit the stock item
  const forEditStockItem = async (e) => {
    e.preventDefault();

    if (forCatchErrors()) {
      const formData = {
        name,
        stock,
        qtyType,
        alertQty,
      };

      const url = `${myUrl}/restaurent/item/${idForEdit}/edit/stock`;
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          forGettingAllStockItems();
          toast.success(data.msg);
          setIsEditItem(false);
          setSuccessModal(true);
        } else {
          console.log("err data", data);
          toast.error(data.msg);
        }
      } catch (err) {
        console.log("there is error in the edit stock item function", err);
      }
    }
  };

  //this is for click on the delete button
  const forClickOnDeleteButton = (id) => {
    setIdForDelete(id);
    setDeleteModal(true);
  };

  //this is for delete the stock item
  const forDeleteTheStockItem = async (e) => {
    e.preventDefault();

    try {
      const url = `${myUrl}/restaurent/item/${idForDelete}/delete/stock`;
      const options = {
        method: "DELETE",
      };

      const response = await fetch(url, options);
      const data = response.json();
      if (response.ok) {
        forGettingAllStockItems();
        toast.success(data.msg);
        setDeleteModal(false);
        setSuccessModal(true);
      } else {
        console.log("err data", data);
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("there is error in the delete item function", err);
    }
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={forDeleteTheStockItem}
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
              <h5>All Stock Items</h5>
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
            <Col md={6} xs={12} className="mb-3">
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

            <Col md={6} xs={12} className="mb-3">
              <Label for="additionalInfo" style={{ fontWeight: "bold" }}>
                Quantity Type
              </Label>
              <Input
                type="text"
                onChange={(e) => OnchangeHandler(e, "qtytype")}
                id="additionalInfo"
                placeholder="Quantity Type"
              />
            </Col>
          </Row>

          {/* Table Section */}
          <div className="table-responsive mt-4">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Qty Type</th>
                  <th>Stock</th>
                  <th>Alert Qty</th>
                  <th>Add Qty</th>
                  <th>Action</th>
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
                          height: "100px", // Center vertically
                        }}
                      >
                        <Loader />
                        <span style={{ marginLeft: "10px" }}>Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  allFilteredStockItems?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item?.qtyType}</td>
                      <td>{item?.stock}</td>
                      <td>{item?.alertQty}</td>
                      <td>
                        <button
                          onClick={() => forClickOnAddClickFun(item._id)}
                          className="my-custome-button-edit"
                        >
                          <i className="ri-add-circle-line align-middle me-1"></i>{" "}
                          Add
                        </button>
                      </td>
                      <td>
                        <div>
                          <button
                            onClick={() => forClickOnEditButton(item._id)}
                            className="my-custome-button-edit"
                          >
                            <i className="ri-pencil-fill align-bottom" />
                          </button>
                          <button
                            onClick={() => forClickOnDeleteButton(item._id)}
                            className="my-custome-button-delete"
                          >
                            <i className="ri-delete-bin-5-fill align-bottom" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>

          <div className="my-3 p-3">
            <Pagination
              perPageData={perPageData}
              data={allStockItems}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Container>
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
          <h1>Add Stock Item</h1>
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
                        />
                      </div>
                      <div className="avatar-lg p-1">
                        <div className="avatar-title bg-light rounded-circle">
                          <img
                            src={imgLogo}
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
                    {errors.name && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginLeft: "5px",
                        }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="quantityType" className="form-label">
                      Quantity Type
                    </Label>
                    <Select
                      value={quantityTypes.find(
                        (option) => option.value === qtyType
                      )}
                      onChange={handleSelectQuantityType}
                      placeholder={qtyType ? qtyType : "Select Quantity Type"}
                      options={quantityTypes}
                      id="quantityType"
                    ></Select>
                  </div>
                  {errors.qtyType && (
                    <p
                      style={{
                        fontSize: "12px",
                        color: "red",
                        marginLeft: "5px",
                      }}
                    >
                      {errors.qtyType}
                    </p>
                  )}
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Item Quantity
                    </Label>
                    <input
                      type="number"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Quantity"
                      onChange={(e) => setStock(e.target.value)}
                    />
                    {errors.stock && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginLeft: "5px",
                        }}
                      >
                        {errors.stock}
                      </p>
                    )}
                  </div>
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Alert Stock
                    </Label>
                    <input
                      type="number"
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Alert Quantity"
                      onChange={(e) => setAlertQty(e.target.value)}
                    />
                    {errors.alertQty && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginLeft: "5px",
                        }}
                      >
                        {errors.alertQty}
                      </p>
                    )}
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
                  onClick={(e) => forAddStockItemSubmit(e)}
                >
                  Add Item
                </button>
              </div>
            </div>
          </SimpleBar>
        </OffcanvasBody>
      </Offcanvas>

      {/* this is for add modal */}
      <Modal id="showModal" isOpen={modal} toggle={toggle} centered size="lg">
        <ModalHeader className="bg-info-subtle p-3" toggle={toggle}>
          Add Quantity Of Itme Number for name
        </ModalHeader>
        <Form className="tablelist-form">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <Row className="g-3">
              <Col sm={12} className="my-2">
                <div className="form-group">
                  <label>Enter Quantity </label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="enter Quantity
                      "
                    onChange={(e) => setStock(e.target.value)}
                    className="form-control"
                  />
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <Button
                color="light"
                onClick={() => {
                  setModal(false);
                }}
              >
                {" "}
                Close{" "}
              </Button>
              <Button
                onClick={(e) => forAddItemQuantity(e)}
                color="success"
                id="add-btn"
              >
                Add Quantity
              </Button>
            </div>
          </ModalFooter>
        </Form>
      </Modal>

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
                        />
                      </div>
                      <div className="avatar-lg p-1">
                        <div className="avatar-title bg-light rounded-circle">
                          <img
                            src={imgLogo}
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
                      value={name}
                      className="form-control"
                      id="billinginfo-firstName"
                      placeholder="Enter Item name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginLeft: "5px",
                        }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="quantityType" className="form-label">
                      Quantity Type
                    </Label>
                    <Select
                      value={quantityTypes.find(
                        (option) => option.value === qtyType
                      )}
                      onChange={handleSelectQuantityType}
                      placeholder={qtyType ? qtyType : "Select Quantity Type"}
                      options={quantityTypes}
                      id="quantityType"
                    ></Select>
                  </div>
                  {errors.qtyType && (
                    <p
                      style={{
                        fontSize: "12px",
                        color: "red",
                        marginLeft: "5px",
                      }}
                    >
                      {errors.qtyType}
                    </p>
                  )}
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Item Quantity
                    </Label>
                    <input
                      type="number"
                      value={stock}
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Quantity"
                      onChange={(e) => setStock(e.target.value)}
                    />
                    {errors.stock && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginLeft: "5px",
                        }}
                      >
                        {errors.stock}
                      </p>
                    )}
                  </div>
                </Col>

                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="billinginfo-email" className="form-label">
                      Alert Stock
                    </Label>
                    <input
                      type="number"
                      value={alertQty}
                      className="form-control"
                      id="billinginfo-email"
                      placeholder="Enter Alert Quantity"
                      onChange={(e) => setAlertQty(e.target.value)}
                    />
                    {errors.alertQty && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginLeft: "5px",
                        }}
                      >
                        {errors.alertQty}
                      </p>
                    )}
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
                  onClick={(e) => forEditStockItem(e)}
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

export default CreateNFT;
