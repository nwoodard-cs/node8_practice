'use strict'
const fs = require('fs')
const spawn = require('child_process').spawn

const filename = process.argv[2]
if (!filename) throw Error('No filename specified')

const cmd = process.argv[3]
if (!cmd) throw Error('No command specified')

console.log(`Now watching ${filename}`)
fs.watch(filename, () => {
    const ls = spawn(cmd, filename)
    let output = ''
    
    ls.stdout.on('data', chunk => output += chunk)

    ls.on('close', () => console.log(output))
})
