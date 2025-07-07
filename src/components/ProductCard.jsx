import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState("default");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const dispatch = useDispatch();

  // Mock variant options - in real app this would come from product data
  const variantOptions = [
    { id: "default", name: "Default", price: product.price },
    { id: "large", name: "Large", price: (product.price * 1.2).toFixed(2) },
    { id: "premium", name: "Premium", price: (product.price * 1.5).toFixed(2) },
  ];

  const currentVariant = variantOptions.find((v) => v.id === selectedVariant);
  const isOutOfStock = product.stock === 0 || product.stock === false;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("Product is out of stock!");
      return;
    }

    const productWithVariant = {
      ...product,
      selectedVariant: currentVariant,
      finalPrice: currentVariant.price,
    };

    dispatch(addCart(productWithVariant));
    toast.success("Added to cart!");
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setImageError(true);
  };

  return (
    <div className='product-card'>
      {/* Product Image Section */}
      <div className='product-card__image-container'>
        {isImageLoading && (
          <div className='product-card__image-skeleton'>
            <div className='skeleton-loader'></div>
          </div>
        )}

        {imageError ? (
          <div className='product-card__image-placeholder'>
            <i className='fa fa-image'></i>
            <span>Image not available</span>
          </div>
        ) : (
          <img
            className={`product-card__image ${
              isImageLoading ? "loading" : "loaded"
            }`}
            src={product.image}
            alt={product.title}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* Stock Badge */}
        {isOutOfStock && (
          <div className='product-card__stock-badge out-of-stock'>
            Out of Stock
          </div>
        )}

        {/* Quick View Overlay */}
        <div className='product-card__overlay'>
          <Link
            to={`/product/${product.id}`}
            className='product-card__quick-view'
          >
            Quick View
          </Link>
        </div>
      </div>

      {/* Product Info Section */}
      <div className='product-card__content'>
        {/* Category */}
        <div className='product-card__category'>{product.category}</div>

        {/* Product Name */}
        <h3 className='product-card__title'>
          <Link to={`/product/${product.id}`}>
            {product.title.length > 50
              ? `${product.title.substring(0, 50)}...`
              : product.title}
          </Link>
        </h3>

        {/* Rating */}
        <div className='product-card__rating'>
          <div className='stars'>
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={`fa fa-star ${
                  index < Math.floor(product.rating?.rate || 0) ? "filled" : ""
                }`}
              ></i>
            ))}
          </div>
          <span className='rating-count'>({product.rating?.count || 0})</span>
        </div>

        {/* Price */}
        <div className='product-card__price'>
          <span className='current-price'>${currentVariant.price}</span>
          {selectedVariant.id !== "default" && (
            <span className='original-price'>${product.price}</span>
          )}
        </div>

        {/* Variant Selector */}
        <div className='product-card__variants'>
          <select
            className='variant-selector'
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            disabled={isOutOfStock}
          >
            {variantOptions.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.name} - ${variant.price}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className='product-card__actions'>
          {isOutOfStock ? (
            <button
              className='product-card__button product-card__button--disabled'
              disabled
            >
              Out of Stock
            </button>
          ) : (
            <button
              className='product-card__button product-card__button--primary'
              onClick={handleAddToCart}
            >
              <i className='fa fa-shopping-cart'></i>
              Add to Cart
            </button>
          )}

          <Link
            to={`/product/${product.id}`}
            className='product-card__button product-card__button--secondary'
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
