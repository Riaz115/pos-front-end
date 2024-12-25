import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { UseRiazHook } from "../../../../RiazStore/RiazStore";

const SimplePie = () => {
  const [orders, setAllOrders] = useState([]);

  //this is for getting data from my hook
  const { myUrl, restId, dayId, token } = UseRiazHook();

  const forGettingRestaurentAllOrders = async () => {
    const allOrdersUrl = `${myUrl}/get/${restId}/restaurent/all/orders`;
    const runDayUrl = `${myUrl}/restaurent/${restId}/get/data/ofrunningday/${dayId}/rest`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    try {
      // Fetching all orders
      const allOrdersResponse = await fetch(allOrdersUrl, options);
      const allOrdersData = await allOrdersResponse.json();

      // Fetching running day data
      const runDayResponse = await fetch(runDayUrl, options);
      const runDayData = await runDayResponse.json();

      if (allOrdersResponse.ok && runDayResponse.ok) {
        // Running day ka startDateTime nikalna
        const startDateTime = new Date(runDayData.runningDay.startDateTime);

        // Running day ke orders filter karna
        const todaysOrders = allOrdersData?.myFilterOrders?.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate > startDateTime;
        });

        setAllOrders(todaysOrders);
      } else {
        // Error handling for responses
        if (!allOrdersResponse.ok) {
          console.log("Error fetching all orders:", allOrdersData);
        }
        if (!runDayResponse.ok) {
          console.log("Error fetching running day data:", runDayData);
        }
      }
    } catch (err) {
      console.error(
        "Error in fetching all restaurant orders or running day data:",
        err
      );
    }
  };

  useEffect(() => {
    forGettingRestaurentAllOrders();
  }, [restId]);

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

export { SimplePie };
