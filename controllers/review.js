
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
module.exports.reviewPost=async(req,res)=>{
    let {id}=req.params;
    
    let listing=await Listing.findById(id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
    };

    module.exports.deleteReview=async(req,res)=>{
        let {id,reviewId}=req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
        await Review.findByIdAndDelete(reviewId);
        res.redirect(`/listings/${id}`);
    
    }