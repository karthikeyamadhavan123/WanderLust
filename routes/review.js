const express = require('express')
const router=express.Router({mergeParams:true});
const wrapAsync = require('../utlis/wrapAsync.js');
const ExpressError = require('../utlis/ExpressError.js');
const { reviewSchema } = require("../schema.js");
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const { isLoggedin, isAuthor } = require('../middleware.js');
const reviewController=require('../controllers/review.js')

const validateReview = (req, res, next) => {

    let{error}=reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    }
    else {
        next();
    }

}

router.post("/",isLoggedin,validateReview,wrapAsync(reviewController.reviewPost))
    
    
    
    router.delete("/:reviewId",isLoggedin,isAuthor,wrapAsync(reviewController.deleteReview));

    module.exports=router;