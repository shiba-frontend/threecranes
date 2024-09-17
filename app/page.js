import Image from "next/image";
import Banner from "@/component/home/Banner";
import BannerInfo from "@/component/home/BannerInfo";
import ArrivalProduct from "@/component/ArrivalProduct";
import TrendingCollection from "@/component/TrendingCollection";
import FeatureProducts from "@/component/FeatureProducts";
import Testimonial from "@/component/home/Testimonial";
import NewsLetter from "@/component/home/NewsLetter";

export default function Home() {
  return (
    <div className="home">
        <Banner/>
        <BannerInfo/>
        <ArrivalProduct/>
        <TrendingCollection/>
        <FeatureProducts />
        <Testimonial/>
        <NewsLetter/>
    </div>
  );
}
