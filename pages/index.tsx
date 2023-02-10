import React, { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Head from 'next/head';
import fetcher from '../components/helpers/fetching';
import Product from '../components/helpers/interface_product';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { defaultAddress, SetAddress } from '../components/helpers/setAddres';

export const result = (id:number) => {
    if (id === 29) {
        return 'object-top';
    }
    return 'object-left';
};

export default function MainPage() {
    const { data, error } = useSWR<Product[]>(defaultAddress, fetcher);
    const [value, setValue] = useState<string>();
    if (error) return <p className=" h-screen w-screen bg-red-700 text-black text-xl flex justify-center items-center">ERROR</p>;
    const block = () => {
        if (!data) return <p className="h-screen w-screen text-black text-xl flex justify-center ">Loading...</p>;
        return (
            data.map((item) => (
                <div key={item.id} className="max-[590px]:w-[150px] max-[590px]:h-auto m-2 p-2 flex flex-col justify-between items-center bg-white/20 hover:bg-white/40 rounded-2xl">
                    <div className="flex flex-col justify-center max-[590px]:w-[130px]">
                        <div className="flex justify-center h-full w-full">
                            <Link className="max-[590px]:w-[115px]" href={`/products/${item.id}`}>
                                <LazyLoadImage
                                    className={`w-[200px] h-[160px] object-cover ${result(item.id)} rounded-full max-[590px]:w-[115px] max-[590px]:h-[60px] `} src={item.thumbnail} effect="blur" alt={`product ${item.title}`}
                                />
                            </Link>
                        </div>
                        <div className="w-[210px] h-full my-1 text-center break-all max-[590px]:w-[130px] max-[590px]:text-[10px]">
                            {item.title}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="inline-block bg-blue-500 rounded-full p-2 shadow-lg shadow-black/40 max-[590px]:text-[8px]">Price: {item.price}$</div>
                    </div>
                </div>
            ))
        );
    };
    return (
        <>
            <Head>
                <title>HOME</title>
            </Head>
            <main className="flex justify-center items-center flex-col my-4 mb-16 ">
                <div className="m-2 max-w-[40rem] max-[590px]:max-w-[25rem] w-full border-amber-900 px-4">
                    <input className="w-full rounded py-1 px-4 bg-gray-200 appearance-none border-2 border-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        placeholder=" search.." value={value}
                        onChange={(event) => { SetAddress(`https://dummyjson.com/products/search?q=${event.target.value}`); setValue(event.target.value); }} />
                </div>
                <div className="flex justify-center max-w-5xl flex-wrap">
                    {block()}
                </div>
            </main>
        </>
    );
}
