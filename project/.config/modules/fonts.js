module.exports = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        outputPath: './fonts/',
        name: '[name].[ext]'
      }
    }
  ]
}
