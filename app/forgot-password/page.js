
'use client'
import React,{useEffect, useRef, useState} from 'react'
import { toast } from 'react-toastify';
import Loader from '@/utils/Loader';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import ApiConnection from '@/utils/ApiConnection';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { UserIdAction } from '@/redux/reducer/DataflowReducer';

const Page = () => {

    const [email, setemail] = useState("")
    const [show, setShow] = useState(false);
    const [otp1, setotp1] = useState('')
    const [otp2, setotp2] = useState('')
    const [otp3, setotp3] = useState('')
    const [otp4, setotp4] = useState('')
    const [inputotp, setinputotp] = useState(null)
    const textInput1 = useRef(null);
    const textInput2 = useRef(null);
    const textInput3 = useRef(null);
    const textInput4 = useRef(null);
    const [loading, setloading] = useState(false)
    const [counter, setCounter] = useState(59);
    const [userId, setuserId] = useState(null)
    const handleClose = () => setShow(false);
    const router = useRouter()

    let dispatch = useDispatch()


    const SubmitHandle = async () =>{
    
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
             toast.error('Email should be proper!');
        }  else {

            setloading(true)

            let obj = {
                "email": email,
            }


            try {
                const  response = await ApiConnection.post(`forgot-password`, obj)
                setloading(false)
                if(response?.data?.status){
                   
                  setShow(true)
           
                  toast.info(response?.data?.data?.otp)
                  setinputotp(response?.data?.data?.otp)
                  setuserId(response?.data?.data?.id)
                  setCounter(60)

                }  else {
                    toast.error(response?.data?.message)
                  
                  }
            } catch(err){
                setloading(false)
                if(err.response?.status === 401){
                toast.error(err.response?.data?.message);   
            } else if(err.response?.status === 400){
                toast.error(err.response?.data?.message);   
             } else if(err.response?.status === 422){
              toast.error(err.response?.data?.message);   
           } else if(err.response?.status === 500){
            toast.error(err.response?.data?.message);   
         }
        }
        }
    }


    useEffect(() => {
      const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      
      return () => clearInterval(timer);
    }, [counter]);

    const VerifyHandle = async ()=>{
      var otp = otp1 + otp2 + otp3 + otp4
  
      if(inputotp !== Number(otp)){
        toast.error("otp does not match")
      }
      else {

        let obj = {
          "id": Number(userId),
          "otp": Number(otp)
      }
          setloading(true)
          try {
              const  response = await ApiConnection.post(`validate-otp`, obj)
              setloading(false)
              if(response?.data?.status){
                  setloading(false);
                  toast.success(response?.data?.message);
                  setShow(false)
                  dispatch(UserIdAction(userId))
                     router.push('/change-password')
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
                <h3>Forgot Password</h3>
                <div className="register-form">
                   <div className="form-outline mb-3">
                      <label className="form-label" >Email*</label>
                      <input type="email"  placeholder="Enter Username"
                         className="form-control form-control-lg" 
                         value={email}
                         onChange={(e)=>setemail(e.target.value)}
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
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >

        <Modal.Body className='otp-modal'>
            <button className='clodeBtn' onClick={handleClose}><FontAwesomeIcon icon={faRectangleXmark} /></button>

            <h3>OTP Verification</h3>
            <h6>Enter the code from the sms we sent to <b>{email}</b></h6>
            <ul className="otp-l">
                    <li>
                    <input
                  type="text"
                  maxLength="1"
                  ref={textInput1}
                  onKeyUp={(e) => {
                    if (otp1 !== "") {
                      textInput2.current.focus();
                    } else if (otp1 === "") {
                      textInput1.current.focus();
                    }
                  }}
                  className="form-control input-style"
                  placeholder="-"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={otp1}
                  onChange={(e) => {
                    setotp1(e.target.value);
                }}
                /> 
                    </li>
                    <li>
                    <input
                  type="text"
                  maxLength="1"
                  ref={textInput2}
                  onKeyUp={(e) => {
                    if (otp2 !== "") {
                      textInput3.current.focus();
                    } else if (otp2 === "") {
                      textInput1.current.focus();
                    }
                  }}
                  className="form-control input-style"
                  placeholder="-"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={otp2}
                  onChange={(e) => {
                    setotp2(e.target.value);
                    
                }}
                /> 
                    </li>
                    <li>
                    <input
                  type="text"
                  maxLength="1"
                  ref={textInput3}
                  onKeyUp={(e) => {
                    if (otp3 !== "") {
                      textInput4.current.focus();
                    } else if (otp3 === "") {
                      textInput2.current.focus();
                    }
                  }}
                  className="form-control input-style"
                  placeholder="-"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={otp3}
                  onChange={(e) => {
                    setotp3(e.target.value);
                   
                }}
                /> 
                    </li>
                    <li>
                    <input
                  type="text"
                  maxLength="1"
                  ref={textInput4}
                  onKeyUp={(e) => {
                    if (otp4 !== "") {
                      textInput4.current.focus();
                    } else if (otp4 === "") {
                      textInput3.current.focus();
                    }
                  }}
                  className="form-control input-style"
                  placeholder="-"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={otp4}
                  onChange={(e) => {
                    setotp4(e.target.value);
                    
                }}
                /> 
                    </li>
                </ul>
                <div className='form-group text-center text-white'>
                  <b>OTP expire in {counter}</b>
                {/* <h5>  Did not receive the code? {counter === 0 && <button className='resendBtn'>Resend OTP.</button>} </h5> */}

               
                </div>
                <div className='text-center'>
                <button type='button' className='btn btn-primary' onClick={VerifyHandle}>Verify</button>
                </div>
               
        </Modal.Body>
 
      </Modal>
 </section>
  )
}

export default Page