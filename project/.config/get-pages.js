const HtmlWebpackPlugin = require('html-webpack-plugin')
const dirs = require('./dirs')
const { getDirectoriesBasenames } = require('./utils')

const getPages = (env, argv) => {
  const { SCRIPT_NAME, IS_DEV } = env

  let pages = getDirectoriesBasenames(dirs.pages)
  let indexPage = 'index.html'

  switch (SCRIPT_NAME) {
    case 'dev': {
      const { only } = argv

      if (only) {
        const names = typeof only === 'string' && only.split(',')

        if (names) {
          indexPage = `${names[0]}.html`

          pages = names
        } else {
          pages = ['index']
        }
      }
      break
    }
    case 'build': {
      pages = argv['nopages'] ? [] : pages
      break
    }
  }

  pages = pages.map(page => {
    return new HtmlWebpackPlugin({
      template: `${dirs.pages}/${page}/${page}.pug`,
      filename: `${page}.html`,
      chunks: ['bundle', page],
      minify: !IS_DEV
    })
  })

  return { pages, indexPage }
}

module.exports = getPages
