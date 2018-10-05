'use strict'
const fs = require('fs')
const zmq = require('zeromq')

const res = zmq.socket('rep')

res.on('message', data => {
    const req = JSON.parse(data)
    console.log(`Received request for ${req.path}`)

    fs.readFile(req.path, (err, content) => {
        console.log('Sending response content')
        res.send(JSON.stringify({
            content: content.toString(),
            timestamp: Date.now(),
            pid: process.pid,
        }))
    })
})

res.bind('tcp://127.0.0.1:60401', err => {
    if (err) console.log(err)
    console.log('Listening for request')
})

process.on('SIGINT', () => {
    console.log('Shutting down')
    res.close()
})