"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Table from 'react-bootstrap/Table';
import productIMg from '@/public/assets/image/banner_img.png'
import Link from 'next/link';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetReviews } from '@/utils/Apirequest';
import Loader from '@/utils/Loader';
import moment from 'moment';

const Page = () => {
   const [loading, setloading] = useState(false)
   const [ReviewsList, setReviewsList] = useState([])

   useEffect(()=>{
    
  
    GetReviewApiRequest()
    },[])
    
    const GetReviewApiRequest = async () =>{
    
       setloading(true)
          
       let responsedata =  await GetReviews()
    
       setloading(false)
     
       if(responsedata?.status){

        setReviewsList(responsedata?.data)
     
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
                <div className='table-responsive custom-table'>
                <Table striped bordered hover >
                <thead>
                <tr>
                      <th>Product</th>
                      <th>Customer</th>
                      <th>Rating</th>
                      <th>Title</th>
                      <th>Comment</th>
                      <th>Review Date</th>
                      <th>Status</th>
                      </tr>
                    
                      </thead>
                      <tbody>
                        {ReviewsList?.length > 0 ?

                          ReviewsList?.map((item, i)=>{
                            return (
                              <tr key={i}>
                              <td>
                                <div className='d-flex align-items-center'>
                               
                                  {item?.product_name}
                                </div>
                              </td>
                              <td>  {item?.name}
                                  <br></br>
                                  {item?.email}
                              </td>
                              <td>{item?.rating}</td>
                              <td>{item?.title}</td>
                              <td>{item?.comment}</td>
                              <td>{moment(item?.approve_reject_timestamp).format('DD-MM-YYYY')}</td>
                              <td>
                                {item?.status == 'APPROVED' ? 
                                   <span className='btn btn-sm btn-success'>Approved</span>
                                   :
                                   <span className='btn btn-sm btn-danger'>Reject</span>
                              }
                                 
                              </td>
                            </tr>
                            )
                          })
                           
                          :
                          <tr>
                            <td colSpan="6">No review list</td>
                          </tr>
                      }
        
        
          </tbody>
                      </Table>
                </div>
              </div>
            </div>
         </div>
       </section> 
    )
  }

  export default Page