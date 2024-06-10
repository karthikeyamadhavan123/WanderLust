const express = require('express')
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const ExpressError = require('./utlis/ExpressError.js');
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const user = require("./routes/user.js");
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user.js')
let URL = 'mongodb://127.0.0.1:27017/wanderlust';



main().then(() => {
    console.log('connected to db');
}).catch((err) => {
    console.log(err);
})


async function main() {
    await mongoose.connect(URL);
}



app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));



const sessionoptions = {
    secret: "mysecret", // You should use a more secure and unique secret in production
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
        httpOnly:true
    }
};

app.get('/', (req, res) => {
    res.send('hello');
})
app.use(session(sessionoptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

app.get('/demouser',async(req,res)=>{
    let fakeUser=new User({
        email:"karthik@gmail.com",
        username:"karthik"
    });
  const registereduser= await  User.register(fakeUser,"helloworld");
  res.send(registereduser);
})
app.use('/listings', listings);
app.use("/listings/:id/reviews", reviews);
app.use('/', user);


app.all('*', (req, res, next) => {
    next(new ExpressError(400, 'page not found'));
})// this checks for all routes if anything in api matches it gets it's perfect response all other non valid routes are directed to this;

app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'something went wrong' } = err;
    res.render("error.ejs", { message });
})
app.listen(8080, (req, res) => {
    console.log('hello');
})