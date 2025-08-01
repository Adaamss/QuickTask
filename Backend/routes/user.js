const express = require('express')
const router = express.Router()
//user controller
const { loginUser, signupUser } = require('../controllers/UserController')


// we need a login route
router.post('/login', loginUser)


//and a signup route
router.post('/signup', signupUser) //done in controller


module.exports = router
