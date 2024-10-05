"use client"
import { useParams } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { IMAGE } from '@/utils/Theme'
import Accordion from 'react-bootstrap/Accordion';
import { Button, Card } from 'react-bootstrap'
import rightArrow from '@/public/assets/image/right_arrow.png'
import productIMg from '@/public/assets/image/banner_img.png'
import heart from '@/public/assets/image/wish_icon.png'
import bag from '@/public/assets/image/bag_icon.png'
import star_fill from '@/public/assets/image/start_fill.png'
import star_default from '@/public/assets/image/star_default.png'
import grid_icon from '@/public/assets/image/grid_icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faSquarePhone } from '@fortawesome/free-solid-svg-icons'

const page = () => {
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
                        <b>Contact Us</b>
                    </li>
                </ul>
            </div>
          
            <div className='row'>
                <div className='col-lg-5'>
                    <h3>Contact Information</h3>
                    <div className='c-info mt-4'>
                    <span><FontAwesomeIcon icon={faPhone} /></span>
                         <div>
                            <h4>Phone</h4>
                            <a href='tel:63436637'>63436637</a>
                         </div>
                    </div>
                    <div className='c-info'>
                    <span><FontAwesomeIcon icon={faEnvelope} /></span>
                         <div>
                            <h4>Email</h4>
                            <a href='mailto:support.threcranes@gmail.com'>support.threcranes@gmail.com</a>
                         </div>
                    </div>
                </div>
                <div className='col-lg-7'>
                <h3>Get In Touch</h3>
                <div className='card mt-4'>
                <div className='card-body form-style bg-light'>
          
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='form-group mb-3'>
                            <input type='text' className='form-control' placeholder='First Name'/>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='form-group mb-3'>
                            <input type='text' className='form-control' placeholder='Last Name'/>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='form-group mb-3'>
                            <input type='text' className='form-control' placeholder='Phone'/>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='form-group mb-3'>
                            <input type='email' className='form-control' placeholder='Email'/>
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className='form-group mb-3'>
                            <input type='text' className='form-control' placeholder='Subject'/>
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className='form-group mb-3'>
                            <textarea className='form-control' placeholder='Message'></textarea>
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className='form-group mb-3'>
                            <button className='themeBtn'>Submit</button>
                        </div>
                    </div>
                </div>
                </div>
            </div> 
            </div>
            </div> 
        </div>
    </div>
  )
}

export default page