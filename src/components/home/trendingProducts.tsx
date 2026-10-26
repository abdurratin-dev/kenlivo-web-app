'use client'
import Link from "next/link";
import ProductCard from "../cards/productsCard";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/AllDataType";


export default function TrendingProducts() {
    const [products,setProducts] = useState<ProductType[]>([])
    useEffect(()=>{
        const getdata = async() =>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_KENLIVO_DATA_API}products`)
            const data = await res.json();
            setProducts(data);
        }
        getdata();
        console.log(process.env.NEXT_PUBLIC_KENLIVO_DATA_API);
    },[])
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-14 md:px-10 md:py-20">
      <div className="flex items-center justify-between">
        <h2 className="flex flex-col">
          <span className="text-3xl font-bold tracking-[-0.02em] text-[#1F1B18] md:text-[2rem]">Trending Products</span>
          <span className="mt-1.5 text-sm text-neutral-400 md:text-base">
          Best selling products loved by our customers
          </span>
        </h2>
        <Link href='' className="text-[#B95770]">View All</Link>
      </div>
      <div className="pt-10 flex gap-5">
        {
            products.map((item)=> <ProductCard key={item._id} product={item}/>)
        }
      </div>
    </div>
  );
}
