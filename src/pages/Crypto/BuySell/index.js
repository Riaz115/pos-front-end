import React, { useEffect, useMemo, useState } from "react";
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
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Pagination from "../../../Components/Common/Pagination";
import Select from "react-select";
import { UseRiazHook } from "../../../RiazStore/RiazStore";

const BuySell = () => {
  const [allKots, setAllKots] = useState([]);
  const [myAllFilteredKots, setMyAllFilterKots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableType, setTableType] = useState("");

  //this is for getting data from my hook
  const { myUrl, restId, restData, formatAmount } = UseRiazHook();

  //this is for pagination
  const perPageData = 50;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  //this is for page current data
  const currentdata = useMemo(
    () => allKots?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  //this is for first time load and set data
  useEffect(() => {
    setMyAllFilterKots(allKots.slice(0, perPageData));
  }, [allKots]);

  //this is for set current data of page
  useEffect(() => {
    setMyAllFilterKots(currentdata);
  }, [currentdata]);

  //this is for search
  const OnchangeHandler = (e, type) => {
    let value;

    if (type === "date") {
      value = e[0]?.toLocaleDateString("en-GB");

      if (value) {
        const filteredByDate = allKots.filter((kot) => {
          const kotDate = new Date(kot.createdAt).toLocaleDateString("en-GB");
          return kotDate === value;
        });
        setMyAllFilterKots(filteredByDate.slice(0, perPageData));
      }
    } else if (type === "table") {
      value = e.target.value;

      if (value) {
        const filteredByTable = allKots.filter((kot) =>
          kot.table?.toString().toLowerCase().includes(value.toLowerCase())
        );
        setMyAllFilterKots(filteredByTable.slice(0, perPageData));
      }
    } else if (type === "tableType") {
      value = e.target.value;

      if (value) {
        const filteredByTableType = allKots.filter((kot) =>
          kot.orderType?.toLowerCase().includes(value.toLowerCase())
        );
        setMyAllFilterKots(filteredByTableType.slice(0, perPageData));
      }
    } else if (type === "kotno") {
      value = e.target.value;

      if (value) {
        const filteredByTable = allKots.filter((kot) =>
          kot?.kotNo?.toString().toLowerCase().includes(value.toLowerCase())
        );
        setMyAllFilterKots(filteredByTable.slice(0, perPageData));
      }
    }

    if (!value) {
      setMyAllFilterKots(allKots.slice(indexOfFirst, indexOfLast));
    }

    setCurrentPage(1);
  };

  //this is for getting all delivered kots
  const forgettingAllKotsOfRestaurent = async () => {
    const url = `${myUrl}/get/${restId}/restaurent/all/delivered/kots`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        console.log("ok data", data.allKots);
        setAllKots(data.allKots);
        setMyAllFilterKots(data.allKots);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the getting all kots function", err);
    }
  };

  //this is for controll rendering of getting kots functon
  useEffect(() => {
    forgettingAllKotsOfRestaurent();
  }, []);

  //this is for the date and time formate
  const formatDateTime = (date, format, timezone) => {
    const d = new Date(date);

    // Convert the date to the selected timezone
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: timezone, // Use the selected timezone here
    };

    // Get the formatted date and time in the selected timezone
    const dateFormatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = dateFormatter.format(d);

    // Extract individual parts of the date and time
    const parts = formattedDate.split(", ");
    const datePart = parts[0]; // "12/11/2024"
    const timePart = parts[1]; // "10:21:59 AM"

    // Format the date based on the provided 'format' argument
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

    return `${finalFormattedDate} ${hour}:${minute} ${timePart.split(" ")[1]}`;
  };

  //this is for date formatter
  const dateFormatMapper = (format) => {
    switch (format) {
      case "D/M/Y":
        return "d/m/Y";
      case "M/D/Y":
        return "m/d/Y";
      case "Y/M/D":
        return "Y/m/d";
      default:
        return "d/m/Y"; // Default format
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb kot={`Manage KOTs of ${restData?.restName}`} />

          {/* Search Section */}
          <div className=" p-2 mt-1" style={{ backgroundColor: "#F3F3F9" }}>
            <Form>
              <Row>
                <Col md={3} xs={12} className="mb-3">
                  <Label for="kotType" style={{ fontWeight: "bold" }}>
                    Kot No
                  </Label>
                  <Input
                    type="text"
                    id="kotType"
                    onChange={(e) => OnchangeHandler(e, "kotno")}
                    placeholder="Enter table no"
                  />
                </Col>
                <Col md={3} xs={12} className="mb-3">
                  <Label for="kotDate" style={{ fontWeight: "bold" }}>
                    Kot Date
                  </Label>
                  <Flatpickr
                    className="form-control"
                    id="datepicker-publish-input"
                    placeholder="Select date or search"
                    onChange={(e) => OnchangeHandler(e, "date")}
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: dateFormatMapper(restData.dateFormate), // Dynamic date format
                    }}
                  />
                </Col>
                <Col md={3} xs={12} className="mb-3">
                  <Label for="kotType" style={{ fontWeight: "bold" }}>
                    Table No
                  </Label>
                  <Input
                    type="text"
                    id="kotType"
                    onChange={(e) => OnchangeHandler(e, "table")}
                    placeholder="Enter table no"
                  />
                </Col>
                <Col md={3} xs={12} className="mb-3">
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
                      Table Type
                    </Label>
                    <Select
                      value={tableType}
                      onChange={(selectedOption) => {
                        setTableType(selectedOption.value);
                        OnchangeHandler(
                          { target: { value: selectedOption.value } },
                          "tableType"
                        );
                      }}
                      options={[
                        { value: "dine-in", label: "Dine In" },
                        { value: "take-away", label: "Take Away" },
                        { value: "delivery", label: "Delivery" },
                      ]}
                      placeholder={tableType ? tableType : "select table type"}
                    />
                  </div>
                </Col>{" "}
              </Row>
            </Form>
          </div>

          <hr />

          {/* Table Section */}
          <div className="table-responsive mt-4">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Counter</th>
                  <th>table No</th>
                  <th>table Type</th>
                  <th>Captain</th>
                  <th>Total Items</th>
                  <th>Grand total</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {myAllFilteredKots.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.kotNo}</td>
                    <td>
                      {formatDateTime(
                        item?.createdAt,
                        restData?.dateFormate,
                        restData?.selectedTimezone
                      )}
                    </td>
                    <td>{item?.Counter?.name}</td>
                    <td>{item?.table}</td>
                    <td>{item?.orderType}</td>
                    <td>{item?.orderTaker}</td>
                    <td>{item?.totalItem}</td>
                    <td>{formatAmount(item?.grandTotal)}</td>
                    <td>
                      <div className="hstack gap-3 flex-wrap">
                        <button className="btn btn-sm btn-soft-info edit-list">
                          <i className="ri-printer-fill align-bottom" />{" "}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="my-3 p-3">
            <Pagination
              perPageData={perPageData}
              data={allKots}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BuySell;
