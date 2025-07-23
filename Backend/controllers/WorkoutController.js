const Workout = require('../models/WorkoutModel')
const mongoose =require('mongoose')

//get all workouts

const getAllWorkouts = async(req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//get a single workout
const getOneWorkout = async(req,res)=>{
    const {id} = req.params 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : 'No such workout exist'})
    }
    const workout = await Workout.findById(id)
    if (!workout) {
     return res.status(404).json({error :'no such workout exists'})
    }
    res.status(200).json(workout)
}

//create a new workout
const createWorkout = async(req, res) =>{
     const {title,load,reps} = req.body // a3tni title wel load w reps li fi request mel client aka l postman
    try {
        const workout = await Workout.create( {title,load,reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    } 
}

//update a specific workout
const updateWorkout = async(req,res)=>{
       const {id} = req.params 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : 'No such workout exist'})
    }
    const workout =await Workout.findOneAndUpdate({_id: id}, {...req.body}, {new: true})
    if (!workout) {
     return res.status(404).json({error :'no such workout exists'})
    }
    res.status(200).json(workout)

}
 
//delete a workout
const deleteWorkout = async(req,res)=>{
        const {id} = req.params  // hedhouma les fil requets li be3thha li client as IN a3tini l id li fi request 7achti beha
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : 'No such workout exist'})
    }
    const workout = await Workout.findOneAndDelete({_id: id})
    if (!workout) {
     return res.status(404).json({error :'no such workout exists'})
    }
    res.status(200).json(workout)
}


module.exports ={
    createWorkout,
    getAllWorkouts,
    getOneWorkout,
    deleteWorkout,
    updateWorkout
}