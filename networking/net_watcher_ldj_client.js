'use strict'
const netClient = require('net').connect({ port: 60300 })
const ldjClient = require('./lib/ldj_client.js').connect(netClient)

ldjClient.on('message', msg => {
    if (msg.type === 'watching')
        console.log(`Now watching ${msg.file}`)
    else if (msg.type === 'changed')
        console.log(`File changed on ${new Date(msg.timestamp)}`)
    else throw Error(`Unknown message type ${msg.type}`)
})