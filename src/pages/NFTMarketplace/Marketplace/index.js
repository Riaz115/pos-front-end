import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import { toast } from "react-toastify";

const Marketplace = () => {
  const [userAllResturents, setUserAllResturents] = useState([]);

  //this is for getting data from the hook
  const { myUrl, token, setRestId, forGettingAllGuests } = UseRiazHook();

  //this is for get users all restaurents
  const forGetUserAllRestaurents = async () => {
    const url = `${myUrl}/getUserAllRestaurents`;
    const options = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setUserAllResturents(data);
      } else {
        console.log("some error", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get user all restaurents function",
        err
      );
    }
  };

  //this is for getting all resturents
  useEffect(() => {
    forGetUserAllRestaurents();
  }, []);

  //this is for rest id
  const forGetRestId = (id) => {
    localStorage.setItem("restid", id);
    setRestId(id);
    forGettingAllGuests();
  };

  //this is for delete restaurent
  const forDeleteRestaurent = async (id) => {
    const url = `${myUrl}/delete/${id}/restaurent`;
    const options = {
      method: "DELETE",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg);
        forGetUserAllRestaurents();
      } else {
        console.log("err data", data);
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("there is error in the delete restaurent function", err);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <div className="d-lg-flex align-items-center mb-4">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-0 fw-bold fs-17">
                    All Restaurents
                  </h5>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="row-cols-xl-3  row-cols-md-2 row-cols-1">
            {userAllResturents.map((item, key) => (
              <Col key={key}>
                <Card>
                  <img
                    src={item.restLogo}
                    alt=""
                    className="card-img-top object-fit-cover"
                    height="120"
                  />
                  <CardBody className="text-capitalize">
                    <img
                      src={item.restLogo}
                      alt=""
                      className="avatar-md mt-n5 rounded-circle mx-auto d-block object-fit-cover"
                    />
                    <h5 className="my-3 ">{item.restName}</h5>
                    <p
                      className="text-muted my-2"
                      style={{ fontSize: "16px", color: "black" }}
                    >
                      {item.restEmail}
                    </p>
                    <p className="text-muted my-2 ">{item.restAddress}</p>
                    <div className="d-flex align-items-center justify-content-center  my-3">
                      <Link
                        to={`/restaurent/${item._id}/restdata`}
                        onClick={() => forGetRestId(item._id)}
                        className="btn btn-primary btn-smn py-1 px-4  mx-2"
                      >
                        Open
                      </Link>

                      <Link
                        to={`/edit-restaurent/${item._id}`}
                        className="btn btn-success py-1 px-4 btn-sm mx-2"
                      >
                        Edit
                      </Link>

                      <Link
                        to="#"
                        onClick={() => forDeleteRestaurent(item._id)}
                        className="btn btn-primary btn-smn py-1 px-4  mx-2"
                      >
                        Delete
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Marketplace;
