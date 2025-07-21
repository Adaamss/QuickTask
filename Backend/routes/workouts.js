const express = require('express')
const router = express.Router()


//get all workouts
router.get('/',(req,res)=>{
    res.json({msg : 'allworkouts'})
    
})

//get one single workout
router.get('/:id',(req,res)=>{
    res.json({msg :"get one single workout"})

})

//add a new workout
router.post('/',(req,res)=>{
    res.json({ msg : "add new workout"})
})
//edita new workout
router.put('/:id',(req,res)=>{
    res.json({ msg : "edit a workout"})

})
//delete a new workout
router.delete('/:id',(req,res)=>{
    res.json({ msg : "delete workout"})

})


module.exports = router