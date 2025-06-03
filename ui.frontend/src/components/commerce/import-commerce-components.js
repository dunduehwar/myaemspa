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

import React from 'react';
import { MapTo } from '@adobe/aem-react-editable-components';
import withAsyncImport from '../../utils/withAsyncImport';

/**
 * Default Edit configuration for the commerce components
 *
 * @type EditConfig
 */
const commerceEditConfig = {
    emptyLabel: 'Commerce',

    isEmpty: function (props) {
        return !props || !props.cqPath || props.cqPath.trim().length < 1;
    }
};

/**
 * Lazy load the commerce components
 */
const LazyProductList = withAsyncImport(() => import('./ProductList/ProductList'));
const LazyProductDetail = withAsyncImport(() => import('./ProductDetail/ProductDetail'));
const LazyShoppingCart = withAsyncImport(() => import('./ShoppingCart/ShoppingCart'));

// Register the components with AEM
MapTo('myaemspa/components/commerce/productlist')(LazyProductList, commerceEditConfig);
MapTo('myaemspa/components/commerce/productdetail')(LazyProductDetail, commerceEditConfig);
MapTo('myaemspa/components/commerce/shoppingcart')(LazyShoppingCart, commerceEditConfig);