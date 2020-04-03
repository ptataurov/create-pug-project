module.exports = {
  test: /\.pug$/,
  use: [
    'cache-loader',
    {
      loader: 'pug-loader',
      options: {
        pretty: true
      }
    }
  ]
}
