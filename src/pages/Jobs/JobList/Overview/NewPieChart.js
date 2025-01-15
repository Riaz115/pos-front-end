import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { UseRiazHook } from "../../../../RiazStore/RiazStore";
import { useParams } from "react-router-dom";

const NewPieChart = ({ counterId }) => {
  const [orders, setAllOrders] = useState([]);

  //this is for getting data from my hook
  const { myUrl, restId } = UseRiazHook();

  const forGettingRestaurentAllOrders = async () => {
    const url = `${myUrl}/get/${restId}/restaurent/all/orders`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        const today = new Date().toISOString().split("T")[0];
        const todaysOrders = data.myFilterOrders.filter(
          (order) =>
            order.createdAt.startsWith(today) &&
            order?.counter?.id === counterId
        );
        setAllOrders(todaysOrders);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the getting all restaurent orders in dashboard file",
        err
      );
    }
  };

  useEffect(() => {
    forGettingRestaurentAllOrders();
  }, [counterId]);

  const paymentData = {};
  orders.forEach((order) => {
    // Validate paymentMethod before parsing
    if (order.paymentMethod) {
      try {
        const paymentMethods = JSON.parse(order.paymentMethod);
        paymentMethods.forEach(({ payMethod, amount }) => {
          if (!paymentData[payMethod]) {
            paymentData[payMethod] = 0;
          }
          paymentData[payMethod] += amount;
        });
      } catch (error) {
        console.error(
          "Error parsing paymentMethod:",
          order.paymentMethod,
          error
        );
      }
    }
  });

  const labels = Object.keys(paymentData);
  const series = Object.values(paymentData);
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A6",
    "#FFC300",
    "#C70039",
    "#900C3F",
    "#581845",
  ];

  const options = {
    chart: {
      height: 300,
      type: "pie",
    },
    labels,
    legend: {
      position: "bottom",
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    colors: colors.slice(0, labels.length),
  };

  return (
    <ReactApexChart
      dir="ltr"
      className="apex-charts"
      series={series}
      options={options}
      type="pie"
      height={300}
    />
  );
};

export { NewPieChart };
