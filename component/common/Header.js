'use client'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import logo from '@/public/assets/image/logo.png'
import search_icon from '@/public/assets/image/search_icon.png'
import user_icon from '@/public/assets/image/user_icon.png'
import heart_icon from '@/public/assets/image/heart_icon.png'
import cart_icon from '@/public/assets/image/cart_icon.png'
import { getToken } from '@/utils/getToken';
import { useDispatch, useSelector } from 'react-redux'
import { AuthTokenAction, GetcartAction, GetMenuAction, GetWishlistAction, HeaderDropdown } from '@/redux/reducer/DataflowReducer'
import { GetCart, GetParentCategory, GetProfile, GetWishlist, SearchSuggestion } from '@/utils/Apirequest'
import { useRouter } from 'next/navigation'


const Header = () => {

const [token, settoken] = useState(null)
const [category, setcategory] = useState([])
const [inputValue, setInputValue] = useState('');
const [wordCount, setWordCount] = useState(0);
const [searchresult, setsearchresult] = useState([])
const [istoggle, setistoggle] = useState(false)
const [isloading, setisloading] = useState(false)
const [profile, setprofile] = useState('');
let dispatch = useDispatch()
const datareducer = useSelector((state) => state.Dataflowreducer.token)
const cartreducer = useSelector((state) => state.Dataflowreducer)

let router = useRouter()

    const storedToken = getToken();

    useEffect(()=>{

        dispatch(AuthTokenAction(storedToken))
       
        console.log("sdufufy")

        const GetApiRequest = async () =>{
         
            let responsedata =  await GetParentCategory()
          
            if(responsedata?.response_code == 200){
                setcategory(responsedata?.data)
                dispatch(GetMenuAction(responsedata?.data))
      
            }
           
          }

          const GetcartApiRequest = async () =>{
         
            let responsedata =  await GetCart()
          
            if(responsedata?.response_code == 200){
              dispatch(GetcartAction(responsedata?.data[0]?.cart_items))
            }
           
          }

           const GetWishlistApiRequest = async () =>{
                
                      
                   let responsedata =  await GetWishlist()
               
                 
                   if(responsedata?.status){

                    dispatch(GetWishlistAction(responsedata?.data))

                    
                 
                   }
                  
                 }

                  const GetprofilApiRequest = async () =>{
  
                      let responsedata =  await GetProfile()

                      if(responsedata?.status){
                        setprofile(responsedata?.data?.profile_image)
                      }
                     
                    }
      
          GetApiRequest()
          GetcartApiRequest()
          storedToken != null &&
          GetWishlistApiRequest()
          GetprofilApiRequest()
       
    },[])

    const handleChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
      const letters = value.match(/[a-zA-Z]/g); // Match only letters
      setWordCount(letters ? letters.length : 0); // Count letters or set to 0
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        if (wordCount === 3) {
            makeAPICall(inputValue);
            dispatch(HeaderDropdown(true))
            setistoggle(true)
        }
    }, 300); 

    if (wordCount < 3) {
      dispatch(HeaderDropdown(false))
      setistoggle(false)
    }

   

    return () => clearTimeout(timer); // Cleanup on component unmount or re-render
}, [wordCount, inputValue]);

const makeAPICall = async (text) => {

  setisloading(true)

  let obj = {
    "search_keyword": text
}

  const response = await SearchSuggestion(obj)
  setisloading(false)
  if(response?.status){
    setsearchresult(response?.data)
    console.log('API Response:', response);
  }

 
};

function truncateText(text, wordCount) {
  const words = text.split(" "); 
  if (words.length > wordCount) {
    return words.slice(0, wordCount).join(" ") + "..."; 
  }
  return text; 
}

function RedirectPage(Id){
  dispatch(HeaderDropdown(false))
  setistoggle(false)
  setInputValue('')
  router.push(`/product/${Id}`)
}

const handleKeyPress = (event) => {
  if (event.key === "Enter" && inputValue.trim()) {
    dispatch(HeaderDropdown(false))
    setistoggle(false)
    router.push(`/search/${inputValue}`)
  }
};



  return (
    <div className='header'>
        <div className='top-header'>
            <div className='container'>
                <p>We deliver to you every day from <span>7:00 to 23:00</span></p>
            </div>
        </div>
        <div className='mid-header'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-lg-3'>
                  <Link href="/">
                        <img src={logo.src} alt='logo' className='w-100' />
                  </Link>
                </div>
                <div className='col-lg-5'>
                    <div className='search-area'>
                      <input type='text' className='form-control' placeholder='Search for products, categories or brands...'
                       value={inputValue}
                       onChange={handleChange}
                       onKeyDown={handleKeyPress}
                      />
                      <button>
                          <img src={search_icon.src} alt='logo' />
                      </button>
                      {cartreducer?.isToggle &&
                      <div className='autosuggestion'>
                        {isloading ? 
                        <b>Loading...</b>  
                        :
                        searchresult?.length > 0 ? 
                          <ul>
                            {searchresult?.map((item, i)=>{
                              return (
                                <li key={i}>
                                  <button onClick={()=>RedirectPage(item?.id)}>
                                      <img src={item?.cover_image} />
                                      <span>{truncateText(item?.name, 7)}</span>
                                  </button>
                                  
                                </li>
                              )
                            })}
                            
                          </ul>
                          :
                          <h6>No search result found!</h6>
  }
                        </div>
                      
                      }
                       
                    </div>
                </div>
                <div className='col-lg-4'>
                    <ul>
                      <li>
                      {datareducer != null ?
                          <Link href="/account/dashboard"> {profile !== null ? <img src={profile} alt='profile' className='pimage' /> : <img src={user_icon.src} alt='logo' /> }  <label> Dashboard</label>
                          
                           </Link>
                        :
                        <Link href="/login"> <img src={user_icon.src} alt='logo' /> <label> Login</label></Link>
                      }
                      </li>
                      {datareducer != null &&
                      <li>
                          <Link href="/account/wishlist"> <img src={heart_icon.src} alt='logo' /> <label>Wishlist</label> <span>{cartreducer?.wishlistItem?.length}</span></Link>
                      </li>
}
                      <li>
                          <Link href="/cart"> <img src={cart_icon.src} alt='logo' /> <label>Your Cart</label><span>{cartreducer
?.cartItem?.length}</span></Link>
                      </li>
                    </ul>
                  </div>
              </div>
      
            </div>
        </div>
        <div className='menu-header'>
            <div className='container'>
           
                  <ul>
                  <li>
                          <Link href="/">Home</Link>
                      </li>
                    {category?.map((item, i)=>{
                        return (
                            <li key={i}>
                                <Link href={`/product/category/${item?.parent_category_id}`}>{item?.parent_category_name}</Link>
                        </li>
                        )
                    })}
                    <li>
                          <Link href="/product">All Products</Link>
                      </li>
                      <li>
                          <Link href="/faq">Faq</Link>
                      </li>
                      <li>
                          <Link href="/contact-us">Contact</Link>
                      </li>
                  </ul>
            
            </div>
        </div>
    </div>
  )
}

export default Header