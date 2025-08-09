const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const validator = require('validator')


const Schema = mongoose.Schema
const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error('all fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error("this is not a correct email format")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character !@#$%^&*")
    }

    const exist = await this.findOne({ email })
    if (exist) {
        throw Error('email exists')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    return await this.create({ email, password: hashedPassword })


}

module.exports = mongoose.model('User', userSchema)