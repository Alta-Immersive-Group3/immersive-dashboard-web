import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import toast from '../utils/toast';

import React, { useEffect, useState } from 'react';
import { Layout, Section } from '../components/Layout';
import { Input, Select, TextArea } from '../components/Input';
import { data } from '../json/dataStatus.json';

import { addClassType, addUserType } from '../utils/type';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../utils/api';

const addSchema = Yup.object().shape({
  id_class: Yup.number().positive().integer().required('Required'),
  full_name: Yup.string().required('Required'),
  nick_name: Yup.string().required('Required'),
  email: Yup.string().email('please enter a valid email').required('Required'),
  phone: Yup.string().required('Required'),
  current_address: Yup.string().required('Required'),
  home_address: Yup.string().required('Required'),
  telegram: Yup.string().required('Required'),
  id_status: Yup.number().positive().integer().required('Required'),
  gender: Yup.string().required('Required'),
  education_type: Yup.string().required('Required'),
  major: Yup.string().required('Required'),
  graduate: Yup.number().positive().integer().required('Required'),
  institution: Yup.string().required('Required'),
  emergency_name: Yup.string().required('Required'),
  emergency_phone: Yup.string().required('Required'),
  emergency_status: Yup.string().required('Required'),
});

const MenteeAdd = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [objModal, setobjModal] = useState<addUserType>();
  const [objClass, setObjClass] = useState<addClassType[]>([]);
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

  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);

  const [cookie] = useCookies(['id', 'role', 'token', 'full_name']);
  const ckToken = cookie.token;
  const ckId = cookie.id;
  const ckRole = cookie.role;
  const ckName = cookie.full_name;

  const fetchGetAllClass = async () => {
    await api
      .getClassAll(ckToken)
      .then((response) => {
        const { data } = response.data;
        setObjClass(data);
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

  const addMentee = async (datad: object) => {
    await api
      .postAddMentee(ckToken, datad)
      .then((response) => {
        const { message } = response.data;
        fetchGetAllClass();
        formikAdd.resetForm();
        navigate('/mentee');

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

  const formikAdd = useFormik({
    initialValues: {
      id_class: '',
      full_name: '',
      nick_name: '',
      email: '',
      phone: '',
      current_address: '',
      home_address: '',
      telegram: '',
      id_status: '',
      gender: '',
      education_type: '',
      major: '',
      graduate: '',
      institution: '',
      emergency_name: '',
      emergency_phone: '',
      emergency_status: '',
    },
    validationSchema: addSchema,
    onSubmit: (values) => {
      addMentee(values);
      console.log(values);
    },
  });

  const handleIdClassChange = (value: string) => {
    formikAdd.setFieldValue('id_class', parseInt(value, 10));
  };
  const handleIdStatusChange = (value: string) => {
    formikAdd.setFieldValue('id_status', parseInt(value, 10));
  };

  const dedicatedFetch = async () => {
    timeGreeting();
    await fetchGetAllClass();
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
            <p className="text-secondary tracking-wide text-xl">Add Mentee</p>
          </div>
          <p className="text-secondary tracking-wide text-xl">User {ckRole}</p>
        </div>

        <div className="w-full min-h-[83%] bg-base-300 rounded-xl flex flex-col gap-5 p-8 items-center">
          <form
            onSubmit={formikAdd.handleSubmit}
            className="w-full min-h-[83%] bg-base-300 rounded-xl flex items-center p-7 justify-between"
          >
            <div className="w-[49%] h-full outline outline-1 outline-base-100 flex flex-col justify-center gap-3 rounded-xl p-4">
              <div className="w-full flex gap-4">
                <Input
                  id="full_name"
                  name="full_name"
                  label="Full name"
                  type="text"
                  value={formikAdd.values.full_name}
                  onChange={formikAdd.handleChange}
                  onBlur={formikAdd.handleBlur}
                  error={formikAdd.errors.full_name}
                  touch={formikAdd.touched.full_name}
                />
                <Input
                  id="nick_name"
                  name="nick_name"
                  label="Nick Name"
                  type="text"
                  value={formikAdd.values.nick_name}
                  onChange={formikAdd.handleChange}
                  onBlur={formikAdd.handleBlur}
                  error={formikAdd.errors.nick_name}
                  touch={formikAdd.touched.nick_name}
                />
              </div>
              <Input
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formikAdd.values.email}
                onChange={formikAdd.handleChange}
                onBlur={formikAdd.handleBlur}
                error={formikAdd.errors.email}
                touch={formikAdd.touched.email}
              />
              <TextArea
                id="current_address"
                name="current_address"
                label="Current Address"
                value={formikAdd.values.current_address}
                onChange={formikAdd.handleChange}
                onBlur={formikAdd.handleBlur}
                error={formikAdd.errors.current_address}
                touch={formikAdd.touched.current_address}
              />
              <TextArea
                id="home_address"
                name="home_address"
                label="Home Address"
                value={formikAdd.values.home_address}
                onChange={formikAdd.handleChange}
                onBlur={formikAdd.handleBlur}
                error={formikAdd.errors.home_address}
                touch={formikAdd.touched.home_address}
              />
              <Select
                id="gender"
                name="gender"
                label="Gender"
                value={formikAdd.values.gender}
                onChangeSelect={formikAdd.handleChange}
                onBlur={formikAdd.handleBlur}
                error={formikAdd.errors.gender}
                touch={formikAdd.touched.gender}
              >
                <option value="L">Male</option>
                <option value="P">Female</option>
              </Select>
              <div className="w-full flex gap-4">
                <Input
                  id="phone"
                  name="phone"
                  label="Number Telephone"
                  type="text"
                  value={formikAdd.values.phone}
                  onChange={formikAdd.handleChange}
                  onBlur={formikAdd.handleBlur}
                  error={formikAdd.errors.phone}
                  touch={formikAdd.touched.phone}
                />
                <Input
                  id="telegram"
                  name="telegram"
                  label="Telegram"
                  type="text"
                  value={formikAdd.values.telegram}
                  onChange={formikAdd.handleChange}
                  onBlur={formikAdd.handleBlur}
                  error={formikAdd.errors.telegram}
                  touch={formikAdd.touched.telegram}
                />
              </div>
              <div className="w-full flex gap-4">
                <Input
                  id="emergency_name"
                  name="emergency_name"
                  label="Emergency Name"
                  type="text"
                  value={formikAdd.values.emergency_name}
                  onChange={formikAdd.handleChange}
                  onBlur={formikAdd.handleBlur}
                  error={formikAdd.errors.emergency_name}
                  touch={formikAdd.touched.emergency_name}
                />
                <Select
                  id="emergency_status"
                  name="emergency_status"
                  label="emergency_status"
                  value={formikAdd.values.emergency_status}
                  onChangeSelect={formikAdd.handleChange}
                  onBlur={formikAdd.handleBlur}
                  error={formikAdd.errors.emergency_status}
                  touch={formikAdd.touched.emergency_status}
                >
                  <option value="orang tua">orang tua</option>
                  <option value="saudara kandung">saudara kandung</option>
                  <option value="kakek nenek">kakek nenek</option>
                  <option value="keluarga">keluarga</option>
                </Select>
              </div>

              <Input
                id="emergency_phone"
                name="emergency_phone"
                label="Emergency Phone"
                type="text"
                value={formikAdd.values.emergency_phone}
                onChange={formikAdd.handleChange}
                onBlur={formikAdd.handleBlur}
                error={formikAdd.errors.emergency_phone}
                touch={formikAdd.touched.emergency_phone}
              />
            </div>
            <div className="w-[49%] h-full outline outline-1 outline-base-100 flex flex-col gap-3 rounded-xl p-4 justify-between">
              <div className="w-full flex flex-col gap-3">
                <Select
                  id="id_class"
                  name="id_class"
                  label="Class"
                  value={formikAdd.values.id_class.toString()}
                  onChangeSelect={(e) => handleIdClassChange(e.target.value)}
                  onBlur={formikAdd.handleBlur}
                  error={formikAdd.errors.id_class}
                  touch={formikAdd.touched.id_class}
                >
                  {objClass.map((opt) => (
                    <option
                      key={opt.id}
                      value={opt.id}
                    >
                      {opt.name}
                    </option>
                  ))}
                </Select>
                <Select
                  id="id_status"
                  name="id_status"
                  label="Status"
                  value={formikAdd.values.id_status.toString()}
                  onChangeSelect={(e) => handleIdStatusChange(e.target.value)}
                  onBlur={formikAdd.handleBlur}
                  error={formikAdd.errors.id_status}
                  touch={formikAdd.touched.id_status}
                >
                  {data.map((opt) => (
                    <option
                      key={opt.id}
                      value={opt.id}
                    >
                      {opt.name}
                    </option>
                  ))}
                </Select>
                <Select
                  id="education_type"
                  name="education_type"
                  label="education_type"
                  value={formikAdd.values.education_type}
                  onChangeSelect={formikAdd.handleChange}
                  onBlur={formikAdd.handleBlur}
                  error={formikAdd.errors.education_type}
                  touch={formikAdd.touched.education_type}
                >
                  <option value="informatics">informatics</option>
                  <option value="non-informatics">non-informatics</option>
                </Select>
                <Input
                  id="institution"
                  name="institution"
                  label="Institution"
                  type="text"
                  value={formikAdd.values.institution}
                  onChange={formikAdd.handleChange}
                  onBlur={formikAdd.handleBlur}
                  error={formikAdd.errors.institution}
                  touch={formikAdd.touched.institution}
                />
                <Input
                  id="major"
                  name="major"
                  label="Major"
                  type="text"
                  value={formikAdd.values.major}
                  onChange={formikAdd.handleChange}
                  onBlur={formikAdd.handleBlur}
                  error={formikAdd.errors.major}
                  touch={formikAdd.touched.major}
                />
                <Input
                  id="graduate"
                  name="graduate"
                  label="Year Graduate"
                  type="number"
                  value={formikAdd.values.graduate}
                  onChange={formikAdd.handleChange}
                  onBlur={formikAdd.handleBlur}
                  error={formikAdd.errors.graduate}
                  touch={formikAdd.touched.graduate}
                />
              </div>

              <div className="w-full flex justify-end gap-3">
                <button
                  onClick={() => navigate('/mentee/')}
                  className="btn btn-ghost"
                >
                  back
                </button>

                <button
                  type="submit"
                  className="btn btn-secondary w-32"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </Section>
    </Layout>
  );
};

export default MenteeAdd;
