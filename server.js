const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const proxy = require('http-proxy-middleware')

const app = express();
const config = require('./webpack.common.js');
const compiler = webpack(config);


// // 设置跨域
// app.use('*', proxy({
//   target: 'http://192.168.1.203:9002',
//   changeOrigin: true,
//   // pathRewrite: path => path.replace('api', ''),
// }))

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
