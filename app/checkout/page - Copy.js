"use client"
import React, { useEffect, useState } from 'react'
import productIMg from '@/public/assets/image/banner_img.png'
import { GetCheckout } from '@/utils/Apirequest'
import Loader from '@/utils/Loader'





const Page = () => {
   const [loading, setloading] = useState(false)
   const [data, setdata] = useState('')


   useEffect(()=>{
  

      GetcartApiRequest()
  },[])
  
  const GetcartApiRequest = async () =>{
  
     setloading(true)
        
     let responsedata =  await GetCheckout()
  
     setloading(false)
   
     if(responsedata?.status){
         console.log(responsedata?.data)
     }
     setdata(responsedata?.data[0])
     console.log(responsedata?.data)
    
   }










  return (
    <section className="register-form-section login-form shipping-form-section section-padding">
          {loading && <Loader/>}
    <div className=" container-xxl container-xl container-lg container-md container-sm container">
       <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-8 col-md-12 col-sm-12">
             <div className="register-form-field">
                <div className='register-form'>
                   <div className="row justify-content-center">
                      <div className="col-6 col-lg-6 col-xl-6 col-md-6 col-sm-12">
                         <div className="form-outline mb-3">
                            <label className="form-label" for="form3Example3cg">First name*</label>
                            <input type="email" id="form3Example3cg" placeholder="John"
                               className="form-control form-control-lg" />
                         </div>
                      </div>
                      <div className="col-6 col-lg-6 col-xl-6 col-md-6 col-sm-12">
                         <div className="form-outline mb-3">
                            <label className="form-label" for="form3Example3cg">Last name*</label>
                            <input type="email" id="form3Example3cg" placeholder="Smith"
                               className="form-control form-control-lg" />
                         </div>
                      </div>
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example3cg">Company name(optional)</label>
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg" />
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example3cg">Country / Region*</label>
                      <select className="form-control form-control-lg" name="countries" id="countries">
                         <option value='ad' data-title="Andorra">Andorra</option>
                         <option value='ae' data-title="United Arab Emirates">United Arab Emirates</option>
                         <option value='af' data-title="Afghanistan">Afghanistan</option>
                         <option value='ag' data-title="Antigua and Barbuda">Antigua and Barbuda</option>
                         <option value='ai' data-title="Anguilla">Anguilla</option>
                         <option value='al' data-title="Albania">Albania</option>
                         <option value='am' data-title="Armenia">Armenia</option>
                         <option value='an' data-title="Netherlands Antilles">Netherlands Antilles</option>
                      </select>
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example4cg">Street address*</label>
                      <input type="email" id="form3Example3cg" placeholder="House number and street name"
                         className="form-control form-control-lg mb-2" />
                      <input type="email" id="form3Example3cg" placeholder="Apartment,suite,unit,etc. (optional)"
                         className="form-control form-control-lg" />
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example4cg">Suburb*</label>
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg " />
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example3cg">State*</label>
                      <select className="form-control form-control-lg" name="countries" id="countries">
                         <option value="AP">Andhra Pradesh</option>
                         <option value="AR">Arunachal Pradesh</option>
                         <option value="AS">Assam</option>
                         <option value="BR">Bihar</option>
                         <option value="CT">Chhattisgarh</option>
                         <option value="GA">Gujarat</option>
                         <option value="HR">Haryana</option>
                         <option value="HP">Himachal Pradesh</option>
                         <option value="JK">Jammu and Kashmir</option>
                         <option value="GA">Goa</option>
                         <option value="JH">Jharkhand</option>
                         <option value="KA">Karnataka</option>
                         <option value="KL">Kerala</option>
                      </select>
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example4cg">Postcode*</label>
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg " />
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example4cg">Phone(optional) </label>
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg " />
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example4cg">Email(optional) </label>
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg " />
                   </div>
                   <div className="log-btn-reme d-flex align-items-center mt-4">
                      <button type="button" className="btn common-btn">Save Address</button>
                   </div>
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
                   {/* <div className="cart-subtotal-list shipping-totals">
                      <h2>Shipping</h2>
                      <div data-title="Shipping">
                         <ul id="shipping_method" className="shipping-methods">
                            <li>
                               <input type="radio" name="shipping_method[0]" data-index="0"
                                  id="shipping_method_0_free_shipping1" value="free_shipping:1"
                                  className="shipping_method" checked="checked" /><label
                                  for="shipping_method_0_free_shipping1">Free shipping</label>
                            </li>
                            <li>
                               <input type="radio" name="shipping_method[0]" data-index="0"
                                  id="shipping_method_0_flat_rate2" value="flat_rate:2" className="shipping_method" /><label
                                  for="shipping_method_0_flat_rate2">Flat
                                  rate</label>
                            </li>
                         </ul>
                      </div>
                   </div> */}
                   <div className="cart-subtotal-list order-total">
                      <h2>Total</h2>
                      <div className="total-price"><strong><span className="amount"><bdi><span
                                     className="Price-currency">$ </span>{data?.tot_net_amt}</bdi></span></strong>
                      </div>
                   </div>
                </div>
                <div id="payment" className="checkout-payment">
                   {/* <ul className=" payment_methods methods">
                    
                      <li className=" payment_method_cheque">
                         <input id="payment_method_cheque" type="radio" className="input-radio" name="payment_method"
                            value="cheque" data-order_button_text="" />
                         <label for="payment_method_cheque">
                            Check payments </label>
                      </li>
                     
                   </ul> */}
                   <div className="form-row place-order">
                      <button type="submit" className="button btn-place-order common-btn">Pay & Place order</button>
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