const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { isEmpty } = require('lodash')
const hasha = require('hasha')
const dirs = require('../dirs.js')

const projectName = process.env.npm_package_name

module.exports = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [
          require('autoprefixer')(),
          require('postcss-modules')({
            camelCase: true,
            globalModulePaths: [`${dirs.src}/assets/scss/`, './node_modules/'],
            generateScopedName: (name, filename) => {
              const relativePath = path.relative(__dirname, filename)

              const hash = hasha(relativePath + projectName, {
                algorithm: 'md5'
              }).substring(0, 5)

              return `${name}_${hash}`
            },
            getJSON: (fileName, json) => {
              if (isEmpty(json)) return
              const dirName = path.dirname(fileName)
              const jsonFileName = path.resolve(`${dirName}/_css.json`)

              fs.writeFileSync(jsonFileName, JSON.stringify(json))
            }
          })
        ]
      }
    },
    'sass-loader',
    {
      loader: 'sass-resources-loader',
      options: {
        resources: [
          `${dirs.src}/assets/scss/vars.scss`,
          `${dirs.src}/assets/scss/mixins.scss`
        ]
      }
    }
  ]
}
