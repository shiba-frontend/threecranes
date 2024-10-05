"use client"
import React from 'react'
import Sidebar from '../Sidebar'
import Table from 'react-bootstrap/Table';
import productIMg from '@/public/assets/image/banner_img.png'
import Link from 'next/link';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const page = () => {
    return (
      <section className="product-category-listing my-order-list section-padding">
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
                        <Link href="#" className='btn btn-warning shadow'>Add</Link>
                        <div className='card my-4'>
                            <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center'>
                                Home
                                <button className='btn btn-sm btn-danger'><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                            <div className='card-body'>
                            Normand axis LTD
                            3 Goodman Street
                            London E1 8BF
                            United Kingdom
                            888-555-2311
                            rebecca@normandaxis.ltd
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <h4>Shipping Address</h4>
                        <Link href="#" className='btn btn-warning shadow'>Add</Link>
                        <div className='card my-4'>
                            <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center'>
                                Home
                                <button className='btn btn-sm btn-danger'><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                            <div className='card-body'>
                            Normand axis LTD
                            3 Goodman Street
                            London E1 8BF
                            United Kingdom
                            888-555-2311
                            rebecca@normandaxis.ltd
                            </div>
                        </div>
                        <div className='card my-4'>
                            <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center'>
                                Home
                                <button className='btn btn-sm btn-danger'><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                            <div className='card-body'>
                            Normand axis LTD
                            3 Goodman Street
                            London E1 8BF
                            United Kingdom
                            888-555-2311
                            rebecca@normandaxis.ltd
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

  export default page