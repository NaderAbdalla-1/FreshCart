import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);

  
  function fetchCategories() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((res) => {
        setCategories(res.data.data); 
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 7,
    autoplay: true,
    autoplaySpeed: 1000, 
    slidesToScroll: 1,
 
  };

  return (
    <div className="my-8">
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="p-4 w-full h-48 object-cover">
            <div className="  shadow-lg ">
              <img
                className="w-full  h-40 object-cover"
                src={category.image}
                alt={category.name}
              />
              <div className="p-4 text-center">
                <h3 className=" font-semibold">{category.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
