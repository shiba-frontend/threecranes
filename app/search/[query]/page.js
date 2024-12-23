"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import star_fill from '@/public/assets/image/start_fill.png'
import star_default from '@/public/assets/image/star_default.png'
import Link from 'next/link'
import rightArrow from '@/public/assets/image/right_arrow.png'
import { SearchProduct } from '@/utils/Apirequest'
import Loader from '@/utils/Loader'

const Page = () => {
    const [productList, setproductList] = useState([])
     const [loading, setloading] = useState(false)
    const {query} = useParams()


    useEffect(()=>{

        GetApiRequest()

    },[])


    

    const GetApiRequest = async () =>{
            let obj = {
                 "search_keyword": query
            }
            setloading(true)
            let responsedata =  await SearchProduct(obj)
            setloading(false)
            if(responsedata?.response_code == 200){
    
                setproductList(responsedata?.data)

            }
           
}



    function truncateText(text, wordCount) {
        const words = text.split(" "); 
        if (words.length > wordCount) {
          return words.slice(0, wordCount).join(" ") + "..."; 
        }
        return text; 
      }


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
                   <b>{query}</b>
               </li>
               
           </ul>
       </div>
       <div className='row'>
          
           <div className='col-lg-12'>
               {productList?.length > 0 ?
               
               <div className='row'>
               {productList?.map((item, index)=>{
                       var rate = Number(item?.rating)
               return (
                   <div className='col-lg-4' key={index}>
                   <div className='product-box' key={index}>
                       <div className='product-img'>
                       <Link href={`/product/${item?.id}`}>
                       <img src={item?.cover_image} />
                       </Link>
                           <span className='discount-shape'>{item?.price_percentage?.split('.')[0]}%</span>
                           {item.product_qty <= 0 &&

<div className='outofstock'>
Out of stock
</div>

               }
                       </div>
                       <div className='product-info'>
                       <div className='product-info-t'>
                           <h5>{item?.sub_category_name}</h5>
                           <ul>

                           {Array(5).fill().map((_, i) => {
                               const ratingValue = i + 1;
                           return  <li key={i}><img src={ratingValue <= rate ? star_fill.src : star_default.src} /></li>
                           })}

                              
                           </ul>
                       </div>
                       <Link href={`/product/${item?.id}`}> {truncateText(item?.name, 5)}</Link>
                               <h5>₹ ${item?.base_price} <span>₹ {item?.markup_price}</span></h5>
                       </div>
                   </div>
                   </div>
               )
           })}
               </div>
               :
               <h5>No Data Found !</h5>
               
             }
           </div>
       </div>
   </div>
</div>
  )
}

export default Page