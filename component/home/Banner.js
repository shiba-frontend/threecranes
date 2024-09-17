import { IMAGE } from '@/utils/Theme'
import Link from 'next/link'
import React from 'react'

const Banner = () => {
  return (
    <div className='banner'>
        <div className='container'>
            <div className='row align-items-center'>
                <div className='col-lg-6'>
                    <h1>Shopping with us for
                        better quality and the
                        best price</h1>
                        <p>We have prepared special discounts for you on clothing products.Don't miss these opportunities...</p>
                        <Link href="/" className='themeBtn'>Shop Now</Link>
                        <ul>
                            <li>
                                <b>2000 +</b>
                                <span>High quality products</span>
                            </li>
                            <li>
                                <b>2000 +</b>
                                <span>Happy Customers</span>
                            </li>
                        </ul>
                </div>
                <div className='col-lg-6' style={{textAlign:'right'}}>
                    <img src={IMAGE.banner_img} alt='banner' className='banner-img'  />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner