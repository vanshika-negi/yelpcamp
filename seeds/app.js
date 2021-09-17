const mongoose= require('mongoose');
const cities= require('./cities');
const {places,descriptors}= require('./seedHelpers')
const Campground= require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db= mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("database connected");
})

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };


const seedDB= async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const rand1000= Math.floor(Math.random()*73);
        const camp= new Campground({
            location: `${cities[rand1000].city},${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
   
   
}

seedDB();