import { IMAGE } from '@/utils/Theme'
import React from 'react'
import Link from 'next/link'
import logo from '@/public/assets/image/logo.png'
import call_icon from '@/public/assets/image/call_icon.png'
import envelope_icon from '@/public/assets/image/envelope_icon.png'
import fb_icon from '@/public/assets/image/fb_icon.png'
import linkdin_icon from '@/public/assets/image/linkdin_icon.png'
import instagram_icon from '@/public/assets/image/instagram_icon.png'
import twitter_icon from '@/public/assets/image/twitter_icon.png'
import card from '@/public/assets/image/card.png'



const Footer = () => {
  return (
    <div className='footer-sec'>
        <div className='container'>
            <div className='row'>
            <div className='col-lg-4'>
                 
                
                    <img src={logo.src} alt="logo" className='footer-logo mb-3 w-100' />
                    <div className='footer-contact'>
                        <span>
                            <img src={call_icon.src} alt="call" />
                            </span>
                            <div className='footer-contact-right'>
                                <label>Monday-Friday: 08am-9pm</label>
                                <b>0 800 300-353</b>
                            </div>
                    </div>
                    <div className='footer-contact'>
                        <span>
                            <img src={envelope_icon.src} alt="call" />
                            </span>
                            <div className='footer-contact-right'>
                                <label>Need help with your order?</label>
                                <b>info@example.com</b>
                            </div>
                    </div>
                    <h5>Follow us on social media</h5>
                    <ul className='social-footer'>
                        <li>
                            <a href='#' target='_blank' ><img src={fb_icon.src} alt="icon" /></a>
                        </li>
                        <li>
                            <a href='#' target='_blank' ><img src={linkdin_icon.src} alt="icon" /></a>
                        </li>
                        <li>
                            <a href='#' target='_blank' ><img src={twitter_icon.src} alt="icon" /></a>
                        </li>
                        <li>
                            <a href='#' target='_blank' ><img src={instagram_icon.src} alt="icon" /></a>
                        </li>
                    </ul>
                </div>
   
            <div className='col-lg-8'>
            <div className='row'>
      
                        <div className='col-lg-4'>
                            <div className='footer-widget'>
                                <h3>Store</h3>
                                <ul>
                                    <li>
                                        <Link href="/">Men Fashion</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Women Fashion</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Others</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='footer-widget'>
                                <h3>Help</h3>
                                <ul>
                                    <li>
                                        <Link href="/">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Shipping & Delivery</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Refund Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Payments</Link>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='footer-widget'>
                                <h3>Support</h3>
                                <ul>
                                    <li>
                                        <Link href="/">Feedback</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Contact us</Link>
                                    </li>
                                    <li>
                                        <Link href="/">About us</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Terms & condition</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Help Center</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>
              </div>
          
            <div className='copyright'>
                <p>Copyright 2024 © ThreeCranesGallery. </p>
                <img src={card.src} alt="card" />
            </div>
        </div>
        </div>
  )
}

export default Footer