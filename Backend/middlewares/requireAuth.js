const jwt = require("jsonwebtoken");
require('dotenv').config()
const User = require('../models/UserModel')

const requireAuth = async (req, res, next) => {
    // verify authorization
    const { authorization } = req.headers
    // the authorization will have a string which is the token as Bearer eyfjh (extract the token after the Bearer)
    if (!authorization) {
        return res.status(401).json({ error: ' Authorization token required' })
    }
    const token = authorization.split(' ')[1]


    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'request is not authorized' })

    }

}

module.exports = requireAuth