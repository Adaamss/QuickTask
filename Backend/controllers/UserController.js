const mongoose = require('mongoose')
const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken(user) { //my way
    const secretKey = process.env.JWT_SECRET
    console.log(user._id.toJSON(), user._id) // diff in passing objects insid eteh jwt.sign
    const token = jwt.sign({ id: user._id.toJSON() }, secretKey, { expiresIn: 60 * 60 })
    console.log(token)
    return token
}

function createToken(_id) {
    const secretKey = process.env.JWT_SECRET
    const tokenCreated = jwt.sign({ _id }, secretKey, { expiresIn: '1d' })
    return tokenCreated
}


const loginUser = async (req, res) => {
    // const { email, password } = req.body // jibli el password wel amil mel request 7othom fel email wel password
    // const hashedPassword = await bcrypt.hash(password, 10) //hash the pass wait for it until it finishses and than we move to the next
    // const user = await User.create({ email, password: hashedPassword })
    // res.status(200).json(user)


}

const signupUser = async (req, res) => { //Ie; Register
    // const { email, password } = req.body
    // const hashedPassword = await bcrypt.hash(password, 10)
    // const user = await User.create({ email, password: hashedPassword })
    // res.json(user)
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        const token = createToken(user._id)

        // const authtoken = generateToken(user); //  Myway
        console.log(user)
        res.status(201).json({ token, email })


    } catch (error) {
        res.status(400).json({ error: error.message })
    }



}


module.exports = { loginUser, signupUser }