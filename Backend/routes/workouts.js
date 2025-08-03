const express = require('express')
const { createWorkout, getAllWorkouts, getOneWorkout, deleteWorkout, updateWorkout } = require('../controllers/WorkoutController')
const { updateMany } = require('../models/WorkoutModel')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()
//require authorization to all routes bypass this to access the other routes
router.use(requireAuth)

//get all workouts
router.get('/', getAllWorkouts)

//get one single workout
router.get('/:id', getOneWorkout)

//add a new workout
router.post('/', createWorkout)


//edit a new workout
router.patch('/:id', updateWorkout)
//delete a new workout
router.delete('/:id', deleteWorkout)

module.exports = router