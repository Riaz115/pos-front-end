import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";

const BreadCrumb = ({
  dine,
  takeAway,
  delivery,
  runing,
  merge,
  transfar,
  kot,
  invoiceText,
  catagoryText,
  allItemsText,
  settlementText,
  permissionsText,
  rolesText,
}) => {
  const location = useLocation();
  const allowedPaths = [
    "/all-tables-etc",
    "/dine",
    "/take-away",
    "/runing",
    "/delivery",
  ];

  const showButtons = allowedPaths.includes(location.pathname);

  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-title-box d-sm-flex align-items-center justify-content-between ">
            <div className="d-flex align-items-center justify-content-between">
              <h4>{kot}</h4>
              <h4>{catagoryText}</h4>
              <h4>{allItemsText}</h4>
              <h4>{invoiceText}</h4>
              <h4>{settlementText}</h4>
              <h4>{permissionsText}</h4>
              <h4>{rolesText}</h4>

              {showButtons && (
                <>
                  {" "}
                  <Link
                    to="/dine"
                    className="py-1 px-3 mx-1  text-white  text-decoration-none"
                    style={{ backgroundColor: " #FD5432" }}>
                    {dine}
                  </Link>
                  <Link
                    to="/take-away"
                    className="py-1 px-3 mx-1  text-white text-decoration-none"
                    style={{ backgroundColor: "#7487DE" }}>
                    {takeAway}
                  </Link>
                  <Link
                    to="/delivery"
                    className="py-1 px-3 mx-1  text-white   text-decoration-none"
                    style={{ backgroundColor: "#45A14E" }}>
                    {delivery}
                  </Link>
                  <Link
                    to="/runing"
                    className="py-1 px-3 mx-1  text-white  text-decoration-none"
                    style={{ backgroundColor: " #FE9900" }}>
                    {runing}
                  </Link>
                </>
              )}
            </div>

            <div className="page-title-right d-flex">
              {showButtons && (
                <>
                  <Link
                    className="py-1 px-3 mx-1  text-white  text-decoration-none"
                    style={{ backgroundColor: " #FD5432" }}>
                    {merge}
                  </Link>

                  <Link
                    className="py-1 px-3 mx-1  text-white   text-decoration-none"
                    style={{ backgroundColor: " #FE9900" }}>
                    {transfar}
                  </Link>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BreadCrumb;
