import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import toast from '../utils/toast';

import React, { useEffect, useState } from 'react';
import { Layout, Section } from '../components/Layout';
import { Input, Select } from '../components/Input';
import dummy from '../json/dummyUser.json';
import { Modals } from '../components/Modals';
import { FaUserEdit, FaUserTimes } from 'react-icons/fa';
import { addUserType, usersType } from '../utils/type';
import { useCookies } from 'react-cookie';
import api from '../utils/api';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const addSchema = Yup.object().shape({
  full_name: Yup.string().required('Required'),
  email: Yup.string().email('please enter a valid email').required('Required'),
  password: Yup.string().required('Required'),
  role: Yup.string().required('Required'),
  id_team: Yup.number().positive().integer().required('Required'),
});

const Userlist = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [idModalEdit, setidModalEdit] = useState<number>();
  const [dataUsers, setDataUsers] = useState<addUserType[]>([]);
  const [addObject, setAddObject] = useState<addUserType>();

  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);

  const [cookie] = useCookies(['id', 'role', 'token', 'full_name']);
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

  const handleTransfer = async (props: addUserType) => {
    await formikEdit.setFieldValue('full_name', props.name);
    await formikEdit.setFieldValue('email', props.email);
    setidModalEdit(props.id);
  };

  const teamOptions = [
    { label: 'Manager', value: 1 },
    { label: 'Mentor', value: 2 },
    { label: 'Placement', value: 3 },
    { label: 'People Skill', value: 4 },
  ];

  const teamTranslate = (id_team?: number) => {
    if (id_team === 1) return 'Manager';
    else if (id_team === 2) return 'Mentor';
    else if (id_team === 3) return 'Placement';
    else if (id_team === 4) return 'People Skill';
  };

  const statusTranslate = (status?: boolean) => {
    if (status === true) return 'Active';
    else return 'Deactive';
  };

  const fetchGetAll = async () => {
    await api
      .getUserAll(ckToken)
      .then((response) => {
        const { data } = response.data;
        setDataUsers(data);
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

  const addUser = async (datad: object) => {
    await api
      .postAddUser(ckToken, datad)
      .then((response) => {
        const { message } = response.data;

        fetchGetAll();
        formikAdd.resetForm();
        MyToast.fire({
          icon: 'success',
          title: message,
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

  const editUser = async (datad: object, usid: any) => {
    await api
      .editUsersById(ckToken, usid, datad)
      .then((response) => {
        const { message } = response.data;

        fetchGetAll();
        formikEdit.resetForm();

        MyToast.fire({
          icon: 'success',
          title: message,
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

  const delUser = async (usid?: any) => {
    await api
      .delUserById(ckToken, usid)
      .then((response) => {
        const { message } = response.data;
        fetchGetAll();
        MyToast.fire({
          icon: 'success',
          title: message,
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

  const handleDelUser = async (usid?: any) => {
    MySwal.fire({
      icon: 'question',
      title: 'DELETE',
      text: `are you sure delete ?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        delUser(usid);
      }
    });
  };

  const formikAdd = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      password: '',
      role: '',
      id_team: '',
    },
    validationSchema: addSchema,
    onSubmit: (values) => {
      addUser(values);
    },
  });

  const formikEdit = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      password: '',
      role: '',
      id_team: '',
    },
    validationSchema: addSchema,
    onSubmit: (values) => {
      editUser(values, idModalEdit);
    },
  });

  const handleAgeChange = (value: string) => {
    formikAdd.setFieldValue('id_team', parseInt(value, 10));
  };
  const handleEditChange = (value: string) => {
    formikEdit.setFieldValue('id_team', parseInt(value, 10));
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
        <form
          onSubmit={formikAdd.handleSubmit}
          className="flex flex-col gap-5 items-center"
        >
          <p className="text-secondary font-medium tracking-wide text-2xl mb-3">
            Add User
          </p>
          <Input
            id="full_name"
            name="full_name"
            label="full name"
            type="text"
            value={formikAdd.values.full_name}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            error={formikAdd.errors.full_name}
            touch={formikAdd.touched.full_name}
          />
          <Input
            id="email"
            name="email"
            label="email"
            type="email"
            value={formikAdd.values.email}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            error={formikAdd.errors.email}
            touch={formikAdd.touched.email}
          />
          <Input
            id="password"
            name="password"
            label="password"
            type="password"
            value={formikAdd.values.password}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            error={formikAdd.errors.password}
            touch={formikAdd.touched.password}
          />
          <Select
            id="role"
            name="role"
            label="Role"
            value={formikAdd.values.role}
            onChangeSelect={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            error={formikAdd.errors.role}
            touch={formikAdd.touched.role}
          >
            <option value="default">Default</option>
            <option value="admin">Admin</option>
          </Select>
          <Select
            id="id_team"
            name="id_team"
            label="Team"
            value={formikAdd.values.id_team.toString()}
            onChangeSelect={(e) => handleAgeChange(e.target.value)}
            onBlur={formikAdd.handleBlur}
            error={formikAdd.errors.id_team}
            touch={formikAdd.touched.id_team}
          >
            {teamOptions.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
              >
                {opt.label}
              </option>
            ))}
          </Select>

          <div className="w-full flex justify-end gap-3">
            <div className="modal-action mt-0 ">
              <label
                htmlFor="modal-add"
                className="btn btn-ghost"
              >
                Close
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-secondary w-32"
            >
              Submit
            </button>
          </div>
        </form>
      </Modals>
      <Modals id="modal-edit">
        <form
          onSubmit={formikEdit.handleSubmit}
          className="flex flex-col gap-5 items-center"
        >
          <p className="text-secondary font-medium tracking-wide text-2xl mb-3">
            Edit User
          </p>
          <Input
            id="full_name"
            name="full_name"
            label="full name"
            type="text"
            value={formikEdit.values.full_name}
            onChange={formikEdit.handleChange}
            onBlur={formikEdit.handleBlur}
            error={formikEdit.errors.full_name}
            touch={formikEdit.touched.full_name}
          />
          <Input
            id="email"
            name="email"
            label="email"
            type="email"
            value={formikEdit.values.email}
            onChange={formikEdit.handleChange}
            onBlur={formikEdit.handleBlur}
            error={formikEdit.errors.email}
            touch={formikEdit.touched.email}
          />
          <Input
            id="password"
            name="password"
            label="password"
            type="password"
            value={formikEdit.values.password}
            onChange={formikEdit.handleChange}
            onBlur={formikEdit.handleBlur}
            error={formikEdit.errors.password}
            touch={formikEdit.touched.password}
          />
          <Select
            id="role"
            name="role"
            label="Role"
            value={formikEdit.values.role}
            onChangeSelect={formikEdit.handleChange}
            onBlur={formikEdit.handleBlur}
            error={formikEdit.errors.role}
            touch={formikEdit.touched.role}
          >
            <option value="default">Default</option>
            <option value="admin">Admin</option>
          </Select>
          <Select
            id="id_team"
            name="id_team"
            label="Team"
            value={formikEdit.values.id_team.toString()}
            onChangeSelect={(e) => handleEditChange(e.target.value)}
            onBlur={formikEdit.handleBlur}
            error={formikEdit.errors.id_team}
            touch={formikEdit.touched.id_team}
          >
            {teamOptions.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
              >
                {opt.label}
              </option>
            ))}
          </Select>

          <div className="w-full flex justify-end gap-3">
            <div className="modal-action mt-0 ">
              <label
                htmlFor="modal-edit"
                className="btn btn-ghost"
              >
                Close
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-secondary w-32"
            >
              Submit
            </button>
          </div>
        </form>
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
                      <th>Status</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataUsers.map((prop: any, idx) => {
                      return (
                        <tr key={idx}>
                          <th>{idx + 1}</th>
                          <td>{prop.name}</td>
                          <td>{prop.email}</td>
                          <td>{teamTranslate(prop.id_team)}</td>
                          <td className="capitalize">{prop.role}</td>
                          <td>{statusTranslate(prop.status)}</td>
                          <td>
                            <label
                              onClick={() => handleTransfer(prop)}
                              className="btn p-0 min-h-0 h-0 p text-base"
                              htmlFor="modal-edit"
                            >
                              <FaUserEdit />
                            </label>
                          </td>
                          <td>
                            <button
                              onClick={() => handleDelUser(prop.id)}
                              className="btn p-0 min-h-0 h-0 p text-base"
                            >
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
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataUsers.map((prop: any, idx) => {
                      return (
                        <tr key={idx}>
                          <th>{idx + 1}</th>
                          <td>{prop.name}</td>
                          <td>{prop.email}</td>
                          <td>{teamTranslate(prop.id_team)}</td>
                          <td className="capitalize">{prop.role}</td>
                          <td>{statusTranslate(prop.status)}</td>
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
