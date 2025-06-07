const isProduction = process.env.NODE_ENV === 'production';

const productsMfeBaseUrl = isProduction
  ? process.env.PRODUCTS_MFE_URL
  : 'http://localhost:3001';
const cartMfeBaseUrl = isProduction
  ? process.env.CART_MFE_URL
  : 'http://localhost:3002';

const config = {
  name: 'main-app-valor-software',
  remotes: {
    products: `products@${productsMfeBaseUrl}/remoteEntry.js`,
    cart: `cart@${cartMfeBaseUrl}/remoteEntry.js`,
  },
  exposes: {},
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
  },
};

export default config;
