'use strict'
const fs = require('fs')
const net = require('net')

const filename = process.argv[2]
if (!filename) throw Error('Filename not provided')

net.createServer(conn => {
    console.log('Subscriber connected')
    conn.write(JSON.stringify({type: 'watching', file: filename}) + '\n')

    const watcher = fs.watch(filename, () => conn.write(
        JSON.stringify({type: 'changed', timestamp: Date.now()}) + '\n'))

    conn.on('close', () => {
        console.log('Subscriber disconnected')
        watcher.close()
    })
}).listen(60300, () => console.log('Listening for subscribers...'))