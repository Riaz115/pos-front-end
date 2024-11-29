import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import { toast } from "react-toastify";

const ProjectOverview = () => {
  const [counters, setCounters] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const [allTables, setAllTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState("");
  const [targetTableId, setTargetTableId] = useState("");
  const [forAllAreas, setForAllAreas] = useState([]);

  //this is for getting from my custome hook
  const { myUrl, restId, token } = UseRiazHook();

  //this is for navigate
  const navigate = useNavigate();

  //this is for getting id of table and kot id
  const { counterid } = useParams();

  //this is for get counters
  const forGetAllCountersofRestaurent = async () => {
    const url = `${myUrl}/getAllCountersofRestaurent/${restId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setCounters(data.counters);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get all counters of the restauret function",
        err
      );
    }
  };

  //this is for call only once time
  useEffect(() => {
    forGetAllCountersofRestaurent();
  }, []);

  //this is for get all counter areas
  const forGetAllTablesOfRestaurent = async () => {
    const url = `${myUrl}/forget/all/tables/${restId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setAllTables(data.allTables);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get all tables areas function", err);
    }
  };
  //this is for get all counter areas
  const forGetAllCounterAreas = async () => {
    const url = `${myUrl}/forallcounterareas/get/all`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        setAllAreas(data.allAreas);
      } else {
        console.log("err data", data.allAreas);
      }
    } catch (err) {
      console.log("there is error in the get all counter areas function", err);
    }
  };

  //this is for controll rendering of the all counter areas
  useEffect(() => {
    forGetAllCounterAreas();
    forGetAllTablesOfRestaurent();
  }, []);

  //this is for select table previous
  const handleSelection = (tableId) => {
    setSelectedTableId(tableId);
  };

  //this is for select table target
  const handleTargetTableSelect = (id) => {
    setTargetTableId(id);
  };

  //this is for get all counter areas
  const forGetAllCounterAreasOfCounter = async () => {
    const url = `${myUrl}/getforallcounterareas/${counterid}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        setForAllAreas(data.counterAllArea);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get all counter areas function", err);
    }
  };

  //this is for control rendering of getting all tables
  useEffect(() => {
    forGetAllCounterAreasOfCounter();
  }, []);

  //this is for catch error
  const forCatchErrors = () => {
    let isOK = true;
    if (!selectedTableId.trim()) {
      isOK = false;
      toast.error("please select table for transfar");
    } else if (!targetTableId.trim()) {
      isOK = false;
      toast.error("please select table to  transfar the previous table data");
    }

    return isOK;
  };

  //this is for merg table
  const forMergTableToAnotherTable = async () => {
    if (forCatchErrors()) {
      const url = `${myUrl}/transfar/merg/table/${selectedTableId}/${targetTableId}/save/anothertable`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          console.log("ok data", data);
          toast.success(data.msg);
          navigate(`/area/${counterid}/tables`);
        } else {
          console.log("err data", data);
          toast.error(data.msg);
        }
      } catch (err) {
        console.log("there is error in the tranfar kot or item function", err);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="p-0">
            <Col lg={6}>
              <Row>
                <div className="col-8">
                  <Row className="my-3">
                    <h6>Select table to Merge</h6>
                    {forAllAreas.map((areaItem, areaIndex) => {
                      const allRuningTables = allTables.filter(
                        (table) =>
                          table?.counterArea?.id === areaItem._id &&
                          table.currentOrder.status === "running"
                      );

                      return allRuningTables.map((item, index) => (
                        <Col
                          key={index}
                          md={4}
                          sm={6}
                          className="text-center my-0 mx-0 px-1"
                        >
                          <div
                            className="py-2 px-0 w-100"
                            style={{
                              color: "white",
                              marginBottom: "3px",
                              backgroundColor:
                                selectedTableId === item._id
                                  ? "#1A1A1D"
                                  : "#FE9900",
                            }}
                          >
                            <input
                              type="radio"
                              className="me-2 p-0"
                              id={`table-${item._id}`}
                              checked={selectedTableId === item._id}
                              onChange={() => handleSelection(item._id)}
                            />
                            <label
                              className="m-0 p-0"
                              htmlFor={`table-${item._id}`}
                            >
                              Table {item.tableNo}
                            </label>
                          </div>
                        </Col>
                      ));
                    })}
                  </Row>
                </div>
              </Row>
            </Col>

            <Col lg={6}>
              <div className="col-8">
                <Row className="my-3">
                  <h6>Select table to Merge with TAble</h6>
                  {counters.map((counterItem, counterIndex) => {
                    const filteredAreas = allAreas.filter(
                      (area) => area?.counter?.id === counterItem._id
                    );

                    return filteredAreas.map((areaItem, areaIndex) => {
                      const filteredTables = allTables.filter(
                        (table) =>
                          table?.counterArea?.id === areaItem._id &&
                          table.currentOrder.status === "running" &&
                          table._id !== selectedTableId
                      );

                      return filteredTables.map((tableItem, tableIndex) => (
                        <>
                          <Col
                            key={tableIndex}
                            md={4}
                            sm={6}
                            className="text-center my-0 mx-0 px-1"
                          >
                            <div
                              className="py-2 px-0 w-100"
                              style={{
                                marginBottom: "3px",
                                color: "white",
                                backgroundColor:
                                  targetTableId === tableItem._id
                                    ? "#432E54"
                                    : "#2C76FF",
                              }}
                            >
                              <input
                                type="radio"
                                className="me-2 p-0"
                                checked={targetTableId === tableItem._id}
                                onChange={() =>
                                  handleTargetTableSelect(tableItem._id)
                                }
                              />
                              <label className="m-0 p-0" htmlFor="target table">
                                Table {tableItem.tableNo}
                              </label>
                            </div>
                          </Col>
                        </>
                      ));
                    });
                  })}
                </Row>
              </div>
            </Col>

            <Col sm={12}>
              <div
                className="d-flex align-items-center  justify-content-between mt-1 "
                style={{ backgroundColor: "#E2DAD9" }}
              >
                <div className="d-flex " style={{ backgroundColor: "#E2DAD9" }}>
                  <button
                    onClick={forMergTableToAnotherTable}
                    style={{
                      backgroundColor: "#E84743",
                      color: "white",
                      textDecoration: "none",
                      textAlign: "center",
                      border: "none",
                    }}
                    className="px-4 py-2 border-none"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProjectOverview;
