import React, { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "./ProductCard";
import "./ProductCard.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted.current) {
        const productsData = await response.clone().json();
        // Add stock information to products (mock data)
        const productsWithStock = productsData.map((product) => ({
          ...product,
          stock: Math.random() > 0.2 ? Math.floor(Math.random() * 50) + 1 : 0, // 80% chance of being in stock
        }));
        setData(productsWithStock);
        setFilter(productsWithStock);
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted.current = false;
    };
  }, []);

  const Loading = () => {
    return (
      <>
        <div className='col-12 py-5 text-center'>
          <Skeleton height={40} width={560} />
        </div>
        <div className='products-grid'>
          {[...Array(6)].map((_, index) => (
            <div key={index} className='product-card-skeleton'>
              <Skeleton height={280} />
              <div style={{ padding: "20px" }}>
                <Skeleton height={20} width='60%' />
                <Skeleton height={24} width='80%' />
                <Skeleton height={16} width='40%' />
                <Skeleton height={20} width='30%' />
                <Skeleton height={40} width='100%' />
                <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                  <Skeleton height={40} width='50%' />
                  <Skeleton height={40} width='50%' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className='filter-buttons'>
          <button className='filter-btn active' onClick={() => setFilter(data)}>
            All Products
          </button>
          <button
            className='filter-btn'
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className='filter-btn'
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className='filter-btn'
            onClick={() => filterProduct("jewelery")}
          >
            Jewelry
          </button>
          <button
            className='filter-btn'
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        <div className='products-grid'>
          {filter.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <div className='container responsive-container my-3 py-3'>
        <div className='row'>
          <div className='col-12'>
            <h2 className='display-5 text-center'>Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className='row justify-content-center'>
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
