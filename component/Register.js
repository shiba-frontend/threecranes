'use client'
import React,{useEffect, useRef, useState} from 'react'
import { toast } from 'react-toastify';
import Loader from '@/utils/Loader';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import ApiConnection from '@/utils/ApiConnection';
import { useRouter } from 'next/navigation'

const Register = () => {
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [password, setpassword] = useState("")
    const [cpassword, setcpassword] = useState("")
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

    const RegisterHandle = async () =>{
    
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if(fname == ""){
            toast.error('First name should be must');
        } else if(lname == ""){
            toast.error('Last name should be must');
        } else if(phone == ""){
            toast.error('Phone should be must');
        } else if (reg.test(email) === false) {
             toast.error('Email should be proper!');
        } else if(password == ""){
            toast.error('Password should be must');
        } else if(cpassword != password){
            toast.error('Confirm Password does not match with password');
        } else {

            setloading(true)

            let obj = {
                "first_name": fname,
                "last_name": lname,
                "email": email,
                "phone": phone,
                "password": password,
                "confirm_password": cpassword
            }


            try {
                const  response = await ApiConnection.post(`signup`, obj)
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
              const  response = await ApiConnection.post(`signup-validate`, obj)
              setloading(false)
              if(response?.data?.status){
                  setloading(false);
                  toast.success(response?.data?.message);
                  setShow(false)
                 
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
    
        //navigate("/reset-password")
    }


  return (
    <div className="register-form-field">
                {loading && <Loader/>}
                <h3>Register</h3>
                <div className="register-form">
                <div className='row'>
        
            <div className='col-lg-6'>
                <div className='form-outline mb-3'>
                        <label>First Name</label>
                        <input type="text" className="form-control" placeholder="First Name"
                        value={fname}
                        onChange={(e)=>setfname(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                <div className='form-outline mb-3'>
                <label>Last Name</label>
                <input type="text" className="form-control" placeholder="Last Name"
                value={lname}
                onChange={(e)=>setlname(e.target.value)}
                />
                    </div>
                </div>
                <div className='col-lg-6'>
                <div className='form-outline mb-3'>
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Email"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                />
                    </div>
                </div>
                <div className='col-lg-6'>
                <div className='form-outline mb-3'>
                <label>Phone Number</label>
                <input type="email" className="form-control" placeholder="Phone Number"
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
                <div className='form-outline mb-3'>
                <label>Password</label>
                <input  type="password" className="form-control" placeholder="XXXXX"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                />
                    </div>
                </div>
                <div className='col-lg-6'>
                <div className='form-outline mb-3'>
                <label>Confirm Password</label>
                <input type="password" className="form-control" placeholder="XXXXX"
                value={cpassword}
                onChange={(e)=>setcpassword(e.target.value)}
                />
                    </div>
                </div>
            </div>

                   
                   <div className="d-flex mt-4">
                      <button type="button" className="btn common-btn" onClick={RegisterHandle}>Register</button>
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
             </div>
  )
}

export default Register