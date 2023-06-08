import { Layout, Section } from "../components/Layout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App: React.FC = () => {
  const [chartData, setChartData] = useState<any>({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState<any>({});

  useEffect(() => {
    setChartData({
      labels: ["a", "b", "c", "d", "e"],
      datasets: [
        {
          label: "Percentage",
          data: [56, 90, 65, 88, 45],
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Penilaian",
        },
      },
    });
  }, []);

  return (
    <Layout>
      <Section id="section-dashboard" addClass="flex flex-col items-center p-3">
        <div id="header" className="w-full h-[20%]">
          Header
        </div>
        <div className="w-full h-[80%] bg-base-300 rounded-xl">
          <Bar options={chartOptions} data={chartData} />
        </div>
      </Section>
    </Layout>
  );
};

export default App;
