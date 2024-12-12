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
                    Dashboard
                     </div>
            </div>
          </div>
       </div>
     </section> 
  )
}

export default page