const mongoose = require('mongoose')
const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const validator = require('validator')


//token generation
function createToken(_id) {
    const secretKey = process.env.JWT_SECRET
    const tokenCreated = jwt.sign({ _id }, secretKey, { expiresIn: '1d' })
    return tokenCreated
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })

        //find the user
        if (!user) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        const isSamePassword = await bcrypt.compare(password, user.password)
        if (!isSamePassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        const token = createToken(user._id)
        res.status(201).json({ email, token, message: "loggedin" })


    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}
const signupUser = async (req, res) => { //Ie; Register
    const { email, password } = req.body
    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        console.log(user)
        res.status(201).json({ token, email })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }



}


module.exports = { loginUser, signupUser }