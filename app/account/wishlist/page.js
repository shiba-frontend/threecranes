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
                <div className='table-responsive custom-table'>
                <Table striped bordered hover >
                <thead>
                <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Order Date</th>
                      <th></th>
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
            <td>22-09-24</td>
            <td>
                <button className='btn btn-sm btn-danger'><FontAwesomeIcon icon={faTrash} /></button>
            </td>
          </tr>
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                <img src={productIMg.src} width="30" /> 
                Kurtas
              </div>
            </td>
            <td>$100</td>
            <td>22-09-24</td>
            <td>
            <button className='btn btn-sm btn-danger'><FontAwesomeIcon icon={faTrash} /></button>
            </td>
          </tr>
          </tbody>
                      </Table>
                </div>
              </div>
            </div>
         </div>
       </section> 
    )
  }

  export default page