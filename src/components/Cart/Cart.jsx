import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { FaTrash, FaHeart } from "react-icons/fa";
import { BallTriangle } from 'react-loader-spinner';
import { WishContext } from "../../Context/WishlistContext";
import { Link } from "react-router-dom";


export default function Cart() {
  const {
    displayCart,
    numofCart,
    productsCart,
    totalCartPrice,
    removeFromCart,
    clearCart,
    updateCartItem,
  } = useContext(cartContext);

 let {addProductToWish}= useContext(WishContext)

  const [loading, setLoading] = useState(false); 
  const [processType, setProcessType] = useState(""); // For specific loading messages

  // Fetch cart details on mount
  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      setProcessType("Fetching cart details...");
      await displayCart();
      setLoading(false);
    }
    fetchCart();
  }, []);

  // Loading Screen
  if (loading) {
    return (
      <div className="flex justify-center mt-52 md:px-20">
        <BallTriangle height={120} width={120} color="#db2777" visible={true} />
      </div>
    ); 
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        {numofCart !== null && (
          <p className="text-lg text-gray-700">
            Items in Cart: <span className="font-bold">{numofCart}</span>
          </p>
        )}
      </div>

      {/* Cart Content */}
      {numofCart === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
          <Link to={"/"}>
          <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Continue Shopping
          </button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Products */}
            {productsCart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
              >
                {/* Product Info */}
                <div className="flex items-center">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title || "Product"}
                    className="w-20 h-20 rounded-md mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.product.title || "Unnamed Product"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.count}
                    </p>
                    <p className="text-lg font-bold text-pink-600">
                      ${item.price}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center">
                    <button
                      onClick={async () => {
                        setLoading(true);
                        setProcessType("Updating quantity...");
                        await updateCartItem(item.product._id, item.count - 1);
                        setLoading(false);
                      }}
                      disabled={item.count <= 1}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="px-3">{item.count}</span>
                    <button
                      onClick={async () => {
                        setLoading(true);
                        setProcessType("Updating quantity...");
                        await updateCartItem(item.product._id, item.count + 1);
                        setLoading(false);
                      }}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={async () => {
                      setLoading(true);
                      setProcessType("Adding to Wishlist...");
                      await removeFromCart(item.product._id);
                      addProductToWish(item.product._id)
                      setLoading(false);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaHeart size={18} />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={async () => {
                      setLoading(true);
                      setProcessType("Removing item...");
                      await removeFromCart(item.product._id);
                      setLoading(false);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center"
                  >
                    <FaTrash size={14} className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link to="/Payment">
            <button className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-900 font-medium rounded-lg text-md w-full px-5 py-3 text-center block my-3">
              Checkout
            </button>
          </Link>
          {/* Cart Footer */}
          <div className="mt-6 flex justify-between items-center">
            {/* Clear Cart */}
            <button
              onClick={async () => {
                setLoading(true);
                setProcessType("Clearing cart...");
                await clearCart();
                setLoading(false);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear All
            </button>
            

            {/* Total Price */}
            <p className="text-xl font-bold">
              Total: <span className="text-green-600">${totalCartPrice}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
