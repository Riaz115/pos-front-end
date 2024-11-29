import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Input,
  Table,
  Label,
  Form,
} from "reactstrap";

import { UseRiazHook } from "../../../RiazStore/RiazStore";
import { useParams } from "react-router-dom";
import Pagination from "../../../Components/Common/Pagination";

const DashboardCrypto = () => {
  const [allGuests, setAllGuests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allFilterGuest, setAllFitlerGuest] = useState([]);

  //this is for getting rest id
  const { id } = useParams();

  //this is for getting all guests data
  const forGettingAllGuests = async () => {
    const url = `${myUrl}/forgetall/${id}/guests`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllGuests(data.guests);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get all restaurent guest function",
        err
      );
    }
  };

  //this is for controll rendering of all all guest getting data function
  useEffect(() => {
    forGettingAllGuests();
  }, [id]);

  //this is show for guest
  const {
    editGuestChangeState,
    addGuestChangeState,
    setGuestId,
    myUrl,
    forDeleteGuest,
  } = UseRiazHook();

  //this is for pagination
  const perPageData = 10;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  //this is for page current data
  const currentdata = useMemo(
    () => allGuests?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  //this is for first time load and set data
  useEffect(() => {
    setAllFitlerGuest(allGuests.slice(0, perPageData));
  }, [allGuests]);

  //this is for set current data of page
  useEffect(() => {
    setAllFitlerGuest(currentdata);
  }, [currentdata]);

  //this is for search from guests
  const OnchangeHandler = (e) => {
    let search = e.target.value;
    if (search) {
      const filteredUsers = allGuests.filter((data) =>
        Object.values(data).some(
          (field) =>
            typeof field === "string" &&
            field.toLowerCase().includes(search.toLowerCase())
        )
      );
      setAllFitlerGuest(filteredUsers.slice(0, perPageData));
      setCurrentPage(1);
    } else {
      setAllFitlerGuest(allGuests.slice(indexOfFirst, indexOfLast));
    }
  };

  //this is for click on edit button
  const forClickOnEditBtn = (id) => {
    editGuestChangeState(true);
    localStorage.setItem("guestid", id);
    setGuestId(id);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="bg-light-dark mt-2 mb-4">Manage Guest</h5>
              <div>
                <Button
                  className="add-btn btn-warning text-white px-3 me-2 py-2 border-none"
                  id="create-btn"
                >
                  <i className="ri-download-line align-bottom me-1"></i>
                  Export to excel
                </Button>
                <Button
                  className="add-btn bg-dark text-white px-3 py-2 border-none"
                  onClick={addGuestChangeState}
                  id="create-btn"
                >
                  <i className="ri-add-line align-bottom me-1"></i> Add Guest
                </Button>
              </div>
            </div>
            <hr></hr>

            <Form>
              <Row>
                <Col md={6} xs={12} className="mb-3">
                  <Label for="kotType" style={{ fontWeight: "bold" }}>
                    Mobile No
                  </Label>
                  <Input
                    type="number"
                    id="kotType"
                    onChange={(e) => OnchangeHandler(e)}
                    placeholder="Enter mobile number"
                  />
                </Col>

                <Col md={6} xs={12} className="mb-3">
                  <Label for="additionalInfo" style={{ fontWeight: "bold" }}>
                    Name
                  </Label>
                  <Input
                    type="text"
                    onChange={(e) => OnchangeHandler(e)}
                    id="additionalInfo"
                    placeholder="Enter name"
                  />
                </Col>
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
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Mobile no</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {allFilterGuest.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.gender}</td>
                    <td>{item.address}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>
                      <div className="hstack gap-3 flex-wrap">
                        <button
                          onClick={() => forClickOnEditBtn(item._id)}
                          className="btn btn-sm btn-soft-info edit-list text-info edit-btn"
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#E6F7FC",
                          }}
                        >
                          <i className="ri-pencil-fill align-bottom" />
                        </button>
                        <button
                          onClick={() => forDeleteGuest(item._id)}
                          className="btn btn-sm btn-soft-danger remove-list delete-btn"
                          style={{
                            padding: "4px 8px",

                            backgroundColor: "#FEEDE9",
                            color: "red",
                          }}
                        >
                          <i className="ri-delete-bin-5-fill align-bottom" />
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
              data={allGuests}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardCrypto;
