'use strict'
const cluster = require('cluster')
const zmq = require('zeromq')

const numWorkers = require('os').cpus().length
const numJobs = 30

if (cluster.isMaster) {
    const push = zmq.socket('push').bind('tcp://127.0.0.1:60401')
    const pull = zmq.socket('pull').bind('tcp://127.0.0.1:60402')

    let readyWorkers = 0

    pull.on('message', data => {
        const msg = JSON.stringify(data)

        if (msg.type === 'ready') {
            ++readyWorkers
            console.log(`${readyWorkers} now ready`)
            if (readyWorkers === 3)
                for (let i = 0; i < numJobs; ++i)
                    push.send(JSON.stringify({
                        type: 'job',
                        body: `ID ${i}`,
                    }))
        }

        if (msg.type == 'result') console.log(msg.body)
    })

    for (let i = 0; i < numWorkers; ++i)
        cluster.fork()
}
else {
    console.log(`Worker #${process.pid} now online`)

    const push = zmq.socket('push').connect('tcp://127.0.0.1:60402')
    const pull = zmq.socket('pull').connect('tcp://127.0.0.1:60401')

    pull.on('message', data => {
        const msg = JSON.stringify(data)
        console.log(`Worker ${process.pid} got job ${msg.body}`)
        push.send(JSON.stringify({
            type: 'result',
            pid: process.pid,
            body: msg.body,
        }))
    })

    push.send(JSON.stringify({
        type: 'ready'
    }))

}
