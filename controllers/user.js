const user=require('../models/user.js');

module.exports.signupUser=async(req,res)=>{
    try{
        let{username,email,password}=req.body;
        const User1=new user({email,username});
       const registered=await user.register(User1,password);
    
        req.login(registered,(err)=>{
            if(err){
                return next(err);
            }
        req.flash("success","user signedup");
        res.redirect(res.locals);
        })
        
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect('/signup');
    }
    
}

module.exports.loginUser=async(req,res)=>{
    req.flash("success","welcome to wanderlust");
    let redirect=res.locals.redirectUrl || "/listings";
    
   res.redirect(redirect);
}