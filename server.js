const express = require('express');
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter.js')

const server = express();

server.use(express.json())

server.use('/users', userRouter)

server.use('/post', postRouter)


//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}]`
    );
    
    next();
    
  };
      server.get('/',logger, (req, res) => {
        res.send(`<h2>Let's write some middleware!</h2>`)
      });

      
module.exports = server;