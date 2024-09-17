"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import rightArrow from '@/public/assets/image/right_arrow.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import productIMg from '@/public/assets/image/banner_img.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import star_fill from '@/public/assets/image/start_fill.png'
import star_default from '@/public/assets/image/star_default.png'
import FeatureProducts from '@/component/FeatureProducts'
import buy_icon from '@/public/assets/image/buy_icon.png'
import wishlist_icon from '@/public/assets/image/wishlist_icon.png'
import share_icon from '@/public/assets/image/share_icon.png'
import plus_icon from '@/public/assets/image/plus_icon.png'
import minus_icon from '@/public/assets/image/minus_icon.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Page = () => {

    const {category, details} = useParams()

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        customPaging: i => (
          <div className='thumbnail_image'>
            {i.category}
          </div>
        )
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
        }
    ]


  return (

    <div className='inner-sec py-3'>
    <div className='container'>
        <div className='breadcrames'>
            <ul>
                <li>
                    <Link href="/" >Home </Link>
                </li>
                <li>
                <img src={rightArrow.src} alt="icon" />
                </li>
                
                <li>
                    <Link href="/categories" >Categories  </Link>
                </li>
                <li>
                <img src={rightArrow.src} alt="icon" />
                </li>
                <li>
                    <Link href="/product/categories" >{category}  </Link>
                </li>
                <li>
                    <img src={rightArrow.src} alt="icon" />
                </li>
                <li>
                    <b>{details}</b>
                </li>
            </ul>
        </div>
        <div className='row'>
            <div className='col-lg-5'>
                <div className='left-img'>
            <Carousel>
                <div className='proImg'>
                <img src={productIMg.src} />
                </div>
                <div className='proImg'>
                <img src={productIMg.src} />
                </div>
                <div className='proImg'>
                <img src={productIMg.src} />
                </div>
            </Carousel>
            </div>
            {/* <Slider {...settings}>
        {
            data.map((item, index)=>{
                return (
                    <div>
                        <img src={productIMg.src} />
                  </div>
                )
            })
        }
      
      

      </Slider> */}
            </div>
            <div className='col-lg-7'>

                <div className='product-details'>
                    <h2>Top Long Sleeve crop top hippy blouse</h2>
                    <ul  className='rating-list'>
                        <li>
                        <ul>
                        <li>
                                        <img src={star_fill.src} />
                                    </li>
                                    <li>
                                    <img src={star_fill.src} />
                                    </li>
                                    <li>
                                    <img src={star_fill.src} />
                                    </li>
                                    <li>
                                    <img src={star_fill.src} />
                                    </li>
                                    <li>
                                        <img src={star_default.src} />
                                    </li>
                                </ul>
                        </li>
                        <li>
                            <span>3.00</span>
                        </li>
                        <li>
                            <label>2 (Reviews)</label>
                        </li>
                        <li>
                            <label>SKU:</label>
                            <b>E7F8G9H0</b>
                        </li>
                    </ul>
                    <p>Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. 
                        Class aptent taciti sociosqu ad litora torquent Vivamus adipiscing nisl ut dolor dignissim semper.</p>
                        <h5>₹ 2,601 <span>₹ 3,000</span></h5>

                <ul className='product-varient'>
                        <li>
                            <label>Select Size</label>
                            <select className='form-control'>
                                <option>--Select--</option>
                                <option>S</option>
                                <option>M</option>
                            </select>
                        </li>
                        <li>
                            <label>Select Color</label>
                            <select className='form-control'>
                                <option>--Select--</option>
                                <option>S</option>
                                <option>M</option>
                            </select>
                        </li>
                        <li>
                            <label>Select Range</label>
                            <select className='form-control'>
                                <option>--Select--</option>
                                <option>S</option>
                                <option>M</option>
                            </select>
                        </li>
                        
                </ul>
                <ul className='quantity-add'>
                    <li>
                        <div className='quantity-box'>
                        <button><img src={minus_icon.src} /></button>
                            <input type='text' />
                            <button><img src={plus_icon.src} /></button>
                        </div>
                    </li>
                    <li>
                        <button className='addtocartBtn'><img src={buy_icon.src} /> Add to cart</button>
                    </li>
                    <li>
                        <Link href="#" className='buynowBtn'><img src={buy_icon.src} /> Buy Now</Link>
                     
                    </li>
               
                </ul>
                <ul className='wishlist-sec'>
                        <li>
                            <button><img src={wishlist_icon.src} />  Add to wishlist</button>
                        </li>
                        <li>
                            <Link href="#"><img src={share_icon.src} /> Share this Product</Link>
                        </li>
                </ul>
                </div>

            </div>
        </div>
    
    <div className='pro-tab-details'>
    <Tabs
      defaultActiveKey="description"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="description" title="Description">
        <p>Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin vitae magna in dui finibus malesuada et at nulla. 
            Morbi elit ex, viverra vitae ante vel, blandit feugiat ligula. Fusce fermentum iaculis nibh, at sodales leo maximus a. Nullam ultricies sodales nunc, in pellentesque lorem mattis quis. Cras imperdiet est in nunc tristique lacinia. Nullam aliquam mauris eu accumsan tincidunt. Suspendisse velit ex, aliquet vel ornare vel, dignissim a tortor.</p>
            <p>
            Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque.
             Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.
            </p>
      </Tab>
      <Tab eventKey="review" title="Reviews (2)">
      Reviews
      </Tab>
    </Tabs>
    </div>
    <FeatureProducts />
    </div>
</div>

 
  )
}

export default Page