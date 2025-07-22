const express = require('express')
const router = express.Router()
const { createWorkout,getAllWorkouts,getOneWorkout,deleteWorkout,updateWorkout } = require('../controllers/WorkoutController')
const { updateMany } = require('../models/WorkoutModel')


//get all workouts
router.get('/',getAllWorkouts )

//get one single workout
router.get('/:id',getOneWorkout)

//add a new workout
router.post('/',createWorkout)


//edit a new workout
router.patch('/:id',updateWorkout)
//delete a new workout
router.delete('/:id',deleteWorkout)

module.exports = router