'use client'
import React,{useEffect, useRef, useState} from 'react'
import { toast } from 'react-toastify';
import Loader from '@/utils/Loader';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import ApiConnection from '@/utils/ApiConnection';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Page = () => {

  const [password, setpassword] = useState("")
  const [cpassword, setcpassword] = useState("")
  const [loading, setloading] = useState(false)
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const datareducer = useSelector((state) => state.Dataflowreducer)


  useEffect(() => {
    setMounted(true);
}, []);


const SubmitHandle = async ()=>{


  if(password == ""){
    toast.error('Password should be must');
} else if(cpassword != password){
    toast.error('Confirm Password does not match with password');
}
  else {

    let obj = {
      "id": datareducer.uid,
      "password": password,
      "confirm_password": cpassword
  }
      setloading(true)
      try {
          const  response = await ApiConnection.post(`reset-password`, obj)
          setloading(false)
          if(response?.data?.status){
              setloading(false);
              toast.success(response?.data?.message);
                 router.push('/login')
          } 
      }  catch(err){
          setloading(false)
            if(err.response?.status === 401){
            toast.error(err.response?.data?.message);   
          } else if(err.response?.status === 400){
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
    <h3>Change Password </h3>
    <div className="register-form">
         <div className='form-outline mb-3'>
                <label>Password</label>
                <input  type="password" className="form-control" placeholder="XXXXX"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                />
                    </div>
                    <div className='form-outline mb-3'>
                <label>Confirm Password</label>
                <input type="password" className="form-control" placeholder="XXXXX"
                value={cpassword}
                onChange={(e)=>setcpassword(e.target.value)}
                />
                    </div>
       <div className="log-btn-reme d-flex align-items-center mt-4">
          <button type="button" className="btn common-btn" onClick={SubmitHandle}>Submit</button>
        
       </div>
      
       <div className="form-outline mb-3">
         <Link href="/login" className="small  f-password">Back to login</Link>
       
       </div>
    </div>
 </div>
</div>

</div>
</div>

</section>
  )
}

export default Page