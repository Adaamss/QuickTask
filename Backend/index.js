require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutsRoutes = require('./routes/workouts')
const userRoutes = require('../Backend/routes/user')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())

//middlewares are like checkpoints for each request
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// API routes
app.use('/api/workouts', workoutsRoutes)
app.use('/api/user', userRoutes)

// Serve static files from React frontend build folder
const __dirnamePath = path.resolve()
app.use(express.static(path.join(__dirnamePath, 'frontend', 'build')))

// All non-API GET requests handled by React Router
app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API route not found' })
    }
    res.sendFile(path.join(__dirnamePath, 'frontend', 'build', 'index.html'))
})

// Connect to database and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Connected to DB and server listening on port ${process.env.PORT || 4000}`)
        })
    })
    .catch(err => {
        console.error('Database connection error:', err)
    })
