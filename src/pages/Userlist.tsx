import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import toast from '../utils/toast';

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
import { addUserType, usersType } from '../utils/type';
import { useCookies } from 'react-cookie';
import api from '../utils/api';

const Userlist = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [objModal, setobjModal] = useState<addUserType>();
  const [dataUsers, setDataUsers] = useState<usersType[]>([]);

  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);

  const [cookie, setCookie] = useCookies(['id', 'role', 'token', 'full_name']);
  const ckToken = cookie.token;
  const ckId = cookie.id;
  const ckRole = cookie.role;
  const ckName = cookie.full_name;

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

  const teamTranslate = (id_team?: number) => {
    if (id_team === 1) return 'Manager';
    else if (id_team === 2) return 'Mentor';
    else if (id_team === 3) return 'Placement';
    else if (id_team === 4) return 'People Skill';
  };

  const fetchGetAll = async () => {
    await api
      .getUserAll(ckToken)
      .then((response) => {
        const { data } = response.data;
        setDataUsers(data);

        console.log(dataUsers);
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
    await fetchGetAll();
  };

  useEffect(() => {
    dedicatedFetch();
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
              {handleTime} {ckName}!
            </p>
            <p className="text-secondary tracking-wide text-xl">Userlist</p>
          </div>
          <p className="text-secondary tracking-wide text-xl">User {ckRole}</p>
        </div>

        <div className="w-full min-h-[83%] bg-base-300 rounded-xl flex flex-col gap-5 p-8 items-center">
          {ckRole === 'admin' ? (
            <>
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
            </>
          ) : (
            <>
              <div className="overflow-x-auto w-full">
                <table className="table bg-base-200">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Team</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataUsers.map((prop, idx) => {
                      return (
                        <tr key={idx}>
                          <th>{idx + 1}</th>
                          <td>{prop.name}</td>
                          <td>{prop.email}</td>
                          <td>{teamTranslate(prop.id_team)}</td>
                          <td className="capitalize">{prop.role}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </Section>
    </Layout>
  );
};

export default Userlist;
