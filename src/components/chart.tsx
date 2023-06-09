import React from "react";
import { Bar } from "react-chartjs-2";

interface ChartProps {
  data: number[];
  labels: string[];
}

const ChartComponent: React.FC<ChartProps> = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Data Chart",
        data: data,
        backgroundColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
