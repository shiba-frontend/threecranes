import { IMAGE } from '@/utils/Theme'
import React from 'react'

const BannerInfo = () => {
  return (
    <div className='bannerInfo'>
        <div className='container'>
            <ul>
                <li>
                    <img src={IMAGE.truck_icon} alt='truck' />
                    <h5>Fast Delivery</h5>
                    <p>We provide fast delivery to <br></br> our customers</p>
                </li>
                <li>
                    <img src={IMAGE.return_icon} alt='truck' />
                    <h5>Easy Return</h5>
                    <p>We provide easy return <br></br> policy. </p>
                </li>
                <li>
                    <img src={IMAGE.support_icon} alt='truck' />
                    <h5>Online Supporty</h5>
                    <p>We give 24/7 online <br></br> support</p>
                </li>
                <li>
                    <img src={IMAGE.discount_icon} alt='truck' />
                    <h5>Best Offers</h5>
                    <p>We give best offers to our <br></br> customers</p>
                </li>
            </ul>
        </div>

    </div>
  )
}

export default BannerInfo