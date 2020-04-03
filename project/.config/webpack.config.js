const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const getPages = require('./get-pages')
const dirs = require('./dirs')

module.exports = (env, argv) => {
  const { IS_DEV } = env

  const { pages, indexPage } = getPages(env, argv)

  return {
    context: dirs.src,
    entry: {
      bundle: `${dirs.views}/_imports.js`
    },
    output: {
      filename: 'bundle.js',
      path: dirs.dist
    },
    devtool: IS_DEV && 'inline-source-map',
    resolve: {
      modules: ['node_modules', 'src'],
      alias: {
        '@': dirs.views
      }
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true
                }
              }
            ]
          }
        })
      ]
    },
    devServer: {
      open: true,
      index: indexPage
    },
    mode: IS_DEV ? 'development' : 'production',
    watch: IS_DEV,
    module: {
      rules: [
        require('./modules/html'),
        require('./modules/pug'),
        require('./modules/scss'),
        require('./modules/js'),
        require('./modules/fonts'),
        require('./modules/images')
      ]
    },
    plugins: [
      ...pages,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ].filter(Boolean)
  }
}
