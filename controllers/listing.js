const Listing = require('../models/listing.js');


module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    //    console.log(result); one method u can use 
    // Listing.find({}).then((res)=>{
    //     console.log(res);
    // })
    res.render('listings/index.ejs', { allListings });
}

module.exports.renderNewForm=(req, res) => {
    res.render('listings/new.ejs');
}

module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const id_listings = await Listing.findById(id).populate({path:"reviews",populate:{
        path:"author",
    }}).populate("owner");
    if(!id_listings){
        req.flash("error","Listing not exist");
        res.redirect('/listings');
    }
    res.render('listings/show.ejs', { id_listings })
}

module.exports.createListing=async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success", "New listing created");
    res.redirect('/listings');
};

module.exports.editListing=async (req, res) => {
    let { id } = req.params;
   
    const id_listings = await Listing.findById(id);
    res.render('listings/edit.ejs', { id_listings })
}

module.exports.updateListing=async (req, res) => {
    let { id } = req.params;

    let { title, description, image, price, country, location } = req.body;
    await Listing.findByIdAndUpdate(id, { title, description, image, price, country, location });
    res.redirect(`/listings/${id}`);// backticks as js
}

module.exports.deleteListing=async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
}