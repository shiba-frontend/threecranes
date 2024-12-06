import React from 'react'
import TitleStyle from '../common/TitleStyle'
import { IMAGE } from '@/utils/Theme'

const NewsLetter = ({content}) => {
  return (
    <div className='newletter-sec'>
        <div className='container'>
             <img src={IMAGE.Icon_Customer_bytes} alt="send"  />
            <TitleStyle title={content?.sec7_title}  />
            <p>{content?.sec7_description}</p>
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