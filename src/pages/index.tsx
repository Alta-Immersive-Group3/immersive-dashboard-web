import React, { useEffect, useState } from 'react';
import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import { Layout, Section } from '../components/Layout';
import { useCookies } from 'react-cookie';
import api from '../utils/api';

const Homepage = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [cookie, setCookie] = useCookies(['id', 'role', 'token', 'full_name']);
  const ckToken = cookie.token;
  const ckId = cookie.id;
  const ckRole = cookie.role;
  const ckName = cookie.full_name;

  const MySwal = withReactContent(swal);

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
          <img
            src="https://placehold.co/600x400/png?text=Placeholder+Dashboard"
            alt="placeholder"
          />
        </div>
      </Section>
    </Layout>
  );
};

export default Homepage;
