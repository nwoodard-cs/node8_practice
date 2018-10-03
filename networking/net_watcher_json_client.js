'use strict'
const net = require('net')

const client = net.connect({port: 60300})
client.on('data', (data) => {
    const msg = JSON.parse(data)
    if (msg.type === 'watching')
        console.log(`Now watching ${msg.file}`)
    else if (msg.type === 'changed') {
        const date = new Date(msg.timestamp)
        console.log(`File changed on ${date}`)
    }
    else console.log('Unrecognized message type.')
})