"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

type Food = {
    _id?: string;
    name: string;
    category: string;
    price: string | number;
    image?: string;
};

type Category = {
    _id?: string;
    name: string;
};

export default function Foods() {
    const [foods, setFoods] = useState < Food[] > ([]);
    const [categories, setCategories] = useState < Category[] > ([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    const [showFoodModal, setShowFoodModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [isCreatingFood, setIsCreatingFood] = useState(false);
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);


    const [newFood, setNewFood] = useState < {
        name: string;
        category: string;
        price: string;
        imageFile: File | null;
    } > ({
        name: "",
        category: "",
        price: "",
        imageFile: null,
    });

    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const [foodsRes, categoriesRes] = await Promise.all([
                    axios.get("https://antopolis-restaurant-server-shahria.vercel.app/foods"),
                    axios.get("https://antopolis-restaurant-server-shahria.vercel.app/categories"),
                ]);
                setFoods(foodsRes.data);
                setCategories(categoriesRes.data);
            } catch {
                toast.error("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const filteredFoods =
        selectedCategory === "All"
            ? foods
            : foods.filter((f) => f.category === selectedCategory);

    const handleFoodChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const files = (e.target as HTMLInputElement).files;

        if (name === "imageFile" && files && files.length > 0) {
            setNewFood((prev) => ({ ...prev, imageFile: files[0] }));
        } else {
            setNewFood((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFoodSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsCreatingFood(true);
        const formData = new FormData();
        formData.append("name", newFood.name);
        formData.append("category", newFood.category);
        formData.append("price", newFood.price);
        if (newFood.imageFile) formData.append("image", newFood.imageFile);

        try {
            await axios.post("https://antopolis-restaurant-server-shahria.vercel.app/foods", formData);
            toast.success("Food added successfully");
            setShowFoodModal(false);
            setNewFood({ name: "", category: "", price: "", imageFile: null });
            const res = await axios.get("https://antopolis-restaurant-server-shahria.vercel.app/foods");
            setFoods(res.data);
        } catch {
            toast.error("Failed to add food");
        } finally {
            setIsCreatingFood(false);
        }
    };


    const handleCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsCreatingCategory(true);

        try {
            await axios.post("https://antopolis-restaurant-server-shahria.vercel.app/categories", {
                name: newCategory,
            });
            toast.success("Category added successfully");
            setShowCategoryModal(false);
            setNewCategory("");
            const res = await axios.get("https://antopolis-restaurant-server-shahria.vercel.app/categories");
            setCategories(res.data);
        } catch {
            toast.error("Failed to add category");
        } finally {
            setIsCreatingCategory(false);
        }
    };


    return (
        <section className="py-10">
            <Toaster position="top-right" />
            <div className="px-4 sm:px-10 lg:px-40 mx-auto">
                <h2 className="text-4xl font-bold text-center mb-2">Our Best Seller Dishes</h2>
                <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
                    Our fresh garden salad is a light and refreshing option. It features a mix of crisp lettuce,
                    juicy tomatoes all tossed in your choice of dressing.
                </p>

                {/* Filter + Add buttons */}
                <div className="mb-6 flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex flex-wrap gap-3 justify-start px-4">
                        <button
                            onClick={() => setSelectedCategory("All")}
                            className={`px-6 py-2 rounded-full text-sm font-medium border shadow ${selectedCategory === "All"
                                ? "bg-black text-white"
                                : "bg-white text-black border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat._id || cat.name}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`px-6 py-2 rounded-full text-sm font-medium border shadow ${selectedCategory === cat.name
                                    ? "bg-black text-white"
                                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-4 px-4 lg:px-0">
                        <button
                            onClick={() => setShowFoodModal(true)}
                            className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800"
                        >
                            Add Food
                        </button>
                        <button
                            onClick={() => setShowCategoryModal(true)}
                            className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800"
                        >
                            Add Category
                        </button>
                    </div>
                </div>

                {/* Loading Spinner or Food Cards */}
                {loading ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <span className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-gray-800" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                        {filteredFoods.map((food) => (
                            <div
                                key={food._id}
                                className="bg-white shadow-lg rounded overflow-hidden hover:shadow-xl transition"
                            >
                                <div className="relative w-full h-56">
                                    {food.image ? (
                                        <Image
                                            src={`data:image/png;base64,${food.image}`}
                                            alt={food.name}
                                            fill
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-xl font-semibold text-gray-900">{food.name}</h3>
                                        <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full capitalize">
                                            {food.category}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-yellow-400 text-sm">{"★".repeat(5)}</div>
                                        <div className="font-bold text-xl">${food.price}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Food Modal */}
            {showFoodModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#3d3d3d] text-white rounded-2xl p-6 w-full max-w-sm shadow-lg border border-gray-700">
                        <h3 className="text-2xl font-semibold text-center mb-6">Add Food</h3>

                        <form onSubmit={handleFoodSubmit} className="space-y-4">
                            {/* Food Name */}
                            <input
                                type="text"
                                name="name"
                                placeholder="Food Name"
                                value={newFood.name}
                                onChange={handleFoodChange}
                                className="w-full px-4 py-3 rounded-full bg-[#555] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />

                            {/* Food Category */}
                            <select
                                name="category"
                                value={newFood.category}
                                onChange={handleFoodChange}
                                className="w-full px-4 py-3 rounded-full bg-[#555] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="">Food Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id || cat.name} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>

                            {/* Price */}
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={newFood.price}
                                onChange={handleFoodChange}
                                className="w-full px-4 py-3 rounded-full bg-[#555] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />

                            {/* Image Upload */}
                            <label
                                htmlFor="imageFile"
                                className={`block w-full text-center px-4 py-6 border-2 border-dashed rounded-full cursor-pointer transition
    ${newFood.imageFile ? "border-green-500 text-green-400 hover:bg-green-500 hover:text-white" : "border-red-500 text-red-400 hover:bg-red-500 hover:text-white"}`}
                            >
                                {newFood.imageFile ? newFood.imageFile.name : "Upload or Drag image here"}
                                <input
                                    id="imageFile"
                                    type="file"
                                    name="imageFile"
                                    accept="image/*"
                                    onChange={handleFoodChange}
                                    className="hidden"
                                />
                            </label>


                            {/* Buttons */}
                            <div className="flex justify-between gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowFoodModal(false)}
                                    className="flex-1 py-3 rounded-full border border-gray-400 text-white hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded-full bg-red-600 hover:bg-red-700 transition font-semibold disabled:opacity-60"
                                    disabled={isCreatingFood}
                                >
                                    {isCreatingFood ? "Saving..." : "Save"}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Category Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#3d3d3d] text-white rounded-2xl p-6 w-full max-w-sm shadow-lg border border-gray-700">
                        <h3 className="text-2xl font-semibold text-center mb-6">Add Category</h3>

                        <form onSubmit={handleCategorySubmit} className="space-y-4">
                            {/* Category Name Input */}
                            <input
                                type="text"
                                placeholder="Category Name"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="w-full px-4 py-3 rounded-full bg-[#555] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />

                            {/* Buttons */}
                            <div className="flex justify-between gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowCategoryModal(false)}
                                    className="flex-1 py-3 rounded-full border border-gray-400 text-white hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded-full bg-red-600 hover:bg-red-700 transition font-semibold disabled:opacity-60"
                                    disabled={isCreatingFood}
                                >
                                    {isCreatingCategory ? "Saving..." : "Save"}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}

        </section>
    );
}
