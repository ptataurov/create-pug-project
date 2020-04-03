const { mkdirSync, writeFileSync } = require('fs')
const { getDirectoriesBasenames } = require('../utils')
const dirs = require('../dirs')
const updateImports = require('./update-imports')

const name = process.argv[2]
const styleName = name.replace(/-([\d\D])/g, c => c[1].toUpperCase())
const existingComponents = getDirectoriesBasenames(`${dirs.components}`)

if (existingComponents.includes(name)) {
  const msg = `Component with the name ${name} already exists`

  throw new Error(msg)
}

const componentPath = `${dirs.components}/${name}`

mkdirSync(componentPath)

mkdirSync(`${componentPath}/img`)

writeFileSync(
  `${componentPath}/${name}.pug`,
  `mixin ${name}(mixes)

  - const data = require('views/components/${name}/data.js')
  - const css = require('views/components/${name}/_css.json')

  div(class=css.${styleName} class=mixes)

`
)

writeFileSync(
  `${componentPath}/${name}.scss`,
  `.${styleName} {
  
}

// Global styles


// Media queries

@include less-xl {

}

@include less-lg {
  
}

@include less-md {
  
}

@include less-sm {
  
}

// Mixes


// Animation
`
)

writeFileSync(`${componentPath}/${name}.js`, '')

writeFileSync(`${componentPath}/_css.json`, '{}')

writeFileSync(
  `${componentPath}/data.js`,
  `module.exports = {
  
}`
)

updateImports()

console.log(`Component ${name} successfully created`)
