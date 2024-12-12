'use client'
import Image from "next/image";
import Banner from "@/component/home/Banner";
import BannerInfo from "@/component/home/BannerInfo";
import ArrivalProduct from "@/component/ArrivalProduct";
import TrendingCollection from "@/component/TrendingCollection";
import FeatureProducts from "@/component/FeatureProducts";
import Testimonial from "@/component/home/Testimonial";
import NewsLetter from "@/component/home/NewsLetter";
import { useEffect, useState } from "react";
import { AddCart, GetCart, GetHome } from "@/utils/Apirequest";
import Loader from "@/utils/Loader";
import { useDispatch } from "react-redux";
import { GetcartAction } from "@/redux/reducer/DataflowReducer";
import { toast } from "react-toastify";

export default function Home() {

  const [homedata, sethomedata] = useState('')
  const [loading, setloading] = useState(false)


  useEffect(()=>{

    GetApiRequest()
  },[])

  const GetApiRequest = async () =>{
    setloading(true)
    let responsedata =  await GetHome()
    setloading(false)
    if(responsedata?.response_code == 200){
      sethomedata(responsedata?.data)

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
      //  GetApiRequest()
        let responsedata =  await GetCart()
        dispatch(GetcartAction(responsedata?.data[0]?.cart_items))
        GetApiRequest()
        toast(response?.message)
    } else {
        toast(response?.message)
    }
}



  return (
    <div className="home">
        {loading && <Loader/>}
        <Banner content={homedata?.section1} />
        <BannerInfo content={homedata?.section2} />
        <ArrivalProduct content={homedata?.section3} sendDataToParent={AddCartHandle} />
        <TrendingCollection content={homedata?.section4} sendDataToParent={AddCartHandle} />
        <FeatureProducts content={homedata?.section5} sendDataToParent={AddCartHandle} />
        <Testimonial content={homedata?.section6}  />
        <NewsLetter content={homedata?.section7}/>
    </div>
  );
}
