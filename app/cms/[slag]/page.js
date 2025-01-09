"use client"

import ApiConnection from '@/utils/ApiConnection'
import Loader from '@/utils/Loader'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import rightArrow from '@/public/assets/image/right_arrow.png'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderDropdown } from '@/redux/reducer/DataflowReducer'
const Page = () => {

    const { slag} = useParams()
    const [loading, setloading] = useState(false)
    const [cms, setcms] = useState([])

    const datar = useSelector((state) => state.Dataflowreducer)
    let dispatch = useDispatch()


    const getData = async () =>{

            let obj = {
                "page_slug": slag
            }

        try{
            setloading(true)
            const response = await ApiConnection.post('get-static-pages', obj)
            setloading(false)
            if(response?.data.status){
                setcms(response?.data?.data)
          
            } 
        }catch(e){}
    }
    
    useEffect(()=>{
        getData() 
          if(datar?.isToggle){
            dispatch(HeaderDropdown(false))
        }
    },[])

  return (
    <div className='inner-sec py-3'>
    {loading && <Loader/>}
   <div className='container'>
       <div className='breadcrames'>
           <ul>
               <li>
                   <Link href="/" >Home </Link>
               </li>
               <li>
               <img src={rightArrow.src} alt="icon" />
               </li>
             
               <li>
                   <b>{cms?.[0]?.page_title}</b>
               </li>
           </ul>
       </div>
    
    <h3>{cms?.[0]?.page_title}</h3>
    <div dangerouslySetInnerHTML={{ __html: cms?.[0]?.short_description }} />
    
   </div>
</div>
  )
}

export default Page