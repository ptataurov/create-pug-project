#!/usr/bin/env node

const yargs = require('yargs')
const fse = require('fs-extra')
const path = require('path')

let {
  _: [name]
} = yargs.argv

name = name ? path.normalize(name) : './new-project'

fse.mkdirSync(name, { recursive: true }, err => {
  console.error(err)
})

fse.copySync(path.resolve(__dirname, '../project'), name)

console.log('Project successfully created.')
