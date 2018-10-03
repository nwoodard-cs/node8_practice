'use strict'
const server = require('net').createServer(conn => {
    console.log('Subscriber connected.')

    const firstChunk = '{"type":"changed","timesta'
    const secondChunk = 'mp":1450694370094}\n'

    conn.write(firstChunk)

    // Wait to send second chunk
    const timer = setTimeout(() => {
        conn.write(secondChunk)
        conn.end()
    }, 100)

    conn.on('end', () => {
        clearTimeout(timer)
        console.log('Subscriber disconnected.')
    })
})

server.listen(60300, () => {
    console.log('Test server listening for subscribers...')
})