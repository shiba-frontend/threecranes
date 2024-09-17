"use client"
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGE } from '@/utils/Theme';
import Link from 'next/link';
import TitleStyle from '../common/TitleStyle'

const Testimonial = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      
      };

    var data = [
        {
            title:'Tie Dye mini wrap',
            description:'"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”',
            discount:'3,000',
            category:'Women'
        },
        {
            title:'Tie Dye mini wrap',
            description:'"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”',
            discount:'3,000',
            category:'Women'
        },
        {
            title:'Tie Dye mini wrap',
            description:'"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”',
            discount:'3,000',
            category:'Women'
        },
        {
            title:'Tie Dye mini wrap',
            description:'"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”',
            discount:'3,000',
            category:'Women'
        },
        {
            title:'Tie Dye mini wrap',
            description:'"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”',
            discount:'3,000',
            category:'Women'
        },
        {
            title:'Tie Dye mini wrap',
            description:'"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”',
            discount:'3,000',
            category:'Women'
        }
    ]





  return (
    <div className='testimonial-sec'>
        <div className='container'>
            <TitleStyle title="Our Happy Customers"  />

            <Slider {...settings}>

{data.map((item, index)=>{
    return (
        <div className='testimonial-box' key={index}>
           <div className='testi-avatar'>
           <img src={IMAGE.banner_img} />
            <span>Alex K.</span>
           </div>
          <ul>
            <li><img src={IMAGE.star_fill} /></li>
            <li><img src={IMAGE.star_fill} /></li>
            <li><img src={IMAGE.star_fill} /></li>
            <li><img src={IMAGE.star_fill} /></li>
            <li><img src={IMAGE.star_fill} /></li>
          </ul>
           <p>{item?.description}</p>
            
        </div>
    )
})}

</Slider>
        </div>
    </div>
  )
}

export default Testimonial