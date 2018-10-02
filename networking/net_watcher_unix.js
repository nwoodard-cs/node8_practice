'use strict'
const fs = require('fs')
const net = require('net')

const filename = process.argv[2]
if (!filename) throw Error('Filename not provided')

net.createServer(conn => {
    console.log('Subscriber connected')
    conn.write(`Watching ${filename} for changes`)

    const watcher = fs.watch(filename, () => conn.write(`File changed @${new Date()}\n`))

    conn.on('close', () => {
        console.log('Subscriber disconnected')
        watcher.close()
    })
}).listen('/tmp/watcher.sock', () => console.log('Listening for subscribers...'))