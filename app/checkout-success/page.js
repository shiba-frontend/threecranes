"use client"
import ApiConnection from '@/utils/ApiConnection'
import Loader from '@/utils/Loader'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import rightArrow from '@/public/assets/image/right_arrow.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table';

const Page = () => {

    
    const [loading, setloading] = useState(false)
    const cartreducer = useSelector((state) => state.Dataflowreducer)

    console.log(cartreducer)
   



  return (
    <div className='inner-sec py-3'>

   <div className='container'>
       <div className='breadcrames'>
           <ul>
               <li>
                   <Link href="/" >Home </Link>
               </li>
               <li>
               <img src={rightArrow.src} alt="icon" />
               </li>
             
           </ul>
       </div>
   
   <div className='order-success'>
        <FontAwesomeIcon icon={faCircleCheck} />
        <h5>Thank you for your purchase</h5>
        <p>Your order number is {cartreducer?.TransactionDetails?.data?.order_no}</p>

        <Link href={`/account/myorder/${cartreducer?.TransactionDetails?.data?.order_id}`} className='btn btn-outline-secondary'>Go to order details</Link>
   </div>
    
   </div>
</div>
  )
}

export default Page