const express = require('express')
const router=express.Router();
const wrapAsync = require('../utlis/wrapAsync.js');
const user=require('../models/user.js');
const passport = require('passport');
const {saveRedirect}=require('../middleware.js');
const userController=require('../controllers/user.js')
router.get('/signup',(req,res)=>{
    res.render('users/signup.ejs')
})

router.post('/signup',wrapAsync(userController.signupUser))
router.get('/login',(req,res)=>{
    res.render('users/login.ejs')
})
router.post('/login',saveRedirect,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userController.loginUser);

router.get('/logout',(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err)
        }
     req.flash("success","welcome to wanderlust");
    res.redirect('/listings');
    })

    
})

module.exports=router;