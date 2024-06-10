const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        //redirectedurl
        req.session.redirectUrl=req.originalUrl;//stor in locals
        req.flash("error","you must login");
       return res.redirect('/login');
    }
    next();
}
module.exports.saveRedirect=(req,res,next)=>{
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl; // Optionally clear the session value
    }
    next();
}
module.exports.isOwner=async(req,res,next)=>{
    let { id } = req.params;
    const currUser = res.locals.currUser;
    
    let listing=await Listing.findById(id);
    if (!currUser || !listing.owner._id.equals(currUser._id)) {
        req.flash("error", "You don't have permission");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.isAuthor = async (req, res, next) => {
    try {
        const { id, reviewId } = req.params;
        const review = await Review.findById(reviewId);

        if (!review) {
            req.flash("error", "Review not found");
            return res.redirect(`/listings/${id}`);
        }

        if (!review.author.equals(res.locals.currUser._id)) {
            req.flash("error", "You don't have permission to do that");
            return res.redirect(`/listings/${id}`);
        }

        next();
    } catch (err) {
        req.flash("error", "Something went wrong");
        return res.redirect(`/listings/${id}`);
    }
};