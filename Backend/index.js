require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const workoutsRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user') // fixed path

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

// API routes
app.use('/api/workouts', workoutsRoutes)
app.use('/api/user', userRoutes)

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() })
})

// === STATIC FILES SERVING ===
// Serve frontend build if in production
if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '..', 'frontend', 'build') // adjust path to your actual React build folder
    app.use(express.static(buildPath))

    // For any route not matched by API, serve index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'))
    })
}

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`✅ Connected to DB, server running on port ${process.env.PORT || 4000}`)
        })
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err)
    })
