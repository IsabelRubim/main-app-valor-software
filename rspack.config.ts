import * as path from 'node:path';
import * as RefreshPlugin from '@rspack/plugin-react-refresh';
import { rspack } from '@rspack/core';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { withZephyr } from 'zephyr-rspack-plugin';

import moduleFederationConfig from './module-federation.config';

const isDev = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const publicPath = isProduction ? '/' : 'http://localhost:3000/';

const targets = ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14'];

export default withZephyr()({
  context: __dirname,
  entry: {
    main: './src/index.ts',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, 'src')],
    static: {
      directory: path.resolve(__dirname, '.'),
    },
  },
  output: {
    uniqueName: 'main-app-valor-software',
    publicPath: publicPath,
  },
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['postcss-loader'],
        type: 'css',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new ModuleFederationPlugin(moduleFederationConfig),
    isDev ? new RefreshPlugin() : null,
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
});
