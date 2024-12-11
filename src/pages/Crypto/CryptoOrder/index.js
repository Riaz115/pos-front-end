import React, { useState } from "react";
import { Container, Row } from "reactstrap";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import logoLight from "../../../../src/assets/images/logo-light.png";

const CryproOrder = () => {
  const [startAmount, setStartAmount] = useState("");

  //this is for getting data from my custome hook
  const { restData, myUrl } = UseRiazHook();

  console.log("rest data", restData);

  const handleDayStart = () => {
    if (!startAmount) {
      alert("Please enter the start amount!");
      return;
    }
    console.log("Day started with amount:", startAmount);
    alert(`Day started with amount: ${startAmount}`);
  };
  return (
    <React.Fragment>
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          color: "#fff",
          padding: "40px 20px",
        }}
      >
        <img
          src={restData.restLogo}
          alt="Restaurant Logo"
          style={{
            width: "50%",
            maxWidth: "300px",
            height: "auto",
            // maxHeight: "250px",
            marginBottom: "20px",
            padding: "20px 10px",
          }}
        />
        <h1
          style={{ marginBottom: "40px", fontSize: "32px", fontWeight: "bold" }}
        >
          {restData.restName}
        </h1>
        <div style={{ width: "100%", maxWidth: "400px", marginBottom: "20px" }}>
          <label htmlFor="startAmount" style={{ marginBottom: "10px" }}>
            Enter Start Amount
          </label>
          <input
            id="startAmount"
            type="number"
            className="form-control"
            placeholder="Enter amount"
            value={startAmount}
            onChange={(e) => setStartAmount(e.target.value)}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid #fff",
              marginBottom: "10px",
            }}
          />
        </div>
        <button
          className="btn btn-lg btn-light"
          onClick={handleDayStart}
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
          }}
        >
          Open Restaurent
        </button>
      </div>
    </React.Fragment>
  );
};

export default CryproOrder;
