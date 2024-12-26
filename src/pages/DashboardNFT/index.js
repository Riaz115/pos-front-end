import React, { useState, useEffect, useMemo } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Table,
  Form,
  Input,
  Label,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { UseRiazHook } from "../../RiazStore/RiazStore";
import Pagination from "../../Components/Common/Pagination";
import { toast } from "react-toastify";

const DashboardNFT = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [forMultiPaymentOpen, setForMultiPaymentOpen] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [payDetail, setPayDetail] = useState("");
  const [guestData, setGuestData] = useState({});
  const [guestid, setGuestId] = useState("");

  //this is for getting rest id
  const { id } = useParams();

  //this is show for guest
  const {
    allGuests,
    forGettingAllGuests,
    filteredGuest,
    setFilterGuests,
    restData,
    myUrl,
    token,
    dayId,
    formatAmount,
  } = UseRiazHook();

  //this is for controll rendering of all all guest getting data function
  useEffect(() => {
    forGettingAllGuests();
  }, [id]);

  //this is for pagination
  const perPageData = 50;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  //this is for page current data
  const currentdata = useMemo(
    () => allGuests?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  //this is for first time load and set data
  useEffect(() => {
    setFilterGuests(allGuests.slice(0, perPageData));
  }, [allGuests]);

  //this is for set current data of page
  useEffect(() => {
    setFilterGuests(currentdata);
  }, [currentdata]);

  //this is for search from guests
  const OnchangeHandler = (e, type) => {
    let search;
    if (type === "string") {
      search = e.target.value;
      const filteredUsers = allGuests.filter((data) =>
        Object.values(data).some(
          (field) =>
            typeof field === "string" &&
            field.toLowerCase().includes(search.toLowerCase())
        )
      );
      setFilterGuests(filteredUsers);
    } else if (type === "number") {
      search = e.target.value;
      const filteredUsers = allGuests.filter((guest) =>
        guest?.phone?.toString().includes(search)
      );
      setFilterGuests(filteredUsers);
    } else {
      setFilterGuests(allGuests);
    }
  };

  //this is for getting guest data
  const forGettingGuestData = async (id) => {
    const url = `${myUrl}/getforallorders/${id}/credit`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setGuestData(data.gusetOrderData);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the getting geust guest data function",
        err
      );
    }
  };

  //this is for paying credit amount of single invoice of guest
  const forClickOnPaymentMethod = async (type) => {
    const paymentData = {
      paymentMethod: type,
      amount: inputValue,
      detail: payDetail,
    };

    const url = `${myUrl}/forpay/multiorder/credit/${guestid}/guest/${dayId}/day`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(paymentData),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        forGettingGuestData(guestid);
        forGettingAllGuests();
        toast.success(data.msg);
        if (guestData?.totalCredit === 0) {
          setForMultiPaymentOpen(false);
        }
      } else {
        console.log("err data", err);
      }
    } catch (err) {
      console.log(
        "there is error in the pay single invoice credit of guest  function",
        err
      );
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb credit="Credit Book" />

          <Form>
            <Row>
              <Col md={6} xs={12} className="mb-3">
                <Label for="kotType" style={{ fontWeight: "bold" }}>
                  Mobile No
                </Label>
                <Input
                  type="number"
                  id="kotType"
                  onChange={(e) => OnchangeHandler(e, "number")}
                  placeholder="Enter mobile number"
                />
              </Col>

              <Col md={6} xs={12} className="mb-3">
                <Label for="additionalInfo" style={{ fontWeight: "bold" }}>
                  Name
                </Label>
                <Input
                  type="text"
                  onChange={(e) => OnchangeHandler(e, "string")}
                  id="additionalInfo"
                  placeholder="Enter name"
                />
              </Col>
            </Row>
          </Form>

          <hr />

          {/* Table Section */}
          <div className="table-responsive mt-4">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Guest name</th>
                  <th>Mobile number</th>
                  <th>Total Credit</th>
                  <th>All Pays </th>
                  <th>Detail</th>
                  <th>pay credit</th>
                </tr>
              </thead>

              <tbody>
                {filteredGuest.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{formatAmount(item?.totalCredit)}</td>
                    <td>
                      <Link
                        to={`/guest/${item._id}/credit/all/pays`}
                        className="btn btn-sm btn-soft-info edit-list  edit-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}
                      >
                        Check
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/creditbook/${item._id}/guest`}
                        className="btn btn-sm btn-soft-info edit-list  edit-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}
                      >
                        Detail
                      </Link>
                    </td>
                    <td>
                      <Link
                        onClick={() => {
                          forGettingGuestData(item._id);
                          setForMultiPaymentOpen(true);
                          setGuestId(item._id);
                        }}
                        className="btn btn-sm btn-soft-info edit-list  edit-btn"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#E6F7FC",
                        }}
                      >
                        Pay credit bill
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="my-3 p-3">
              <Pagination
                perPageData={perPageData}
                data={allGuests}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </Container>
      </div>

      {/* this is for multipayment */}
      {forMultiPaymentOpen && (
        <div
          className="d-flex align-items-center justify-content-center position-fixed"
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
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
              <p className="p-0 m-0 text-white">
                Payment credit amount of {guestData?.name}
              </p>
              <p
                className="m-0 p-2 color-dark cursor-pointer"
                onClick={() => setForMultiPaymentOpen(false)}
              >
                x
              </p>
            </div>
            <div className="px-2">
              <div className="m-0 py-1 px-0">
                <button
                  onClick={() => forClickOnPaymentMethod("cash")}
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
                  onClick={() => forClickOnPaymentMethod("card")}
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
                  onClick={() => forClickOnPaymentMethod("advance")}
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
                  onClick={() => forClickOnPaymentMethod("paytm")}
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
                  onClick={() => forClickOnPaymentMethod("check payment")}
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
                  onClick={() => forClickOnPaymentMethod("post to room")}
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
                  onClick={() => forClickOnPaymentMethod("upi")}
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
                        Credit Total
                      </p>
                    </div>
                    <div
                      className="p-2 w-75"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 " style={{ fontWeight: "600" }}>
                        {formatAmount(guestData?.totalCredit)}
                      </p>
                    </div>
                  </div>
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary">Amount</p>
                    </div>
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
                        placeholder="enter amount"
                        style={{
                          border: "1px solid #B3C8CF",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                  </div>

                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary">Return Amount</p>
                    </div>
                    <div
                      className="p-2 w-75"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                      }}
                    >
                      <input
                        type="text"
                        value={
                          guestData?.totalCredit
                            ? formatAmount(guestData?.totalCredit)
                            : ""
                        }
                        className="px-2 m-0"
                        style={{
                          border: "1px solid #B3C8CF",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderBottom: "1px solid #B3C8CF",
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary">Payment Detail</p>
                    </div>
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
                        placeholder="Enter payment Description..."
                      ></textarea>
                    </div>
                  </div>
                  <div className="p-0 w-100 d-flex">
                    <div
                      className="p-2 w-25"
                      style={{
                        borderRight: "1px solid #B3C8CF",
                      }}
                    >
                      <p className="p-0 m-0 text-secondary"></p>
                    </div>
                    <div className="p-0 w-75"></div>
                  </div>
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
                      {formatAmount(10)}
                    </button>
                    <button
                      onClick={() => setInputValue(20)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {formatAmount(20)}
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
                      {formatAmount(50)}
                    </button>
                    <button
                      onClick={() => setInputValue(100)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {formatAmount(100)}
                    </button>
                  </div>
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(200)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {formatAmount(200)}
                    </button>
                    <button
                      onClick={() => setInputValue(500)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {formatAmount(500)}
                    </button>
                  </div>
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(1000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {formatAmount(1000)}
                    </button>
                    <button
                      onClick={() => setInputValue(2000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {formatAmount(2000)}
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
                      {formatAmount(3000)}
                    </button>
                    <button
                      onClick={() => setInputValue(4000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {formatAmount(4000)}
                    </button>
                  </div>
                  <div
                    className="my-2 d-flex align-items-center "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => setInputValue(5000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {formatAmount(5000)}
                    </button>
                    <button
                      onClick={() => setInputValue(10000)}
                      style={{ border: "none", width: "140px" }}
                      className="bg-success py-2 mx-1 px-4 text-white"
                    >
                      {formatAmount(10000)}
                    </button>
                  </div>
                  <div
                    className="mt-2 mb-1 d-flex align-items-center  "
                    style={{ width: "300px" }}
                  >
                    <button
                      onClick={() => {
                        setForMultiPaymentOpen(false);
                      }}
                      style={{
                        border: "none",
                        width: "295px",
                        backgroundColor: "black",
                      }}
                      className="py-2 mx-1 px-4 text-white"
                    >
                      Close
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

export default DashboardNFT;
