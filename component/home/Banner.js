import { IMAGE } from '@/utils/Theme'
import Link from 'next/link'
import React from 'react'

const Banner = ({content}) => {
  return (
    <div className='banner'>
        <div className='container'>
            <div className='row align-items-center'>
                <div className='col-lg-6'>
                    <h1>{content?.banner_text}</h1>
                        <p>{content?.banner_text2}</p>
                        <Link href="/" className='themeBtn'>Shop Now</Link>
                        {/* <ul>
                            <li>
                                <b>2000 +</b>
                                <span>High quality products</span>
                            </li>
                            <li>
                                <b>2000 +</b>
                                <span>Happy Customers</span>
                            </li>
                        </ul> */}
                </div>
                <div className='col-lg-6' style={{textAlign:'right'}}>
                    <img src={content?.banner_image} alt='banner' className='banner-img'  />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner