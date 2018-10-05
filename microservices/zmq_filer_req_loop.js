'use strict'
const zmq = require('zeromq')

const filename = process.argv[2]
const req = zmq.socket('req')

req.on('message', data => {
    const res = JSON.parse(data)
    console.log('Got response:', res)
})

req.connect('tcp://localhost:60401')

console.log(`Requesting ${filename} 5 times`)
for (let i = 0; i < 5; ++i) {
    req.send(JSON.stringify({path: filename}))
}
