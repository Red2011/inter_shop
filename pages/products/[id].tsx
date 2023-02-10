import useSWR from 'swr';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import Head from 'next/head';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Product from '../../components/helpers/interface_product';
import fetcher from '../../components/helpers/fetching';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { defaultAddress } from '../../components/helpers/setAddres';

export const initHiddens = (length:number) => {
    const array: string[] = Array(length).fill('hidden');
    array[0] = 'block';
    return array;
};

export const prevSlide = (array1:string[], trueLength:number) => {
    const array2 = new Array(trueLength - array1.length);
    const nowArray = array1.concat(array2.fill(''));

    nowArray.forEach((element, index) => {
        if (index > 0) {
            if (array1[index] === 'block') {
                nowArray[index] = 'hidden';
                nowArray[index - 1] = 'block';
            }
        } else if (array1[index] === 'block') {
            nowArray[index] = 'hidden';
            nowArray[nowArray.length - 1] = 'block';
        }
    });
    return nowArray;
};

export const nextSlide = (array1:string[], trueLength:number) => {
    const nowArray:string[] = [];
    nowArray.push(...array1);
    if (array1.length === 1) {
        nowArray.push('hidden');
    }

    if (array1.length < trueLength) {
        nowArray.push('hidden');
    }
    nowArray.forEach((element, index) => {
        if (array1.length === 1) {
            nowArray[0] = 'hidden';
            nowArray[1] = 'block';
        } else if (index < array1.length - 1) {
            if (array1[index] === 'block') {
                nowArray[index] = 'hidden';
                nowArray[index + 1] = 'block';
            }
        } else if (array1[index] === 'block') {
            nowArray[index] = 'hidden';
            nowArray[0] = 'block';
        }
    });
    return nowArray;
};

export const initBoolCount = (length:number) => {
    const array:boolean[] = Array(length).fill(false);
    array.forEach((element, index) => {
        if (index < 1) {
            array[index] = true;
        }
    });
    return array;
};

export const addTrueNext = (arrayBool:boolean[]) => {
    const arrayBoolNow = [...arrayBool];
    if (arrayBoolNow.filter(Boolean).length !== arrayBoolNow.length) {
        arrayBoolNow[arrayBool.indexOf(false)] = true;
    }
    return arrayBoolNow;
};
export const addTruePrev = (arrayBool:boolean[]) => {
    let arrayBoolNow = [...arrayBool];
    if (arrayBool.filter(Boolean).length !== arrayBool.length) {
        const newArrayBool = arrayBool.reverse();
        newArrayBool[newArrayBool.indexOf(false)] = true;
        arrayBoolNow = newArrayBool.reverse();
    }
    return arrayBoolNow;
};

export default function ProductFunc() {
    const { data, error } = useSWR<Product[]>(defaultAddress, fetcher);
    const router = useRouter();
    const [currentArray, setCurrentArray] = useState<string[]>([]);
    const [boolCount, setBoolCount] = useState<boolean[]>([]);

    const { id } = router.query;

    let flag = true;
    let name:string = '';
    let length:number = 0;

    data?.map((item) => {
        if (item.id === Number(id)) {
            length = item.images.length;
            name = item.title;
        }
    });

    useEffect(() => {
        setBoolCount(() => initBoolCount(length));
        setCurrentArray(() => initHiddens(initBoolCount(length).filter((value) => value).length));
    // bad fix with slider
    // const divik = document.getElementById('imagine') as HTMLElement;
    // if(divik != null) {
    //     setTimeout(function () {
    //         divik.style.display = 'block'
    //     }, 500);
    // }
    }, [length]);
    // console.log(currentArray)
    // console.log(boolCount)

    const block = () => (
        data?.map((item) => {
            if (item.id === Number(id)) {
                return (
                    <div key={item.id} className="flex justify-center  flex-wrap ">
                        <div className="h-[500px] w-[500px] max-[490px]:w-[340px] max-[490px]:h-[300px]  flex items-center justify-center relative group">
                            <div className={'flex'}>
                                {item.images.map((element, index) => { // image slider
                                    if (boolCount[index]) {
                                        return (
                                            <LazyLoadImage key={`${index}`}
                                                className={`${currentArray[index]} relative animate-powlen
                                                             w-[500px] h-[500px] max-[490px]:w-[340px] max-[490px]:h-[300px] border-2 border-[rgba(222,133,214,1)] 
                                                             rounded-2xl bg-center bg-cover duration-500 shadow-[inset_0px_0px_20px_10px_rgba(222,133,214,1)]`}
                                                src={element} effect="blur" threshold={20}/>
                                        );
                                    }
                                    return <></>;
                                })}
                            </div>
                            <div className="flex justify-between absolute w-full px-2">
                                <div className="hidden max-[500px]:block group-hover:block text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                                    <BsChevronCompactLeft onClick={() => {
                                        if (flag) {
                                            flag = false;
                                            setCurrentArray(prevSlide(currentArray, boolCount.length));
                                            setBoolCount(addTruePrev(boolCount));
                                            flag = true;
                                        }
                                    }}
                                    size={30} />
                                </div>
                                <div className="hidden max-[500px]:block group-hover:block text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                                    <BsChevronCompactRight onClick={() => {
                                        if (flag) {
                                            flag = false;
                                            setCurrentArray(nextSlide(currentArray, boolCount.length));
                                            setBoolCount(addTrueNext(boolCount));
                                            flag = true;
                                        }
                                    }}
                                    size={30}/>
                                </div>
                            </div>
                        </div>
                        <ul className="w-[500px]  max-[490px]:w-[340px]   flex flex-col p-2 pl-8 max-[490px]:pl-2 max-[490px]:mt-2 ">
                            <li className="rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50 font-bold">Название: {item.title}</li>
                            <li className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Категория: {item.category}</li>
                            <li className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Бренд: {item.brand}</li>
                            <li className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Описание: {item.description}</li>
                            <li className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Оценка: {item.rating}⭐</li>
                            <li className="mt-3 rounded-3xl px-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">Цена: {item.price}$ (Скидка: {item.discountPercentage}%)</li>
                        </ul>
                    </div>
                );
            }
            return <></>;
        })
    );

    if (!data) return (<p className="h-screen w-screen text-black text-xl flex justify-center items-center">Loading...</p>);
    if (error) {
        return <p className="h-screen w-screen bg-red-700 text-black text-xl flex justify-center items-center">ERROR</p>;
    }
    return (
        <>
            <Head>
                <title>{name}</title>
            </Head>
            <main className={'flex flex-col justify-center items-center m-10 mb-16'}>
                <div className="max-w-5xl">
                    {block()}
                </div>
            </main>
        </>
    );
}
