'use strict'
const fs = require('fs')

const filename = process.argv[2]
if (!filename) throw('No file specified')

console.log(`Watching ${filename} for changes`)
fs.watch(filename, () => console.log(`${filename} changed`))


