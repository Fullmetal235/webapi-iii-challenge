const express = require('express');
const usersDB = require('./userDb.js')
//const postDB = require('../posts/postDb.js')

const router = express.Router();


router.post('/', (req, res) => {
    const newUser = req.body
    usersDB.insert(newUser)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })

});

router.post('/:id/posts',validateUserId, (req, res) => {
    // const newPost = req.body
    // console.log(req.body)

    // usersDB.insert()
    // .then(result => {
    //     res.status(201).json(result)
    // })
    // .catch(error => {
    //     res.status(500).json({ error: "There was an error while saving the user to the database" })
    // })

});

router.get('/', (req, res) => {
    usersDB.get()
    .then(result => {
        res.status(200).json(result)})
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
});

router.get('/:id', (req, res) => {
    const {id} = req.params

    usersDB.getById(id)
    .then(result => {
        res.status(200).json(result)})
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })

});

router.get('/:id/posts',validateUserId, (req, res) => {

    const id = req.params.id


        usersDB.getUserPosts(id)
        .then(post => {
                res.status(201).json(post)
    })
    .catch(errer => 
        res.status(500).json({ error: "The posts information could not be retrieved." }))

});

router.delete('/:id',validateUserId, (req, res) => {
    const id = req.params.id
        
    usersDB.remove(id)
    .then(result => {
            res.status(200).json({message: 'user deleted succesfully'})
})
.catch(error => {
    res.status(500).json({ error: "The user could not be removed" })
})

});

router.put('/:id',validateUserId, (req, res) => {
    const id = req.params.id
    const changes = req.body;

    usersDB.update(id, changes)
    .then(updated => {
            res.status(200).json(updated)
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be modified." })
})
    
});

//custom middleware

function validateUserId(req, res, next) {
    const {id} = req.params

    usersDB.getById(id)
    .then(userid => {
        if(userid){
            req.user = req.body
        }else{
            res.status(400).json({ message: "invalid user id" })
        }
    })

    next()

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;