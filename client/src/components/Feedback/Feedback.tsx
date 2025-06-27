"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const reviews = [
    {
        id: 1,
        name: "Tayyab Sohail",
        title: "UX/UI Designer",
        message:
            "Fresh, flavorful, and just the right amount of heat. The tuna was buttery, the rice well-seasoned, and the chili mayo added a great kick. A must-try for sushi lovers.",
        image: "/assets/avatar1.png",
    },
    {
        id: 2,
        name: "Nafiz Salim",
        title: "Graphic Designer",
        message:
            "A delightful culinary experience! The flavors were perfectly balanced, and the presentation was stunning. The staff was attentive and made the evening special.",
        image: "/assets/avatar2.jpeg",
    },
    {
        id: 3,
        name: "Monisa Chen",
        title: "Developer",
        message:
            "An unforgettable meal! The seafood was incredibly fresh, and the dishes were beautifully presented. The service was impeccable, making it a perfect dining experience.",
        image: "/assets/avatar3.jpg",
    },
];

export default function Feedback() {
    const [activeIndex, setActiveIndex] = useState(0);
    const textBlock = useRef(null);
    const imageBlock = useRef(null);

    const textVisible = useInView(textBlock, { once: true });
    const imageVisible = useInView(imageBlock, { once: true });

    const { name, title, message, image } = reviews[activeIndex];

    return (
        <section className="mx-auto px-4 py-20 relative z-10 bg-white md:px-50">
            <div className="flex flex-col-reverse md:flex-row gap-12 items-center">
                {/* Text Section */}
                <motion.div
                    ref={textBlock}
                    initial={{ opacity: 0, x: -60 }}
                    animate={textVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 space-y-6"
                >
                    <h2 className="text-4xl font-bold text-center md:text-left">
                        Customer <span className="text-[#AD1519]">Voices</span>
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg text-center md:text-left">
                        {message}
                    </p>
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <Image
                                    src={image}
                                    alt={name}
                                    width={100}
                                    height={100}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-center md:text-left">{name}</h4>
                                <p className="text-gray-500 text-sm text-center md:text-left">{title}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 justify-center md:justify-start pt-2">
                            {reviews.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === idx ? "w-3 bg-[#8B0000]" : "w-3 bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
                        <Image
                            src="/assets/Vector.png"
                            alt="Vector background"
                            width={500}
                            height={500}
                            className="w-full h-auto"
                        />
                        <motion.div
                            ref={imageBlock}
                            initial={{ opacity: 0, x: 80 }}
                            animate={imageVisible ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="absolute bottom-0 left-0 right-0"
                        >
                            <Image
                                src="/assets/feedback_person.png"
                                alt="Customer Illustration"
                                width={500}
                                height={500}
                                className="w-full h-auto"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
