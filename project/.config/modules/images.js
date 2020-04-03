const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  test: /\.(jpe?g|png|gif|svg|ico)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        outputPath: './img/',
        name: '[name][hash].[ext]'
      }
    },
    {
      loader: 'image-webpack-loader',
      options: {
        disable: isDev,
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        pngquant: {
          quality: '65-90',
          strip: true
        },
        svgo: {
          cleanupIDs: true
        }
      }
    }
  ]
}
