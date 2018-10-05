'use strict'
const zmq = require('zeromq')

const subscriber = zmq.socket('sub')

subscriber.subscribe('')

subscriber.on('message', data => {
    const msg = JSON.parse(data)
    const date = new Date(msg.timestamp)
    console.log(`File ${msg.file} changed at ${date}`)
})

subscriber.connect('tcp://localhost:60400')