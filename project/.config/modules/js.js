module.exports = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: [
    'cache-loader',
    'thread-loader',
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              corejs: '3.4',
              modules: false,
              loose: true,
              useBuiltIns: 'usage'
            }
          ]
        ]
      }
    }
  ]
}
