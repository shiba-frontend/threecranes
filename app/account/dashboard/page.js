"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Table from 'react-bootstrap/Table';
import productIMg from '@/public/assets/image/banner_img.png'
import Link from 'next/link';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Getdashboard, GetOrderList, GetProfile } from '@/utils/Apirequest';
import Loader from '@/utils/Loader';
import { useRouter } from 'next/navigation';

const Page = () => {
     const [loading, setloading] = useState(false)
   const [data, setdata] = useState('')
   const [profiledata, setprofiledata] = useState('')
     const [OrderList, setOrderList] = useState([])
     const router = useRouter()

  const GetApiRequest = async () =>{
  
     setloading(true)
     
        
     let responsedata =  await Getdashboard()

     let response =  await GetProfile()

     let responseorder =  await GetOrderList()
         
     setloading(false)
   
     if(responseorder?.status){

       setOrderList(responseorder?.data)
   
     }

   
     if(responsedata?.status){
        setdata(responsedata?.data)
     } 
      if(responsedata?.status == 401){
      router.push('/login')
     }
   
     if(response?.status){
      setprofiledata(response?.data)
     }
    
   }



useEffect(()=>{
  GetApiRequest()
},[])









  return (
    <section className="product-category-listing my-order-list section-padding">
            {loading && <Loader/>}
    <div className="container-xxl container-xl container-lg container-md container-sm container">
       <div className="row ">
            <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 ">
                <Sidebar />
            </div>
            <div className="col-xl-9 col-lg-9 col-md-7 col-sm-12 ">

                  <div className='card mb-5 p-3'>
                  <b>Welcome {profiledata?.first_name} !</b>

                  <div className='row mt-3 mb-3'>
                      <div className='col-lg-6'>
                          <Link href="/account/myorder">
                          <div className='card'>
                    <div className='card-header'>
                          Total Orders
                        </div>
                      <div className='card-body'>
                      {data?.order_count}
                      </div>
                    </div>
                          </Link>
                      </div>
                      <div className='col-lg-6'>
                          <Link href="/account/wishlist">
                          <div className='card'>
                    <div className='card-header'>
                          Total Wishlist
                        </div>
                      <div className='card-body'>
                      {data?.wishlist_count}
                      </div>
                    </div>
                          </Link>
                      </div>
                  </div>
                  <h5>Recent Order</h5>
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
       </div>
     </section> 
  )
}

export default Page