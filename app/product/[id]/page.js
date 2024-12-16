"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import rightArrow from '@/public/assets/image/right_arrow.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import productIMg from '@/public/assets/image/banner_img.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import star_fill from '@/public/assets/image/start_fill.png'
import star_default from '@/public/assets/image/star_default.png'
import FeatureProducts from '@/component/FeatureProducts'
import buy_icon from '@/public/assets/image/buy_icon.png'
import wishlist_icon from '@/public/assets/image/wishlist_icon.png'
import share_icon from '@/public/assets/image/share_icon.png'
import plus_icon from '@/public/assets/image/plus_icon.png'
import minus_icon from '@/public/assets/image/minus_icon.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { AddCart, AddWishlist, GetCart, GetProductDetails, GetProfile, GetWishlist } from '@/utils/Apirequest'
import Loader from '@/utils/Loader'
import { GetcartAction, GetWishlistAction } from '@/redux/reducer/DataflowReducer'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'


export default function Page(){

    const [loading, setloading] = useState(false)
    const [featureproduct, setfeatureproduct] = useState([])
    const [productinfo, setproductinfo] = useState('')
    const [qty, setqty] = useState(0)
    const [variation, setvariation] = useState([])
       const [fname, setfname] = useState('')
       const [lname, setlname] = useState('')
       const [email, setemail] = useState('')
    const { id} = useParams()
    const datareducer = useSelector((state) => state.Dataflowreducer.token)

    const router = useRouter();

    let dispatch = useDispatch()

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     customPaging: i => (
    //       <div className='thumbnail_image'>
    //         {i.category}
    //       </div>
    //     )
    //   };

    useEffect(()=>{

          GetApiRequest()

          datareducer != '' &&
          GetprofilApiRequest()
       
    },[])

    const GetApiRequest = async () =>{
        setloading(true)
        let payload = {
            "product_id": id
        }
     
        let responsedata =  await GetProductDetails(payload)
        setloading(false)
        if(responsedata?.response_code == 200){
            setfeatureproduct(responsedata?.data?.featured_product_list)

            let TempArr = []

            

            responsedata?.data?.product_info?.variation?.forEach(element => {
                TempArr.push({
                    ...element,
                    value:''
                })
            });
            setvariation(TempArr)

            setproductinfo(responsedata?.data?.product_info)
         
  
  
        }
       
      }

        const GetprofilApiRequest = async () =>{
        
           setloading(true)
              
           let responsedata =  await GetProfile()
        
           setloading(false)
         
           if(responsedata?.status){
      
              console.log(responsedata?.data)
              setfname(responsedata?.data?.first_name)
              setlname(responsedata?.data?.last_name)
              setemail(responsedata?.data?.email)
           }
          
         }

    async function AddCartHandle() {

    

        if(qty == 0){
            toast.error("Please added the quantity first")
        } else {

    

        let price = productinfo?.base_price.replace(',', '')

        var TemA = []

        variation?.forEach(element =>{
            TemA.push(element.value)
        })
    
    
        setloading(true)
    
        let body = {
            "product_id": productinfo?.id,
            "product_qty": qty,
            "product_rate": price,
            "variations": TemA
        }
    
        const response = await AddCart(body)
        setloading(false)
    
        if(response?.status){
          //  GetApiRequest()
            let responsedata =  await GetCart()
            dispatch(GetcartAction(responsedata?.data[0]?.cart_items))
            GetApiRequest()
            toast(response?.message)
        } else {
            toast(response?.message)
        }
    }
    }


    async function VarietionHandle(value, i, items, key) {
        var arr = [...variation]
        arr[i][key] = value

        setvariation(arr)

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
                    <b>{productinfo?.parent__category_name}</b>
                </li>
            </ul>
        </div>
        <div className='row'>
            <div className='col-lg-5'>
                <div className='left-img'>
            <Carousel>
            {productinfo?.product_images?.map((item, i)=>{
                return (
                    <div className='proImg' key={i}>
                         <img src={item} />
                    </div>
                )
            })}
               
              
            </Carousel>
            </div>
        
            </div>
            <div className='col-lg-7'>

                <div className='product-details'>
                    <h2>{productinfo?.name}</h2>
                    <ul  className='rating-list'>
                        <li>
                            <ul>
                             {Array(5).fill().map((_, i) => {
                                const ratingValue = i + 1;
                            return  <li key={i}><img src={ratingValue <= productinfo?.rating ? star_fill.src : star_default.src} /></li>
                            })}

                       
                                </ul>
                        </li>
                        <li>
                            <span>{productinfo?.rating}</span>
                        </li>
                        <li>
                            <label>{productinfo?.review_list?.length} (Reviews)</label>
                        </li>
                        <li>
                            <label>SKU:</label>
                            <b>{productinfo?.product_sku}</b>
                        </li>
                    </ul>
                    <p>{productinfo?.short_description}</p>
                        <h5>₹ {productinfo?.base_price} <span>₹ {productinfo?.markup_price}</span></h5>

                <ul className='product-varient'>
                    {variation?.length > 0 &&
                        variation?.map((item, index)=>{
                            return (
                                <li key={index}>
                                <label>{item?.attr_name}</label>
                                <select className='form-control' value={item?.value}
                                    onChange={(e)=>VarietionHandle(e.target.value, index, item, 'value')}
                                >
                                    <option>--Select--</option>
                                    {item?.attr_vals?.map((vari, i)=>{
                                        return <option key={i} value={vari?.attr_val_id} >{vari?.attr_val_name}</option>
                                    })}
                                  
                                </select>
                         </li>
                            )
                        })
                    }
                        
                        
                        
                </ul>
                <ul className='quantity-add'>
                    <li>
                        <div className='quantity-box'>
                             <button onClick={()=>setqty(qty - 1)} disabled={qty == 0 ? true : false}><img src={minus_icon.src}  /></button>
                            <input type='text' placeholder='QTY' value={qty} onChange={(e)=>setqty(e.target.value)} 
                             onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                            />
                            <button onClick={()=>setqty(qty + 1)}><img src={plus_icon.src} /></button>
                        </div>
                    </li>
                    {productinfo?.is_cart == 1 ?
                     <li>
                         <b>Item Added</b>
                     </li>
                    :
                    <li>
                    <button className='addtocartBtn' onClick={AddCartHandle}><img src={buy_icon.src}  /> Add to cart</button>
                </li>
                }
                   
                    <li>
                        <Link href="#" className='buynowBtn'><img src={buy_icon.src} /> Buy Now</Link>
                     
                    </li>
               
                </ul>
                <ul className='wishlist-sec'>
                        <li>
                            <button onClick={()=>{
                                                datareducer != null ?
                                                AddWishlistHandle(productinfo)
                                                :
                                             
                                                router.push('/login')
                                                }}><img src={wishlist_icon.src} />  Add to wishlist</button>
                        </li>
                        {datareducer != null && 
                        <li>
                            <button>Give Review</button>
                        </li>
}
                        {/* <li>
                            <Link href="#"><img src={share_icon.src} /> Share this Product</Link>
                        </li> */}
                </ul>
                </div>

            </div>
        </div>
    
    <div className='pro-tab-details'>
    <Tabs
      defaultActiveKey="description"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="description" title="Description">
      <div dangerouslySetInnerHTML={{__html: productinfo?.long_description}} />
      
          
      </Tab>
      <Tab eventKey="review" title={`Reviews (${productinfo?.review_list?.length})`}>
      Reviews
      {productinfo?.review_list?.map((reviews, i)=>{
        return (
            <div className='reviewList' key={i}>
                <div className='user-i'>
                    <b>{reviews?.name}</b>
                    <span>{reviews?.email}</span>

                </div>
                <div className='user-r'>
                    <h5>{reviews?.title}</h5>
                    <p>{reviews?.comment}</p>
                </div>
                <ul>
                {Array(5).fill().map((_, i) => {
                const ratingValue = i + 1;
            return  <li key={i}><img src={ratingValue <= reviews?.rating ? star_fill.src : star_default.src} /></li>
            })}

        
                </ul>
            </div>
        )
      })}
      </Tab>
    </Tabs>
    </div>
    <FeatureProducts content={featureproduct} />
    </div>
</div>

 
  )
}

