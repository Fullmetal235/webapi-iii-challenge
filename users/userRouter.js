const express = require('express');
const Users = require('./userDb.js')
const router = express.Router();

//define custom middleware that will be used 
const upperCase = (req, res, next) => {
    let { name } = req.body;
    capitalName = name.charAt(0).toUpperCase() + name.slice(1)
  
    if (name !== capitalName) {
      return sendError( 'Please make sure your name starts with a Capital', res );
    }
    else{ 
      next();
    }
  }


router.get('/', (req, res) => {
    Users
    .get()
    .then( user => {
      res.status(200).json(user);
    })
    .catch( err => {
      return sendError( 'User information Unavailable at this moment', res );
    })
  })
  

  router.get('/:id', (req, res) => {

    const id = req.params.id
    Users
    .getById(id)
    .then( user => {
      if (user === undefined) {
        return sendMissing(res);
      }
      else{
        return res.status(200).json(user);
      }
    })
    .catch( err => {
      return sendError( 'User information Unavailable at this moment', res );
    })
  })

  router.get('/:id/posts', (req, res) => {
    
    const id = req.params.id
    Users
    .getUserPosts(id)
    .then( user => {
      if (user.length == 0) {
        return sendMissing(res);
      }
      else{
        return res.status(200).json(user);
      }
    })
    .catch( err => {
      return sendError( 'User information Unavailable at this moment', res );
    })
  })

  router.delete('/:id', (req, res) => {
    //set id
    const id = req.params.id
    //grab user information 
    Users.getById(id)
    .then( user => { 
      if (user === undefined) {
        return sendMissing(res);
      }
      else{
        return res.status(200).json(user);
      }
    })
    .catch( err => {
      return sendError( 'This function is currently unavailable', res );
    })
    //delete the user
    Users
    .remove(id)
    .then( user => { 
      if (user === undefined) {
        return sendMissing(res);
      }
      else{
        return res.status(200).json(user);
      }
    })
    .catch( err => {
      return sendError( 'This function is currently unavailable', res );
    })
  })

  router.put('/:id', upperCase, (req, res) => {
    //define id 
    const id = req.params.id
  
    //define req.body
    const { name } = req.body;
    const user = { name };
  
    //check the req body
    if(!name) { 
      return res.status(400).json({ error: 'Please provide the NEW user name' });
    }
    Users
    .update(id, user)
    .then( person => {
      if (person === undefined) {
        return sendMissing(res);
      }
      else{
        newUser = { ID, name }
        return res.status(201).json(newUser);
      }
    })
    .catch( err => {
      return sendError( 'This function is currently unavailable', res );
    })
  })

//custom middleware

function validateUserId(req, res, next) {
    const {id} = req.params

    Users.getById(id)
    .then(userid => {
        if(userid){
            req.user = req.body
        }else{
            res.status(400).json({ message: "invalid user id" })
        }
    })

    next()

};



module.exports = router;