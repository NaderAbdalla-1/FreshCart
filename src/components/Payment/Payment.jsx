import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cartContext } from '../../Context/CartContext'


export default function Payment() {
 const { cartId } = useContext(cartContext);
  const [ErrorApi, setErrorApi] = useState(null);
  const [Loading1, setLoading1] = useState(false);
  const [Loading2, setLoading2] = useState(false);
  const [Flag, setFlag] = useState(true);
  console.log(cartId);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);

  // Validation schema
  const validationSchema = Yup.object().shape({
    shippingAddress: Yup.object().shape({
      details: Yup.string().required("Details are required"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(
          /^01[0125][0-9]{8}$/
        ),
      city: Yup.string().required( "should be city in Egypt.")
        .required("City is required"),
    }),
  });

  // Form submission
  async function handleCashPayment(values) {
    setLoading1(true);
    axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        shippingAddress: values.shippingAddress, // Correctly pass the nested object
      },
      {
        headers: { token },
      }
    )
      .then((response) => {
        setLoading1(false);
        console.log(response);
        navigate("/Allorders");
      })
      .catch((error) => {
        setLoading1(false);
        setErrorApi(error.response.data.message);
      });
  }
  
  function handelOnlinePayment(values) {
    axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
      {
        shippingAddress: values.shippingAddress, // Correctly pass the nested object
      },
      {
        headers: { token },
      }
    )
      .then((response) => {
        setLoading2(false);
        console.log(response);
        window.open(response.data.session.url, "_self");
      })
      .catch((error) => {
        setLoading2(false);
        setErrorApi(error.response.data.message);
        console.log(error.message);
      });
  }
  
  function handelPayment(values) {
    if (Flag) {
      handelOnlinePayment(values);
    } else {
      handleCashPayment(values);
    }
  }
  // Formik configuration
  const myFormik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema,
    onSubmit: handelPayment,
  });
  useEffect(() => {}, [localStorage.getItem("idForUser")]);

  return (
    <>
      {ErrorApi && (
        <div
          className="p-4 mb-4 text-xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {ErrorApi}
        </div>
      )}

      <h2 className="mt-20 text-4xl font-medium tracking-wider text-center text-pink-700">
        Proceed to Payment
      </h2>
      <form onSubmit={myFormik.handleSubmit} className="max-w-xl mx-auto mt-8">
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={myFormik.values.details}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="text"
            name="shippingAddress.details"
            id="detail"
            className="block py-2.5 mt- px-0 w-full text-xl text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-400 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="detail"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User Details
          </label>
        </div>
        {myFormik.touched?.details &&
        myFormik.errors?.details ? (
          <div
            className="p-4 mb-6 text-xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {myFormik.errors.details}
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-6 group">
          <input
            value={myFormik.values.phone}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="tel"
            name="shippingAddress.phone"
            id="phone"
            className="block py-2.5 mt- px-0 w-full text-xl text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-400 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User Phone
          </label>
        </div>
        {myFormik.touched?.phone &&
        myFormik.errors?.phone ? (
          <div
            className="p-4 mb-6 text-xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {myFormik.errors.phone}
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-6 group">
          <input
            value={myFormik.values.city}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="text"
            name="shippingAddress.city"
            id="city"
            className="block py-2.5 mt- px-0 w-full text-xl text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-400 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User City
          </label>
        </div>
        {myFormik.touched?.city &&
        myFormik.errors?.city ? (
          <div
            className="p-4 mb-6 text-xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {myFormik.errors.city}
          </div>
        ) : null}

        <div className="flex items-center justify-center gap-5 buttons">
          <button
            onClick={() => {
              setFlag(false);
            }}
            disabled={!myFormik.isValid || !myFormik.dirty}
            type="submit"
            className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-xl w-full xl:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            {Loading1 ? (
              <i className="fas fa-spin fa-spinner"></i>
            ) : (
              "Cash Payment"
            )}
          </button>

          <button
            onClick={() => {
              setFlag(true);
            }}
            disabled={!myFormik.isValid || !myFormik.dirty}
            type="submit"
            className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-xl w-full xl:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            {Loading2 ? (
              <i className="fas fa-spin fa-spinner"></i>
            ) : (
              "Online Payment"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
