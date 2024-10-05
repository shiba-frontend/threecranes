"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import Sidebar from '../../Sidebar'
import { Table } from 'react-bootstrap'
import productIMg from '@/public/assets/image/banner_img.png'
const Page = () => {

    const { details} = useParams()


  return (
    <section className="product-category-listing my-order-list section-padding">
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
                            <h4>Steven Perker</h4>
                            <p>In publishing and graphic design, Lorem ipsum is a 
                              placeholder text commonly 
                              used to demonstrate the visual</p>
                          </div>
                          <div className='col-lg-6'>
                            <div className='bg-white p-3 text-end'>
                              <b>INVOICE#123</b>
                              <h6>Order Date: Jan 25, 2024</h6>
                            </div>
                            <div className='d-flex justify-content-end mt-2'>
                                <button className='btn btn-sm btn-warning'>Print Invoice</button>
                                <button className='btn btn-sm btn-danger ms-2'>Cancel Order</button>
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
                            <b>Steven Perker</b>
                            <p>In publishing and graphic design, Lorem ipsum is a 
                              placeholder text commonly 
                              used to demonstrate the visual</p>
                          </div>
                          <div className='col-lg-4'>
                              <h6>Payment Details</h6>
                              <b>Amount: $100.00</b>
                              <h6>Status: <span className='text-success'>Success</span></h6>
                           
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
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                <img src={productIMg.src} width="30" /> 
                Kurtas
              </div>
            </td>
            <td>$100</td>
            <td>1</td>
            <td>$200</td>
          </tr>
            <tr>
              <td colSpan="2">

              </td>
              <td className='text-end'>
                  <b>Sub Total</b>
              </td>
              <td>
                $ 200.00
              </td>
            </tr>
            <tr>
              <td colSpan="2">

              </td>
              <td className='text-end'>
                  <b>Discount</b>
              </td>
              <td>
              -  $ 100.00
              </td>
            </tr>
            <tr>
              <td colSpan="2">

              </td>
              <td className='text-end'>
                  <b>Shipping Charge</b>
              </td>
              <td>
                $ 200.00
              </td>
            </tr>
            <tr>
              <td colSpan="2">

              </td>
              <td className='text-end'>
                  <b>Tax</b>
              </td>
              <td>
                $ 200.00
              </td>
            </tr>
            <tr>
              <td colSpan="2">

              </td>
              <td className='text-end'>
                  <b>Net Total</b>
              </td>
              <td>
                $ 200.00
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