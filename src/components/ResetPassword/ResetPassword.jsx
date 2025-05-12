import axios from 'axios';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {
  const navigate = useNavigate();


  async function resetPassword(values) {
    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        { email: values.email, newPassword: values.newPassword }
      );
      console.log("Reset Password Success:", response.data);
      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); 
    } catch (error) {
      console.error("Reset Password Error:", error.response ? error.response.data : error.message);
      toast.error("Failed to reset password. Please try again.");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      newPassword: Yup.string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters long"),
    }),
    onSubmit: (values) => {
      resetPassword(values);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer /> 
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-lg">
        <h1 className="text-xl font-semibold text-center mb-6">Reset Password</h1>
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

          {/* New Password Input */}
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className={`w-full p-2 border rounded ${
                formik.errors.newPassword && formik.touched.newPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
