"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Table from 'react-bootstrap/Table';
import productIMg from '@/public/assets/image/banner_img.png'
import Link from 'next/link';
import { DeleteWishlist, GetWishlist } from '@/utils/Apirequest';
import Loader from '@/utils/Loader';
import moment from 'moment';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

const Page = () => {

     const [loading, setloading] = useState(false)
     const [ReviewsList, setReviewsList] = useState([])
  
     useEffect(()=>{
        GetWishlistApiRequest()
      },[])
      
      const GetWishlistApiRequest = async () =>{
      
         setloading(true)
            
         let responsedata =  await GetWishlist()
      
         setloading(false)
       
         if(responsedata?.status){
  
          setReviewsList(responsedata?.data)
       
         }
        
       }
  
       async function DeleteAddHandle(_id) {
           setloading(true)
       
           let obj = {
               "wishlist_id": _id
           }
       
           const response = await DeleteWishlist(obj)
           setloading(false)
        
           if(response.status){
             
            GetWishlistApiRequest()
               toast(response?.message)
           } else {
               toast.error(response?.message)
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
                      <th>Price</th>
                      <th>Order Date</th>
                      <th></th>
                      </tr>
                    
                      </thead>
                      <tbody>
                        {ReviewsList?.length > 0 ?

                          ReviewsList?.map((item, i)=>{
                            return (
                              <tr key={i}>
                                  <td style={{width:'60%'}}>
                                  <Link href={`/product/${item?.product_id}`}>
                                    <div className='d-flex align-items-center'>
                                      <img src={item?.product_cover_image} width="40" className='me-2' />
                                      {item?.product_name}
                                    </div>
                                    </Link>
                                  </td>
                                  <td>$ {item?.product_base_price}</td>
                                   <td>{moment(item?.timestamp).format('DD-MM-YYYY')}</td>
                                  <td>
                                      <button className='btn btn-sm btn-danger'  onClick={()=>DeleteAddHandle(item?.wishlist_id)}><FontAwesomeIcon icon={faTrash} /></button>
                                  </td>
                                </tr>
                            )
                          })


                        :
                        <tr>
                          <td colSpan="4">No Wishlist</td>
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