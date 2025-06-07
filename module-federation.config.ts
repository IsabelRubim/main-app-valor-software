const config = {
  name: 'zephyr-microfrontend-app',
  remotes: {
    products: 'products@http://localhost:3001/remoteEntry.js',
    cart: 'cart@http://localhost:3002/remoteEntry.js',
  },
  exposes: {},
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
  },
};

export default config;
