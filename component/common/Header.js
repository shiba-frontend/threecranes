import React from 'react'
import Image from 'next/image'
import { IMAGE } from '@/utils/Theme'
import Link from 'next/link'
import logo from '@/public/assets/image/logo.png'
import search_icon from '@/public/assets/image/search_icon.png'
import user_icon from '@/public/assets/image/user_icon.png'
import heart_icon from '@/public/assets/image/heart_icon.png'
import cart_icon from '@/public/assets/image/cart_icon.png'


const Header = () => {
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
                          <Link href="/login"> <img src={user_icon.src} alt='logo' /> <label>Account</label></Link>
                      </li>
                      <li>
                          <Link href="/"> <img src={heart_icon.src} alt='logo' /> <label>Wishlist</label> <span>0</span></Link>
                      </li>
                      <li>
                          <Link href="/cart"> <img src={cart_icon.src} alt='logo' /> <label>Your Cart</label><span>0</span></Link>
                      </li>
                    </ul>
                  </div>
              </div>
      
            </div>
        </div>
        <div className='menu-header'>
            <div className='container'>
              <ul>
                  <ul>
                      <li>
                          <Link href="/">Home</Link>
                      </li>
                      <li>
                          <Link href="/">Men</Link>
                      </li>
                      <li>
                          <Link href="/">Women</Link>
                      </li>
                      <li>
                          <Link href="/">Others</Link>
                      </li>
                      <li>
                          <Link href="/">Faq</Link>
                      </li>
                      <li>
                          <Link href="/">Contact</Link>
                      </li>
                  </ul>
              </ul>
            </div>
        </div>
    </div>
  )
}

export default Header