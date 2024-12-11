"use client"
import React, { useState } from 'react'
import TitleStyle from './common/TitleStyle'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGE } from '@/utils/Theme';
import Link from 'next/link';
import bag from '@/public/assets/image/bag_icon.png'
import heart from '@/public/assets/image/wish_icon.png'
import { AddCart, GetCart, GetHome } from '@/utils/Apirequest';
import { GetcartAction } from '@/redux/reducer/DataflowReducer';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Loader from '@/utils/Loader';
import cart_icon from '@/public/assets/image/cart_icon.png'


const ArrivalProduct = ({content, sendDataToParent}) => {

    const [loading, setloading] = useState(false)
    const [productList, setproductList] = useState(content)

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

    //   const GetApiRequest = async () =>{
  
    //     let responsedata =  await GetHome()
      
    //     if(responsedata?.response_code == 200){
    //         setproductList(responsedata?.data?.section3)
  
    //     }
       
    //   }

    function AddCartHandle(item){
        sendDataToParent(item) 
    }
 
  


  return (
    <div className='product-sec'> 
        {loading && <Loader/>}
        <div className='container'>
            <TitleStyle title={content?.sec3_title} sub={content?.sec3_description} />

            <Slider {...settings}>

                {content?.products?.map((item, index)=>{
                    return (
                        <div className='product-box' key={index}>
                            <div className='product-img'>
                                <img src={item?.cover_image} />
                                <span className='discount-shape'>{item?.price_percentage?.split('.')[0]}%</span>
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
                                            {item?.is_cart == 1 ? 
                                            
                                            <span>
                                             <Link href={`/cart`}><img src={cart_icon.src} alt='logo' /></Link>
                                            </span>
                                            :

                                            <button onClick={()=>AddCartHandle(item)}>
                                            <label>Add to cart</label>
                                                <span>
                                                    <img src={bag.src} />
                                                </span>
                               
                                            </button>
                                        }
                                            
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='product-info'>
                            <div className='product-info-t'>
                                <h5>{item?.sub_category_name}</h5>
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
                                    <Link href={`/product/${item?.id}`}> {item?.name}</Link>
                                    <h5>₹ ${item?.base_price} <span>₹ {item?.markup_price}</span></h5>
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