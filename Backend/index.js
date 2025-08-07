require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutsRoutes = require('./routes/workouts')
const userRoutes = require('../Backend/routes/user')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())

// check if there's a token and check if that token is valid

//middlewares are like checkpoint for each  request
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutsRoutes)
app.use('/api/user', userRoutes)

// Other routes (non-API) serve React frontend
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        // If route starts with /api and wasn't matched, send 404
        return res.status(404).json({ error: 'API route not found' })
    }
    // Otherwise serve React index.html
    res.sendFile(path.join(__dirnamePath, 'frontend', 'build', 'index.html'))
})
// ------------------------------------

//Connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(` Connected to DB Example app listening on port`, process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })
