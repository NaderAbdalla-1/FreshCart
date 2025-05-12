import axios from 'axios';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VerifyResetCode() {
  const navigate = useNavigate();

  
  async function verifyResetCode(code) {
    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", { resetCode: code });
      console.log("Verification Success:", response.data);
      toast.success("Reset code verified successfully!");
      setTimeout(() => navigate("/ResetPass"), 2000); // Navigate to ResetPass page after 2 seconds
    } catch (error) {
      console.error("Verification Error:", error.response ? error.response.data : error.message);
      toast.error("Invalid reset code. Please try again.");
    }
  }

  // Formik setup
  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema: Yup.object({
      resetCode: Yup.string()
        .required("Reset code is required")
        .length(6, "Reset code must be 6 characters long"),
    }),
    onSubmit: (values) => {
      verifyResetCode(values.resetCode);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-lg">
        <h1 className="text-xl font-semibold text-center mb-6">Verify Reset Code</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="resetCode" className="block text-gray-700 mb-2">Reset Code</label>
            <input
              type="text"
              id="resetCode"
              name="resetCode"
              className={`w-full p-2 border rounded ${
                formik.errors.resetCode && formik.touched.resetCode ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your reset code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.resetCode}
            />
            {formik.errors.resetCode && formik.touched.resetCode && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.resetCode}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
}
