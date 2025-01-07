"use client"
import { useParams } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IMAGE } from '@/utils/Theme'
import Accordion from 'react-bootstrap/Accordion';
import { Button, Card } from 'react-bootstrap'
import rightArrow from '@/public/assets/image/right_arrow.png'
import productIMg from '@/public/assets/image/banner_img.png'
import heart from '@/public/assets/image/wish_icon.png'
import bag from '@/public/assets/image/bag_icon.png'
import star_fill from '@/public/assets/image/start_fill.png'
import star_default from '@/public/assets/image/star_default.png'
import grid_icon from '@/public/assets/image/grid_icon.png'

import { useDispatch, useSelector } from 'react-redux'
import Loader from '@/utils/Loader'
import { AddCart, AddWishlist, AllProducts, AllProductsFilter, FilterProduct, GetCart, GetWishlist } from '@/utils/Apirequest'
import { GetcartAction, GetWishlistAction } from '@/redux/reducer/DataflowReducer'
import { toast } from 'react-toastify'
import cart_icon from '@/public/assets/image/cart_icon.png'

export default function Page() {

    const [loading, setloading] = useState(false)
    const [subcategory, setsubcategory] = useState([])
    const [productList, setproductList] = useState([])
    const [proinfo, setproinfo] = useState("")
    const [minrange, setminrange] = useState(null)
    const [maxrange, setmaxrange] = useState(null)
    const [selectArr, setselectArr] = useState([])
    const datareducer = useSelector((state) => state.Dataflowreducer.token)
  


   
  useEffect(()=>{ 
          GetApiRequest()
    }, [])

    const GetApiRequest = async () =>{
      

        setloading(true)
        let responsedata =  await AllProducts()
        setloading(false)
        if(responsedata?.response_code == 200){

            var TempArr = []

            responsedata?.data?.filter_bar?.forEach(element => {
                var childcategory = []

                element?.child_category.forEach(elem =>{
                    childcategory.push({
                        ...elem,
                        istoggle:false 
                     })
                })

             

                TempArr.push({
                   ...element,
                   childcategory
                })
            });

            setsubcategory(TempArr)
            setproductList(responsedata?.data?.product_list)
            setproinfo(responsedata?.data?.parent_category_name)
            setminrange(responsedata?.data?.min_price)
            setmaxrange(responsedata?.data?.max_price)
        }
       
      }

      let dispatch = useDispatch()


      async function AddCartHandle(item) {
  
          let price = item?.base_price.replace(',', '')
  
  
          setloading(true)
  
          let body = {
              "product_id": item?.id,
              "product_qty": 1,
              "product_rate": price,
              "variations": []
          }
  
          const response = await AddCart(body)
          setloading(false)
  
          if(response?.status){
              let responsedata =  await GetCart()
              dispatch(GetcartAction(responsedata?.data[0]?.cart_items))
              toast(response?.message)
              GetApiRequest()
          } else {
              toast(response?.message)
          }
      }
  
      async function AddWishlistHandle(item) {
          setloading(true)
  
          let body = {
              "product_id": item?.id,
          }
  
          const response = await AddWishlist(body)
          setloading(false)
  
          if(response?.status){
              let responsedata =  await GetWishlist()
              dispatch(GetWishlistAction(responsedata?.data))
              GetApiRequest()
              toast(response?.message)
          } else {
              toast(response?.message)
          }
      }
  
      
  
      function CheckBoxHandle(pId, cId, row){

        const updatedData =  subcategory.map((parent) => {
              if (parent.parent_category_id === pId) {
                return {
                  ...parent,
                  childcategory: parent.childcategory.map((child) =>
                    child.child_category_id === cId
                      ? { ...child, istoggle: !child.istoggle }
                      : child
                  ),
                };
              }
              return parent;
            })
         


            setsubcategory(updatedData)
            var TempArr = []
            updatedData.forEach(element =>{
                element?.childcategory.forEach(elem =>{
                    if(elem?.istoggle){
                        TempArr.push(elem?.child_category_id);
                    }
                })
               
            })
            if(!row.istoggle){
              setselectArr(TempArr)
              FilterApi(pId,TempArr)
            } 
      }
  
  
      async function FilterApi(Id,arr) {
  
          let body = {
              "parent_id": Id,
              "min_range": minrange,
              "max_range": maxrange,
              "subcat_id": arr
          }
  
          setloading(true)
          const response = await AllProductsFilter(body)
          setloading(false)
          if(response?.status){
         
              setproductList(response?.data)
          }
  
  
      }

    
      console.log(subcategory)

      function ClearFilter(){
        GetApiRequest()
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
                        <b>All Products</b>
                    </li>
                    
                </ul>
            </div>
            <div className='row'>
                <div className='col-lg-3'>
                    <div className='left-sidebar'>
                    <h3><img src={grid_icon.src} alt="icon" /> All Categories  <button onClick={ClearFilter}>Clear</button></h3>
                        <Accordion defaultActiveKey="0">

                            {subcategory?.map((item, i)=>{
                                return (
                                    <Accordion.Item eventKey={i} key={i}>
                                    <Accordion.Header>{item?.parent_category_name}</Accordion.Header>
                                    <Accordion.Body>
                                        {item?.childcategory?.length > 0 ?
                                            <ul>
                                                 {item?.childcategory?.map((sub, index)=>{
                                                    return (
                                                        <li key={index}>
                <button className={sub?.istoggle ? 'active': null} onClick={()=>CheckBoxHandle(item?.parent_category_id,sub.child_category_id, sub)}>
                                                                {sub?.child_category_name}

                                                                <span></span>
                                                            </button>
                                                        </li>
                                                    )
                                                })}
                                           
                                        </ul>
                                        :
                                        <h6>No Sub Category</h6>

}
                                     
                                            
                                    </Accordion.Body>
                                </Accordion.Item>
                                )
                            })}
                             
              
                    </Accordion>
                       
                    </div>
                </div>
                <div className='col-lg-9'>
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
                                {item.product_qty <= 0 ?

<div className='outofstock'>
Out of stock
</div>
:
                                <div className='imag-cart'>
                                    <ul>
                                        <li>
                                            <button onClick={()=>{
                                                datareducer != null ?
                                                AddWishlistHandle(item)
                                                :
                                             
                                                router.push('/login')
                                                }}>
                                            <label>Add to wishlist</label>
                                                <span>
                                                    <img src={heart.src} />
                                                </span>
                                              
                                            </button>
                                        </li>
                                        <li>
                                            {item?.is_cart == 1 ? 
                                            <span>
                                                  <Link href={`/cart`}><img src={cart_icon.src} alt='logo' /></Link>
                                            </span>
                                          
                                            :

                                            <button onClick={()=>AddCartHandle(item)}>
                                            <label>Add to cart</label>
                                                <span>
                                                    <img src={bag.src} />
                                                </span>
                               
                                            </button>
                                        }
                                            
                                        </li>
                                    </ul>
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
                                    <h5>${item?.base_price} <span>₹ {item?.markup_price}</span></h5>
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

