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

                    <div className='card mb-5'>
                        <div className='card-body bg-light form-style'>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>First Name *</label>
                                        <input type='text' className='form-control' placeholder='First Name' />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Last Name *</label>
                                        <input type='text' className='form-control' placeholder='Last Name' />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Display Name *</label>
                                        <input type='text' className='form-control' placeholder='Display Name' />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Phone *</label>
                                        <input type='text' className='form-control' placeholder='Phone' />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Email *</label>
                                        <input type='email' className='form-control' placeholder='Email' />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <input type='file' className='form-control' />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <button className='themeBtn'> Update Profile</button>
                                    </div>
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
                                        <input type='password' className='form-control' placeholder='XXXXXX' />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>New Password *</label>
                                        <input type='password' className='form-control' placeholder='XXXXXX' />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Confirm New Password *</label>
                                        <input type='password' className='form-control' placeholder='XXXXXX' />
                                    </div>
                                </div>
                              
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <button className='themeBtn'> Save Password</button>
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

  export default page