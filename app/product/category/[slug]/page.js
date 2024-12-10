"use client"
import { useParams } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IMAGE } from '@/utils/Theme'
import Accordion from 'react-bootstrap/Accordion';
import { Button, Card } from 'react-bootstrap'
import rightArrow from '@/public/assets/image/right_arrow.png'
import star_fill from '@/public/assets/image/start_fill.png'
import heart from '@/public/assets/image/wish_icon.png'
import bag from '@/public/assets/image/bag_icon.png'
import grid_icon from '@/public/assets/image/grid_icon.png'
import { AddCart, GetCart, GetParentCategoryWiseProduct } from '@/utils/Apirequest'
import Loader from '@/utils/Loader'
import { toast } from 'react-toastify'
import { GetcartAction } from '@/redux/reducer/DataflowReducer'
import { useDispatch } from 'react-redux'

export default function Page() {
    const {slug} = useParams()

    const [loading, setloading] = useState(false)
    const [subcategory, setsubcategory] = useState([])
    const [productList, setproductList] = useState([])
    const [proinfo, setproinfo] = useState("")

    useEffect(()=>{
        const GetApiRequest = async () =>{
            let payload = {
                "parent_id": slug
            }

            setloading(true)
            let responsedata =  await GetParentCategoryWiseProduct(payload)
            setloading(false)
            if(responsedata?.response_code == 200){
                setsubcategory(responsedata?.data?.filter_bar)
                setproductList(responsedata?.data?.product_list)
                setproinfo(responsedata?.data?.parent_category_name)
            }
           
          }
      
          GetApiRequest()
    }, [])

    let dispatch = useDispatch()


    async function AddCartHandle(item) {

        let price = item?.base_price.replace(',', '')


        setloading(true)

        let body = {
            "product_id": item?.id,
            "product_qty": 1,
            "product_rate": price
        }

        const response = await AddCart(body)
        setloading(false)

        if(response?.status){
            let responsedata =  await GetCart()
            dispatch(GetcartAction(responsedata?.data[0]?.cart_items))
            toast(response?.message)
        } else {
            toast(response?.message)
        }
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
                    
                    {/* <li>
                        <Link href="/product" >Product  </Link>
                    </li> */}
                    <li>
                    <img src={rightArrow.src} alt="icon" />
                    </li>
                    <li>
                        <b>{proinfo}</b>
                    </li>
                </ul>
            </div>
            <div className='row'>
                <div className='col-lg-3'>
                    <div className='left-sidebar'>
                    <h3><img src={grid_icon.src} alt="icon" /> All Sub Categories</h3>
                        <Accordion defaultActiveKey="0">

                        <ul>
                            {subcategory?.map((item, i)=>{
                                return (
                                    <li key={i}>
                                        <button>{item?.child_category_name}</button>
                                    </li>
                                )
                            })}
                               
                               
                            </ul>
{/*                              
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Dresses Printed</Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li>
                                    <Link href="/product/Dresses">Dresses Printed </Link>
                                </li>
                                <li>
                                    <Link href="/product/Dresses">Dresses Printed </Link>
                                </li>
                            </ul>
                                
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Dresses Tie Dye <span>(42)</span></Accordion.Header>
                        <Accordion.Body>
                        <ul>
                                <li>
                                    <Link href="/product/Dresses">Dresses Printed </Link>
                                </li>
                               
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item> */}
                    </Accordion>
                       
                    </div>
                </div>
                <div className='col-lg-9'>
                    <div className='row'>
                    {productList?.map((item, index)=>{
                    return (
                        <div className='col-lg-4' key={index}>
                        <div className='product-box' key={index}>
                            <div className='product-img'>
                                <img src={item?.cover_image} />
                                <span className='discount-shape'>{item?.price_percentage?.split('.')[0]}%</span>
                                <div className='imag-cart'>
                                    <ul>
                                        <li>
                                            <button>
                                            <label>Add to wishlist</label>
                                                <span>
                                                    <img src={heart.src} />
                                                </span>
                                              
                                            </button>
                                        </li>
                                        <li>
                                            {item?.is_cart == 1 ? 
                                            
                                            <sub>Item added</sub>
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
                            </div>
                            <div className='product-info'>
                            <div className='product-info-t'>
                                <h5>{item?.sub_category_name}</h5>
                                <ul>
                                    <li>
                                    <img src={star_fill.src} />
                                    </li>
                                    <li>
                                    <img src={star_fill.src} />
                                    </li>
                                    <li>
                                    <img src={star_fill.src} />
                                    </li>
                                    <li>
                                    <img src={star_fill.src} />
                                    </li>
                                    <li>
                                    <img src={star_fill.src} />
                                    </li>
                                </ul>
                            </div>
                                    <Link href={`/product/${item?.id}`}> {item?.name}</Link>
                                    <h5>₹ ${item?.base_price} <span>₹ {item?.markup_price}</span></h5>
                            </div>
                        </div>
                        </div>
                    )
                })}
                    </div>
              
                </div>
            </div>
        </div>
    </div>
  )
}