import withReactContent from 'sweetalert2-react-content';
import swal from 'sweetalert2';

import React, { useEffect, useState } from 'react';
import { Layout, Section } from '../components/Layout';
import { Input } from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import api from '../utils/api';

import { addUserType } from '../utils/type';

const Profile = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [handleEdit, setHandleEdit] = useState<boolean>(false);
  const [dataProfile, setDataProfile] = useState<addUserType>();

  const MySwal = withReactContent(swal);
  const navigate = useNavigate();

  const [cookie] = useCookies(['id', 'role', 'token', 'fullname']);
  const ckToken = cookie.token;
  const ckId = cookie.id;
  const ckRole = cookie.role;

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

  const teamTranslate = (id_team: number) => {
    if (id_team === 1) return 'Manager';
    else if (id_team === 2) return 'Mentor';
    else if (id_team === 3) return 'Placement';
    else if (id_team === 4) return 'People Skill';
  };

  const fetchProfile = async (code: any) => {
    await api
      .getUserById(ckToken, code)
      .then((response) => {
        const { data } = response.data;
        setDataProfile({
          full_name: data.name,
          email: data.email,
          role: data.role,
          team: teamTranslate(data.id_team),
        });
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
    await fetchProfile(ckId);
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
              {handleTime} Jhon Doe!
            </p>
            <p className="text-secondary tracking-wide text-xl">Profile</p>
          </div>
          <p className="text-secondary tracking-wide text-xl">User {ckRole}</p>
        </div>
        <div className="w-full min-h-[83%] bg-base-300 rounded-xl flex items-center p-8 justify-between">
          <div className="w-[49%] h-[480px] outline outline-1 outline-base-100 flex flex-col justify-center gap-5 rounded-xl p-6">
            <p className="text-secondary tracking-wide text-xl font-semibold self-center">
              Your Profile
            </p>
            <p className="text-neutral tracking-wide text-xl font-medium">
              Full Name :{' '}
              <span className="font-normal">{dataProfile?.full_name}</span>
            </p>
            <p className="text-neutral tracking-wide text-xl font-medium">
              Email : <span className="font-normal">{dataProfile?.email}</span>
            </p>
            <p className="text-neutral tracking-wide text-xl font-medium">
              Team : <span className="font-normal">{dataProfile?.team}</span>
            </p>
            <p className="text-neutral tracking-wide text-xl font-medium">
              Role : <span className="font-normal">{dataProfile?.role}</span>
            </p>
            <button
              onClick={() => setHandleEdit(true)}
              className="btn btn-secondary self-end w-32"
            >
              Edit Profile
            </button>
          </div>
          {handleEdit ? (
            <div className="w-[49%] outline outline-1 outline-base-100 h-[480px] flex flex-col justify-center gap-5 rounded-xl p-12">
              <p className="text-secondary tracking-wide text-xl font-semibold self-center">
                Edit Profile
              </p>
              <Input
                id="fullname"
                name="fullname"
                label="Full Name"
                type="text"
                value=""
                error=""
              />
              <Input
                id="email"
                name="email"
                label="Email"
                type="email"
                value=""
                error=""
              />
              <Input
                id="password"
                name="password"
                label="password"
                type="password"
                value=""
                error=""
              />
              <Input
                id="retype password"
                name="retype password"
                label="retype password"
                type="password"
                value=""
                error=""
              />

              <button
                onClick={() => setHandleEdit(false)}
                className="btn btn-secondary self-end w-32"
              >
                Save
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Section>
    </Layout>
  );
};

export default Profile;
