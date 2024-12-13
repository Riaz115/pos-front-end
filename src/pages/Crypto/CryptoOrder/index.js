import React, { useState } from "react";
import { UseRiazHook } from "../../../RiazStore/RiazStore";
import { toast } from "react-toastify";

const CryproOrder = () => {
  const [restOpeningAmount, setRestOpeningAmount] = useState(0);

  //this is for getting data from my custome hook
  const { restData, myUrl, restId, token } = UseRiazHook();

  //this is for start day of restaurent
  const startRestaurentDayOrOpen = async () => {
    if (!restOpeningAmount || restOpeningAmount === 0) {
      toast.error("please Enter restaurent opening amount");
      return;
    }
    const dayOPenData = {
      restOpeningAmount,
    };
    const url = `${myUrl}/restaurent/${restId}/open/day/start`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(dayOPenData),
    };

    try {
      const respone = await fetch(url, options);
      const data = await respone.json();
      if (respone.ok) {
        console.log("okk data", data);
        toast.success(data.msg);
      } else {
        console.log("err data", data);
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("there is error in the day open restaurent funtion", err);
    }
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
            Enter Opening Amount
          </label>
          <input
            id="startAmount"
            type="number"
            className="form-control"
            placeholder="Enter amount"
            value={restOpeningAmount}
            onChange={(e) => setRestOpeningAmount(e.target.value)}
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
          onClick={startRestaurentDayOrOpen}
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
