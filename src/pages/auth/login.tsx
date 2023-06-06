import withReactContent from 'sweetalert2-react-content';
import swal from 'sweetalert2';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Section } from '../../components/Layout';
import ALTA from '../../../public/logo-ALTA@2x 1.png';
import Landing from '../../../public/LandingImage.png';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../components/Input';

const schema = Yup.object({
  email: Yup.string().required('Username harus diisi'),
  password: Yup.string().required('Password harus diisi'),
});

const Login = () => {
  const MySwal = withReactContent(swal);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const onLogin = () => {
    console.log('email : ', formik.values.email);
    console.log('password : ', formik.values.password);
    if (formik.values.email !== '' && formik.values.password !== '') {
      navigate('/');
    } else {
      MySwal.fire({
        title: 'Failed',
        text: 'Please check your username or password!',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Section
      id="login-page"
      addClass="flex flex-col items-center justify-between p-4"
    >
      <div></div>
      <div className="flex w-[90%] gap-4 items-center justify-center">
        <div
          className="w-2/6 h-full rounded-xl 
        outline outline-1 outline-base-200 flex flex-col px-10 py-12 gap-14 justify-center items-center"
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-secondary tracking-wide font-semibold text-3xl">
              Sign in
            </p>
            <p className="text-secondary text-sm">
              Sign in and start to manage your class!
            </p>
          </div>
          <div className="flex flex-col gap-5 w-[90%] mt-5">
            <Input
              id="email"
              name="email"
              label="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
            />
            <Input
              id="password"
              name="password"
              label="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password}
            />
          </div>
          <button
            id="login"
            className="btn btn-secondary w-[90%]"
            onClick={() => onLogin()}
          >
            Sign in
          </button>
        </div>
        <div className="w-4/6 ">
          <img
            src={Landing}
            alt="logo alta"
          />
        </div>
      </div>
      <div>
        <img
          src={ALTA}
          alt="logo alta"
        />
      </div>
    </Section>
  );
};

export default Login;
