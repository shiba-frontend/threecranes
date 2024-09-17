"use client"
import { useParams } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { IMAGE } from '@/utils/Theme'
import Accordion from 'react-bootstrap/Accordion';
import { Button, Card } from 'react-bootstrap'
import rightArrow from '@/public/assets/image/right_arrow.png'
import productIMg from '@/public/assets/image/banner_img.png'
import heart from '@/public/assets/image/heart.png'
import bag from '@/public/assets/image/bag.png'
import star_fill from '@/public/assets/image/start_fill.png'
import star_default from '@/public/assets/image/star_default.png'
import grid_icon from '@/public/assets/image/grid_icon.png'


const Page = () => {
    const {category} = useParams()

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
                        <b>{category}</b>
                    </li>
                </ul>
            </div>
            <div className='row'>
                <div className='col-lg-3'>
                    <div className='left-sidebar'>
                    <h3><img src={grid_icon.src} alt="icon" /> All Categories</h3>
                        <Accordion defaultActiveKey="0">
                             
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Dresses Printed</Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li>
                                    <Link href="/product/Dresses">Dresses Printed </Link>
                                </li>
                                <li>
                                    <Link href="/product/Dresses">Dresses Printed </Link>
                                </li>
                            </ul>
                                
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Dresses Tie Dye <span>(42)</span></Accordion.Header>
                        <Accordion.Body>
                        <ul>
                                <li>
                                    <Link href="/product/Dresses">Dresses Printed </Link>
                                </li>
                               
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                       
                    </div>
                </div>
                <div className='col-lg-9'>
                    <div className='row'>
                    {data.map((item, index)=>{
                    return (
                        <div className='col-lg-4' key={index}>
                        <div className='product-box' >
                            <div className='product-img'>
                                <img src={productIMg.src} />
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
                            </div>
                                    <Link href={`/product/${item?.category}/123`}> {item?.title}</Link>
                                    <h5>₹ 2,601 <span>₹ 3,000</span></h5>
                            </div>
                        </div>
                        </div>
                    )
                })}
                    </div>
              
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page