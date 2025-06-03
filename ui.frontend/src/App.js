import React from 'react';
import { Page, withModel } from '@adobe/aem-react-editable-components';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './utils/graphql-client';
import './App.css';

// Import commerce components
import './components/commerce/import-commerce-components';

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
          {/* Add fallback content when no components are available */}
          {this.childComponents || 
            <div className="debug-info">
              <h1>My AEM SPA</h1>
              <p>No child components found. This could be because:</p>
              <ul>
                <li>The AEM page model is not being loaded correctly</li>
                <li>No components have been added to the page in AEM</li>
                <li>Component mapping is not configured correctly</li>
              </ul>
              <div className="demo-content">
                <h2>Demo Content</h2>
                <p>This is placeholder content for development.</p>
                {/* Placeholder for product list - will be properly rendered when in AEM */}
                <div className="placeholder-product-list">
                  <h3>Product List Placeholder</h3>
                  <p>This is a placeholder for the Product List component.</p>
                  <p>In AEM, this would be replaced with actual CIF components.</p>
                </div>
              </div>
            </div>
          }
          {this.childPages}
        </div>
      </ApolloProvider>
    );
  }
}

export default withModel(App);
