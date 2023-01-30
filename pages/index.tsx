import React, { useState} from "react";
import useSWR from "swr"
import Link from "next/link";
import fetcher from "../components/helpers/fetching";
import Product from "../components/helpers/interface_product";
import Head from "next/head";
export const default_address = 'https://dummyjson.com/products';

export const result = (id:number) => {
    if (id == 29) {
        return "object-top"
    }
    else {
        return "object-left"
    }
};

export default function MainPage(){

    const [address, setAddress] = useState(default_address)
    const {data, error} = useSWR<Product[]>(address, fetcher);
    const [value, setValue] = useState<string>()

    if (error) return <p className="h-screen w-screen bg-red-700 text-black text-xl flex justify-center items-center">ERROR</p>;
    const block = () => {
        if (!data) return <p className="h-screen w-screen text-black text-xl flex justify-center ">Loading...</p>;
        else {
            return (
                data.map((item) => (
                        <div key={item.id} className="m-2 p-2 flex flex-col justify-between bg-white/20 hover:bg-white/40 rounded-2xl">
                            <div className="flex flex-col ">
                                <div className="w-[210px] h-[170px]">
                                    <Link  href={`/products/${item.id}`}>
                                        <img className={`w-full h-full object-cover ${result(item.id)} rounded-full`} src={item.thumbnail} alt={`product ${item.title}`} height="200px" width="200px"/>
                                    </Link>
                                </div>
                                <div className="w-[210px] my-1 text-center break-all">
                                    {item.title}
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="inline-block bg-blue-500 rounded-full p-2 shadow-lg shadow-black/40">Price: {item.price}$</div>
                            </div>
                        </div>
                    ))
            )
        }
    }
    return (
        <>
            <Head>
                <title>HOME</title>
            </Head>
            <main className="flex justify-center items-center flex-col my-4 mb-16">
                <div className="m-2 max-w-[40rem] w-full">
                    <input className="w-full rounded py-1 px-4 bg-gray-200 appearance-none border-2 border-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                           placeholder=" search.." value={value}
                           onChange={event => {setAddress(`https://dummyjson.com/products/search?q=${event.target.value}`); setValue(event.target.value)}} />
                </div>
                <div className="flex justify-center max-w-5xl flex-wrap">
                    {block()}
                </div>
            </main>
        </>
    )
}

