'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const fakeFoods = [
    { id: 1, name: 'Salad Fry', category: 'Breakfast', price: 230, image: '/assets/banner1.png' },
    { id: 2, name: 'Chicken Breast', category: 'Lunch', price: 230, image: '/assets/banner1.png' },
    { id: 3, name: 'Chicken Legs', category: 'Dinner', price: 230, image: '/assets/banner1.png' },
    { id: 4, name: 'Fruit Basic', category: 'Lunch', price: 230, image: '/assets/banner1.png' },
    { id: 5, name: 'Veggie Salad', category: 'Dinner', price: 230, image: '/assets/banner1.png' },
    { id: 6, name: 'Chicken Roll', category: 'Breakfast', price: 230, image: '/assets/banner1.png' },
];

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner'];

const Foods = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredFoods =
        selectedCategory === 'All'
            ? fakeFoods
            : fakeFoods.filter((food) => food.category === selectedCategory);

    return (
        <section className="py-10">
            <div className="max-w-screen-xl px-4 sm:px-10 lg:px-40 mx-auto">
                {/* Header */}
                <h2 className="text-4xl font-bold text-center mb-2">Our best Seller Dishes</h2>
                <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
                    Our fresh garden salad is a light and refreshing option. It features a mix of crisp lettuce, juicy tomatoe all tossed in your choice of dressing.
                </p>

                {/* Filters + Add */}
                <div className="mb-6 flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex flex-wrap gap-3 justify-start px-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-medium shadow transition-all border ${selectedCategory === cat
                                    ? 'bg-black text-white'
                                    : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-4 px-4 lg:px-0">
                        <button className="px-6 py-2 rounded-full bg-black text-white text-sm font-medium shadow hover:bg-gray-800">
                            Add Food
                        </button>
                        <button className="px-6 py-2 rounded-full bg-black text-white text-sm font-medium shadow hover:bg-gray-800">
                            Add Category
                        </button>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {filteredFoods.map((food) => (
                        <div
                            key={food.id}
                            className="bg-white overflow-hidden shadow-lg shadow-gray-200 hover:shadow-xl transition-all"
                        >
                            <div className="relative w-full h-56">
                                <Image
                                    src={food.image}
                                    alt={food.name}
                                    fill
                                    className="object-contain" 
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-medium text-gray-900">{food.name}</h3>
                                    <span className="bg-red-500 text-white text-xs px-4 py-1 rounded-full capitalize">
                                        {food.category}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-yellow-400 text-sm">{'★'.repeat(5)}</div>
                                    <div className="font-bold text-xl">${food.price}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Foods;
