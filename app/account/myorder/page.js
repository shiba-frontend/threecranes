"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Table from 'react-bootstrap/Table';
import productIMg from '@/public/assets/image/banner_img.png'
import Link from 'next/link';
import { GetOrderList } from '@/utils/Apirequest';
import Loader from '@/utils/Loader';

const Page = () => {

     const [loading, setloading] = useState(false)
     const [OrderList, setOrderList] = useState([])

     
        useEffect(()=>{
         
       
         GetReviewApiRequest()
         },[])
         
         const GetReviewApiRequest = async () =>{
         
            setloading(true)
               
            let responsedata =  await GetOrderList()
         
            setloading(false)
          
            if(responsedata?.status){
     
              setOrderList(responsedata?.data)
          
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
              <th>Order No</th>
                    <th>Price</th>
                    <th>Order Date</th>
                 
                    <th></th>
                    </tr>
                  
                    </thead>
                    <tbody>
                      {OrderList?.new_orders?.length > 0 ?

                        OrderList?.new_orders?.map((item, i)=>{
                          return (
                            <tr key={i}>
                              <td>{item?.order_no}</td>
                            <td>$ {item?.net_amt}</td>
                            <td>{item?.order_date}</td>
                          
                            <td>
                              <Link href={`/account/myorder/${item?.order_id}`}><u>Details</u></Link>
                            </td>
                          </tr>
                          )
                        })

                        :

                        <tr>
                          <td colSpan={5}>No order found</td>

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