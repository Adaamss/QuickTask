const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


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

    const exist = await this.findOne({ email })
    if (exist) {
        throw Error('email exists')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    return await this.create({ email, password: hashedPassword })

}

module.exports = mongoose.model('User', userSchema)