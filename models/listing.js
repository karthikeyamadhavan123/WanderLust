//maintaing a variable data base remember to create
const mongoose = require('mongoose');
const { listingSchema } = require('../schema');
const Schema=mongoose.Schema;
const review=require('./review.js')
const ListingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String,
        default:"https://unsplash.com/photos/a-person-standing-on-top-of-a-palm-tree-5Ixoj-C_bm8",
        set:(v)=>v===''?"https://unsplash.com/photos/a-person-standing-on-top-of-a-palm-tree-5Ixoj-C_bm8":v, //set method is used to set if image is empty default provided else it place v (which is the url link in database)
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String 
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
  });

  ListingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in:listing.reviews}})
    }
   
  })
  const Listing=mongoose.model('Listing',ListingSchema);// always export model
  module.exports=Listing;