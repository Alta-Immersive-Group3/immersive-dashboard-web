import React, { useEffect, useState } from 'react';
import { Layout, Section } from '../components/Layout';
import { Input, Select } from '../components/Input';
import dummy from '../json/dummyMentee.json';
import { Modals } from '../components/Modals';
import {
  FaUserAltSlash,
  FaUserEdit,
  FaUserTag,
  FaUserTie,
  FaUserTimes,
} from 'react-icons/fa';
import { addUserType } from '../utils/type';
import { useNavigate } from 'react-router-dom';

const Menteelist = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(true);

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
      <Modals id="modal-add">
        <div className="flex flex-col gap-5 items-center">
          <p className="text-secondary font-medium tracking-wide text-2xl mb-3">
            Add Mentee
          </p>
          <Input
            id="full_name"
            name="full_name"
            label="Full Name"
            type="text"
          />
          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
          />
          <Input
            id="phone"
            name="phone"
            label="Phone initiate with 0"
            type="number"
          />
          <Select
            id="class"
            name="class"
            label="Class"
            options={['Class', 'Class']}
          />
          <Select
            id="category"
            name="category"
            label="Category"
            options={['category', 'category']}
          />
          <Select
            id="gender"
            name="gender"
            label="Gender"
            options={['L', 'M']}
          />

          <div className="w-full flex justify-end gap-3">
            <div className="modal-action mt-0 ">
              <label
                htmlFor="modal-add"
                className="btn btn-ghost"
              >
                Close
              </label>
            </div>
            <button className="btn btn-secondary w-32">Submit</button>
          </div>
        </div>
      </Modals>
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
            <p className="text-secondary tracking-wide text-xl">Menteelist</p>
          </div>
          <p className="text-secondary tracking-wide text-xl">User Default</p>
        </div>

        <div className="w-full min-h-[83%] bg-base-300 rounded-xl flex flex-col gap-5 p-8 items-center">
          <div className="w-full flex justify-end">
            <label
              htmlFor="modal-add"
              className="btn btn-secondary w-32"
            >
              Add Mentee
            </label>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="table bg-base-200">
              <thead>
                <tr>
                  <th></th>
                  <th>Full Name</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Gender</th>
                  <th>Log</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {dummy.map((prop, idx) => {
                  return (
                    <tr>
                      <th>{idx + 1}</th>
                      <td>{prop.full_name}</td>
                      <td>{prop.class}</td>
                      <td>{prop.status}</td>
                      <td>{prop.education_type}</td>
                      <td>{prop.gender === 'L' ? 'Male' : 'Female'}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/mentee/${prop.id}/log`)}
                          className="btn p-0 min-h-0 h-0 p text-base"
                        >
                          <FaUserTag />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => navigate(`/mentee/${prop.id}/edit`)}
                          className="btn p-0 min-h-0 h-0 p text-base"
                        >
                          <FaUserEdit />
                        </button>
                      </td>
                      <td>
                        <button className="btn p-0 min-h-0 h-0 p text-base">
                          <FaUserTimes />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Menteelist;
