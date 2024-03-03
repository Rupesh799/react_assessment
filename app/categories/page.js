"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  const fetchCategories = async () => {
    const res = await fetch("https://dummyjson.com/products/categories");
    const data = await res.json();
    console.log(data);
    return data;
  };

  const fetchProductsOfCategory = async (category) => {
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  };
  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsOfCategory(selectedCategory).then((data) =>
        setProducts(data.products)
      );
    } else {
      setProducts([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (router.isReady) {
      const { category } = router.query;
      if (category) {
        setSelectedCategory(category);
      }
    }
  }, [router.isReady]);

  return (
    <div>
      <h1 className="text-3xl text-center m-3 p-4 font-bold ">
        Product Categories
      </h1>
      <hr />
      <div className="mt-6 mb-10 ">
        <label htmlFor="categoryDropdown" className="mr-2 text-2xl">
          Select a category:
        </label>
        <select
          id="categoryDropdown"
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="" disabled selected>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div className="flex flex-wrap px-5 m-4 " >
          <h2 className=" text-center text-2xl font-bold text-blue-300 uppercase ">{selectedCategory}</h2>
          <ul className="grid grid-cols-4 gap-7 mt-7">
            {products.map((product) => (
              <li key={product.id}>
               <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full h-40 object-cover" src={product.thumbnail} alt="image"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
 
</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Categories;
