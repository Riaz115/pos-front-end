import React, { useEffect, useState, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  CardHeader,
  Input,
  Label,
  Table,
} from "reactstrap";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import { useParams } from "react-router-dom";
import Pagination from "../../../Components/Common/Pagination";
import Loader from "../../../Components/Common/Loader";
import Flatpickr from "react-flatpickr";

const IconBoxicons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allVoidedItems, setAllVoidedItems] = useState([]);
  const [allFilteredVoidedItems, setAllFilteredvoidedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  //this is for getting rest id form url
  const { id } = useParams();

  //this is for getting data from my custome hoon
  const { myUrl, token, formatDateTime, restData } = UseRiazHook();

  //this is for pagination
  const perPageData = 10;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  //this is for page current data
  const currentdata = useMemo(
    () => allVoidedItems?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  //this is for first time load and set data
  useEffect(() => {
    setAllFilteredvoidedItems(allVoidedItems.slice(0, perPageData));
  }, [allVoidedItems]);

  //this is for set current data of page
  useEffect(() => {
    setAllFilteredvoidedItems(currentdata);
  }, [currentdata]);

  //this is for search from menu items
  const OnchangeHandler = (e, type) => {
    let search;
    if (type === "date") {
      search = e[0]?.toLocaleDateString("en-GB");
      if (search) {
        const filteredByDate = allVoidedItems.filter((item) => {
          const invoiceDate = new Date(item.createdAt).toLocaleDateString(
            "en-GB"
          );
          return invoiceDate === search;
        });
        setAllFilteredvoidedItems(filteredByDate.slice(0, perPageData));
      }
    } else if (type === "name") {
      search = e.target.value;
      const filteredUsers = allVoidedItems.filter((item) =>
        item?.name?.toString().includes(search)
      );
      setAllFilteredvoidedItems(filteredUsers);
    } else if (type === "invoice") {
      search = e.target.value;
      const filteredUsers = allVoidedItems.filter((item) =>
        item?.invoiceNumber?.toString().includes(search)
      );
      setAllFilteredvoidedItems(filteredUsers);
    } else {
      setAllFilteredvoidedItems(allVoidedItems);
    }
  };

  //this is for date formate
  const dateFormatMapper = (format) => {
    switch (format) {
      case "D/M/Y":
        return "d/m/Y";
      case "M/D/Y":
        return "m/d/Y";
      case "Y/M/D":
        return "Y/m/d";
      default:
        return "d/m/Y";
    }
  };

  //this is for getting all void items
  const forGettingAllVoidItems = async () => {
    setLoading(true);
    const url = `${myUrl}/restaurent/${id}/all/void/items`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllVoidedItems(data);
        setAllFilteredvoidedItems(data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(
        "there is error in the getting all voided items function",
        err
      );
    }
  };

  //this is for controll rendering
  useEffect(() => {
    forGettingAllVoidItems();
  }, []);
  return (
    <React.Fragment>
      <div className="page-content">
        <Col sm={12}>
          <div className="d-flex align-items-center justify-content-between mt-0 ">
            <div>
              <h5>All Voided Items</h5>
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
              <Label for="kotDate" style={{ fontWeight: "bold" }}>
                Invoice Date
              </Label>
              <Flatpickr
                className="form-control"
                id="datepicker-publish-input"
                placeholder="Select date or search"
                onChange={(e) => OnchangeHandler(e, "date")}
                options={{
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: dateFormatMapper(restData?.dateFormate),
                }}
              />
            </Col>
            <Col md={4} xs={12} className="mb-3">
              <Label for="additionalInfo" style={{ fontWeight: "bold" }}>
                Invoice Number
              </Label>
              <Input
                type="text"
                onChange={(e) => OnchangeHandler(e, "invoice")}
                id="additionalInfo"
                placeholder="Enter Item Invoice Number"
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
                      <th>Date</th>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Reason</th>
                      <th>Invoice No</th>
                      <th>Kot Number</th>
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
                      allFilteredVoidedItems?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {formatDateTime(
                              item?.createdAt,
                              restData?.dateFormate,
                              restData?.selectedTimezone
                            )}
                          </td>
                          <td>{item?.name}</td>
                          <td>{item?.quantity}</td>
                          <td>{item?.reason}</td>
                          <td>{item?.invoiceNumber}</td>
                          <td>{item?.kotNumber}</td>
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
            data={allVoidedItems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default IconBoxicons;
