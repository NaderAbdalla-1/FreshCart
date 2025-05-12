import axios from 'axios';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

export default function ForgotPass() {
  // Function to handle API request for forgot password
  async function forgetPass(email) {
    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email });
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  }


  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      forgetPass(values.email);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-lg">
        <h1 className="text-xl font-semibold text-center mb-6">Forgot Password</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full p-2 border rounded ${
                formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
         <Link to={"/"}>
         <button
         type="submit"
         className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
       >
         Reset Password
       </button>
         </Link>
        </form>
      </div>
    </div>
  );
}
