import withReactContent from 'sweetalert2-react-content';
import swal from 'sweetalert2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Section } from '../../components/Layout';
import ALTA from '../../../public/logo-ALTA@2x 1.png';
import Landing from '../../../public/LandingImage.png';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../components/Input';
import api from '../../utils/api';
import { PostLogin } from '../../utils/type';

const schema = Yup.object().shape({
  email: Yup.string().email('please enter a valid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const MySwal = withReactContent(swal);
  const navigate = useNavigate();

  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: schema,
      onSubmit: (values) => {
        postLogin(values);
      },
    });

  const postLogin = async (code: any) => {
    await api
      .postLogin(code)
      .then((response) => {
        console.log(response);
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

  return (
    <Section
      id="login-page"
      addClass="flex flex-col items-center justify-between p-4"
    >
      <div></div>
      <div className="flex w-[90%] gap-4 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-fit h-full rounded-xl 
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
          <div className="flex flex-col gap-3 w-[90%] mt-5">
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
          </div>
          <button
            id="login"
            className="btn btn-secondary w-[90%]"
            type="submit"
          >
            Sign in
          </button>
        </form>

        <div className="h-full">
          <img
            src={Landing}
            alt="logo alta"
            className="object-cover"
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
