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
import { GetHome } from "@/utils/Apirequest";
import Loader from "@/utils/Loader";

export default function Home() {

  const [homedata, sethomedata] = useState('')
  const [loading, setloading] = useState(false)


  useEffect(()=>{

    const GetApiRequest = async () =>{
      setloading(true)
      let responsedata =  await GetHome()
      setloading(false)
      if(responsedata?.response_code == 200){
        sethomedata(responsedata?.data)
        console.log(responsedata?.data)


      }
     
    }

    GetApiRequest()
  },[])


  


  return (
    <div className="home">
        {loading && <Loader/>}
        <Banner content={homedata?.section1} />
        <BannerInfo content={homedata?.section2} />
        <ArrivalProduct content={homedata?.section3}  />
        <TrendingCollection content={homedata?.section4}  />
        <FeatureProducts content={homedata?.section5} />
        <Testimonial content={homedata?.section6}  />
        <NewsLetter content={homedata?.section7}/>
    </div>
  );
}
