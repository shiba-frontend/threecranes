"use client"
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { IMAGE } from '@/utils/Theme'
import Accordion from 'react-bootstrap/Accordion';
import { Button, Card } from 'react-bootstrap'
import rightArrow from '@/public/assets/image/right_arrow.png'
import star_fill from '@/public/assets/image/start_fill.png'
import star_default from '@/public/assets/image/star_default.png'
import heart from '@/public/assets/image/wish_icon.png'
import bag from '@/public/assets/image/bag_icon.png'
import grid_icon from '@/public/assets/image/grid_icon.png'
import { AddCart, AddWishlist, FilterProduct, GetCart, GetParentCategoryWiseProduct, GetWishlist } from '@/utils/Apirequest'
import Loader from '@/utils/Loader'
import { toast } from 'react-toastify'
import { GetcartAction, GetWishlistAction, HeaderDropdown } from '@/redux/reducer/DataflowReducer'
import { useDispatch, useSelector } from 'react-redux'
import cart_icon from '@/public/assets/image/cart_icon.png'
import MultiRangeSlider from "multi-range-slider-react";
import heartsolid from '@/public/assets/image/heart.png'
import Image from 'next/image'
import ribon from '@/public/assets/image/ribon.png'


const useDebouncedEffect = (effect, deps, delay) => {
    const callback = useCallback(effect, deps);

    useEffect(() => {
        const handler = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [callback, delay]);
};

export default function Page() {
    const {slug} = useParams()

    const [loading, setloading] = useState(false)
    const [subcategory, setsubcategory] = useState([])
    const [productList, setproductList] = useState([])
    const [proinfo, setproinfo] = useState("")
    const [minrange, setminrange] = useState(null)
    const [maxrange, setmaxrange] = useState(null)
    const [selectArr, setselectArr] = useState([])
    const datareducer = useSelector((state) => state.Dataflowreducer)
    const [ploading, setpLoading] = useState(false); 
    const [page, setPage] = useState(1); 
    const [Totalproduct, setTotalproduct] = useState(1); 

    


    const router = useRouter();
    let dispatch = useDispatch()



    const GetApiRequest = async () =>{
        let payload = {
            "parent_id": slug,
            "page_no":page
        }

        setloading(true)
        let responsedata =  await GetParentCategoryWiseProduct(payload)
        setloading(false)
        if(responsedata?.response_code == 200){

            var TempArr = []

            responsedata?.data?.filter_bar?.forEach(element => {
                TempArr.push({
                   ...element,
                   istoggle:false 
                })
            });

            setsubcategory(TempArr)
            setTotalproduct(responsedata?.data?.total_product_count)
           //setproductList(responsedata?.data?.product_list)
            setproinfo(responsedata?.data?.parent_category_name)
            setminrange(responsedata?.data?.min_price)
            setmaxrange(responsedata?.data?.max_price)
        }
       
      }




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

    

    function CheckBoxHandle(row){

        const updatedData = subcategory.map(item => {
        
            if (row.child_category_id !== item.child_category_id) {
              return item
            }
      
            return {
              ...item,
              istoggle: !item.istoggle
            };
          });
          setsubcategory(updatedData)
          var TempArr = []
          updatedData.forEach(element =>{
              if(element?.istoggle){
                  TempArr.push(element?.child_category_id);
              }
          })
          if(!row.istoggle){
            setselectArr(TempArr)
            FilterApi(TempArr)
          } else {
            FilterApi(TempArr)
          }
    }


    async function FilterApi(arr) {

        let body = {
            "parent_id": slug,
            "min_range": minrange,
            "max_range": maxrange,
            "subcat_id": arr
        }

        setloading(true)
        const response = await FilterProduct(body)
        setloading(false)
        if(response?.status){
          
            setproductList(response?.data)
        }


    }

    const handleInput = (e) => {
        setminrange(e.minValue);
        setmaxrange(e.maxValue);

       
    };

    const handleOnchange = async (e)=>{

        console.log("sBDU")

        return

        let body = {
            "parent_id": slug,
            "min_range": e.minValue,
            "max_range": e.maxValue,
            "subcat_id": selectArr
        }
        const response = await FilterProduct(body)
        setproductList(response?.data)
    }

    

    function ClearFilter(){
        GetApiRequest()
    }
    function truncateText(text, wordCount) {
        const words = text?.split(" "); 
        if (words?.length > wordCount) {
          return words?.slice(0, wordCount).join(" ") + "..."; 
        }
        return text; 
      }

    //   const fetchProducts = async (pages) => {
    //     setpLoading(true);
    //     // Simulate an API call with setTimeout
    //     setTimeout( async () => {

    //         let payload = {
    //             "parent_id": slug,
    //             "page_no":pages
    //         }
    //         let responsedata =  await GetParentCategoryWiseProduct(payload)

    //        console.log("responsedata")
        
    //         //setproductList((prevProducts) => [...prevProducts]);
    //       //setproductList((prevProducts) => [responsedata?.data?.product_list]);
    //       setpLoading(false);
    //     }, 1000); // Simulate a delay of 1 second   
    //   };


    //   const handleScroll = () => {
    //     const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    //     const bottomPosition = document.documentElement.offsetHeight -500;

    //     console.log("bottomPosition", bottomPosition)
    //     console.log("scrollPosition", scrollPosition)
        
    //     // Check if we reached the bottom of the page
    //     if (scrollPosition === bottomPosition && !ploading) {
    //       setPage((prevPage) => {
    //         const nextPage = prevPage + 1;
    //         fetchProducts(nextPage);
    //         return nextPage;
    //       });
    //     }
    //   };

    //   useEffect(() => {
      
    //     fetchProducts(page); 
    //     window.addEventListener('scroll', handleScroll);
     
    //     return () => {
    //       window.removeEventListener('scroll', handleScroll);
    //     };
    //   }, [page]);

    
const fetchProducts = async (pages, setProductList, setpLoading) => {
    setpLoading(true);
    // Simulate an API call with setTimeout
    setTimeout(async () => {
        let payload = {
            "parent_id": slug,
            "page_no": pages
        }
        let responsedata = await GetParentCategoryWiseProduct(payload);

        console.log("responsedata");

        // Uncomment this line to update the product list
         setProductList((prevProducts) => [...prevProducts, ...responsedata?.data?.product_list]);
        
        setpLoading(false);
    }, 1000); // Simulate a delay of 1 second
};

    const handleScroll = () => {

          // Get the current scroll position and the document height
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;
    
    // If the user is within 200px of the bottom of the page, load more products
    // if (scrollPosition + 400 >= documentHeight && !ploading) {
    //     setPage((prevPage) => prevPage + 1)
    // }

        const bottom = Math.ceil(window.innerHeight + document.documentElement.scrollTop) >= document.documentElement.scrollHeight;
        if (bottom && !ploading) {
            setPage((prevPage) => prevPage + 1)
        }
        
        // if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        // setPage((prevPage) => prevPage + 1);
       
     
    };

    useDebouncedEffect(() => {
        if(Totalproduct > productList?.length)
        fetchProducts(page, setproductList, setpLoading);
    }, [page], 500);

    useEffect(() => {
        GetApiRequest()
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


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
                        <b>{proinfo}</b>
                    </li>
                </ul>
            </div>
            <div className='row'>
                <div className='col-lg-3'>
                    <div className='left-sidebar'>
                    <h3><img src={grid_icon.src} alt="icon" /> All Sub Categories <button onClick={ClearFilter}>Clear</button></h3>
                        <Accordion defaultActiveKey="0">

                        <ul>
                            {subcategory?.map((item, i)=>{
                                return (
                                    <li key={i}>
                                        <button className={item?.istoggle ? 'active': null} onClick={()=>CheckBoxHandle(item)}>
                                            {item?.child_category_name}

                                            <span></span>
                                        </button>
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
                    <div className='mt-3'>
             
                    {/* <MultiRangeSlider
					min={0}
					max={5000}
					step={500}
					minValue={minrange}
					maxValue={maxrange}
                    onInput={(e) => {
                        handleInput(e);
                    }}
					
                    onChange={(e)=>handleOnchange(e)}
				></MultiRangeSlider> */}
                {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ margin: '10px' }}>{minrange}</div>
					<div style={{ margin: '10px' }}>{maxrange}</div>
				</div> */}
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
                            <Image 
                                src={item?.cover_image}
                                alt={item?.name}
                                width={200} 
                                height={300}
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL="data:..."
                            />
                            </Link>

                            {/* {item?.price_percentage == 'PERCENTAGE' && 
                                   <div className='ribbon'>
                                                                 <img src={ribon.src} />
                                                                 <span className='discount-shape'>{item?.discount_amount}% <br></br> <sub>Off</sub></span>
                                                                 </div>
                            } */}
                        
                      
                            
                                {item.product_qty <= 0 ?

<div className='outofstock'>
Out of stock
</div>
:
                                <div className='imag-cart'>
                                    <ul>
                                        <li>
                                            
                                            <button onClick={()=>{
                                                datareducer?.token != null ?
                                                AddWishlistHandle(item)
                                                :
                                             
                                                router.push('/login')
                                                }}>
                                            <label>Add to wishlist</label>
                                                <span>
                                                
                                                    {item?.is_wishlist == 1 ?
                                                    <img src={heartsolid.src} className='heartIcon' />
                                                    :
                                                    <img src={heart.src} />
                                                }
                                                                                                  
                                                                                       
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
                            {item?.price_percentage == 'PERCENTAGE' ?  <h5>${item?.base_price} <span>₹ {item?.markup_price}</span></h5> :
                            
                            <h5>${item?.base_price} </h5>
                            }
                                   
                            </div>
                        </div>
                        </div>
                    )
                })}
                    </div>
                    :
                    <h4>No Product Found</h4>
}
{ploading && <h5 style={{textAlign:'center', fontWeight:'bold'}}>Loading more products...</h5>}
                </div>
            </div>
        </div>
    </div>
  )
}