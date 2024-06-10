const express = require('express');
const router=express.Router();
router.get('/',(req,res)=>{
    res.send('hi i am users');
})


router.get('/:id',(req,res)=>{
    res.send('hi i show users');
})


router.post('/',(req,res)=>{
    res.send('hi i post users');
})


router.delete('/:id',(req,res)=>{
    res.send('hi i show users');
})
module.exports=router;