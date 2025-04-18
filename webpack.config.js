const path = require('path');
const chalk = require("chalk");
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const port = 8080;

module.exports = env => {
  return {
    mode: "development", // development 或 production，根据需要选择
    devtool: "cheap-module-eval-source-map",
    stats: "errors-warnings",

    entry: path.resolve(__dirname,'./src/main.js'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'build.js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          //解析器的执行顺序是从下往上(先css-loader再style-loader)
          test: /\.css$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                esModule: false,
                modules: {
                  auto: false, //modules 开关,移动端多页面模式关闭class hash命名
                  localIdentName: "[local]_[hash:base64:8]", // 自定义生成的类名
                },
              },
            },
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        },
        {
          test: /\.(eot|ttf|woff|woff2|svgz|ico)(\?.+)?$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }]
        },
        {
          test: /\.svg$/,
          include: [path.resolve('./src/assets/icon/svg')],
          use: [{
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]'//去掉svg这个图片加载不出来
            }
          }, {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  name: 'removeAttrs',
                  params: { attrs: 'fill' },
                },
              ],
            },
          }]
        },
        {
          test: /\.txt$/,
          use: 'raw-loader'
        },
      ]
    },
    resolve: {
      alias: { '@': path.resolve(__dirname,'./src') },
      extensions: ['.js', '.css', '.vue', '.json', '.txt']
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        filename: 'index.html',
        favicon: './public/favicon.ico'
      }),
      new CopyPlugin({
        patterns:[{
          from: "node_modules/@o2oa/doceditor/editor/public",
          to: "doceditor/public"
        }]
      }),
      // 进度条
      new ProgressBarPlugin({
        // format: `  :msg [:bar] :percent (:elapsed s)`,
        format: `  :msg ${chalk.yellowBright.bold("[:bar]")} ${chalk.green.bold(":percent")} (:elapsed s)`,
      }),
      // 打包体积分析
      // new BundleAnalyzerPlugin()
    ],
    devServer: {
      host: '0.0.0.0',
      port: port,
      open: true,
      compress: true,
      proxy: {
        '/api': {
          target: `http://[::1]:8100`,
          changeOrigin: true,
          pathRewrite: { '^/api': '' }
        }
      },
      client: {
        logging: 'info',
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: true,
        }
      },
      historyApiFallback: true
    },
    performance: {
      hints: false
    }
  }
}
