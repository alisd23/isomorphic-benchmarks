import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import paths from '../paths';

export default ({ server, env }) => ({
  context: paths.root,
  entry: [
    path.join(paths.config, 'polyfills.js'),
    path.join(paths.client, 'client.js')
  ],
  resolve: {
    extensions: ['.js', '.json'],
    modules: [paths.ownNodeModules],
    alias: {
      client: paths.client,
      server: paths.server,
      shared: paths.shared,
      assets: paths.assets,
      config: paths.config
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'assets/favicon.ico',
        to: 'assets/favicon.ico'
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${env}"`,
      '_ISOMORPHIC_': process.env.ISOMORPHIC,
      '_SPLIT_': process.env.SPLIT,
      '_BUNDLE_SIZE_': process.env.BUNDLE_SIZE || 0,
      '_SERVER_': !!server,
      '_CLIENT_': !server
    })
  ]
});
