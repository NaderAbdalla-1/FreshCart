import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import Slider from 'react-slick';
import { cartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/WishlistContext';
import { toast } from 'react-toastify';


export default function ProductDetails() {
  const { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch the product details
  function getSpecificProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }


  
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
  let{addProductToWish}= useContext(WishContext)
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
  // Fetch related products
  function getRelatedProducts(category) {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/products')
      .then((res) => {
        const result = res.data.data.filter(
          (prod) => prod.category.name === category && prod._id !== id
        );
        setRelatedProducts(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (id) {
      getSpecificProduct(id);
    }
    if (category) {
      getRelatedProducts(category);
    }
  }, [id, category]);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-60">
        <BallTriangle height={120} width={120} color="#db2777" visible={true} />
      </div>
    );
  }

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="grid grid-cols-[1fr_2fr] my-24">
        <div className='  mx-8'>
          <img className="w-full" src={product.imageCover} alt={product.title} />
        </div>
        <div className="my-48">
          <h1 className="text-4xl font-bold text-pink-700">{product.title}</h1>
          <div className="flex justify-between">
            <p className="py-10">{product.description}</p>
            <div className="flex items-center pe-40">
              <p className="text-gray-500">{product.ratingsAverage}</p>
              <i className="text-yellow-500 fa-solid fa-star"></i>
            </div>
          </div>
          <p className="font-bold text-pink-700">{product.price} EGP</p>

          <button 
          onClick={()=>addproducttoCart(product._id)}
          className="w-2/3 p-2 my-10 text-white bg-pink-700 rounded-lg me-10">
            Add To Cart
          </button>
          <button
          onClick={()=>addproducttowish(product._id)}
            title="Add to Wishlist"
            className="p-2 text-white bg-red-700 rounded-full"
          >
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>

      {/* Related Products Slider */}
      <div className="mt-20">
        <h2 className="mb-5 text-2xl font-bold text-center text-pink-700">
          Related Products
        </h2>
        <Slider {...sliderSettings}>
          {relatedProducts.map((related) => (
            <div key={related._id} className="p-3">
              <Link to={`/ProductDetails/${related._id}/${category}`}>
              <img
           className="w-full h-48 object-contain rounded bg-gray-100"
            src={related.imageCover}
         alt={related.title}
            />
                <h3 className="mt-2 text-lg font-semibold line-clamp-1">
                  {related.title}
                </h3>
                <p className="font-bold text-pink-600">
                  {related.priceAfterDiscount || related.price} EGP
                </p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
