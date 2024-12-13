"use client"
import React, { useEffect, useState } from 'react'
import productIMg from '@/public/assets/image/banner_img.png'
import Link from 'next/link'
import { ApplyCoupon, GetCart, RemoveCart, RemoveCoupon, UpdateCart } from '@/utils/Apirequest'
import Loader from '@/utils/Loader'
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { GetcartAction } from '@/redux/reducer/DataflowReducer'

const Page = () => {
   const [cart, setcart] = useState([])
   const [loading, setloading] = useState(false)
   const [show, setShow] = useState(false);
   const [cartId, setcartId] = useState(null);
   const [cartinfo, setcartinfo] = useState('');
   const [couponCode, setcouponCode] = useState('');
   const [couponInfo, setcouponInfo] = useState('');

   const datareducer = useSelector((state) => state.Dataflowreducer.token)



   let dispatch = useDispatch()

useEffect(()=>{
  

    GetcartApiRequest()
},[])

const GetcartApiRequest = async () =>{

   setloading(true)
      
   let responsedata =  await GetCart()

   setloading(false)
 
   if(responsedata?.response_code == 200){
      dispatch(GetcartAction(responsedata?.data[0]?.cart_items))
     setcart(responsedata?.data[0]?.cart_items)
     setcartinfo(responsedata?.data)
   }
  
 }


const handleClose = () => setShow(false);

async function RemoveCartHandle() {

   setloading(true)

   let body = {
      "cart_id": cartId
  }

   const response = await RemoveCart(body)
   setloading(false)
   if(response?.status){
     
      setShow(false)
      GetcartApiRequest()
      toast(response?.message) 
   } else {
      toast(response?.message) 
   }

}

async function PlusHandle(quantity, cartid, type) {
 
      setloading(true)
      let body = {
         "cart_id": cartid,
         "qty": type == 'plus' ?  quantity + 1 : quantity - 1
     }

     let response = await UpdateCart(body)
     setloading(false)
     if(response?.status){
      GetcartApiRequest()
      toast(response?.message) 
     } else {
      toast(response?.message) 
     }

   
   
   
}

function QtyInputHandle(value, key, index ) {


   var Arr = JSON?.parse(JSON?.stringify(cart))

   Arr[index][key] = value

   setcart(Arr)
   

}

async function CouponHandle() {
   if(couponCode == ''){
      toast("Coupon code is must")
   } else {
      setloading(true)
      let body = {
         "coupon_code": couponCode
     }
      const response = await ApplyCoupon(body)
      setloading(false)
      if(response?.status){
         setcouponInfo(response?.data)
         GetcartApiRequest()
         toast(response?.message)
      } else {
        toast(response?.message)
      }
   }
}

async function RemoveCouponHandle() {
   setloading(true)
      const response = await RemoveCoupon()
      setloading(false)
      if(response?.status){
         GetcartApiRequest()
         toast(response?.message)
      } else {
        toast(response?.message)
      }
   }




   
  return (
    <section className="cart-details-list section-padding">
           {loading && <Loader/>}
    <div className=" container-xxl container-xl container-lg container-md container-sm container">

{cart?.length > 0 ?

       <div className="row">

             <div className="col-xl-8 col-lg-12 col-md-12 col-12">
                <div className="cart-form table-responsive">
                   <table className="shop_table  cart " cellSpacing="0">
                      <thead>
                         <tr>
                            <th className="product-thumbnail">Product</th>
                            <th className="product-price">Price</th>
                            <th className="product-quantity">Quantity</th>
                            <th className="product-subtotal">Subtotal</th>
                            <th className="product-remove">&nbsp;</th>
                         </tr>
                      </thead>
                      <tbody>
                        {cart?.map((item, i)=>{
                           return (
                              <tr className="cart_item" key={i}>
                              <td className="product-thumbnail">

                              <Link href={`/product/${item?.product_id}`}><img src={item?.product_cover_image} width="50" height="50" alt=""/></Link>
                                 <div className="product-name ms-2">
                                    <Link href={`/product/${item?.product_id}`}>{item?.product_name}</Link>
                                 </div>
                              </td>
                              <td className="product-price">
                                 <span className=" amount"><bdi><span className="currencySymbol">$</span>{item?.rate}</bdi></span>
                              </td>
                              <td className="product-quantity">
                                 <div className="qty-input quantity">
                                    <button className="qty-count qty-count--minus minus" data-action="minus"
                                       type="button" onClick={()=>   PlusHandle(item?.qty,  item?.cart_id, 'minus')}
                                       
                                       disabled={item?.qty == 1 ? true : false}
                                       >-</button>
                                    <input className="product-qty" type="text" name="product-qty" min="0" max="10"
                                       value={item?.qty} onChange={(e)=>QtyInputHandle(e.target.value, 'qty', i)} readOnly />

                                    <button className="qty-count qty-count--add plus" data-action="add"
                                       type="button" onClick={()=>PlusHandle(item?.qty,  item?.cart_id, 'plus')}>+</button>
                                 </div>
                              </td>
                              <td className="product-subtotal" data-title="Subtotal">
                                 <span className="amount"><bdi><span className="currencySymbol">$</span>{item?.subtotal}</bdi></span>
                              </td>
                              <td className="product-remove">
                                 <button className="remove" onClick={()=>
                                    {
                                       setcartId(item?.cart_id)
                                       setShow(true)
                                    }
                                   }>
                                     <i className="fa-solid fa-trash"></i> Remove
                                 </button>
                                
                              </td>
                           </tr>
                           )
                        })}
                       
                         <tr>
                            <td colSpan="6" className="actions">
                               <div className="bottom-cart">
                                 {cartinfo[0]?.coupon_code != '' ? 
                                  
                                    <div className='coupon-info'>
                                       <label>{cartinfo[0]?.coupon_code}</label>
                                       <button className='btn btn-sm btn-outline-warning' onClick={RemoveCouponHandle}>Remove Coupon</button>
                                    </div>
                                    :
                                    <div className="coupon">
                                     <input type="text" name="coupon_code" className="input-text" id="coupon_code"
                                        value={couponCode} placeholder="Coupon code"
                                        onChange={(e)=>setcouponCode(e.target.value)}
                                        /> 
                                        
                                        <button  className="button"
                                        name="apply_coupon" onClick={CouponHandle}>Apply coupon</button>
                                  </div>


}
                                  {/* <h2><a href="#">Continue
                                        Shopping</a>
                                  </h2> */}
                                  {/* <button type="submit" className="button" name="update_cart" value="Update cart"
                                     disabled="">Update cart</button> */}
                               </div>
                            </td>
                         </tr>
                      </tbody>
                   </table>
         
             </div>
             
          </div>
          <div className="col-xl-4 col-lg-12 col-md-12 col-12">
                <div className="cart-collaterals">
                   <div className="cart_totals ">
                      <h2>Cart totals</h2>
                      <div cellSpacing="0" className="shop_table shop_table_responsive">
                         <div className="cart-subtotal mb-2">
                            <div className="title">Subtotal</div>
                            <div data-title="Subtotal" className='text-end'><span className="amount"><bdi><span
                                        className="Price-currencySymbol">$ </span>{cartinfo[0]?.tot_subtotal_amt}</bdi></span>
                            </div>
                         </div>
                         <div className="cart-subtotal mb-2">
                            <div className="title">Shipping</div>
                            <div data-title="Subtotal" className='text-end'><span className="amount"><bdi><span
                                        className="Price-currencySymbol">$ </span>{cartinfo[0]?.tot_shipping_amt}</bdi></span>
                            </div>
                         </div>
                         {/* <div className="shipping shipping-totals">
                            <h2>Shipping</h2>
                            <div data-title="Shipping">
                               <ul id="shipping_method" className="">
                                  <li>
                                     <input type="radio" className="shipping_method" checked="checked" /><label>Free
                                        shipping</label>
                                  </li>
                                  <li>
                                     <input type="radio" className="shipping_method" /><label>Flat
                                        rate</label>
                                  </li>
                               </ul>
                            </div>
                         </div> */}
                         <div className="cart-subtotal">
                            <div className="title">Tax</div>
                            <div data-title="Subtotal" className='text-end'><span className="amount"><bdi><span
                                        className="Price-currencySymbol">$ </span>{cartinfo[0]?.tot_tax_amt}</bdi></span>
                            </div>
                         </div>
                         {cartinfo[0]?.coupon_code != '' &&
                         <div className="cart-subtotal">
                            <div className="title">Discount</div>
                            <div data-title="Subtotal" className='text-end'><span className="amount text-danger"><bdi><span
                                        className="Price-currencySymbol">- $ </span>{cartinfo[0]?.tot_disc_amt}</bdi></span>
                            </div>
                         </div>
}
                         <div className="order-total mt-4">
                            <div className="title">Total</div>
                            <div data-title="Total" className='text-end'><strong><span className="amount"><bdi><span
                                           className="Price-currencySymbol">$</span>{cartinfo[0]?.tot_net_amt}</bdi></span></strong>
                            </div>
                         </div>
                      </div>
                      <div className="checkout-btn">
                        {
                           datareducer != null ?

                           <Link href="/checkout">Proceed to checkout</Link>

                           :

                     <Link href="/login">Proceed to checkout</Link>
                        }

                       
                        
                      </div>
                   </div>
                </div>
             </div>
          </div>
          :
      <h5>No cart item added</h5>
    }
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <h5 className='mb-4'>Are you sure remove from cart</h5>
        <button className='btn btn-outline-danger' onClick={handleClose}>Cancel</button>
        <button className='btn btn-primary ms-2' onClick={RemoveCartHandle}>Confirm</button>

        </Modal.Body>
     
            
     
      </Modal>
    </div>
 </section>
  )
}

export default Page