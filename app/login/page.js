'use client'
import Register from '@/component/Register'
import { AuthTokenAction } from '@/redux/reducer/DataflowReducer'
import ApiConnection from '@/utils/ApiConnection'
import Loader from '@/utils/Loader'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React,{useEffect, useRef, useState} from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const Page = () => {

   const [email, setemail] = useState("")
   const [password, setpassword] = useState("")
   const [loading, setloading] = useState(false)

   const router = useRouter()
   let dispatch = useDispatch()

   const LoginHandle = async () =>{
   
       let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            toast.error('Email should be proper!');
       } else if(password == ""){
           toast.error('Password should be must');
       } else {

           setloading(true)

           let obj = {
               "email": email,
               "password": password,
               "device_token": "345345b344",
                "fcm_token": "4b3463b5673b6346341"
           }


           try {
               const  response = await ApiConnection.post(`signin`, obj)
               setloading(false)
               if(response?.data?.status){
                  
                toast.success(response?.data?.message)
                localStorage.setItem("threecranes_access_token", response?.data?.data?.app_access_token)
                dispatch(AuthTokenAction(response?.data?.data?.app_access_token))
                  router.push('/')

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
    <section className="register-form-section login-form section-padding">
             {loading && <Loader/>}
    <div className="container-xxl container-xl container-lg container-md container-sm container">
       <div className="row justify-content-center">
          <div className="col-12 col-lg- col-xl-6 col-md-12 col-sm-12">
             <div className="register-form-field">
                <h3>Log in</h3>
                <div className="register-form">
                   <div className="form-outline mb-3">
                      <label className="form-label" >Email*</label>
                      <input type="email"  placeholder="Enter Email"
                         className="form-control form-control-lg" 
                         value={email}
                         onChange={(e)=>setemail(e.target.value)}
                         />
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label">Password*</label>
                      <input type="password"  placeholder="Enter Password"
                         className="form-control form-control-lg" 
                         value={password}
                         onChange={(e)=>setpassword(e.target.value)}
                         />
                   </div>
                   <div className="log-btn-reme d-flex align-items-center mt-4">
                      <button type="button" className="btn common-btn" onClick={LoginHandle}>Login</button>
                      <div className="form-check d-flex justify-content-center">
                         <input className="form-check-input me-2" type="checkbox" value="" />
                         <label className="form-check-label" htmlFor="form2Example3g">
                            Remember me
                         </label>
                      </div>
                   </div>
                   <div className="form-outline mb-3">
                     <Link href="/forgot-password" className="small  f-password">Forgot password?</Link>
                   
                   </div>
                </div>
             </div>
          </div>
          <div className="col-12 col-lg- col-xl-6 col-md-12 col-sm-12">
             <Register/>
          </div>
       </div>
    </div>
 </section>
  )
}

export default Page