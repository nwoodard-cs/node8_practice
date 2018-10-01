'use strict'
const fs = require('fs')

fs.writeFile('target.txt', 'Data written from write_simple.js', err => { 
    if (err) throw err 
    console.log('File written')
})