import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

export default {
  entry: './components/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'to-string-loader', // converts result to string
          'css-loader', // interprets @import and url() like import/require()
          'sass-loader' // loads Sass/SCSS and compiles to CSS
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader' // exports HTML as string
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html' // output in /dist
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 9000,
      proxy: 'http://localhost:9000/',
      files: ['./dist/*.html', './dist/*.js', './dist/*.css']
    }, {
      reload: false
    })
  ],
  mode: 'development',
  watch: true
};
