require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutsRoutes = require('./routes/workouts')

const app = express()

//middlewares
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path , req.method)
    next()
})

//routes
app.use('/api/workouts',workoutsRoutes)

//COnnect to database
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, () => {
  console.log(` Connected to DB Example app listening on port`, process.env.PORT)
})
})
.catch((err)=>{
    console.log(err)
})

