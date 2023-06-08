import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import toast from '../utils/toast';

import React, { useEffect, useState } from 'react';
import { Layout, Section } from '../components/Layout';
import { Input, Select } from '../components/Input';
import dummy from '../json/dummyClass.json';
import { Modals } from '../components/Modals';
import { FaUsersCog, FaUsersSlash } from 'react-icons/fa';
import { addClassType } from '../utils/type';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import apiSwag from '../utils/apiSwag';

const addSchema = Yup.object().shape({
  graduate_date: Yup.string().required('Required'),
  start_date: Yup.string().required('Required'),
  pic: Yup.number().positive().integer().required('Required'),
  name: Yup.string().required('Required'),
});

const Classlist = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [objModal, setobjModal] = useState<addClassType[]>([]);
  const [idModalEdit, setidModalEdit] = useState<number>();

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

  const handleTransfer = async (props: addClassType) => {
    await formikEditClass.setFieldValue('name', props.name);
    await formikEditClass.setFieldValue('graduate_date', props.graduate_date);
    await formikEditClass.setFieldValue('start_date', props.start_date);
    setidModalEdit(props.id);
  };

  const fetchGetAllClass = async () => {
    await apiSwag
      .getClassAll(ckToken)
      .then((response) => {
        const { data } = response.data;
        setobjModal(data);
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

  const addClass = async (datad: object) => {
    await apiSwag
      .postAddUser(ckToken, datad)
      .then((response) => {
        const { message } = response.data;
        fetchGetAllClass();
        formikAddClass.resetForm();
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

  const EditClass = async (datad: object, usid: any) => {
    await apiSwag
      .editClassById(ckToken, usid, datad)
      .then((response) => {
        const { message } = response.data;

        fetchGetAllClass();
        formikEditClass.resetForm();

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

  const delClass = async (usid?: any) => {
    await apiSwag
      .delUserById(ckToken, usid)
      .then((response) => {
        const { message } = response.data;
        fetchGetAllClass();
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

  const handleDelClass = async (usid?: any) => {
    MySwal.fire({
      icon: 'question',
      title: 'DELETE',
      text: `are you sure delete ?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        delClass(usid);
      }
    });
  };

  const formikAddClass = useFormik({
    initialValues: {
      graduate_date: '',
      start_date: '',
      pic: '',
      name: '',
    },
    validationSchema: addSchema,
    onSubmit: (values) => {
      addClass(values);
    },
  });

  const formikEditClass = useFormik({
    initialValues: {
      graduate_date: '',
      start_date: '',
      pic: '',
      name: '',
    },
    validationSchema: addSchema,
    onSubmit: (values) => {
      EditClass(values, idModalEdit);
    },
  });

  const dedicatedFetch = async () => {
    timeGreeting();
    await fetchGetAllClass();
    await formikAddClass.setFieldValue('pic', parseInt(ckId));
    await formikEditClass.setFieldValue('pic', parseInt(ckId));
  };

  useEffect(() => {
    dedicatedFetch();
  }, []);

  return (
    <Layout>
      <Modals id="modal-add">
        <form
          onSubmit={formikAddClass.handleSubmit}
          className="flex flex-col gap-3 items-center"
        >
          <p className="text-secondary font-medium tracking-wide text-2xl mb-3">
            Add Class
          </p>
          <Input
            id="name"
            name="name"
            label="Class Name"
            type="text"
            value={formikAddClass.values.name}
            onChange={formikAddClass.handleChange}
            onBlur={formikAddClass.handleBlur}
            error={formikAddClass.errors.name}
            touch={formikAddClass.touched.name}
          />
          <div className="w-full flex gap-5 ">
            <Input
              id="start_date"
              name="start_date"
              label="Start Date"
              type="date"
              value={formikAddClass.values.start_date}
              onChange={formikAddClass.handleChange}
              onBlur={formikAddClass.handleBlur}
              error={formikAddClass.errors.start_date}
              touch={formikAddClass.touched.start_date}
            />
            <Input
              id="graduate_date"
              name="graduate_date"
              label="Graduate Date"
              type="date"
              value={formikAddClass.values.graduate_date}
              onChange={formikAddClass.handleChange}
              onBlur={formikAddClass.handleBlur}
              error={formikAddClass.errors.graduate_date}
              touch={formikAddClass.touched.graduate_date}
            />
          </div>

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
          onSubmit={formikEditClass.handleSubmit}
          className="flex flex-col gap-3 items-center"
        >
          <p className="text-secondary font-medium tracking-wide text-2xl mb-3">
            Add Class
          </p>
          <Input
            id="name"
            name="name"
            label="Class Name"
            type="text"
            value={formikEditClass.values.name}
            onChange={formikEditClass.handleChange}
            onBlur={formikEditClass.handleBlur}
            error={formikEditClass.errors.name}
            touch={formikEditClass.touched.name}
          />
          <div className="w-full flex gap-5 ">
            <Input
              id="start_date"
              name="start_date"
              label="Start Date"
              type="date"
              value={formikEditClass.values.start_date}
              onChange={formikEditClass.handleChange}
              onBlur={formikEditClass.handleBlur}
              error={formikEditClass.errors.start_date}
              touch={formikEditClass.touched.start_date}
            />
            <Input
              id="graduate_date"
              name="graduate_date"
              label="Graduate Date"
              type="date"
              value={formikEditClass.values.graduate_date}
              onChange={formikEditClass.handleChange}
              onBlur={formikEditClass.handleBlur}
              error={formikEditClass.errors.graduate_date}
              touch={formikEditClass.touched.graduate_date}
            />
          </div>

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
            <p className="text-secondary tracking-wide text-xl">Classlist</p>
          </div>
          <p className="text-secondary tracking-wide text-xl">User {ckRole}</p>
        </div>

        <div className="w-full min-h-[83%] bg-base-300 rounded-xl flex flex-col gap-5 p-8 items-center">
          <div className="w-full flex justify-end">
            <label
              htmlFor="modal-add"
              className="btn btn-secondary w-32"
            >
              Add Class
            </label>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="table bg-base-200">
              <thead>
                <tr>
                  <th></th>
                  <th>Class Name</th>
                  <th>PIC</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {objModal.map((prop: addClassType, idx) => {
                  return (
                    <tr>
                      <th>{idx + 1}</th>
                      <td>{prop.name}</td>
                      <td>{prop.pic}</td>
                      <td>{prop.start_date}</td>
                      <td>{prop.graduate_date}</td>
                      <td>
                        <label
                          onClick={() => handleTransfer(prop)}
                          className="btn p-0 min-h-0 h-0 p text-base"
                          htmlFor="modal-edit"
                        >
                          <FaUsersCog />
                        </label>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelClass(prop.id)}
                          className="btn p-0 min-h-0 h-0 p text-base"
                        >
                          <FaUsersSlash />
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

export default Classlist;
