import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  plugins,
  scales,
} from "chart.js/auto";
import { last7Days } from "../../lib/features";

const LineChart = ({ lineValue }) => {
  Chart.register(
    CategoryScale,
    Tooltip,
    Filler,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend
  );

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };
  const labels = last7Days();

  const data = {
    labels,
    datasets: [
      {
        data: lineValue || [],
        label: "messages",

        fill: true,
        backgroundColor: "rgba(75, 12, 192, 0.2)",
        bordercolor: "rgba(75, 12, 192, 1)",
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },

  cutout: 120,
};

const DoughnutChart = ({ labels = [], values = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        label: "Count",
        fill: true,
        backgroundColor: ["rgba(75, 12, 192, 0.2)", "orange"],
        bordercolor: "rgba(75, 12, 192, 1)",
        offset: 40,
      },
    ],
  };
  return <Doughnut data={data} options={doughnutChartOptions} />;
};

export { LineChart, DoughnutChart };
