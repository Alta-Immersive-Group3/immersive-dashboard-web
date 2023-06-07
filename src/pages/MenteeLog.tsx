import React, { useEffect, useState } from 'react';
import { Layout, Section } from '../components/Layout';
import { Input, Select } from '../components/Input';
import dummy from '../json/dummyUser.json';
import { Modals } from '../components/Modals';
import {
  FaUserAltSlash,
  FaUserEdit,
  FaUserTie,
  FaUserTimes,
} from 'react-icons/fa';
import { addUserType } from '../utils/type';

const MenteeLog = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [objModal, setobjModal] = useState<addUserType>();

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

  const handleEdit = (props: addUserType) => {
    setobjModal({
      email: props.email,
      full_name: props.full_name,
      id: props.id,
      role: props.role,
      team: props.team,
    });
  };

  useEffect(() => {
    timeGreeting();
  }, []);

  return (
    <Layout>
      <Modals id="modal-add">
        <div className="flex flex-col gap-5 items-center">
          <p className="text-secondary font-medium tracking-wide text-2xl mb-3">
            Add User
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
            id="password"
            name="password"
            label="Password"
            type="password"
          />
          <Select
            id="role"
            name="role"
            label="Role"
            options={['Default', 'Admin']}
          />
          <Select
            id="team"
            name="team"
            label="Team"
            options={['Academic', 'Placement', 'People Skill']}
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
      <Modals id="modal-edit">
        <div className="flex flex-col gap-5 items-center">
          <p className="text-secondary font-medium tracking-wide text-2xl mb-3">
            Edit User
          </p>
          <Input
            id="full_name"
            name="full_name"
            label="Full Name"
            value={objModal?.full_name}
            type="text"
          />
          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            value={objModal?.email}
          />
          <Select
            id="role"
            name="role"
            label="Role"
            options={['Default', 'Admin']}
          />
          <Select
            id="team"
            name="team"
            label="Team"
            options={['Academic', 'Placement', 'People Skill']}
          />
          <Select
            id="status"
            name="status"
            label="Status"
            options={['Active']}
          />
          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
          />
          <Input
            id="retype password"
            name="retype password"
            label="Retype Password"
            type="password"
          />

          <div className="w-full flex justify-end gap-3">
            <div className="modal-action mt-0 ">
              <label
                htmlFor="modal-edit"
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
            <p className="text-secondary tracking-wide text-xl">MenteeLog</p>
          </div>
          <p className="text-secondary tracking-wide text-xl">User Default</p>
        </div>

        <div className="w-full min-h-[83%] bg-base-300 rounded-xl flex flex-col gap-5 p-8 items-center">
          <div className="w-full flex justify-end">
            <label
              htmlFor="modal-add"
              className="btn btn-secondary w-32"
            >
              Add User
            </label>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="table bg-base-200">
              <thead>
                <tr>
                  <th></th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Team</th>
                  <th>Role</th>
                  <th>Status</th>
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
                      <td>{prop.email}</td>
                      <td>{prop.team}</td>
                      <td>{prop.role}</td>
                      <td>{prop.status}</td>
                      <td>
                        <label
                          onClick={() => handleEdit(prop)}
                          className="btn p-0 min-h-0 h-0 p text-base"
                          htmlFor="modal-edit"
                        >
                          <FaUserEdit />
                        </label>
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

export default MenteeLog;
