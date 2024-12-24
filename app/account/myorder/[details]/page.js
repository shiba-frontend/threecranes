
"use client"
import React, { useEffect, useState } from 'react'

import Table from 'react-bootstrap/Table';
import productIMg from '@/public/assets/image/banner_img.png'
import Link from 'next/link';
import { CancelOrder, GetOrderList, OrderDetails, PrintInvoice } from '@/utils/Apirequest';
import Loader from '@/utils/Loader';
import Sidebar from '../../Sidebar';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';




const Page = () => {

    const {details} = useParams()

       const [loading, setloading] = useState(false)
       const [detailsdata, setdetailsdata] = useState('')

       let router = useRouter()

       useEffect(()=>{

     

        getDetails()

       },[])

       async function getDetails() {

        let obj = {
           "order_id": details
        }

         setloading(true)
                       
          let responsedata =  await OrderDetails(obj)
        
          setloading(false)
        
          if(responsedata?.status){
            setdetailsdata(responsedata?.data)
          }
      }

    
       async function CancelOrderHandle() {

        let obj = {
          "order_id": details
       }

        setloading(true)
                      
         let responsedata =  await CancelOrder(obj)
       
         setloading(false)
       
         if(responsedata?.status){
         toast(responsedata?.message)
         router.push('/account/myorder')
       
         }
       }

       async function InvoiceHandle() {
        let obj = {
          "order_id": details
       }

        setloading(true)
                      
         let responsedata =  await PrintInvoice(obj)
       
         setloading(false)
       
         if(responsedata?.status){

          console.log(responsedata)

          const link = document.getElementById("Download");
          link.setAttribute("href", responsedata?.data);
          link.click();
         }


       }


  return (
    <section className="product-category-listing my-order-list section-padding">
            {loading && <Loader/>}
      <div className="container-xxl container-xl container-lg container-md container-sm container">
         <div className="row ">
              <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 ">
                  <Sidebar />
              </div>
             
              <div className="col-xl-9 col-lg-9 col-md-7 col-sm-12 ">
              <div className="order-details-main">
                 <div className='card bg-light mb-3'>
                    <div className='card-body'>
                        <div className='row'>
                          <div className='col-lg-6'>
                            <h4>{detailsdata?.customer_name}</h4>
                            <p>{detailsdata?.s_street}</p>
                          </div>
                          <div className='col-lg-6'>
                            <div className='bg-white p-3 text-end'>
                              <b>INVOICE#{detailsdata?.order_no}</b>
                              <h6>Order Date: {detailsdata?.order_date}</h6>
                            </div>
                            <a id="Download" download></a>
                            <div className='d-flex justify-content-end mt-2'>
                                <button className='btn btn-sm btn-warning' onClick={InvoiceHandle}>Print Invoice</button>
                                <button className='btn btn-sm btn-danger ms-2' onClick={CancelOrderHandle}>Cancel Order</button>
                            </div>
                          </div>
                        </div>
                    </div>
                 </div>
                 <div className='card bg-light mb-3'>
                    <div className='card-body'>
                        <div className='row'>
                          <div className='col-lg-8'>
                            <h6>Invoice To</h6>
                            <b>
                              {detailsdata?.b_name}
                            </b>
                            <p> {detailsdata?.b_street}</p>
                          </div>
                          <div className='col-lg-4'>
                              <h6>Payment Details</h6>
                              <b>Amount: $ {detailsdata?.tot_net_amt}</b>
                              <h6>Status: <span className='text-success'>{detailsdata?.payment_status}</span></h6>
                           
                          </div>
                        </div>
                    </div>
                 </div>
                 <div className='card bg-light mb-3'>
                    <div className='card-body'>
                    <h4>Order Summery</h4>
                    
                    <div className='table-responsive custom-table'>
                <Table striped bordered hover >
                <thead>
                <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      </tr>
                    
                      </thead>
                      <tbody>
                        {detailsdata?.cart_items?.map((item, i)=>{
                          return (
                            <tr key={i}>
                              <td style={{width:'60%'}}>
                                <div className='d-flex align-items-center'>
                                  <img src={item?.product_cover_image} width="30" className='me-2' /> 
                                  {item?.product_name}
                                </div>
                              </td>
                              <td>$ {item?.rate}</td>
                              <td>{item?.qty}</td>
                              <td>$ {item?.total}</td>
                            </tr>
                          )
                        })
}
          
            <tr>
              <td colSpan="2">

              </td>
              <td className='text-end'>
                  <b>Sub Total</b>
              </td>
              <td>
                $ {detailsdata?.tot_subtotal_amt}
              </td>
            </tr>
            <tr>
              <td colSpan="2">

              </td>
              <td className='text-end'>
                  <b>Discount</b>
              </td>
              <td>
              -  $ {detailsdata?.tot_disc_amt}
              </td>
            </tr>
            <tr>
              <td colSpan="2">

              </td>
              <td className='text-end'>
                  <b>Shipping Charge</b>
              </td>
              <td>
                $ {detailsdata?.tot_shipping_amt}
              </td>
            </tr>
            <tr>
              <td colSpan="2">

              </td>
              <td className='text-end'>
                  <b>Tax</b>
              </td>
              <td>
                $ {detailsdata?.tot_tax_amt}
              </td>
            </tr>
            <tr>
              <td colSpan="2">

              </td>
              <td className='text-end'>
                  <b>Net Total</b>
              </td>
              <td>
                $ {detailsdata?.tot_net_amt}
              </td>
            </tr>
          </tbody>
                      </Table>
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