import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';


export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);


  function fetchCategories() {
    setLoading(true);
    axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }
  

  useEffect(() => {
    fetchCategories();
  }, []);


  
  if (loading) {
    return (
      <div className="flex justify-center mt-52">
        <BallTriangle height={120} width={120} color="#db2777" visible={true} />
      </div>
    ); // Show loader while loading
  }

  return (
    <>
    <div className="catogries mt-20 md:mt-14 md:px-20">
      <h1 className="text-5xl text-center text-pink-600 font-semibold pt-10 mb-5">
        Our Categories
      </h1>
      {categories.length > 0 ? (
        <div className="flex flex-wrap ">
          {categories.map((category) => (
            <div key={category._id} className="w-full md:w-1/4 p-3">
              <div
                className="category rounded-lg shadow-lg overflow-hidden cursor-pointer"
                
              >
                <img
                  className="w-full h-[280px] object-cover transform transition-transform duration-300 hover:scale-110"
                  src={category.image}
                  alt={category.name}
                />
                <h2 className="m-3 text-pink-600 text-2xl font-bold">
                  {category.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className="loader my-40 block mx-auto"></span>
      )}
    </div>

  
  </>
    
  );
}
