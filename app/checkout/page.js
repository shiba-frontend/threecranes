"use client"
import React, { useEffect, useRef, useState } from 'react'
import productIMg from '@/public/assets/image/banner_img.png'
import { AddAddress, GetCheckout, OrderPlace, PaymentProcess } from '@/utils/Apirequest'
import Loader from '@/utils/Loader'
import { StandaloneSearchBox, LoadScript, Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { toast } from 'react-toastify'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const Page = () => {
   const [loading, setloading] = useState(false)
   const [data, setdata] = useState('')
   const [shippingselectAdd, setshippingselectAdd] = useState('')
   const [billingselectAdd, setbillingselectAdd] = useState('')
   const [show, setShow] = useState(false);
   const [show1, setShow1] = useState(false);
   const [addrestype, setaddrestype] = useState('SHIPPING')
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
   const [addtitle, setaddtitle] = useState('Home')
   const [cards, setcards] = useState({
      number: '',
      expiry: '',
      cvc: '',
      name: '',
      focus: '',
    });
    const [orderresponse, setorderresponse] = useState('')

   
          const inputRef = useRef()

          const router = useRouter()

   useEffect(()=>{
  

      GetcartApiRequest()
  },[])
  
  const GetcartApiRequest = async () =>{
  
     setloading(true)
     
        
     let responsedata =  await GetCheckout()
  
     setloading(false)
   
     if(responsedata?.status){
        setdata(responsedata?.data[0])
     } 
      if(responsedata?.status == 401){
      router.push('/login')
     }
   
  
    
   }


   const handleClose = () => setShow(false);

   const handleClose1 = () => setShow1(false);

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
            GetcartApiRequest()
            toast(response?.message)
        } else {
            toast.error(response?.message)
        }
        }
    
  }

  async function PlaceOrderHandle() {

   if(shippingselectAdd == ''){
      toast.error("Please choose the shipping address")
   } else if(billingselectAdd == ''){
      toast.error("Please choose the billing address")
   } else {

setloading(true)

let obj = {
   "payment_method": "CARD",
   "checkout_type": "EXISTING",
   "billing": billingselectAdd,
   "shipping": shippingselectAdd,
   "subtotal": data?.tot_subtotal_amt,
   "disc_amount": data?.tot_disc_amt,
   "amount_after_disc": data?.tot_amt_after_disc,
   "shipping_amt": data?.tot_shipping_amt,
   "tax_amt": data?.tot_tax_amt,
   "net_amt": data?.tot_net_amt
}

     let response = await OrderPlace(obj)
     setloading(false)
     if(response?.status){
      setShow1(true)
      setorderresponse(response?.data)
      console.log(response?.data)
     }

   }



  }

  const handleInputChange = (evt) => {
   const { name, value } = evt.target;
   
   setcards((prev) => ({ ...prev, [name]: value }));
 }

 const handleInputFocus = (evt) => {
   setcards((prev) => ({ ...prev, focus: evt.target.name }));
 }

 async function PaymantHandle() {


   const numString = cards?.expiry.toString();
   const year = numString.slice(2, 4); 
   const month = numString.slice(0, 2); 

   const formattedDate = `${year}-${month}`;

  


   setloading(true)
   let obj = {
      "card_number": cards?.number,
      "expiry_date": formattedDate,
      "card_code": cards.cvc,
      "order_id": orderresponse[0]?.order_id
  }

  let response = await PaymentProcess(obj)
  setloading(false)
  if(response?.status){
   setShow1(false)
   toast(response?.message)
  } else {
   toast.error(response?.message)
  }

  
 }





  return (
    <LoadScript googleMapsApiKey="AIzaSyBrRtkwvBcSh3_uISG8CVAX2IqykHdQEP4"
           libraries={["places"]}>
    <section className="register-form-section login-form shipping-form-section section-padding">
          {loading && <Loader/>}
    <div className=" container-xxl container-xl container-lg container-md container-sm container">
       <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-8 col-md-12 col-sm-12">
            <div className='text-end mb-3'> <button className='btn btn-lg btn-outline-warning' onClick={()=>setShow(true)}>Add New Address</button> </div>
            <div className='add-d-flex'>
            <div className='checkout-add'>
                  <h5>Shipping Address</h5>
                  {data?.shippings?.length > 0 ? 
                  data?.shippings?.map((add, i)=>{
                     return (
                        <div className='card mb-3' key={i}>
                           <div className='card-header'>
                              <div className='addres-head'>
                                  {add?.title}
                                  <button className={shippingselectAdd == add?.address_id ? 'btn btn-sm btn-secondary' : 'btn btn-sm btn-outline-secondary'   }  onClick={()=>setshippingselectAdd(add?.address_id)}>Select Address</button>
                              </div>
                               
                           </div>
                        <div className='card-body'>
                           {add?.address}
                        </div>
                  </div>
                     )
                  })
                  
                  :
                  <div className='card mb-3'>
                 
               <div className='card-body'>
                 No shipping address
               </div>
         </div>
}
               </div>
               <div className='checkout-add'>
                  <h5>Billing Address</h5>
                  {data?.billings?.length > 0 ? 
                  data?.billings?.map((add, i)=>{
                     return (
                        <div className='card mb-3' key={i}>
                           <div className='card-header'>
                           <div className='addres-head'>
                                  {add?.title}
                                  <button className={billingselectAdd == add?.address_id ? 'btn btn-sm btn-secondary' : 'btn btn-sm btn-outline-secondary'   }  onClick={()=>setbillingselectAdd(add?.address_id)}>Select Address</button>
                              </div>
                           </div>
                        <div className='card-body'>
                           {add?.address}
                        </div>
                  </div>
                     )
                  })
                  
                  :
                  <div className='card mb-3'>
                 
               <div className='card-body'>
               No billing address
               </div>
         </div>
                 
}
               </div>
            </div>
             
          </div>
          <div className="col-xl-4 col-lg-5 col-md-12 col-12">
             <div className="checkout-review-order-table-wrapper">
                <div className="title-product-name">Product</div>
                <div className="shop_table ">
                {data?.cart_items?.map((item, i)=>{
                  return (
                     <div className="cart_item-ccheck" key={i}>
                     <div className="info-product">
                        <div className="product-thumble">
                           <img width="50"  src={item?.product_cover_image} className="imd-fluid" alt="" />
                        </div>
                        <div className="product-name">
                           {item?.product_name}<br></br> <strong className="product-quantity">QTY : {item?.qty}</strong>
                           <br></br>
                           <span>{item?.variation_name}</span>
                        </div>
                     </div>
                     <div className="product-total">
                        <span className="amount"><bdi><span className="Price-currencySymbol">$ </span>{item?.amount_after_disc}</bdi>
                       
                        </span>
                        <sub>$ {item?.product_markup_price}</sub>
                     </div>
                  </div>
                  )
                })
}
                 
                   <div className="cart-subtotal-list">
                      <h2>Subtotal</h2>
                      <div className="subtotal-price"><span className="Price-amount amount"><bdi><span
                                  className="Price-currencySymbol">$ </span>{data?.tot_subtotal_amt}</bdi></span>
                      </div>
                   </div>
                   <div className="cart-subtotal-list">
                      <h2>Shipping</h2>
                      <div className="subtotal-price"><span className="Price-amount amount"><bdi><span
                                  className="Price-currencySymbol">$ </span>{data?.tot_shipping_amt}</bdi></span>
                      </div>
                   </div>
                   <div className="cart-subtotal-list">
                      <h2>Tax</h2>
                      <div className="subtotal-price"><span className="Price-amount amount"><bdi><span
                                  className="Price-currencySymbol">$ </span>{data?.tot_tax_amt}</bdi></span>
                      </div>
                   </div>
                  
                   <div className="cart-subtotal-list order-total">
                      <h2>Total</h2>
                      <div className="total-price"><strong><span className="amount"><bdi><span
                                     className="Price-currency">$ </span>{data?.tot_net_amt}</bdi></span></strong>
                      </div>
                   </div>
                </div>
                <div id="payment" className="checkout-payment">
                 
                   <div className="form-row place-order">
                      <button type="submit" className="button btn-place-order common-btn" onClick={PlaceOrderHandle}>Pay & Place order</button>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
 </section>
 <Modal show={show} onHide={handleClose} className='address-modal'  size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className='row form-style1'>
        <div className='col-lg-6'>
                <div className='form-group'>
                    <label>Address Type</label>
                    <br></br>
                    <input type='radio' name="type" value="Home" onChange={(e)=>setaddtitle(e.target.value)} checked={addtitle == 'Home'} /> Home &nbsp;
                    <input type='radio' name="type" value="Work"  onChange={(e)=>setaddtitle(e.target.value)} checked={addtitle == 'Work'} /> Work
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='form-group'>
                    <label>Address For</label>
                    <br></br>
                    <input type='radio' name="for" value="SHIPPING" onChange={(e)=>setaddrestype(e.target.value)} checked={addrestype == 'SHIPPING'} /> Shipping &nbsp;
                    <input type='radio' name="for" value="BILLING"  onChange={(e)=>setaddrestype(e.target.value)}  checked={addrestype == 'BILLING'}/> Billing
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
      <Modal show={show1} onHide={handleClose1} className='address-modal'  size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Card Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className='row'>
            <div className='col-lg-6'>
            <Cards
        number={cards.number}
        expiry={cards.expiry}
        cvc={cards.cvc}
        name={cards.name}
        focused={cards.focus}
      />
            </div>
            <div className='col-lg-6'>
           

<div className='row'>
   <div className='col-lg-12'>
         <div className='form-group mb-3'>
         <input
            type="text"
            name="number"
            placeholder="Card Number"
            value={cards.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className='form-control'
            maxLength="16"
            onKeyPress={(event) => {
               if (!/[0-9]/.test(event.key)) {
                   event.preventDefault();
               }
               }}
         />
         </div>
   </div>
   <div className='col-lg-12'>
         <div className='form-group mb-3'>
         <input
            type="text"
            name="name"
            placeholder="Card Name"
            value={cards.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className='form-control'
         />
         </div>
   </div>
   <div className='col-lg-6'>
         <div className='form-group mb-3'>
         <input
            type="text"
            name="expiry"
            placeholder="Expiry"
            value={cards.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength="4"
            className='form-control'
            onKeyPress={(event) => {
               if (!/[0-9]/.test(event.key)) {
                   event.preventDefault();
               }
               }}
         />
         </div>
   </div>
   <div className='col-lg-6'>
         <div className='form-group mb-3'>
         <input
            type="text"
            name="cvc"
            placeholder="CVC"
            value={cards.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className='form-control'
            maxLength="3"
            onKeyPress={(event) => {
               if (!/[0-9]/.test(event.key)) {
                   event.preventDefault();
               }
               }}
         />
         </div>
   </div>
   <div className='col-lg-12 text-end'>
   <button className='btn btn-outline-danger' onClick={handleClose1}>Cancel</button>
   <button className='btn btn-primary ms-2' onClick={PaymantHandle}>Pay Now</button>
      </div>
</div>

 
            </div>
         </div>
      
  
      
   

        </Modal.Body>
     
            
     
      </Modal>
 </LoadScript>
  )
}

export default Page