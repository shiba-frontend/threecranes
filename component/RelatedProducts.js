"use client"
import React from 'react'
import TitleStyle from './common/TitleStyle'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGE } from '@/utils/Theme';
import Link from 'next/link';
import productIMg from '@/public/assets/image/banner_img.png'
import heart from '@/public/assets/image/wish_icon.png'
import bag from '@/public/assets/image/bag_icon.png'
import star_fill from '@/public/assets/image/start_fill.png'
import star_default from '@/public/assets/image/star_default.png'
import cart_icon from '@/public/assets/image/cart_icon.png'
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import heartsolid from '@/public/assets/image/heart.png'
import ribon from '@/public/assets/image/ribon.png'
const RelatedProducts = ({content, sendDataToParent, sendDataToParentWishlist}) => {

  const datareducer = useSelector((state) => state.Dataflowreducer.token)
  const router = useRouter();



    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
               
                }
              },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
          
                dots: false,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
              }
            }
          ]
      };

      function AddCartHandle(item){
        sendDataToParent(item) 
    }

    function AddWishlistHandle(item){
      sendDataToParentWishlist(item) 
  }


  function truncateText(text, wordCount) {
    const words = text.split(" "); 
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(" ") + "..."; 
    }
    return text; 
  }


  return (
    <div className='product-sec'> 
   

        <Slider {...settings}>

            {content?.map((item, index)=>{
                  var rate = Number(item?.rating)
                return (
                    <div className='product-box' key={index}>
                        <div className='product-img'>
                        <Link href={`/product/${item?.id}`}>
                            <img src={item?.cover_image} />
                            </Link>
                            {/* {item?.price_percentage?.split('.')[0] > 0 && 
                             <span className='discount-shape'>{item?.price_percentage?.split('.')[0]}%</span>
                            } */}
                           {item?.price_percentage == 'PERCENTAGE' && 
                              <div className='ribbon'>
                                                             <img src={ribon.src} />
                                                             <span className='discount-shape'>{item?.discount_amount}% <br></br> <sub>Off</sub></span>
                                                             </div>
                            }
                            {item.product_qty <= 0 ?
                                <div className='outofstock'>
                                Out of stock
                                </div>
                                :
                            <div className='imag-cart'>
                                <ul>
                                    <li>
                                 
                                        <button onClick={()=>{
                                                datareducer != null ?
                                                AddWishlistHandle(item)
                                                :
                                             
                                                router.push('/login')
                                                }}>
                                        <label>Add to wishlist</label>
                                            <span>
                                               <span>
                                                                                             {item?.is_wishlist == 1 ?
                                                                                               <img src={heartsolid.src} className='heartIcon' />
                                                                                               :
                                                                                               <img src={heart.src} />
                                                                                           }
                                                                                              
                                                                                           </span>
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
            }
                        </div>
                        <div className='product-info'>
                        <div className='product-info-t'>
                            <h5>{item?.sub_category_name}</h5>
                            <ul>
                            {Array(5).fill().map((_, i) => {
                                    const ratingValue = i + 1;
                                return  <li key={i}><img src={ratingValue <= rate ? star_fill.src : star_default.src} /></li>
                                })}
                            </ul>
                        </div>
                                <Link href={`/product/${item?.id}`}> {truncateText(item?.name, 5)}</Link>
                                {item?.price_percentage == 'PERCENTAGE' ?  <h5>${item?.base_price} <span>₹ {item?.markup_price}</span></h5> :
                            
                            <h5>${item?.base_price} </h5>
                            }
                        </div>
                    </div>
                )
            })}

        </Slider>

</div>
  )
}

export default RelatedProducts