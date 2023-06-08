import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import toast from '../utils/toast';

import { useEffect, useState } from 'react';
import { Layout, Section } from '../components/Layout';
import { Input } from '../components/Input';
import { useCookies } from 'react-cookie';
import api from '../utils/api';

import { addUserType } from '../utils/type';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  full_name: Yup.string().required('Required'),
  email: Yup.string().email('please enter a valid email').required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'password must match')
    .required('Required'),
});

const Profile = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [handleEdit, setHandleEdit] = useState<boolean>(false);
  const [dataProfile, setDataProfile] = useState<addUserType>();

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

  const teamTranslate = (id_team: number) => {
    if (id_team === 1) return 'Manager';
    else if (id_team === 2) return 'Mentor';
    else if (id_team === 3) return 'Placement';
    else if (id_team === 4) return 'People Skill';
  };

  const fetchProfile = async () => {
    await api
      .getUserById(ckToken, ckId)
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

  const handleUpdate = async (code: object) => {
    MySwal.fire({
      icon: 'question',
      title: 'Update Data',
      text: `are you sure?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .putUserById(ckToken, ckId, code)
          .then((response) => {
            const { data, message } = response.data;
            setHandleEdit(false);
            setCookie('full_name', data.name, { path: '/' });
            fetchProfile();
            resetForm();
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
      }
    });
  };

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      handleUpdate(values);
    },
  });

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
            <p className="text-secondary tracking-wide text-xl">Profile</p>
          </div>
          <p className="text-secondary tracking-wide text-xl">User {ckRole}</p>
        </div>
        <div className="w-full min-h-[83%] bg-base-300 rounded-xl flex items-center p-8 justify-between">
          <div className="w-[49%] h-[480px] outline outline-1 outline-base-100 flex flex-col justify-center rounded-xl p-6">
            <div className="w-full h-full flex gap-5 flex-col">
              <p className="text-secondary tracking-wide text-xl font-semibold self-center">
                Your Profile
              </p>
              <p className="text-neutral tracking-wide text-xl font-medium">
                Full Name :{' '}
                <span className="font-normal">{dataProfile?.full_name}</span>
              </p>
              <p className="text-neutral tracking-wide text-xl font-medium">
                Email :{' '}
                <span className="font-normal">{dataProfile?.email}</span>
              </p>
              <p className="text-neutral tracking-wide text-xl font-medium">
                Team : <span className="font-normal">{dataProfile?.team}</span>
              </p>
              <p className="text-neutral tracking-wide text-xl font-medium">
                Role :{' '}
                <span className="font-normal capitalize">
                  {dataProfile?.role}
                </span>
              </p>
            </div>
            <button
              onClick={() => setHandleEdit(true)}
              className="btn btn-secondary self-end w-32"
            >
              Edit Profile
            </button>
          </div>
          {handleEdit ? (
            <form
              onSubmit={handleSubmit}
              className="w-[49%] outline outline-1 outline-base-100 h-[480px] flex flex-col justify-center gap-5 rounded-xl p-12"
            >
              <p className="text-secondary tracking-wide text-xl font-semibold self-center">
                Edit Profile
              </p>
              <Input
                id="full_name"
                name="full_name"
                label="full name"
                type="text"
                value={values.full_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.full_name}
                touch={touched.full_name}
              />
              <Input
                id="email"
                name="email"
                label="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touch={touched.email}
              />
              <Input
                id="password"
                name="password"
                label="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touch={touched.password}
              />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touch={touched.confirmPassword}
              />

              <button
                type="submit"
                className="btn btn-secondary self-end w-32"
              >
                Save
              </button>
            </form>
          ) : (
            <></>
          )}
        </div>
      </Section>
    </Layout>
  );
};

export default Profile;
