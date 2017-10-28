/* global __dirname, module, require */

const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devServer: {
    host: 'localhost',
    inline: true,
    port: 3000,
  },
  devtool: 'source-map',
  entry: path.join(__dirname, 'src/index.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: 'babel-loader',
		include: [
			 path.resolve(__dirname, 'node_modules/semtantic-ui/dist'), 
		]
      },
      {
        test: /\.png$/,
        use: 'url-loader',
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
	  {test:/\.svg$/,loader:'url-loader',query:{mimetype:'image/svg+xml',name:'./public/css/semantic/themes/default/assets/fonts/icons.svg'}},
      {test:/\.woff$/,loader:'url-loader',query:{mimetype:'application/font-woff',name:'./public/css/semantic/themes/default/assets/fonts/icons.woff'}},
            
      {test:/\.woff2$/,loader:'url-loader',query:{mimetype:'application/font-woff2',name:'./public/css/semantic/themes/default/assets/fonts/icons.woff2'}},
            
      {test:/\.[ot]tf$/,loader:'url-loader',query:{mimetype:'application/octet-stream',name:'./public/css/semantic/themes/default/assets/fonts/icons.ttf'}},   

      {test:/\.eot$/,loader:'url-loader',query:{mimetype:'application/vnd.ms-fontobject',name:'./public/css/semantic/themes/default/assets/fonts/icons.eot'}},
	
      {
          test: /\.(scss|sass)$/i,
          include: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'node_modules/semtantic-ui/dist'), 
            ],
          loaders: ["css", "sass"]
      },
      {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new HtmlPlugin({
		title: 'Gamejam!' ,
		template: 'src/index.html'}),
    new webpack.ProvidePlugin({
      'PIXI': path.join(__dirname, '/node_modules/phaser/build/custom/pixi.js'),
      'Phaser': path.join(__dirname, '/node_modules/phaser/build/custom/phaser-split.js'),
      'p2': path.join(__dirname, '/node_modules/phaser/build/custom/p2.js'),
	  jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
  ],
}
