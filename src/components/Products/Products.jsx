import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { WishContext } from '../../Context/WishlistContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);



  async function addproducttowish(id)
  {
  let flag=  await addProductToWish(id);
  console.log(flag);
  if(flag)
  {
   toast("product added successfully to wishlist",{position:"top-center"})
 
  }else{
   toast.error("Error",{position:"top-center"})
 
  }
  
  }
  let {addtoCart}= useContext(cartContext)


async function addproducttoCart(id)
 {
 let flag=  await addtoCart(id);
 console.log(flag);
 if(flag)
 {
  toast.success("product added successfully to cart",{position:"top-center"})

 }else{
  toast.error("Error",{position:"top-center"})

 }
 
 }

  function getAllProducts() {
    setLoading(true);
    axios
      .get('https://ecommerce.routemisr.com/api/v1/products')
      .then((res) => {
        setProducts(res.data.data);
        setFilteredProducts(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getAllProducts();
  }, []);


  return (
    <div className="pt-10 m-8">
  
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="relative p-3 "
          >
            <div className="absolute left-0 right-0 flex justify-center gap-4 transition-opacity opacity-0 bottom-32 group-hover:opacity-100">
              <button
              onClick={()=>addproducttoCart(product._id)}
                title="Add to Cart"
                className="p-2 text-white bg-green-500 rounded-full hover:bg-green-600"
              >
                <i className="fa-solid fa-cart-plus"></i>
              </button>
              <button
              onClick={()=>addproducttowish(product._id)}
                title="Add to Wishlist"
                className="p-2 text-white bg-red-700 rounded-full"
              >
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>

            <Link to={`/ProductDetails/${product._id}/${product.category.name}`} className="block">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-auto rounded"
              />
              <h3 className="mt-2 text-lg font-semibold line-clamp-1">
                {product.title}
              </h3>
              <p className="text-gray-500 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                {product.priceAfterDiscount ? (
                  <>
                    <p className="text-sm text-pink-600 line-through">
                      {product.price} EGP
                    </p>
                    <p className="font-bold text-pink-600">
                      {product.priceAfterDiscount} EGP
                    </p>
                    <span className="absolute px-2 py-1 text-sm font-bold text-white bg-red-600 rounded-full sale-badge top-2 left-2 animate-pulse">
                      Sale
                    </span>
                  </>
                ) : (
                  <p className="font-bold text-pink-600">{product.price} EGP</p>
                )}

                <div className="flex items-center">
                  <p className="text-gray-500">{product.ratingsAverage}</p>
                  <i className="text-yellow-500 fa-solid fa-star"></i>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
