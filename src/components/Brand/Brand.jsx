import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';

export default function Brand() {
  const [brands, setbrands] = useState([]);
  const [loading, setLoading] = useState(false);

  function fetchbrands() {
    setLoading(true);
    axios
      .get('https://ecommerce.routemisr.com/api/v1/brands')
      .then((res) => {
        setbrands(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching brands:', error);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchbrands();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-52">
        <BallTriangle height={120} width={120} color="#db2777" visible={true} />
      </div>
    );
  }

  return (
    <div className="catogries mt-20 md:mt-14 px-4 md:px-20"> 
      <h1 className="text-5xl text-center text-pink-600 font-semibold pt-10 mb-5">
        Our Brands
      </h1>
      {brands.length > 0 ? (
        <div className="flex flex-wrap">
          {brands.map((brand) => (
            <div key={brand._id} className="w-full lg:w-1/4 md:w-1/3 sm:w-1/2 p-3">
              <div className="brand rounded-lg shadow-2xl overflow-hidden cursor-pointer">
                <img
  className="h-[200px] object-cover transform transition-transform duration-300 hover:scale-110 hover:shadow-xl hover:shadow-pink-600"
  src={brand.image}
                  alt={brand.name}
                />
                <h2 className="m-3 text-pink-600 text-2xl font-bold">
                  {brand.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className="loader my-40 block mx-auto"></span>
      )}
    </div>
  );
}
