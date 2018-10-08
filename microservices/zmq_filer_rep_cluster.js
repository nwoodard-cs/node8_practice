'use strict'
const cluster = require('cluster')
const fs = require('fs')
const zmq = require('zeromq')

const numWorkers = require('os').cpus().length

if (cluster.isMaster) {
    const router = zmq.socket('router').bind('tcp://127.0.0.1:60401')
    const dealer = zmq.socket('dealer').bind('tcp://127.0.0.1:60491')

    router.on('message', (...frames) => dealer.send(frames))
    dealer.on('message', (...frames) => router.send(frames))

    cluster.on('online', worker => console.log(`Worker ${worker.process.pid} is online`))

    for (let i = 0; i < numWorkers; ++i)
        cluster.fork()
}
else {
    const responder = zmq.socket('rep').connect('tcp://127.0.0.1:60491')

    responder.on('message', data => {
        const req = JSON.parse(data)
        console.log(`${process.pid} got req for ${req.path}`)
        
        fs.readFile(req.path, (err, content) => {
            console.log(`${process.pid} sending response`)
            responder.send(JSON.stringify({
                content: content.toString(),
                timestamp: Date.now(),
                pid: process.pid,
            }))
        })
    })
}