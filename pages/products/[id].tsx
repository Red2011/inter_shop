import useSWR from "swr";
import fetcher from "../../components/helpers/fetching";
import React, {useEffect, useState} from "react";
import Product from "../../components/helpers/interface_product";
import {useRouter} from "next/router";
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'
import Head from "next/head";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {default_address} from "../../components/helpers/setAddres";


export const init_hiddens = (length:number) => {
    const array:string[] = Array(length).fill("hidden")
    array[0] = "block"
    return array
};

export const prevSlide = (array1:string[]) => {
    let now_array:string[] = [];
    now_array.push(...array1)
    array1.forEach(function (element, index) {
        if (index > 0) {
            if (array1[index] == "block") {
                now_array[index] = "hidden"
                now_array[index - 1] = "block"
            }
        }
        else {
            if (array1[index] == "block") {
                now_array[index] = "hidden"
                now_array[array1.length - 1] = "block"
            }
        }
    });
    return now_array
}

export const nextSlide = (array1:string[]) => {
    let now_array:string[] = [];
    now_array.push(...array1)
    array1.forEach(function (element, index) {
        if (index < array1.length - 1) {
            if (array1[index] == "block") {
                now_array[index] = "hidden"
                now_array[index + 1] = "block"
            }
        }
        else {
            if (array1[index] == "block") {
                now_array[index] = "hidden"
                now_array[0] = "block"
            }
        }
    });
    return now_array
}

export default function Product_func(){
    const {data, error} = useSWR<Product[]>(default_address, fetcher);
    const router = useRouter()
    const [currentArray, setCurrentArray] = useState<string[]>([])

    const {id} = router.query

    let flag = true
    let name:string = ''
    let length:number = 0

    data?.map(item => {
        if (item.id == Number(id)) {
            length = item.images.length;
            name = item.title
        }
    })

    useEffect(()=>{
        setCurrentArray(prev => init_hiddens(length))
    },[length])

    if (error) {
        return <p className="h-screen w-screen bg-red-700 text-black text-xl flex justify-center items-center">ERROR</p>
    }
    if (!data) {
        return <p className="h-screen w-screen text-black text-xl flex justify-center">Loading...</p>
    }
    return (
        <>
            <Head>
                <title>{name}</title>
            </Head>
            <main className="flex flex-col justify-center items-center m-10 mb-16">
                <div className="max-w-5xl " >
                    {data.map((item) => {
                        if (item.id == Number(id))  {
                            return (
                                <div key={item.id} className="flex justify-center items-center flex-wrap">
                                    <div className="h-[500px] max-[490px]:w-[340px] max-[490px]:h-[300px] flex items-center justify-center relative group">
                                        <div className="relative flex">
                                            {item.images.map((element, index) => {
                                                return (
                                                    <LazyLoadImage key={`${index}`} className={`${currentArray[index]} relative delay-500 animate-powlen
                                                                   w-[500px] h-[500px] max-[490px]:w-[340px] max-[490px]:h-[300px] border-2 border-[rgba(222,133,214,1)] 
                                                                   rounded-2xl bg-center bg-cover duration-500 shadow-[inset_0px_0px_20px_10px_rgba(222,133,214,1)]`}
                                                                   src={element}  effect="blur" threshold={20}/>
                                                )
                                            })}
                                        </div>
                                        <div className="flex justify-between absolute w-full px-2">
                                            <div className="hidden max-[500px]:block group-hover:block text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                                                <BsChevronCompactLeft  onClick={() => {if (flag) {flag = false; setCurrentArray(prevSlide(currentArray)); flag = true}}} size={30} />
                                            </div>
                                            <div className="hidden max-[500px]:block group-hover:block text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                                                <BsChevronCompactRight onClick={() => {if (flag) {flag = false; setCurrentArray(nextSlide(currentArray)); flag = true}}} size={30}/>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="w-[500px] h-[500px] max-[490px]:w-[340px] max-[490px]:h-[300px] flex flex-col p-2 pl-8 max-[490px]:pl-2 ">
                                        <li className="rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50 font-bold">Название: {item.title}</li>
                                        <li className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Категория: {item.category}</li>
                                        <li className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Бренд: {item.brand}</li>
                                        <li className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Описание: {item.description}</li>
                                        <li className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Оценка: {item.rating}⭐</li>
                                        <li className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Цена: {item.price}$ (Скидка: {item.discountPercentage}%)</li>
                                    </ul>
                                </div>
                        )}
                    })}
                </div>
            </main>
        </>
    )
}