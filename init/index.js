const mongoose = require('mongoose');
const initdata = require('./data.js');
const Listing = require('../models/listing.js');
let URL='mongodb://127.0.0.1:27017/wanderlust';
main().then(() => {
    console.log('connected to db');
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect(URL);
}
const initDb = async () => {
await Listing.deleteMany({});
initdata.data=initdata.data.map((obj)=>({...obj,owner:'6664429ad0047a473ad28bd0'}));
await Listing.insertMany(initdata.data);
console.log('data was intialised');
}
initDb();