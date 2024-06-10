const express = require('express')
const app = express();
const flash = require('connect-flash');
const session=require('express-session');
const path=require("path");
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(session({secret:"mysupersecretstring",resave:false,saveUninitialized:true}));


app.use(flash());
app.get('/register',(req,res)=>{
   let {name='karthik'}=req.query;
   req.session.name=name;
   req.flash("success","user signed in");
   res.redirect('/hello')
})


app.get('/hello',(req,res)=>{
   res.locals.msg=req.flash('success')
   res.render('view.ejs',{name:req.session.name})
})
app.listen(3000, (req, res) => {
    console.log('hello');
})