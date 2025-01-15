'use client'
import { IMAGE } from '@/utils/Theme'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import logo from '@/public/assets/image/logo.png'
import call_icon from '@/public/assets/image/call_icon.png'
import envelope_icon from '@/public/assets/image/envelope_icon.png'
import fb_icon from '@/public/assets/image/fb_icon.png'
import linkdin_icon from '@/public/assets/image/linkdin_icon.png'
import instagram_icon from '@/public/assets/image/instagram_icon.png'
import twitter_icon from '@/public/assets/image/twitter_icon.png'
import card from '@/public/assets/image/card.png'
import Loader from '@/utils/Loader'
import ApiConnection from '@/utils/ApiConnection'
import { useDispatch, useSelector } from 'react-redux'
import { SitedataAction } from '@/redux/reducer/DataflowReducer'




const Footer = () => {
    const [loading, setloading] = useState(false)
    const cartreducer = useSelector((state) => state.Dataflowreducer)
    const [sitedata, setsitedata] = useState('')

    let dispatch = useDispatch()


const getData = async () =>{
    try{
        setloading(true)
        const response = await ApiConnection.get('get-app-setting')
        setloading(false)
        if(response?.data.status){
            setsitedata(response?.data?.data)
            dispatch(SitedataAction(response?.data?.data))
        } 
    }catch(e){}
}

useEffect(()=>{
    getData() 
},[])



  return (
    <div className='footer-sec'>
            {loading && <Loader/>}
        <div className='container'>
            <div className='row'>
            <div className='col-lg-4'>
                 
                
                    <img src={sitedata?.site_logo} alt="logo" className='footer-logo mb-3' />
                    <div className='footer-contact'>
                        <span>
                            <img src={call_icon.src} alt="call" />
                            </span>
                            <div className='footer-contact-right'>
                                <label>{sitedata?.timing}</label>
                                <b><a href={`tel:${sitedata?.site_phone}`}>{sitedata?.site_phone}</a></b>
                            </div>
                    </div>
                    <div className='footer-contact'>
                        <span>
                            <img src={envelope_icon.src} alt="call" />
                            </span>
                            <div className='footer-contact-right'>
                                <label>Need help with your order?</label>
                                <b><a href={`mailTo:${sitedata?.site_mail}`}>{sitedata?.site_mail}</a></b>
                              
                            </div>
                    </div>
                    <h5>Follow us on social media</h5>
                    <ul className='social-footer'>
                        <li>
                            <a href={sitedata?.facebook_profile} target='_blank' ><img src={fb_icon.src} alt="icon" /></a>
                        </li>
                        <li>
                            <a href={sitedata?.linkedin_profile} target='_blank' ><img src={linkdin_icon.src} alt="icon" /></a>
                        </li>
                        <li>
                            <a href={sitedata?.twitter_profile} target='_blank' ><img src={twitter_icon.src} alt="icon" /></a>
                        </li>
                        <li>
                            <a href={sitedata?.instagram_profile} target='_blank' ><img src={instagram_icon.src} alt="icon" /></a>
                        </li>
                    </ul>
                </div>
   
            <div className='col-lg-8'>
            <div className='row'>
      
                        <div className='col-lg-4'>
                            <div className='footer-widget'>
                                <h3>Store</h3>
                                <ul>
                                {cartreducer?.CategoryMenu?.map((item, i)=>{
                        return (
                            <li key={i}>
                                <Link href={`/product/category/${item?.parent_category_id}`}>{item?.parent_category_name}</Link>
                        </li>
                        )
                    })}
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='footer-widget'>
                                <h3>Help</h3>
                                <ul>
                                    <li>
                                        <Link href="/cms/privacy-policy">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="/cms/shipping-information">Shipping & Delivery</Link>
                                    </li>
                                    <li>
                                        <Link href="/cms/refund-policy">Refund Policy</Link>
                                    </li>
                                   
                                   
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='footer-widget'>
                                <h3>Support</h3>
                                <ul>
                                  
                                    <li>
                                        <Link href="/contact-us">Contact us</Link>
                                    </li>
                                    <li>
                                        <Link href="/cms/about-us">About us</Link>
                                    </li>
                                    <li>
                                        <Link href="/cms/order-terms">Terms & condition</Link>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='map-view'>
                         <div dangerouslySetInnerHTML={{__html:sitedata?.google_map_embed_code}} />
                      
                    </div>
                    </div>
              </div>
          
            <div className='copyright'>
                <p>© {new Date().getFullYear()} Three Cranes Gallery. ALL RIGHTS RESERVED</p>
                <img src={card.src} alt="card" />
            </div>
        </div>
        </div>
  )
}

export default Footer