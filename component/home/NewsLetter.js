import React, { useState } from 'react'
import TitleStyle from '../common/TitleStyle'
import { IMAGE } from '@/utils/Theme'
import { Subscriber } from '@/utils/Apirequest'
import { toast } from 'react-toastify'

const NewsLetter = ({content}) => {


  const [email, setemail] = useState("")
  

  async function SendHandle() {

     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(email) === false) {
                toast.error('Email should be proper!');
           } else {
            let obj = {
              "email": email
            }
            
            const response = await Subscriber(obj)
            if(response){
              toast(response?.message)
              setemail('')
            }
           }

  }


  return (
    <div className='newletter-sec'>
        <div className='container'>
             <img src={IMAGE.Icon_Customer_bytes} alt="send"  />
            <TitleStyle title={content?.sec7_title}  />
            <p>{content?.sec7_description}</p>
            <div className='newsletterForm'>
                <input type='text' className='form-control' placeholder='Enter Your Email'
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                />
                <button onClick={SendHandle}>
                    <img src={IMAGE.Send} alt="send"  />
                </button>
            </div>
        </div>
        </div>
  )
}

export default NewsLetter