import useSWR from "swr";
import fetcher from "../../components/helpers/fetching";
import React, {useState} from "react";
import {default_address} from "../index";
import Product from "../../components/helpers/interface_product";
import {useRouter} from "next/router";
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'
import Head from "next/head";



export const prevSlide = (currentIndex:number, slides:string[] ) => {
    const isFirstSlide = currentIndex === 0;
    if (currentIndex < slides.length) {
        return isFirstSlide ? slides.length - 1 : currentIndex - 1;
    }
    else {
        return 0
    }
}

export const nextSlide = (currentIndex:number, slides:string[]) => {
    const isLastSlide = currentIndex === slides.length - 1;
    if (currentIndex < slides.length) {
    return isLastSlide ? 0 : currentIndex + 1;//если isLastSlide истина то 0, в противном случае currentIndex + 1
    }
    else {
        return 0
    }
}

export default function Product_func(){
    const {data, error} = useSWR<Product[]>(default_address, fetcher);
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)

    const {id} = router.query
    let name:string = ''
    let slides:string[] = []
    data?.map(item => {if(item.id == Number(id)) {slides = item.images; name = item.title}})

    if (error) return <p className="h-screen w-screen bg-red-700 text-black text-xl flex justify-center items-center">ERROR</p>
    if (!data) return <p className="h-screen w-screen text-black text-xl flex justify-center">Loading...</p>/*сделать и тесты*/

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
                                    <div className="w-[500px] h-[500px] max-[490px]:w-[340px] max-[490px]:h-[300px] flex items-center justify-center relative group">
                                        <div
                                            style={{backgroundImage:`url(${item.images[currentIndex]})`}}
                                            className="w-full h-full border-2 border-[rgba(222,133,214,1)] rounded-2xl bg-center bg-cover duration-500 shadow-[inset_0px_0px_20px_10px_rgba(222,133,214,1)]">
                                        </div>
                                        <div className="flex justify-between absolute w-full px-2">
                                            <div className="hidden max-[500px]:block group-hover:block text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                                                <BsChevronCompactLeft onClick={() => {setCurrentIndex(prevSlide(currentIndex, slides))}} size={30} />
                                            </div>
                                            <div className="hidden max-[500px]:block group-hover:block text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                                                <BsChevronCompactRight onClick={() => {setCurrentIndex(nextSlide(currentIndex, slides))}} size={30}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-[500px] h-[500px] max-[490px]:w-[340px] max-[490px]:h-[300px] flex flex-col p-2 pl-8 max-[490px]:pl-2 ">
                                        <p className="rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50 ">Название: {item.title}</p>
                                        <p className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Категория: {item.category}</p>
                                        <p className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Бренд: {item.brand}</p>
                                        <p className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Описание: {item.description}</p>
                                        <p className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Оценка: {item.rating}⭐</p>
                                        <p className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Цена: {item.price}$ (Скидка: {item.discountPercentage}%)</p>
                                    </div>

                                </div>
                        )}
                    })}
                </div>
            </main>
        </>
    )
}