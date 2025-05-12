import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import {userContext} from '../../Context/UserContext';

export default function Register() {
  let {settoken} = useContext(userContext)
  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form validation schema
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'Name should be at least 3 characters')
      .max(10, "Name shouldn't be more than 10 characters")
      .required('Name is required'),
    email: yup
      .string()
      .email('E-mail is invalid')
      .required('E-mail is required'),
    phone: yup
      .string()
      .matches(/^01[1250][0-9]{8}$/, 'Phone is invalid, should be an Egyptian phone')
      .required('Phone is required'),
    password: yup
      .string()
      .matches(
        /^[a-zA-Z0-9]{6,10}$/,
        'Password should be at least 6 characters, numbers, and not more than 10 characters'
      )
      .required('Password is required'),
    rePassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('RePassword is required'),
  });

  // Formik setup
  const formicRegister = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setErrorApi(null);
      try {
        const { data } = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/signup',
          values
        );
        if (data.message === 'success') {
          settoken(data.token);
          localStorage.setItem("token",data.token)
          navigate('/');
        }
      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        setErrorApi(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {errorApi && (
        <div
          className="fixed z-50 flex items-center justify-center p-4 mb-4 text-sm text-red-800 transform -translate-x-1/2 border border-red-300 rounded-lg bg-red-50 top-16 left-1/2"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div>
            <span className="font-medium">Error:</span> {errorApi}
          </div>
        </div>
      )}

      <h2 className="mt-10 text-3xl font-bold text-center text-pink-600 sm:mt-24">
        Register Now
      </h2>

      <form onSubmit={formicRegister.handleSubmit} className="max-w-lg px-4 m-10 mx-auto sm:px-6">
        {loading && (
          <div className="flex justify-center mb-5">
            <BallTriangle height={80} width={80} color="#db2777" visible={true} />
          </div>
        )}
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input
            value={formicRegister.values.name}
            onChange={formicRegister.handleChange}
            onBlur={formicRegister.handleBlur}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
          />
          {formicRegister.touched.name && formicRegister.errors.name && (
            <div className="text-sm text-red-500">{formicRegister.errors.name}</div>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            value={formicRegister.values.email}
            onChange={formicRegister.handleChange}
            onBlur={formicRegister.handleBlur}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
          />
          {formicRegister.touched.email && formicRegister.errors.email && (
            <div className="text-sm text-red-500">{formicRegister.errors.email}</div>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input
            value={formicRegister.values.password}
            onChange={formicRegister.handleChange}
            onBlur={formicRegister.handleBlur}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
          />
          {formicRegister.touched.password && formicRegister.errors.password && (
            <div className="text-sm text-red-500">{formicRegister.errors.password}</div>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RePassword</label>
          <input
            value={formicRegister.values.rePassword}
            onChange={formicRegister.handleChange}
            onBlur={formicRegister.handleBlur}
            type="password"
            id="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
          />
          {formicRegister.touched.rePassword && formicRegister.errors.rePassword && (
            <div className="text-sm text-red-500">{formicRegister.errors.rePassword}</div>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
          <input
            value={formicRegister.values.phone}
            onChange={formicRegister.handleChange}
            onBlur={formicRegister.handleBlur}
            type="tel"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
          />
          {formicRegister.touched.phone && formicRegister.errors.phone && (
            <div className="text-sm text-red-500">{formicRegister.errors.phone}</div>
          )}
        </div>


        <button
          type="submit"
          className="w-full sm:w-auto text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          disabled={loading}
        >
          Register
        </button>
      </form>
    </>
  );
}
