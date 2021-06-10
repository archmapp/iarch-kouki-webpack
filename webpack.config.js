const path = require('path')
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const mode = process.env.NODE_ENV.trim() || 'development'
const isDev = mode === 'development'

let config = {
	mode: isDev ? 'development' : 'production',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'docs'),
		filename: 'js/bundle.js',
	},
	devtool: 'eval-source-map',

	devServer: {
		// before: function (app, server) {
		// 	server._watch('./src/sub/**/*.html')
		// },
		// contentBase: 'docs',
		contentBase: path.join(__dirname, 'docs'),
		open: true,
		hot: true,
		writeToDisk: true,
		// port: 3000,
		// host: '0.0.0.0',
	},

	module: {
		rules: [
			{
				// test: /\.css$/,
				test: /\.css|\.scss$/,
				use: [
					isDev ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							// options...
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		// ~~~ By default, module resolution path is current folder (./**) and node_modules.
		// It is also possible to specify full path:
		new webpack.ProvidePlugin({
			// $$: ['./shortJS.js', '../shortJS.js'],
			// $$: './shortJS.js',
			$$: path.resolve(path.join(__dirname, 'src/js/shortJS.js')),
			// bulmaCalendar: path.resolve(
			// 	path.join(__dirname, 'src/js/bulma-calendar.min.js')
			// ),
			bulmaCalendar: './bulma-calendar.min.js',
		}),
	],
}

if (isDev) {
} else {
	config = {
		...config,
		optimization: {
			minimize: true,
			minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
		},
	}
	config.plugins.push(
		new MiniCssExtractPlugin({
			filename: 'css/kouki.css',
		})
	)
}

module.exports = config
