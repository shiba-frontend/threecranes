"use client"
import Link from 'next/link'
import React, { useState } from 'react'

import rightArrow from '@/public/assets/image/right_arrow.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faSquarePhone } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '@/utils/Loader'
import ApiConnection from '@/utils/ApiConnection'

const Page = () => {

    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [subject, setsubject] = useState("")
    const [message, setmessage] = useState("")
    const [loading, setloading] = useState(false)
    const datareducer = useSelector((state) => state.Dataflowreducer?.sitedata)


    const SubmitHandle = async () =>{
    
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if(fname == ""){
            toast.error('First name should be must');
        } else if(lname == ""){
            toast.error('Last name should be must');
        } else if(phone == ""){
            toast.error('Phone should be must');
        } else if (reg.test(email) === false) {
             toast.error('Email should be proper!');
        } else if(subject == ""){
            toast.error('Password should be must');
        } else if(message == ""){
            toast.error('Message should be must');
        } else {

            setloading(true)

            let obj = {
                "first_name": fname,
                "last_name": lname,
                "email": email,
                "phone": phone,
                "subject": subject,
                "description": message
            }


            try {
                const  response = await ApiConnection.post(`contact-us`, obj)
                setloading(false)
                if(response?.data?.status){
                    toast.success(response?.data?.message);
                }  else {
                    toast.error(response?.data?.message)
                  
                  }
            } catch(err){
                setloading(false)
                if(err.response?.status === 401){
                toast.error(err.response?.data?.message);   
            } else if(err.response?.status === 400){
              toast.error(err.response?.data?.message);   
           } else if(err.response?.status === 500){
            toast.error(err.response?.data?.message);   
         }
        }
        }
    }



  return (
    <div className='inner-sec py-3'>
            {loading && <Loader/>}
        <div className='container'>
            <div className='breadcrames'>
                <ul>
                    <li>
                        <Link href="/" >Home </Link>
                    </li>
                    <li>
                    <img src={rightArrow.src} alt="icon" />
                    </li>
                  
                    <li>
                        <b>Contact Us</b>
                    </li>
                </ul>
            </div>
          
            <div className='row'>
                <div className='col-lg-5'>
                    <h3>Contact Information</h3>
                    <div className='c-info mt-4'>
                    <span><FontAwesomeIcon icon={faPhone} /></span>
                         <div>
                            <h4>Phone</h4>
                            <a href={`tel:${datareducer?.site_phone}`}>{datareducer?.site_phone}</a>
                         </div>
                    </div>
                    <div className='c-info'>
                    <span><FontAwesomeIcon icon={faEnvelope} /></span>
                         <div>
                            <h4>Email</h4>
                            <a href={`mailto:${datareducer?.site_mail}`}>{datareducer?.site_mail}</a>
                         </div>
                    </div>
                </div>
                <div className='col-lg-7'>
                <h3>Get In Touch</h3>
                <div className='card mt-4'>
                <div className='card-body form-style bg-light'>
          
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='form-group mb-3'>
                            <input type='text' className='form-control' placeholder='First Name'
                               value={fname}
                               onChange={(e)=>setfname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='form-group mb-3'>
                            <input type='text' className='form-control' placeholder='Last Name'
                                 value={lname}
                                 onChange={(e)=>setlname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='form-group mb-3'>
                            <input type='text' className='form-control' placeholder='Phone'
                             value={phone}
                             onChange={(e)=>setphone(e.target.value)}
                             onKeyPress={(event) => {
                                 if (!/[0-9]/.test(event.key)) {
                                   event.preventDefault();
                                 }
                               }}
                               maxLength="10"
                            />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='form-group mb-3'>
                            <input type='email' className='form-control' placeholder='Email'
                              value={email}
                              onChange={(e)=>setemail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className='form-group mb-3'>
                            <input type='text' className='form-control' placeholder='Subject'
                             value={subject}
                             onChange={(e)=>setsubject(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className='form-group mb-3'>
                            <textarea className='form-control' placeholder='Message'
                             value={message}
                             onChange={(e)=>setmessage(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className='form-group mb-3'>
                            <button className='themeBtn' onClick={SubmitHandle}>Submit</button>
                        </div>
                    </div>
                </div>
                </div>
            </div> 
            </div>
            </div> 
        </div>
    </div>
  )
}

export default Page