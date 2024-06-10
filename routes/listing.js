const express = require('express')
const router=express.Router();
const wrapAsync = require('../utlis/wrapAsync.js');
const ExpressError = require('../utlis/ExpressError.js');
const { listingSchema } = require("../schema.js");
// const { reviewSchema } = require("../schema.js");
const Listing = require('../models/listing.js');
const {isLoggedin, isOwner}=require('../middleware.js');
const listingController=require("../controllers/listing.js")

const validateListing = (req, res, next) => {
    
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    }
    else {
        next();
    }

}

router.get('/', wrapAsync(listingController.index));


//create route if this route is kept below show route new is considered to be as an id and is searched in the db hence always keep it above show route
router.get('/new', isLoggedin,listingController.renderNewForm);


//show route
router.get('/:id', wrapAsync(listingController.showListing))


//creatd post comes here
router.post('/', isLoggedin,validateListing, wrapAsync(listingController.createListing));


//edit route
router.get('/:id/edit', isLoggedin,isOwner,wrapAsync(listingController.editListing));


//update route
router.put('/:id',isLoggedin,isOwner, wrapAsync(listingController.updateListing));

//delete route
router.delete('/:id', isLoggedin,isOwner,wrapAsync(listingController.deleteListing));
module.exports=router;