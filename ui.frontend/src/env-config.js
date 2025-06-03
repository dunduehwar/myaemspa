// This file provides environment variables for the React application
// when running in development mode outside of AEM

// Make process available in the browser environment
if (typeof window !== 'undefined' && !window.process) {
  window.process = {
    env: {
      NODE_ENV: 'development',
      PUBLIC_URL: '',
      // Add any other environment variables your app needs
      REACT_APP_GRAPHQL_ENDPOINT: '/api/graphql'
    }
  };
}

export default window.process;
