// code away!
const express = require('express')

const server = require('./server.js')

const port = 8008

server.listen(port, () => console.log(`\nlistening on port ${port}\n`))