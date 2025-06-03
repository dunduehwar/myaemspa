# E-Commerce Integration Guide for AEM SPA Project

This guide provides instructions for integrating e-commerce functionality into your AEM SPA project using Adobe's Commerce Integration Framework (CIF) with a commerce backend (e.g., Adobe Commerce/Magento).

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Component Usage](#component-usage)
5. [Development Workflow](#development-workflow)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

- AEM 6.5.x or AEM as a Cloud Service
- CIF Add-On installed in AEM
- Commerce backend (e.g., Adobe Commerce/Magento) with GraphQL endpoint
- Node.js 12+ and npm 6+

## Installation

### 1. Install CIF Add-On

If you're using AEM 6.5, download and install the CIF Add-On from Adobe's Software Distribution portal. For AEM as a Cloud Service, the CIF Add-On is available through Cloud Manager.

### 2. Update Frontend Dependencies

Update your `ui.frontend/package.json` file to include the required dependencies:

```bash
cd ui.frontend
npm install @apollo/client graphql --save
```

Also, add `"type": "module"` to your package.json to support ES modules.

### 3. Build and Deploy

Build and deploy the project to AEM:

```bash
mvn clean install -PautoInstallSinglePackage
```

## Configuration

### 1. Configure GraphQL Endpoint

The GraphQL endpoint is configured in the following file:

```
ui.apps/src/main/content/jcr_root/apps/myaemspa/config/com.adobe.cq.commerce.graphql.client.impl.GraphqlClientImpl~default.cfg.json
```

Update the `url` property to point to your commerce backend's GraphQL endpoint.

### 2. Configure Dispatcher (if applicable)

If you're using the AEM Dispatcher, update your dispatcher configuration to allow proxying of GraphQL requests to your commerce backend.

Example configuration in `dispatcher/src/conf.d/dispatcher_vhost.conf`:

```apache
<IfDefine COMMERCE>
  # Allow GraphQL requests to the commerce backend
  ProxyPassMatch ^/api/graphql https://<commerce-backend>/graphql
  ProxyPassReverse ^/api/graphql https://<commerce-backend>/graphql
</IfDefine>
```

## Component Usage

This project includes the following e-commerce components:

### Product List

Displays a grid of products with basic information.

- AEM Component: `myaemspa/components/commerce/productlist`
- React Component: `ui.frontend/src/components/commerce/ProductList/ProductList.js`

### Product Detail

Displays detailed information about a single product.

- AEM Component: `myaemspa/components/commerce/productdetail`
- React Component: `ui.frontend/src/components/commerce/ProductDetail/ProductDetail.js`

### Shopping Cart

Displays the current items in the shopping cart.

- AEM Component: `myaemspa/components/commerce/shoppingcart`
- React Component: `ui.frontend/src/components/commerce/ShoppingCart/ShoppingCart.js`

## Development Workflow

### 1. Create AEM Pages

1. Create a new page in AEM using a template that includes the SPA component.
2. Add the commerce components to the page using the AEM editor.

### 2. Develop React Components

1. Modify the React components in the `ui.frontend/src/components/commerce` directory.
2. Run the frontend development server:

```bash
cd ui.frontend
npm start
```

3. Build and deploy to AEM:

```bash
npm run build
npm run sync
```

### 3. GraphQL Integration

The commerce components use Apollo Client to fetch data from the commerce backend. The Apollo Client is configured in `ui.frontend/src/utils/graphql-client.js`.

Example GraphQL query in a component:

```javascript
import { gql, useQuery } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      items {
        sku
        name
        price {
          regularPrice {
            amount {
              value
              currency
            }
          }
        }
        image {
          url
        }
      }
    }
  }
`;

function ProductList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  
  // Component implementation
}
```

## Troubleshooting

### Common Issues

#### 1. GraphQL Endpoint Not Accessible

- Check that the GraphQL endpoint is correctly configured in the AEM configuration.
- Verify that the Dispatcher configuration allows proxying of GraphQL requests.

#### 2. Components Not Rendering

- Check that the components are correctly registered in `import-commerce-components.js`.
- Verify that the components are included in the AEM template policy.

#### 3. ES Module Errors

If you encounter errors related to ES modules, ensure that:

- `"type": "module"` is added to your package.json.
- Import statements use the correct syntax for ES modules.

### Support

For additional support, refer to the following resources:

- [Adobe Experience Manager Documentation](https://experienceleague.adobe.com/docs/experience-manager-65.html)
- [Commerce Integration Framework Documentation](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/content-and-commerce/introduction.html)
- [Adobe Commerce Developer Documentation](https://devdocs.magento.com/)