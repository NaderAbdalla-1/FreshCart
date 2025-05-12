import React,{ useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Allorders() {
  const token  = localStorage.getItem("token")
  const { id } = jwtDecode(token);
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);


  async function getAllOrder(id) {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    getAllOrder(id);
  }, [id]);
  if (orders == 0) {
    return <>
   <h1>No Orders Yet</h1>
   
  
    </>
   
  }
  console.log(orders)
 
  return (
    <>
      <div className="orders my-40 md:my-14 mx-20 ">
        <h1 className="text-5xl text-center text-pink-600 font-semibold mb-5  pt-10">
          Orders
        </h1>
        {loading ? (
          <span className="loader my-40 block mx-auto"></span>
        ) : orders && orders.length > 0 ? (
          <div className="orders grid lg:grid-cols-2 gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="order bg-white border border-gray-600 rounded-lg p-6 mb-6"
              >
                <div>
                    <h2 className="text-sm text-gray-400">Order ID</h2>
                    <h3 className="text-lg font-semibold text-gray-700">{order.id}</h3>
                  </div>
                
                <div className="cartItems mt-3">
                  <h3 className="text-lg text-gray-600 mb-3">
                    Items in this order: {order.cartItems.length}
                  </h3>
                  {order.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="cartItem flex items-center flex-col md:flex-row gap-8 border-t border-pink-600 py-3"
                    >
                      <div className="image">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-[250px]"
                        />
                      </div>
                      <div className="content w-full">
                        <p className="font-semibold text-2xl text-pink-600">
                          {item.product.title}
                        </p>
                        <p className="font-semibold text-2xl mt-3">
                          {item.product.category.name}
                        </p>
                        <img
                          src={item.product.brand.image}
                          alt={item.product.brand.name}
                          className="w-[80px] mt-3"
                        />
                        <p className="text-pink-600 text-xl mb-3">
                          <span className="text-black font-semibold">
                            Quantity:{" "}
                          </span>
                          {item.count}
                        </p>
                        <p className="text-pink-600 text-xl mb-3">
                          <span className="text-black font-semibold">
                            Price:{" "}
                          </span>
                          ${item.price * item.count}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1 className="text-pink-600 font-semibold text-3xl md:text-4xl mt-24 w-11/12 md:w-3/4 mx-auto text-center p-5">
              No Orders
            </h1>
            <Link
              to={"/products"}
              className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-900 font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center block mx-auto"
            >
              Go to Products
            </Link>
          </div>
        )}
      </div>
    </>
  );
            }
