'use strict'
const fs = require('fs')
// As a general rule, use sync iff the program couldn't succeed without the file.
const data = fs.readFileSync('target.txt')
process.stdout.write(data.toString())