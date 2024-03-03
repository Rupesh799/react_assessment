'use client'
import { useSearchParams } from 'next/navigation';
import React ,{useState, useEffect} from 'react'

const SingleProductDetails = () => {
    const [product, setProduct] = useState(null);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        const fetchSingleProduct = async() => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                if (!response.ok) {
                  throw new Error('Failed to fetch product');
              }
              const data = await response.json();

                console.log(data);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (id) {
            fetchSingleProduct();
        }
    }, [id]);
    if (!id) {
      return <div>No product ID provided.</div>;
  }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className='text-3xl font-bold mt-5 mb-6 text-center'>Product Details</h1>
            <hr/>
            <div className='flex justify-center items-center my-10'>
                <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={product.thumbnail} alt="image"/>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Product Name: {product.title}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default SingleProductDetails;