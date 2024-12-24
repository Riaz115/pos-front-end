import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  Button,
  Input,
  Label,
} from "reactstrap";
import { SimplePie } from "./PieCharts";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import CountUp from "react-countup";
import { UseRiazHook } from "../../../../RiazStore/RiazStore";

const PieCharts = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [ncCollection, setNcCollection] = useState(0);
  const [unBilledAmount, setUnBilledAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [parcelCharges, setParcelCharges] = useState(0);
  const [billedAmount, setBilledAmount] = useState(0);
  const [newBilledAmount, setNewBilledAmount] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [myAllItems, setMyAllItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [runningDayData, setRunningDayData] = useState(null);

  //this is for getting data from the use riaz hook
  const { restId, myUrl, restData, dayId, token } = UseRiazHook();

  //this is for calculation i.e total amount etc
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all data in parallel
        const [ordersResponse, tablesResponse, kotsResponse] =
          await Promise.all([
            fetch(`${myUrl}/get/${restId}/restaurent/all/orders`),
            fetch(`${myUrl}/forget/all/tables/${restId}`),
            fetch(`${myUrl}/get/${restId}/restaurent/all/delivered/kots`),
          ]);

        const ordersData = await ordersResponse.json();
        const tablesData = await tablesResponse.json();
        const kotsData = await kotsResponse.json();

        if (ordersResponse.ok && tablesResponse.ok && kotsResponse.ok) {
          // Process today's orders
          const today = new Date().toISOString().split("T")[0];
          const todaysOrders = ordersData.myFilterOrders.filter((order) =>
            order.createdAt.startsWith(today)
          );

          const totalBilled = todaysOrders
            .filter((order) => order.isNoCharge !== "yes")
            .reduce(
              (sum, order) =>
                sum +
                (order.credit
                  ? order.totalAmount - order.credit
                  : order.totalAmount || 0),
              0
            );

          const totalNoCharge = todaysOrders
            .filter((order) => order.isNoCharge === "yes")
            .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

          const totalDiscount = todaysOrders.reduce(
            (sum, order) => sum + (order.discount || 0),
            0
          );

          const forTotalCredit = todaysOrders.reduce(
            (sum, order) => sum + (order?.credit || 0),
            0
          );

          const forParcleChargesCount = todaysOrders.reduce(
            (sum, order) => sum + (order.parcel || 0),
            0
          );

          setBilledAmount(totalBilled);
          setNcCollection(totalNoCharge);
          setTotalDiscount(totalDiscount);
          setParcelCharges(forParcleChargesCount);
          setTotalCredit(forTotalCredit);

          // Process tables for unbilled amounts
          const runningAndInvoicedTables = tablesData.allTables.filter(
            (table) =>
              table.currentOrder.status === "running" ||
              table.currentOrder.status === "invoiced"
          );

          const totalUnbilled = runningAndInvoicedTables.reduce(
            (sum, table) => sum + (table.currentOrder.remainAmount || 0),
            0
          );

          const totalPaid = runningAndInvoicedTables.reduce(
            (sum, table) => sum + (table.currentOrder.paidAmount || 0),
            0
          );

          setUnBilledAmount(totalUnbilled);
          setNewBilledAmount(totalBilled + totalPaid);

          // Collect KOT IDs from today's orders
          const kotIdsSet = new Set(
            todaysOrders.flatMap((order) => order.kots)
          );

          // Filter KOTs based on collected KOT IDs
          const filteredKots = kotsData.allKots.filter((kot) =>
            kotIdsSet.has(kot._id)
          );

          // Calculate totalQuantity and totalSale for each item
          let allItemsData = {};
          filteredKots.forEach((kot) => {
            kot.orderItems.forEach((item) => {
              const itemId = item.id;
              if (!allItemsData[itemId]) {
                allItemsData[itemId] = {
                  name: item.name,
                  totalQuantity: 0,
                  price: item.price,
                  totalSale: 0,
                };
              }
              allItemsData[itemId].totalQuantity += item.quantity;
              allItemsData[itemId].totalSale += item.quantity * item.price;
            });
          });

          const itemsArray = Object.values(allItemsData);
          setMyAllItems(itemsArray);

          // Calculate final total amount
          const calculatedTotalAmount =
            totalBilled +
            totalUnbilled +
            forTotalCredit +
            totalNoCharge +
            totalPaid;
          setTotalAmount(calculatedTotalAmount);
        } else {
          console.error("Error in API responses");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //this is for getting running day data
  //this isfor getting of running day data
  const forGettingRunningDayData = async () => {
    const url = `${myUrl}/restaurent/${restId}/get/data/ofrunningday/${dayId}/rest`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setRunningDayData(data.runningDay);
      } else {
        consol.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the getting all data of running day function",
        err
      );
    }
  };

  //this is for control rendering of getting data
  useEffect(() => {
    forGettingRunningDayData();
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col md={6} className="mb-3">
            <h3> {restData?.restName} Dashboard</h3>
          </Col>
          <Col md={6} className="mb-3">
            <div className="input-group">
              <Flatpickr
                className="form-control"
                id="datepicker-publish-input"
                placeholder="Select date or search"
                options={{
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "d.m.y",
                }}
              />

              {/* Search button */}
              <Button
                className="add-btn primary text-white px-3 py-2 border-none"
                id="create-btn"
              >
                <i className="ri-search-line align-bottom me-1"></i>
                search
              </Button>
            </div>
          </Col>
          <Col lg={4}>
            <Card className="card-animate card-height-100">
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="fw-semibold text-muted mb-0">
                      Total Collection
                    </h5>
                    <h1 className="mt-4 ff-secondary fw-bold">
                      <CountUp start={0} end={totalAmount} duration={3} />
                    </h1>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="card-animate card-height-100">
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="fw-semibold text-muted mb-0">
                      Unbilled Amount
                    </h5>
                    <h1 className="mt-4 ff-secondary fw-bold">
                      <CountUp start={0} end={unBilledAmount} duration={3} />
                    </h1>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="card-animate card-height-100">
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="fw-semibold text-muted mb-0">
                      Billed Amount
                    </h5>
                    <h1 className="mt-4 ff-secondary fw-bold">
                      <CountUp start={0} end={newBilledAmount} duration={3} />
                    </h1>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="card-animate card-height-100">
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="fw-semibold text-muted mb-0">
                      NC Collection
                    </h5>
                    <h1 className="mt-4 ff-secondary fw-bold">
                      <CountUp start={0} end={ncCollection} duration={3} />
                    </h1>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="card-animate card-height-100">
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="fw-semibold text-muted mb-0">
                      Total Discount
                    </h5>
                    <h1 className="mt-4 ff-secondary fw-bold">
                      <CountUp start={0} end={totalDiscount} duration={3} />
                    </h1>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="card-animate card-height-100 ">
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="fw-semibold text-muted mb-0">
                      Parcel Charges
                    </h5>
                    <h1 className="mt-4 ff-secondary fw-bold">
                      <CountUp start={0} end={parcelCharges} duration={3} />
                    </h1>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="card-animate card-height-100 ">
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="fw-semibold text-muted mb-0">
                      Today Credit
                    </h5>
                    <h1 className="mt-4 ff-secondary fw-bold">
                      <CountUp start={0} end={totalCredit} duration={3} />
                    </h1>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="card-animate card-height-100 ">
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="fw-semibold text-muted mb-0">
                      Recovered Credit
                    </h5>
                    <h1 className="mt-4 ff-secondary fw-bold">
                      <CountUp
                        start={0}
                        end={runningDayData?.creditRecovered}
                        duration={3}
                      />
                    </h1>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl={12}>
            <Card>
              <CardBody>
                <SimplePie />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="my-2">
          <Row>
            <Col xl={12}>
              <div className="table-responsive">
                <Table className="table-dark table-striped table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th className="text-center" scope="col">
                        ID
                      </th>
                      <th className="text-center" scope="col">
                        Name
                      </th>
                      <th className="text-center" scope="col">
                        Quantity
                      </th>
                      <th className="text-center" scope="col">
                        Price
                      </th>
                      <th className="text-center" scope="col">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          Please wait, loading items...
                        </td>
                      </tr>
                    ) : myAllItems.length !== 0 ? (
                      myAllItems.map((item, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{item.name}</td>
                          <td className="text-center">{item.totalQuantity}</td>
                          <td className="text-center">{item.price}</td>
                          <td className="text-center">{item.totalSale}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center my-2">
                          <h3>There are no items sale today</h3>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default PieCharts;
