
"use client"
import React, { useEffect, useState } from 'react'
import productIMg from '@/public/assets/image/banner_img.png'
import { ChangePassword, GetCheckout, GetProfile, ProfilePicture, UpdateProfile } from '@/utils/Apirequest'
import Loader from '@/utils/Loader'
import Sidebar from '../Sidebar'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faUserLarge } from '@fortawesome/free-solid-svg-icons'


const Page = () => {


   const [loading, setloading] = useState(false)
   const [fname, setfname] = useState('')
   const [lname, setlname] = useState('')
   const [phone, setphone] = useState('')
   const [email, setemail] = useState('')
   const [dname, setdname] = useState('')
   const [pimage, setpimage] = useState('')
   const [oldpassword, setoldpassword] = useState('')
   const [npassword, setnpassword] = useState('')
   const [cpassword, setcpassword] = useState('')


   useEffect(()=>{
  

    GetprofilApiRequest()
  },[])
  
  const GetprofilApiRequest = async () =>{
  
     setloading(true)
        
     let responsedata =  await GetProfile()
  
     setloading(false)
   
     if(responsedata?.status){

        console.log(responsedata?.data)
        setfname(responsedata?.data?.first_name)
        setlname(responsedata?.data?.last_name)
        setphone(responsedata?.data?.phone)
        setemail(responsedata?.data?.email)
        setdname(responsedata?.data?.display_name)
        setpimage(responsedata?.data?.profile_image)
     }
    
   }

   async function UpdateProfileHandle() {
    setloading(true)
    let obj = {
        "first_name": fname,
        "last_name": lname,
        "phone":phone,
        "email":email,
        "display_name":dname,
    }

    const response = await UpdateProfile(obj)
    setloading(false)
    if(response){
        GetprofilApiRequest()
        toast(response?.message)
    } else {
        toast(response?.message)
    }
    
   }

   async function UpdatePassword() {

    if(oldpassword == ''){
        toast.error('Old password is mandatory')
    } else if(npassword == ''){
        toast.error('New password is mandatory')
    } else if(npassword != cpassword){
        toast.error('Confirm password does not match with password')
    } else {

    

    setloading(true)
    let obj = {
        "old_password": oldpassword,
        "new_password": npassword,
        "confirm_password":cpassword,
    }

    const response = await ChangePassword(obj)
    setloading(false)
    if(response.status){
        toast(response?.message)
    } else {
        toast.error(response?.message)
    }
    }
    
   }

   const HandleImage = async (e) => {
    var file = e.target.files[0];
 
    var reader = new FileReader();
  
    reader.onloadend = async function (e) {
      const fsize = file.size;
      const fileSize = Math.round(fsize / 1024);
      if (fileSize >= 800) {
        toast.error('file size is too large');
      } else {
        setpimage(reader.result)
        console.log(file)
        let obj = {
                 "profile_image": {
                 "originalPath":reader.result,
                 "type":file.type,
                 "height": 400,
                "width": 400,
                "fileName": file.name,
                "fileSize": fileSize,
                "uri":reader.result,
                "base64":reader.result
            }
        }

        let response = await ProfilePicture(obj)
        if(response.status){
            toast(response?.message)
        } else {
            toast.error(response?.message)
        }


      }
    };
    reader.readAsDataURL(file);
  };




    return (
      <section className="product-category-listing my-order-list section-padding">
         {loading && <Loader/>}
      <div className="container-xxl container-xl container-lg container-md container-sm container">
         <div className="row ">
              <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 ">
                  <Sidebar />
              </div>
              <div className="col-xl-9 col-lg-9 col-md-7 col-sm-12 ">

                    <div className='card mb-5'>
                        <div className='card-body bg-light form-style'>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>First Name *</label>
                                        <input type='text' className='form-control' placeholder='First Name'
                                        value={fname} onChange={(e)=>setfname(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Last Name *</label>
                                        <input type='text' className='form-control' placeholder='Last Name' 
                                        value={lname} onChange={(e)=>setlname(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Display Name *</label>
                                        <input type='text' className='form-control' placeholder='Display Name'
                                         value={dname} onChange={(e)=>setdname(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Phone *</label>
                                        <input type='text' className='form-control' placeholder='Phone'
                                        value={phone} onChange={(e)=>setphone(e.target.value)}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                              event.preventDefault();
                                            }
                                          }}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Email *</label>
                                        <input type='email' className='form-control' placeholder='Email'
                                        value={email} onChange={(e)=>setemail(e.target.value)}
                                        readOnly
                                        />
                                    </div>
                                </div>
                                {/* <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <input type='file' className='form-control' />
                                    </div>
                                </div> */}
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <button className='themeBtn' onClick={UpdateProfileHandle}> Update Profile</button>
                                    </div>
                                </div>
                            </div>
                            <div className='profile-pic'>
                                {pimage !== null ?
                                      <img src={pimage} alt="profile"/>
                                      :

                                      <FontAwesomeIcon icon={faUserLarge} />
                                
                                }
                              
                                <div className='file-upload'>
                                    <input type="file" accept="image/*" onChange={HandleImage} />
                                    <FontAwesomeIcon icon={faCamera} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4>Change Password</h4>
                    <div className='card'>
                        <div className='card-body form-style'>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Current Password *</label>
                                        <input type='password' className='form-control' placeholder='XXXXXX'
                                         value={oldpassword} onChange={(e)=>setoldpassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>New Password *</label>
                                        <input type='password' className='form-control' placeholder='XXXXXX'
                                         value={npassword} onChange={(e)=>setnpassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Confirm New Password *</label>
                                        <input type='password' className='form-control' placeholder='XXXXXX'
                                         value={cpassword} onChange={(e)=>setcpassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                              
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <button className='themeBtn' onClick={UpdatePassword}> Save Password</button>
                                    </div>
                                </div>
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