const mongoose = require('mongoose')
const User = require('../models/UserModel')
const bcrypt = require('bcrypt');




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
    console.log(email)
    console.log(password)
    console.log(req.body)
    const register = await User.signup(email, password)
    console.log(register)
    res.json({ register, mess: "cool" })
}


module.exports = { loginUser, signupUser }