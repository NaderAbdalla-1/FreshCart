import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [data, setData] = useState({
    users: [],
    orders: [],
    products: [],
  });

  const fetchData = async () => {
    try {
      const usersResponse = await axios.get('https://ecommerce.routemisr.com/api/v1/users');
      console.log('Users Response:', usersResponse.data);

      const ordersResponse = await axios.get('https://ecommerce.routemisr.com/api/v1/orders');
      console.log('Orders Response:', ordersResponse.data);

      const productsResponse = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      console.log('Products Response:', productsResponse.data);

      const fetchedData = {
        users: Array.isArray(usersResponse.data?.users) ? usersResponse.data.users : [],
        orders: Array.isArray(ordersResponse.data?.data) ? ordersResponse.data.data : [],
        products: Array.isArray(productsResponse.data?.data) ? productsResponse.data.data : [],
      };

      localStorage.setItem('dashboardData', JSON.stringify(fetchedData));
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem('dashboardData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("Data from localStorage:", parsedData);

      setData({
        users: Array.isArray(parsedData?.users?.users) ? parsedData.users.users : [],
        orders: Array.isArray(parsedData?.orders?.data) ? parsedData.orders.data : [],
        products: Array.isArray(parsedData?.products?.data) ? parsedData.products.data : [],
      });
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className="container px-4 py-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-pink-500">Admin Dashboard</h1>

      <div className="flex flex-wrap mb-6 -mx-2">
        <div className="w-full px-2 mb-6 lg:w-1/2 lg:mb-0">
          <h2 className="mb-4 text-2xl font-semibold text-pink-500">Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-pink-500 table-auto bg-pink-50">
              <thead className="bg-pink-200">
                <tr className="text-gray-700">
                  <th className="px-4 py-2 border border-pink-500">ID</th>
                  <th className="px-4 py-2 border border-pink-500">Name</th>
                  <th className="px-4 py-2 border border-pink-500">Email</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data?.users) && data?.users.length > 0 ? (
                  data.users.map((user) => (
                    <tr key={user._id} className="bg-white border-b border-pink-500">
                      <td className="px-4 py-2 border border-pink-500">{user._id}</td>
                      <td className="px-4 py-2 border border-pink-500">{user.name}</td>
                      <td className="px-4 py-2 border border-pink-500">{user.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-2 text-center border border-pink-500">No users available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full px-2 lg:w-1/2">
          <h2 className="mb-4 text-2xl font-semibold text-pink-500">Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-pink-500 table-auto bg-pink-50">
              <thead className="bg-pink-200">
                <tr className="text-gray-700">
                  <th className="px-4 py-2 border border-pink-500">ID</th>
                  <th className="px-4 py-2 border border-pink-500">Cost</th>
                  <th className="px-4 py-2 border border-pink-500">History</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data?.orders) && data?.orders.length > 0 ? (
                  data.orders.map((order) => (
                    <tr key={order.id} className="bg-white border-b border-pink-500">
                      <td className="px-4 py-2 border border-pink-500">{order.id}</td>
                      <td className="px-4 py-2 border border-pink-500">{order.totalOrderPrice} $</td>
                      <td className="px-4 py-2 border border-pink-500">{order.updatedAt}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-2 text-center border border-pink-500">No orders available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold text-pink-500">Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-pink-500 table-auto bg-pink-50">
            <thead className="bg-pink-200">
              <tr className="text-gray-700">
                <th className="px-4 py-2 border border-pink-500">Image</th>
                <th className="px-4 py-2 border border-pink-500">ID</th>
                <th className="px-4 py-2 border border-pink-500">Name</th>
                <th className="px-4 py-2 border border-pink-500">Quantity</th>
                <th className="px-4 py-2 border border-pink-500">Price</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data?.products) && data?.products.length > 0 ? (
                data.products.map((product) => (
                  <tr key={product.id} className="bg-white border-b border-pink-500">
                    <td className="px-4 py-2 border border-pink-500">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="object-cover w-20 h-20"
                      />
                    </td>
                    <td className="px-4 py-2 border border-pink-500">{product.id}</td>
                    <td className="px-4 py-2 border border-pink-500">{product.title}</td>
                    <td className="px-4 py-2 border border-pink-500">{product.quantity}</td>
                    <td className="px-4 py-2 border border-pink-500">{product.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-2 text-center border border-pink-500">No products available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Link to="/login">
        <button className="p-3 text-white bg-pink-700 rounded hover:bg-pink-800">Logout</button>
      </Link>
    </div>
  );
}

export default Dashboard;
