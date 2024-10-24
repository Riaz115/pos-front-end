import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../Components/Common/ChartsDynamicColor";

const SimplePie = ({ dataColors }) => {
  var chartPieBasicColors = getChartColorsArray(dataColors);
  const series = [44, 35, 23, 43, 32];
  var options = {
    chart: {
      height: 300,
      type: "pie",
    },
    labels: ["Cash", "Card", "UPI", "PayTM", "JazzCash"],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    colors: chartPieBasicColors,
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
