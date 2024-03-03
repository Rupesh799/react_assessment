"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 12;

  //fetching the products from api
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${productsPerPage}&skip=${(page - 1) * productsPerPage}`
        );
        const data = await response.json();

        console.log("API Response:", data);

        // Checking if the "products" key is present in the response
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
          setTotalPages(Math.ceil(data.total / productsPerPage));
        } else {
          console.error("Invalid response format:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <div className="m-7 text-center">
        <h1 className="text-3xl font-bold">All products</h1>
      </div>
      <hr />

      <ul className="grid grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`product/${product.id}`}>
              <div className="grid rounded overflow-hidden shadow-lg m-6 bg-gray-100">
                <img
                  className="w-full h-40 object-cover"
                  src={product.thumbnail}
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{product.title}</div>
                  <p className="text-gray-700 text-base mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between">
                    <button className="bg-blue-200 rounded px-3 py-2">
                      Price: {product.price}
                    </button>
                    <p className="font-bold pt-3 text-green-600">
                      -{product.discountPercentage} %
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-4 mb-6 flex justify-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="mr-2 bg-blue-500 text-white p-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;