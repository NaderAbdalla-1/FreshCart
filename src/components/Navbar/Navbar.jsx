import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";
import { userContext } from '../../Context/UserContext';
import { cartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/WishlistContext';

export default function Navbar() {
  let {token,settoken} = useContext(userContext)
  const { wishItems } = useContext(WishContext)
  let navigation =useNavigate()
 
  const { numofCart } = useContext(cartContext); // Get the number of items in the cart

  function logout()
  {
    localStorage.removeItem("token");
    settoken(null)
    navigation("/Login")
  }
  
  const [isMenuOpen, setIsMenuOpen] = useState(false); // state to toggle menu

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 shadow-lg bg-slate-100">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 py-3 mx-auto">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-8" />
            <span className="text-xl font-bold text-pink-600">FreshCart</span>
          </Link>
          
          {/* Button for Mobile */}
          <button
            className="text-gray-700 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`} />
          </button>

          {/* Links Section */}
        {
          token? <div className={`lg:flex lg:gap-6 items-center ${isMenuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-auto`}>
          <ul className="flex flex-col items-center w-full gap-6 lg:flex-row lg:w-auto">
            <li><NavLink to="/" className="px-4 py-2 text-lg text-gray-700 hover:text-pink-600">Home</NavLink></li>
            <li><NavLink to="/Products" className="px-4 py-2 text-lg text-gray-700 hover:text-pink-600">Products</NavLink></li>
            <li><NavLink to="/Category" className="px-4 py-2 text-lg text-gray-700 hover:text-pink-600">Categories</NavLink></li>
            <li><NavLink to="/Brand" className="px-4 py-2 text-lg text-gray-700 hover:text-pink-600">Brands</NavLink></li>
            <li><NavLink to="/Allorders" className="px-4 py-2 text-lg text-gray-700 hover:text-pink-600">Orders</NavLink></li>
          </ul>
        </div> :null
        }  
          
          {/* Icons and Buttons Section */}
          <div className="flex items-center gap-4">
            
            {/* Social Media Icons */}
            {token? <div className="hidden gap-3 text-pink-600 md:flex">
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-tiktok"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-youtube"></i>
            </div> :null}
            
            {/* Action Buttons */}
            
            <div className="flex gap-4">
             {token? 
             <>
              <NavLink to="/Wishlist" className="relative">
                <i className="text-3xl text-gray-700 fa-solid fa-heart"></i>
                {wishItems>0 && (
                  <span className="absolute w-5 h-5 text-xs text-center text-white bg-pink-600 rounded-full -top-2 -right-2">
                    {wishItems}
                    </span>
                )  }
              </NavLink> 
            
              
              <NavLink to="/Cart" className="relative">
      <i className="text-3xl text-gray-700 fa-solid fa-cart-shopping"></i>
      {numofCart > 0 && (
        <span className="absolute w-5 h-5 text-xs text-center text-white bg-pink-600 rounded-full -top-2 -right-2">
          {numofCart}
        </span>
      )}
    </NavLink>
             </> :null}
             
              {token?  <button onClick={logout} className="px-4 py-2 text-white bg-pink-700 rounded hover:bg-pink-800">
                Sign Out
              </button> :<>
              <NavLink to="/Login" className="px-4 py-2 text-pink-700 border border-pink-700 rounded hover:bg-pink-700 hover:text-white">
                Login
              </NavLink>
              
              <NavLink to="/Register" className="px-4 py-2 text-pink-700 border border-pink-700 rounded hover:bg-pink-700 hover:text-white">
                Register
              </NavLink>
              </> }
            
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
