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

import React, { useState, useEffect } from 'react';
import { MapTo } from '@adobe/aem-react-editable-components';
import './ShoppingCart.css';

// Mock cart data - in a real implementation, this would come from a state management system
const mockCartItems = [
  {
    id: '1',
    sku: 'MH01',
    name: 'Hero Hoodie',
    price: 54.00,
    currency: 'USD',
    image: 'https://via.placeholder.com/100x100?text=Hero+Hoodie',
    color: 'Black',
    size: 'M',
    quantity: 1
  },
  {
    id: '2',
    sku: 'MJ01',
    name: 'Stellar Jacket',
    price: 75.00,
    currency: 'USD',
    image: 'https://via.placeholder.com/100x100?text=Stellar+Jacket',
    color: 'Navy',
    size: 'L',
    quantity: 2
  }
];

/**
 * Default Edit configuration for the Shopping Cart component
 *
 * @type EditConfig
 */
const ShoppingCartEditConfig = {
  emptyLabel: 'Shopping Cart',

  isEmpty: function (props) {
    return !props || !props.cartItems || props.cartItems.length < 1;
  }
};

/**
 * ShoppingCart Component
 * 
 * This component displays the current items in the shopping cart
 * In a real implementation, it would fetch data from a state management system
 */
const ShoppingCart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Simulate fetching cart items
  useEffect(() => {
    // In a real implementation, this would come from a state management system
    const fetchCartItems = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setCartItems(mockCartItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    // Simplified tax calculation (8.25%)
    return calculateSubtotal() * 0.0825;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="shopping-cart-component">
      <button
        className="cart-toggle-button"
        onClick={toggleCart}
        aria-expanded={isCartOpen}
        aria-controls="shopping-cart"
      >
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{itemCount}</span>
      </button>

      <div
        id="shopping-cart"
        className={`shopping-cart ${isCartOpen ? 'open' : ''}`}
        aria-hidden={!isCartOpen}
      >
        <div className="cart-header">
          <h2>Your Cart ({itemCount} items)</h2>
          <button className="close-cart-button" onClick={toggleCart}>×</button>
        </div>

        {loading ? (
          <div className="cart-loading">
            <div className="loading-spinner"></div>
            <p>Loading cart...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="continue-shopping-button" onClick={toggleCart}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-meta">
                      {item.color}, {item.size}
                    </p>
                    <p className="cart-item-price">
                      {item.price.toFixed(2)} {item.currency}
                    </p>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-quantity-selector">
                      <button
                        className="quantity-btn minus"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        className="quantity-btn plus"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-item-button"
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-totals">
                <div className="cart-subtotal">
                  <span>Subtotal</span>
                  <span>{calculateSubtotal().toFixed(2)} USD</span>
                </div>
                <div className="cart-tax">
                  <span>Tax (8.25%)</span>
                  <span>{calculateTax().toFixed(2)} USD</span>
                </div>
                <div className="cart-total">
                  <span>Total</span>
                  <span>{calculateTotal().toFixed(2)} USD</span>
                </div>
              </div>

              <div className="cart-actions">
                <button className="checkout-button">
                  Proceed to Checkout
                </button>
                <button className="continue-shopping-button" onClick={toggleCart}>
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {isCartOpen && <div className="cart-backdrop" onClick={toggleCart}></div>}
    </div>
  );
};

export default MapTo('myaemspa/components/commerce/shoppingcart')(ShoppingCart, ShoppingCartEditConfig);