import { Banner } from "@/components/home/banner";
import BeautyBanner from "@/components/home/beutyBanner";
import { Categories } from "@/components/home/categories";
import MarqueePage from "@/components/home/marquee";
import TrendingProducts from "@/components/home/trendingProducts";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Banner />
      <MarqueePage />
      <Categories />
      <TrendingProducts />
      <BeautyBanner />
    </main>
  );
}
