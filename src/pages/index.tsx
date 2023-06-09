import { useEffect, useState } from 'react';
import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import { Layout, Section } from '../components/Layout';
import { useCookies } from 'react-cookie';
import api from '../utils/api';
        
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

        
        

const Homepage = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [cookie, setCookie] = useCookies(['id', 'role', 'token', 'full_name']);
  const ckToken = cookie.token;
  const ckId = cookie.id;
  const ckRole = cookie.role;
  const ckName = cookie.full_name;

  const MySwal = withReactContent(swal);
          
          const [chartData, setChartData] = useState<any>({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState<any>({});

  const timeGreeting = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour < 12) {
      setHandleTime('Good Morning,');
    } else if (currentHour >= 12 && currentHour < 17) {
      setHandleTime('Good Aternoon,');
    } else if (currentHour >= 17 && currentHour < 21) {
      setHandleTime('Good Evening,');
    } else {
      setHandleTime('Good Night,');
    }
  };

  const fetchProfile = async () => {
    await api
      .getUserById(ckToken, ckId)
      .then((response) => {
        const { data } = response.data;
        setCookie('full_name', data.name, { path: '/' });
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      });
  };

  const dedicatedFetch = async () => {
    timeGreeting();
    await fetchProfile();
    
  };

  useEffect(() => {
    dedicatedFetch();
  }, []);
          
          
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
      <Section
        id="section-dashboard"
        addClass="flex flex-col items-center p-3 justify-between"
      >
        <div
          id="header"
          className="w-full h-[15%] p-5 flex justify-between"
        >
          <div className="flex flex-col gap-3">
            <p className="text-secondary tracking-wide font-semibold text-3xl">
              {handleTime} {ckName}!
            </p>
            <p className="text-secondary tracking-wide text-xl">Dashboard</p>
          </div>
          <p className="text-secondary tracking-wide text-xl">User {ckRole}</p>
        </div>

        <div className="w-full min-h-[83%] bg-base-300 rounded-xl flex flex-col gap-5 p-8 items-center">
          <Bar options={chartOptions} data={chartData} />
        </div>
      </Section>
    </Layout>
  );
};

export default Homepage;
