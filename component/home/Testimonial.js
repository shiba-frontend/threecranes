"use client"
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGE } from '@/utils/Theme';
import Link from 'next/link';
import TitleStyle from '../common/TitleStyle'

const Testimonial = ({content}) => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      
      };


  return (
    <div className='testimonial-sec'>
        <div className='container'>
            <TitleStyle title="Our Happy Customers"  />

            <Slider {...settings}>

{content?.map((item, index)=>{

    var rate = Number(item?.rate)


    return (
        <div className='testimonial-box' key={index}>
           <div className='testi-avatar'>
           <img src={item?.image} />
            <span>{item?.name}</span>
           </div>
          <ul>
       
          {Array(5).fill().map((_, i) => {
                const ratingValue = i + 1;
              return  <li key={i}><img src={ratingValue <= rate ? IMAGE.star_fill : IMAGE.star_default} /></li>
            })}
           
            
          </ul>
           <p>{item?.review}</p>
            
        </div>
    )
})}

</Slider>
        </div>
    </div>
  )
}

export default Testimonial