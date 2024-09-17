import React from 'react'
import TitleStyle from '../common/TitleStyle'
import { IMAGE } from '@/utils/Theme'

const NewsLetter = () => {
  return (
    <div className='newletter-sec'>
        <div className='container'>
             <img src={IMAGE.Icon_Customer_bytes} alt="send"  />
            <TitleStyle title="Subscibe Newsletter"  />
            <p>Subscribe to our email and get updates on products and more right in your inbox</p>
            <div className='newsletterForm'>
                <input type='text' className='form-control' placeholder='Enter Your Email' />
                <button>
                    <img src={IMAGE.Send} alt="send"  />
                </button>
            </div>
        </div>
        </div>
  )
}

export default NewsLetter