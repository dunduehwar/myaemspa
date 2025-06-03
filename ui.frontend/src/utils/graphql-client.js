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

import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

// Determine the GraphQL endpoint based on environment
const getGraphQLEndpoint = () => {
  // Check if we're running in development mode outside of AEM
  if (typeof window !== 'undefined' && window.process && window.process.env && window.process.env.NODE_ENV === 'development') {
    // For local development, we can use a mock endpoint or point to a real commerce backend
    // You can change this to your actual commerce GraphQL endpoint when testing
    console.log('Using development GraphQL endpoint');
    return 'http://localhost:4502/graphql';
  }
  
  // In AEM, use the relative path which will be proxied to the commerce backend
  console.log('Using production GraphQL endpoint');
  return '/api/graphql';
};

// Create a standard HTTP link for GraphQL operations
const httpLink = new HttpLink({
  uri: getGraphQLEndpoint(),
  // Include credentials in requests if needed
  credentials: 'same-origin'
});

// Create a middleware link to add headers to requests
const middlewareLink = new ApolloLink((operation, forward) => {
  // Add any required headers for your commerce backend
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'Store': 'default', // Example: store code for multi-store setups
      'Content-Currency': 'USD' // Example: currency code
    }
  }));

  return forward(operation);
});

// Combine the links
const link = ApolloLink.from([middlewareLink, httpLink]);

// Create the Apollo Client instance
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;