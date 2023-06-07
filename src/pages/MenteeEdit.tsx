import React, { useEffect, useState } from 'react';
import { Layout, Section } from '../components/Layout';
import { Input, Select, TextArea } from '../components/Input';

import { addUserType } from '../utils/type';
import { useNavigate } from 'react-router-dom';

const MenteeEdit = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [objModal, setobjModal] = useState<addUserType>();
  const navigate = useNavigate();

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

  useEffect(() => {
    timeGreeting();
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
            <p className="text-secondary tracking-wide text-xl">MenteeEdit</p>
          </div>
          <p className="text-secondary tracking-wide text-xl">User Default</p>
        </div>

        <div className="w-full min-h-[83%] bg-base-300 rounded-xl flex flex-col gap-5 p-8 items-center">
          <div className="w-full min-h-[83%] bg-base-300 rounded-xl flex items-center p-7 justify-between">
            <div className="w-[49%] h-full outline outline-1 outline-base-100 flex flex-col justify-center gap-3 rounded-xl p-4">
              <div className="w-full flex gap-4">
                <Input
                  id="full_name"
                  name="full_name"
                  label="Full Name"
                  type="text"
                />
                <Input
                  id="nick_name"
                  name="nick_name"
                  label="Nick Name"
                  type="text"
                />
              </div>
              <Input
                id="email"
                name="email"
                label="Email"
                type="email"
              />
              <TextArea
                id="current_address"
                name="current_address"
                label="Current Address"
              />
              <TextArea
                id="home_address"
                name="home_address"
                label="Home Address"
              />
              <Select
                id="gender"
                name="gender"
                label="gender"
                options={['Active']}
              />
              <div className="w-full flex gap-4">
                <Input
                  id="phone"
                  name="phone"
                  label="phone"
                  type="number"
                />
                <Input
                  id="telegram"
                  name="telegram"
                  label="telegram"
                  type="text"
                />
              </div>
              <div className="w-full flex gap-4">
                <Input
                  id="emergency_name"
                  name="emergency_name"
                  label="emergency name"
                  type="text"
                />
                <Input
                  id="emergency_status"
                  name="emergency_status"
                  label="emergency status"
                  type="text"
                />
              </div>

              <Input
                id="emergency_phone"
                name="emergency_phone"
                label="emergency phone"
                type="number"
              />
            </div>
            <div className="w-[49%] h-full outline outline-1 outline-base-100 flex flex-col gap-3 rounded-xl p-4 justify-between">
              <div className="w-full flex flex-col gap-3">
                <Select
                  id="class"
                  name="class"
                  label="class"
                  options={['Active']}
                />
                <Select
                  id="status"
                  name="status"
                  label="status"
                  options={['Active']}
                />
                <Select
                  id="graduation"
                  name="educate_type"
                  label="educate type"
                  options={['Active']}
                />
                <Input
                  id="institute"
                  name="institute"
                  label="institute"
                  type="text"
                />
                <Input
                  id="major"
                  name="major"
                  label="major"
                  type="text"
                />
                <Select
                  id="graduation"
                  name="graduation"
                  label="graduation"
                  options={['Active']}
                />
              </div>

              <div className="w-full flex justify-end gap-3">
                <button
                  onClick={() => navigate('/mentee/')}
                  className="btn btn-ghost"
                >
                  back
                </button>

                <button className="btn btn-secondary w-32">Save</button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default MenteeEdit;
