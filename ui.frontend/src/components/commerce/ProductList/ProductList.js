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
import './ProductList.css';

// This is a placeholder for the actual GraphQL implementation
// In a real implementation, we would use Apollo Client to fetch data
const mockProducts = [
  {
    id: '1',
    sku: 'MH01',
    name: 'Hero Hoodie',
    price: 54.00,
    currency: 'USD',
    image: 'https://via.placeholder.com/300x400?text=Hero+Hoodie',
    description: 'A comfortable and stylish hoodie for everyday wear.'
  },
  {
    id: '2',
    sku: 'MJ01',
    name: 'Stellar Jacket',
    price: 75.00,
    currency: 'USD',
    image: 'https://via.placeholder.com/300x400?text=Stellar+Jacket',
    description: 'Stay warm and look cool with this premium jacket.'
  },
  {
    id: '3',
    sku: 'MT01',
    name: 'Signature T-Shirt',
    price: 29.99,
    currency: 'USD',
    image: 'https://via.placeholder.com/300x400?text=Signature+T-Shirt',
    description: 'A classic t-shirt with our signature design.'
  },
  {
    id: '4',
    sku: 'MB01',
    name: 'Classic Backpack',
    price: 49.99,
    currency: 'USD',
    image: 'https://via.placeholder.com/300x400?text=Classic+Backpack',
    description: 'A durable backpack for all your adventures.'
  },
  {
    id: '5',
    sku: 'MS01',
    name: 'Sport Shoes',
    price: 89.99,
    currency: 'USD',
    image: 'https://via.placeholder.com/300x400?text=Sport+Shoes',
    description: 'High-performance shoes for your active lifestyle.'
  },
  {
    id: '6',
    sku: 'MW01',
    name: 'Smart Watch',
    price: 199.99,
    currency: 'USD',
    image: 'https://via.placeholder.com/300x400?text=Smart+Watch',
    description: 'Stay connected with our latest smart watch.'
  }
];

/**
 * Default Edit configuration for the Product List component
 *
 * @type EditConfig
 */
const ProductListEditConfig = {
  emptyLabel: 'Product List',

  isEmpty: function (props) {
    return !props || !props.products || props.products.length < 1;
  }
};

/**
 * ProductList Component
 * 
 * This component displays a grid of products with basic information
 * In a real implementation, it would fetch data from a commerce backend using GraphQL
 */
const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Simulate fetching products from an API
  useEffect(() => {
    // In a real implementation, this would be a GraphQL query using Apollo Client
    const fetchProducts = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="product-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Featured Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image" 
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">
                {product.price.toFixed(2)} {product.currency}
              </p>
              <p className="product-description">{product.description}</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapTo('myaemspa/components/commerce/productlist')(ProductList, ProductListEditConfig);