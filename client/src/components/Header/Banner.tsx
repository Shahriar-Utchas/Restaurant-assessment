'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon, Search } from 'lucide-react';
import axios from 'axios';

const imageData = [
    {
        id: 1,
        image: "/assets/banner1.png",
        background_color: "#880808",
        bgOverlay: "#A52A2A"
    },
    {
        id: 2,
        image: "/assets/banner2.png",
        background_color: "#0a4669",
        bgOverlay: "#0a3659",
    },
    {
        id: 3,
        image: "/assets/banner3.png",
        background_color: "#953553",
        bgOverlay: "#a95c68",
    },
    {
        id: 4,
        image: "/assets/banner4.png",
        background_color: "#006666",
        bgOverlay: "#003333",
    },
];

// Food interface
interface Food {
    _id: string;
    name: string;
    category: string;
    price: number;
    image?: string;
}

export default function Banner() {
    const [currentImage, setCurrentImage] = useState(1);
    const prevImageRef = useRef(currentImage);
    const [foods, setFoods] = useState < Food[] > ([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFoods, setFilteredFoods] = useState < Food[] > ([]);

    const isForward = currentImage > prevImageRef.current;

    useEffect(() => {
        prevImageRef.current = currentImage;
    }, [currentImage]);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const res = await axios.get < Food[] > ("https://antopolis-restaurant-server-shahria.vercel.app/foods");
                setFoods(res.data);
            } catch (error) {
                console.error("Failed to fetch foods", error);
            }
        };

        fetchFoods();
    }, []);

    // Filter foods based on search
    useEffect(() => {
        const filtered = foods.filter((food) =>
            food.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFoods(filtered);
    }, [searchTerm, foods]);

    return (
        <div
            className="h-screen overflow-hidden overflow-x-hidden relative transition-colors duration-500"
            style={{ backgroundColor: imageData[currentImage - 1].background_color }}
        >
            {/* Background Blobs */}
            <div
                className="absolute top-0 left-0 w-[55vw] h-[50vw] rounded-full -translate-x-[30%] -translate-y-[30%] transition-colors duration-500"
                style={{ backgroundColor: imageData[currentImage - 1].bgOverlay }}
            />
            <div
                className="absolute bottom-0 right-0 w-[45vw] h-[40vw] rounded-full translate-x-[50%] translate-y-[50%] transition-colors duration-500"
                style={{ backgroundColor: imageData[currentImage - 1].bgOverlay }}
            />

            {/* Header */}
            <div className="flex justify-between items-center px-6 pt-5 relative z-20 md:px-10">
                <div className="text-white font-bold text-4xl px-4 hidden md:block">RESTAURANT</div>

                {/* Search Box */}
                <div className="relative bg-white flex items-center rounded-full px-4 py-2 w-full md:w-[40%] z-30">
                    <Search className="w-5 h-5 text-gray-500" />
                    <input
                        className="ml-2 w-full bg-transparent outline-none text-black placeholder-gray-500"
                        type="text"
                        placeholder="Search...."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Filtered Result Box */}
                    {searchTerm && (
                        filteredFoods.length > 0 ? (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg z-40 max-h-60 overflow-y-auto">
                                {filteredFoods.map((food) => (
                                    <div
                                        key={food._id}
                                        className="flex items-center gap-4 p-3 border-b hover:bg-gray-100 transition"
                                    >
                                        {food.image ? (
                                            <Image
                                                src={`data:image/png;base64,${food.image}`}
                                                alt={food.name}
                                                width={48}
                                                height={48}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
                                                No Img
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-medium">{food.name}</div>
                                            <div className="text-sm text-gray-500">{food.category} • ${food.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg z-40 p-4 text-center text-gray-500">
                                No items found for &apos;{searchTerm}&apos;
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row justify-between items-center px-6 md:px-10 z-10 pt-28 md:pt-0">
                {/* Left Content */}
                <div className="text-white w-full md:w-1/2">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">BREAKFAST</h1>
                    <p className="text-base md:text-lg font-medium text-white/90 leading-relaxed mb-10 w-[95%] md:w-4/5">
                        Breakfast, often referred to as the &apos;most important meal of the day&apos;, provides essential nutrients to kick start our day. It includes a variety of foods, like fruits, cereals, dairy products, and proteins, that contribute to a balanced diet.
                    </p>


                    {/* Thumbnails */}
                    <div className="flex items-center gap-4">
                        {imageData.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setCurrentImage(item.id)}
                                className={`cursor-pointer relative transition-all duration-300 ${currentImage === item.id ? 'pb-2' : ''
                                    }`}
                            >
                                <Image
                                    src={item.image}
                                    alt="Thumb"
                                    width={120}
                                    height={120}
                                    className="rounded-full"
                                />
                                {currentImage === item.id && (
                                    <span className="block absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-white rounded-full" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative mt-10 md:mt-0">
                    <motion.div
                        key={currentImage}
                        initial={{
                            x: isForward ? 1000 : -1000,
                            y: isForward ? -1000 : 1000,
                            rotate: isForward ? 360 : -360,
                            opacity: 0,
                        }}
                        animate={{
                            x: 0,
                            y: 0,
                            rotate: 0,
                            opacity: 1,
                        }}
                        exit={{
                            x: isForward ? -1000 : 1000,
                            y: isForward ? 1000 : -1000,
                            rotate: isForward ? -360 : 360,
                            opacity: 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                            duration: 2,
                        }}
                    >
                        {/* Image for PC */}
                        <div className='hidden md:block'>
                            <Image
                                src={imageData[currentImage - 1].image}
                                alt="image"
                                width={450}
                                height={400}
                                className="object-contain"
                            />
                        </div>
                        {/* Image for mobile */}
                        <div className='md:hidden'>
                            <Image
                                src={imageData[currentImage - 1].image}
                                alt="image"
                                width={250}
                                height={300}
                                className="object-contain"
                            />
                        </div>
                    </motion.div>

                    {/* Arrows */}
                    <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 md:hidden">
                        <button
                            onClick={() =>
                                setCurrentImage(currentImage === 1 ? imageData.length : currentImage - 1)
                            }
                            className="bg-white/30 hover:bg-white/60 text-white rounded-full p-2"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 md:hidden">
                        <button
                            onClick={() =>
                                setCurrentImage(currentImage === imageData.length ? 1 : currentImage + 1)
                            }
                            className="bg-white/30 hover:bg-white/60 text-white rounded-full p-2"
                        >
                            <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
