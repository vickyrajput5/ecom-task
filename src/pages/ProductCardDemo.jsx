import React from "react";
import { Navbar, Footer } from "../components";
import ProductCard from "../components/ProductCard";
import "./ProductCardDemo.css";

const ProductCardDemo = () => {
  // Test data as specified in the task
  const testProducts = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      price: 199.99,
      category: "electronics",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 4.5, count: 128 },
      stock: 15,
      description:
        "High-quality wireless headphones with noise cancellation and premium sound quality.",
    },
    {
      id: 2,
      title: "Classic Cotton T-Shirt",
      price: 29.99,
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: { rate: 4.2, count: 89 },
      stock: 0, // Out of stock
      description:
        "Comfortable and stylish cotton t-shirt perfect for everyday wear.",
    },
    {
      id: 3,
      title: "Elegant Diamond Ring",
      price: 599.99,
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 4.8, count: 45 },
      stock: 3,
      description:
        "Beautiful diamond ring with elegant design and premium craftsmanship.",
    },
    {
      id: 4,
      title: "Smart Fitness Watch",
      price: 299.99,
      category: "electronics",
      image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
      rating: { rate: 4.3, count: 156 },
      stock: 25,
      description:
        "Advanced fitness tracking watch with heart rate monitor and GPS.",
    },
    {
      id: 5,
      title: "Designer Handbag",
      price: 149.99,
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
      rating: { rate: 4.1, count: 67 },
      stock: 8,
      description:
        "Stylish designer handbag with premium leather and spacious interior.",
    },
    {
      id: 6,
      title: "Gaming Laptop",
      price: 1299.99,
      category: "electronics",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      rating: { rate: 4.6, count: 203 },
      stock: 12,
      description:
        "High-performance gaming laptop with advanced graphics and fast processing.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className='demo-container responsive-container'>
        <div className='demo-header'>
          <h1>Product Card UI Demo</h1>
          <p>Responsive Product Card Component with Modern Design</p>
        </div>

        <div className='demo-section'>
          <h2>Features Implemented</h2>
          <div className='features-grid'>
            <div className='feature-item'>
              <i className='fa fa-mobile'></i>
              <h3>Responsive Design</h3>
              <p>Works perfectly on desktop, tablet, and mobile devices</p>
            </div>
            <div className='feature-item'>
              <i className='fa fa-image'></i>
              <h3>Image Handling</h3>
              <p>
                Proper image loading, error handling, and placeholder states
              </p>
            </div>
            <div className='feature-item'>
              <i className='fa fa-tags'></i>
              <h3>Variant Options</h3>
              <p>Dropdown selector for different product variants and prices</p>
            </div>
            <div className='feature-item'>
              <i className='fa fa-shopping-cart'></i>
              <h3>Add to Cart</h3>
              <p>
                Interactive button with proper disabled state for out-of-stock
                items
              </p>
            </div>
            <div className='feature-item'>
              <i className='fa fa-star'></i>
              <h3>Product Ratings</h3>
              <p>Visual star ratings with review count display</p>
            </div>
            <div className='feature-item'>
              <i className='fa fa-eye'></i>
              <h3>Quick View</h3>
              <p>Hover overlay with quick view functionality</p>
            </div>
          </div>
        </div>

        <div className='demo-section'>
          <h2>Product Cards</h2>
          <div className='products-grid'>
            {testProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className='demo-section'>
          <h2>Responsive Breakpoints</h2>
          <div className='breakpoints-info'>
            <div className='breakpoint'>
              <h4>Desktop (1200px+)</h4>
              <p>4-5 cards per row with full feature set</p>
            </div>
            <div className='breakpoint'>
              <h4>Tablet (768px - 1199px)</h4>
              <p>2-3 cards per row with optimized layout</p>
            </div>
            <div className='breakpoint'>
              <h4>Mobile (480px - 767px)</h4>
              <p>1-2 cards per row with stacked buttons</p>
            </div>
            <div className='breakpoint'>
              <h4>Small Mobile (&lt; 480px)</h4>
              <p>Single column layout with compact design</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductCardDemo;
