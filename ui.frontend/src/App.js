import React from 'react';
import { Page, withModel } from '@adobe/aem-react-editable-components';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './utils/graphql-client';
import './App.css';

// Import commerce components
import { ProductList, ShoppingCart } from '@adobe/aem-cif-react-components';
import HeroBanner from './components/commerce/HeroBanner/HeroBanner';
import FeatureCards from './components/commerce/FeatureCards/FeatureCards';

// This component is the application entry point
class App extends Page {
  componentDidMount() {
    console.log('App mounted');
    console.log('Child components:', this.childComponents);
    console.log('Child pages:', this.childPages);
    console.log('Model:', this.props);
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <div className="App">
          {/* Main e-commerce layout */}
          <HeroBanner 
            title="Welcome to Our Store"
            subtitle="Discover amazing products at great prices"
            backgroundImage="/assets/hero-background.jpg"
            ctaText="Shop Now"
            ctaLink="/products"
          />

          {/* Feature Cards Section */}
          <FeatureCards 
            features={[
              {
                icon: "/assets/fast-shipping.svg",
                title: "Fast Shipping",
                description: "Get your orders delivered quickly and safely."
              },
              {
                icon: "/assets/secure-payment.svg",
                title: "Secure Payments",
                description: "Safe and secure payment processing."
              },
              {
                icon: "/assets/support.svg",
                title: "24/7 Support",
                description: "Customer support available around the clock."
              }
            ]}
          />

          {/* Product List Section */}
          <ProductList 
            cqPath="/content/myaemspa/en/products"
            cqIsContainer={true}
          />

          {/* Shopping Cart */}
          <ShoppingCart 
            cqPath="/content/myaemspa/en/cart"
          />

          {this.childComponents}
          {this.childPages}
        </div>
      </ApolloProvider>
    );
  }
}

export default withModel(App);
