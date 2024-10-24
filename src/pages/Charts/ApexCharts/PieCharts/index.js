import React from "react";
import { Card, CardBody, Col, Container, Row, Table, Button } from "reactstrap";
import { SimplePie } from "./PieCharts";
import Flatpickr from "react-flatpickr";
import CountUp from "react-countup";

const PieCharts = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <div className="mb-3">
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
                id="create-btn">
                <i className="ri-search-line align-bottom me-1"></i>
                search
              </Button>
            </div>
          </div>
          <Col lg={4}>
            <Card className="card-animate card-height-100">
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="fw-semibold text-muted mb-0">
                      Total Collection
                    </h5>
                    <h1 className="mt-4 ff-secondary fw-bold">
                      <CountUp start={0} end={8324} duration={3} />
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
                      <CountUp start={0} end={2324} duration={3} />
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
                      <CountUp start={0} end={5324} duration={3} />
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
                      <CountUp start={0} end={1324} duration={3} />
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
                      <CountUp start={0} end={824} duration={3} />
                    </h1>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="card-animate card-height-100 ">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <p>Total Sale</p> <p>34,256</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p>Counter Sale</p> <p>22,256</p>
                </div>
                <div className="d-flex justify-content-between  align-items-center">
                  <p>Parcel Charges</p> <p> 256</p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl={12}>
            <Card>
              <CardBody>
                <SimplePie dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]' />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="my-2">
          <h1 className="my-2">Items</h1>
          <Row>
            <Col xl={12}>
              <div className="table-responsive">
                <Table className="table-dark table-striped table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Pizza Paratha</td>
                      <td>6</td>
                      <td>2345pkt</td>
                    </tr>
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
