/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2023 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import React, { useEffect, useState } from 'react';
import { MapTo } from '@adobe/aem-react-editable-components';
import './ProductDetail.css';

// Mock product data - in a real implementation, this would come from GraphQL
const mockProduct = {
  id: '1',
  sku: 'MH01',
  name: 'Hero Hoodie',
  price: 54.00,
  currency: 'USD',
  image: 'https://via.placeholder.com/600x800?text=Hero+Hoodie',
  description: 'A comfortable and stylish hoodie for everyday wear. Made with premium materials for durability and comfort.',
  features: [
    'Premium cotton blend',
    'Adjustable drawstring hood',
    'Front kangaroo pocket',
    'Ribbed cuffs and hem',
    'Machine washable'
  ],
  colors: ['Black', 'Navy', 'Gray', 'Red'],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  rating: 4.5,
  reviewCount: 127,
  inStock: true
};

/**
 * Default Edit configuration for the Product Detail component
 *
 * @type EditConfig
 */
const ProductDetailEditConfig = {
  emptyLabel: 'Product Detail',

  isEmpty: function (props) {
    return !props || !props.product;
  }
};

/**
 * ProductDetail Component
 * 
 * This component displays detailed information about a single product
 * In a real implementation, it would fetch data from a commerce backend using GraphQL
 */
const ProductDetail = (props) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Simulate fetching product from an API
  useEffect(() => {
    // In a real implementation, this would be a GraphQL query using Apollo Client
    const fetchProduct = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setProduct(mockProduct);
        setSelectedColor(mockProduct.colors[0]);
        setSelectedSize(mockProduct.sizes[1]); // Default to Medium
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // In a real implementation, this would dispatch an action to add the product to the cart
    console.log('Adding to cart:', {
      product,
      color: selectedColor,
      size: selectedSize,
      quantity
    });
    alert(`Added ${quantity} ${product.name} (${selectedColor}, ${selectedSize}) to cart`);
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-error">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-grid">
        <div className="product-detail-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-detail-image"
          />
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>

          <div className="product-detail-meta">
            <span className="product-detail-sku">SKU: {product.sku}</span>
            <div className="product-detail-rating">
              <div className="stars" style={{ '--rating': product.rating }}></div>
              <span className="review-count">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="product-detail-price">
            {product.price.toFixed(2)} {product.currency}
          </div>

          <div className="product-detail-description">
            {product.description}
          </div>

          <div className="product-detail-options">
            <div className="product-detail-colors">
              <label>Color:</label>
              <div className="color-options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => handleColorChange(color)}
                    title={color}
                    style={{ backgroundColor: color.toLowerCase() }}
                  ></button>
                ))}
              </div>
              <span className="selected-color">{selectedColor}</span>
            </div>

            <div className="product-detail-sizes">
              <label>Size:</label>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-detail-quantity">
              <label>Quantity:</label>
              <div className="quantity-selector">
                <button
                  className="quantity-btn minus"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-input"
                />
                <button
                  className="quantity-btn plus"
                  onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="product-detail-actions">
            <button
              className="add-to-cart-button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button className="wishlist-button">
              Add to Wishlist
            </button>
          </div>

          <div className="product-detail-features">
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapTo('myaemspa/components/commerce/productdetail')(ProductDetail, ProductDetailEditConfig);