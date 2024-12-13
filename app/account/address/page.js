"use client"
import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../Sidebar'
import Link from 'next/link';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '@/utils/Loader';
import { AddAddress, DeleteAddress, GetAddress } from '@/utils/Apirequest';
import Modal from 'react-bootstrap/Modal';
import { StandaloneSearchBox, LoadScript, Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
  const [loading, setloading] = useState(false)
  const [billingAddress, setbillingAddress] = useState([])
  const [shippingAddress, setshippingAddress] = useState([])
   const [show, setShow] = useState(false);
   const [addrestype, setaddrestype] = useState('')
    const [name, setname] = useState('')
const [phone, setphone] = useState('')
const [email, setemail] = useState('')
const [zipcode, setzipcode] = useState('')
const [country, setcountry] = useState('')
const [state, setstate] = useState('')
const [city, setcity] = useState('')
const [address, setaddress] = useState('')
const [streetno, setstreetno] = useState('')
const [locality, setlocality] = useState('')
const [lat, setlat] = useState('')
const [lng, setlng] = useState('')
const [addtitle, setaddtitle] = useState('')

       const inputRef = useRef()


 useEffect(()=>{
  

    GetAddressApiRequest()
  },[])
  
  const GetAddressApiRequest = async () =>{
  
     setloading(true)
        
     let responsedata =  await GetAddress()
  
     setloading(false)
   
     if(responsedata?.status){
        setbillingAddress(responsedata?.data?.billings)
        setshippingAddress(responsedata?.data?.shippings)
    
     }
    
   }

   const handleClose = () => setShow(false);



   const handleplacesChanged = () =>{

    const [place] = inputRef.current.getPlaces();

    if(place){
      
       var _address = place.formatted_address;
       var _lat = place.geometry.location.lat()
       var _lng = place.geometry.location.lng()
       getFullAddress(_lat, _lng)

    }

  }



  const getFullAddress = async (_lat, _lng) => {
 
   
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${_lat},${_lng}&key=${'AIzaSyBrRtkwvBcSh3_uISG8CVAX2IqykHdQEP4'}`,
      )
      .then(async responseJson => {
        let locArr = responseJson?.data?.results?.[0]?.address_components;
        let locc = responseJson?.data?.results?.[0]?.formatted_address;
        var _country = "";
        var _state = "";
        var _city = "";
        var _locality = "";
        var _streetno = "";
        var _zipcode = "";
        console.log(locArr)
 

        for (const component of locArr){
          const addressType = component.types[0]

             if(addressType.includes('countr')) {
                _country = component.long_name
           
                 }
             if(addressType == "administrative_area_level_1"){
                _state = component.long_name
              
            } 

                 if(addressType.includes('administrative_area_level_1')) {
                    _city = component.long_name
               
                     }
                     if(addressType.includes('locality')) {
                        _locality = component.long_name
                   
                         }
         
         
                    if(addressType == "premise"){
                        _streetno = component.long_name
                    }
                    if(addressType == "postal_code"){
                        _zipcode = component.long_name
                    }
        
        }

        setaddress(locc)
        setcountry(_country)
        setstate(_state)
        setcity(_city)
        setlocality(_locality)
        setstreetno(_streetno)
        setzipcode(_zipcode)
        setlat(_lat)
        setlng(_lng)

  
      })
      .catch(err => console.log('cordsss err', err));
  };

  async function AddAddressHandle() {

     if(addtitle == ''){
            toast.error('Address type is mandatory')
        } else if(address == ''){
            toast.error('Address is mandatory')
        } else if(name == ''){
            toast.error('Name is mandatory')
        } else if(phone == ''){
            toast.error('Phone is mandatory')
        } else if(zipcode == ''){
            toast.error('Zipcode is mandatory')
        }
         else {
    

        setloading(true)
        let obj = {
            "type": addrestype,
            "title": addtitle,
            "name": name,
            "email": email,
            "phone": phone,
            "address": address,
            "country": country,
            "state": state,
            "city": city,
            "locality": locality,
            "street_no": streetno,
            "zipcode": zipcode,
            "lat": lat,
            "lng": lng
        }
    
        const response = await AddAddress(obj)
        setloading(false)
     
        if(response.status){
            setShow(false)
            GetAddressApiRequest()
            toast(response?.message)
        } else {
            toast.error(response?.message)
        }
        }
    
  }

async function DeleteAddHandle(_id) {
    setloading(true)

    let obj = {
        "address_id": _id
    }

    const response = await DeleteAddress(obj)
    setloading(false)
 
    if(response.status){
      
        GetAddressApiRequest()
        toast(response?.message)
    } else {
        toast.error(response?.message)
    }
    
}




    return (
        <LoadScript googleMapsApiKey="AIzaSyBrRtkwvBcSh3_uISG8CVAX2IqykHdQEP4"
        libraries={["places"]}>
      <section className="product-category-listing my-order-list section-padding">
             {loading && <Loader/>}
      <div className="container-xxl container-xl container-lg container-md container-sm container">
         <div className="row ">
              <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 ">
                  <Sidebar />
              </div>
              <div className="col-xl-9 col-lg-9 col-md-7 col-sm-12 ">
                <h6>The following address will be used on the checkout page by default</h6>
                <div className='row'>
                    <div className='col-lg-6'>
                        <h4>Billing Address</h4>
                        <button className='btn btn-warning shadow' onClick={()=>{
                            setShow(true)
                            setaddrestype('BILLING')
                        }}>Add</button>
                       
                        {billingAddress?.length > 0 ? 

                        billingAddress?.map((add, i)=>{
                            return (
                                <div className='card my-4' key={i}>
                                <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center'>
                                    {add?.title}
                                    <button className='btn btn-sm btn-danger' onClick={()=>DeleteAddHandle(add?.address_id)}><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                                <div className='card-body'>
                               {add?.address}
                                </div>
                            </div>
                            )
                        })

                       
                    :
                    <h5>No Billing Address</h5>
                    }
                        
                    </div>
                    <div className='col-lg-6'>
                        <h4>Shipping Address</h4>
                        <button className='btn btn-warning shadow' onClick={()=>{
                            setShow(true)
                            setaddrestype('SHIPPING')
                        }}>Add</button>
                        {shippingAddress?.length > 0 ? 

                            shippingAddress?.map((add, i)=>{
                                return (
                                    <div className='card my-4' key={i}>
                                    <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center'>
                                        {add?.title}
                                        <button className='btn btn-sm btn-danger' onClick={()=>DeleteAddHandle(add?.address_id)}><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>
                                    <div className='card-body'>
                                {add?.address}
                                    </div>
                                </div>
                                )
                            })


                            :
                            <h5>No Shipping Address</h5>
                            }
                    </div>
                </div>
              </div>
            </div>
         </div>
         <Modal show={show} onHide={handleClose} className='address-modal'  size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{addrestype} Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className='row form-style1'>
        <div className='col-lg-12'>
                <div className='form-group'>
                    <label>Address Type</label>
                    <br></br>
                    <input type='radio' name="type" value="Home" onChange={(e)=>setaddtitle(e.target.value)} /> Home &nbsp;
                    <input type='radio' name="type" value="Work"  onChange={(e)=>setaddtitle(e.target.value)} /> Work
                </div>
            </div>
                
            <div className='col-lg-4'>
                <div className='form-group'>
                    <label>Name *</label>
                    <input type='text' className='form-control' placeholder='Enter Full Name'
                    value={name} onChange={(e)=>setname(e.target.value)}
                    />
                </div>
            </div>
            <div className='col-lg-4'>
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
            <div className='col-lg-4'>
                <div className='form-group'>
                    <label>Email *</label>
                    <input type='email' className='form-control' placeholder='Email'
                    value={email} onChange={(e)=>setemail(e.target.value)}
                    
                    />
                </div>
            </div>
            
            <div className='col-lg-12'>
                <div className='form-group'>
                    <label>Address</label>
                    <StandaloneSearchBox
                        onLoad={ref =>(inputRef.current = ref)}
                        onPlacesChanged={handleplacesChanged}
                        className="address-auto"
                        >
                             <input
                            type="text"
                            placeholder="Enter Address"
                        className="form-control"
                        />
                        </StandaloneSearchBox>
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='form-group'>
                    <label>Country</label>
                    <input type='text' className='form-control' placeholder='Country'
                    value={country} onChange={(e)=>setcountry(e.target.value)}
                    
                    />
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='form-group'>
                    <label>State</label>
                    <input type='text' className='form-control' placeholder='State'
                    value={state} onChange={(e)=>setstate(e.target.value)}
                    
                    />
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='form-group'>
                    <label>City</label>
                    <input type='text' className='form-control' placeholder='City'
                    value={city} onChange={(e)=>setcity(e.target.value)}
                    
                    />
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='form-group'>
                    <label>Zipcode *</label>
                    <input type='text' className='form-control' placeholder='Zipcode'
                    value={zipcode} onChange={(e)=>setzipcode(e.target.value)}
                    
                    />
                </div>
            </div>
        </div>

      
        <button className='btn btn-outline-danger' onClick={handleClose}>Cancel</button>
        <button className='btn btn-primary ms-2' onClick={AddAddressHandle}>Add Address</button>

        </Modal.Body>
     
            
     
      </Modal>
       </section> 
       </LoadScript>
    )
  }

  export default Page