'use client'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import logo from '@/public/assets/image/logo.png'
import search_icon from '@/public/assets/image/search_icon.png'
import user_icon from '@/public/assets/image/user_icon.png'
import heart_icon from '@/public/assets/image/heart_icon.png'
import cart_icon from '@/public/assets/image/cart_icon.png'
import { getToken } from '@/utils/getToken';
import { useDispatch, useSelector } from 'react-redux'
import { AuthTokenAction, GetcartAction } from '@/redux/reducer/DataflowReducer'
import { GetCart, GetParentCategory } from '@/utils/Apirequest'

const Header = () => {

const [token, settoken] = useState(null)
const [category, setcategory] = useState([])

let dispatch = useDispatch()
const datareducer = useSelector((state) => state.Dataflowreducer.token)
const cartreducer = useSelector((state) => state.Dataflowreducer)


    const storedToken = getToken();

    useEffect(()=>{

        dispatch(AuthTokenAction(storedToken))

        const GetApiRequest = async () =>{
         
            let responsedata =  await GetParentCategory()
          
            if(responsedata?.response_code == 200){
                setcategory(responsedata?.data)
      
            }
           
          }

          const GetcartApiRequest = async () =>{
         
            let responsedata =  await GetCart()
          
            if(responsedata?.response_code == 200){
              dispatch(GetcartAction(responsedata?.data[0]?.cart_items))
              console.log(responsedata?.data)
      
      
            }
           
          }
      
          GetApiRequest()
          GetcartApiRequest()
       
    },[])

    


  return (
    <div className='header'>
        <div className='top-header'>
            <div className='container'>
                <p>We deliver to you every day from <span>7:00 to 23:00</span></p>
            </div>
        </div>
        <div className='mid-header'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-lg-3'>
                  <Link href="/">
                        <img src={logo.src} alt='logo' className='w-100' />
                  </Link>
                </div>
                <div className='col-lg-5'>
                    <div className='search-area'>
                      <input type='text' className='form-control' placeholder='Search for products, categories or brands...' />
                      <button>
                          <img src={search_icon.src} alt='logo' />
                      </button>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <ul>
                      <li>
                      {datareducer !== null ?
                          <Link href="/login"> <img src={user_icon.src} alt='logo' /> <label> Dashboard</label>
                          
                           </Link>
                        :
                        <Link href="/login"> <img src={user_icon.src} alt='logo' /> <label> Login</label>
                          
                        </Link>
                      }
                      </li>
                      <li>
                          <Link href="/"> <img src={heart_icon.src} alt='logo' /> <label>Wishlist</label> <span>0</span></Link>
                      </li>
                      <li>
                          <Link href="/cart"> <img src={cart_icon.src} alt='logo' /> <label>Your Cart</label><span>{cartreducer
?.cartItem?.length}</span></Link>
                      </li>
                    </ul>
                  </div>
              </div>
      
            </div>
        </div>
        <div className='menu-header'>
            <div className='container'>
           
                  <ul>
                  <li>
                          <Link href="/">Home</Link>
                      </li>
                    {category?.map((item, i)=>{
                        return (
                            <li key={i}>
                                <Link href={`/product/category/${item?.parent_category_id}`}>{item?.parent_category_name}</Link>
                        </li>
                        )
                    })}
                    
                      <li>
                          <Link href="/faq">Faq</Link>
                      </li>
                      <li>
                          <Link href="/contact-us">Contact</Link>
                      </li>
                  </ul>
            
            </div>
        </div>
    </div>
  )
}

export default Header