"use client";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const ProductCount = () => {
  const [productData, setProductData] = useState([]);
  const [productCountPerCategory, setProductCountPerCategory] = useState({});

  useEffect(() => {
    // Fetch product data from API
    const fetchProductData = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      console.log(data);
      setProductData(data);
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    const getProductCountPerCategory = async (categories) => {
      const countPerCategory = {};

      for (const category of categories) {
        const response = await fetch(`https://dummyjson.com/products/category/${category}`);
        const data = await response.json();
        countPerCategory[category] = data.products.length;
      }

      setProductCountPerCategory(countPerCategory);
    };

    getProductCountPerCategory(productData);
  }, [productData]);

  const pieData = {
    labels: Object.keys(productCountPerCategory),
    datasets: [
      {
        label: "Number of Products",
        data: Object.values(productCountPerCategory),
        backgroundColor: [
          "rgba(181, 71, 128, 0.8)",
          "rgba(37, 169, 128, 0.8)",
          "rgba(0, 148, 246, 0.8)",
          "rgba(12, 157, 173, 1)",
          "rgba(34, 230, 255, 0.36)",
          "rgba(106, 255, 0, 0.96)",
          "rgba(6, 24, 88, 0.96)",
          "rgba(246, 101, 169, 0.96)",
          "rgba(111, 6, 172, 0.96)",
          "rgba(38, 30, 48, 0.96)",
        ],
        borderColor: [
          "rgba(6, 24, 88, 0.96)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-8 mt-9 text-center capitalize">
        Pie chart of Product Distribution by Product Categories
      </h1>
      <hr />
      <div
        style={{ height: "900px", width: "900px" }}
        className="w-full mx-auto flex justify-center"
      >
        <Pie
          data={pieData}
          options={{
            tooltips: {
              callbacks: {
                label: (tooltipItem, data) => {
                  const dataset = data.datasets[tooltipItem.datasetIndex];
                  const label = data.labels[tooltipItem.index];
                  const count = dataset.data[tooltipItem.index];
                  return `${label}: ${count} product${count !== 1 ? "s" : ""}`;
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProductCount;