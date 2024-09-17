"use client"
import React from 'react'
import TitleStyle from './common/TitleStyle'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGE } from '@/utils/Theme';
import Link from 'next/link';
import bag from '@/public/assets/image/bag_icon.png'
import heart from '@/public/assets/image/wish_icon.png'

const ArrivalProduct = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 4,
        responsive: [
          
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };

    var data = [
        {
            title:'Tie Dye mini wrap',
            mrp:'2,601',
            discount:'3,000',
            category:'Women'
        },
        {
            title:'Tie Dye mini wrap',
            mrp:'2,601',
            discount:'3,000',
            category:'Women'
        },
        {
            title:'Tie Dye mini wrap',
            mrp:'2,601',
            discount:'3,000',
            category:'Women'
        },
        {
            title:'Tie Dye mini wrap',
            mrp:'2,601',
            discount:'3,000',
            category:'Women'
        },
        {
            title:'Tie Dye mini wrap',
            mrp:'2,601',
            discount:'3,000',
            category:'Women'
        },
        {
            title:'Tie Dye mini wrap',
            mrp:'2,601',
            discount:'3,000',
            category:'Women'
        }
    ]


  return (
    <div className='product-sec'> 
        <div className='container'>
            <TitleStyle title="New Arrivals" sub="Check out most promising product bought by our buyers" />

            <Slider {...settings}>

                {data.map((item, index)=>{
                    return (
                        <div className='product-box' key={index}>
                            <div className='product-img'>
                                <img src={IMAGE.banner_img} />
                                <span className='discount-shape'>40%</span>
                                <div className='imag-cart'>
                                    <ul>
                                        <li>
                                            <button>
                                            <label>Add to wishlist</label>
                                                <span>
                                                    <img src={heart.src} />
                                                </span>
                                              
                                            </button>
                                        </li>
                                        <li>
                                            <button>
                                            <label>Add to cart</label>
                                                <span>
                                                    <img src={bag.src} />
                                                </span>
                               
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='product-info'>
                            <div className='product-info-t'>
                                <h5>Women</h5>
                                <ul>
                                    <li>
                                        <img src={IMAGE.star_fill} />
                                    </li>
                                    <li>
                                        <img src={IMAGE.star_fill} />
                                    </li>
                                    <li>
                                        <img src={IMAGE.star_fill} />
                                    </li>
                                    <li>
                                        <img src={IMAGE.star_fill} />
                                    </li>
                                    <li>
                                        <img src={IMAGE.star_default} />
                                    </li>
                                </ul>
                            </div>
                                    <Link href={`/product/123`}> {item?.title}</Link>
                                    <h5>₹ 2,601 <span>₹ 3,000</span></h5>
                            </div>
                        </div>
                    )
                })}

            </Slider>

        </div>
    </div>
  )
}

export default ArrivalProduct