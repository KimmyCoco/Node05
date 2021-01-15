/* ============================================
Stand alone file to be executed to populate the 
database with the given const data (insertMany)
============================================ */

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/animalShelter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((err) => {
    console.log(err);
  });

const dogSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});

const Dog = mongoose.model("Dog", dogSchema);


//==============insertOne=============
// const beefer = new Dog({
//     name: 'Beefer',
//     age: 3,
//     breed: 'Pitbull'
// });
// beefer.save();

//==============insertMany=============
Dog.insertMany([
  {
    name: "Buddy",
    age: 10,
    breed: "beagle",
  },
  {
    name: "Munchkin",
    age: 2,
    breed: "Corgi",
  },
  {
    name: "Muffin",
    age: 1,
    breed: "Maltese",
  },
]).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})

//==============deleteMany=============
// Dog.deleteMany().then(res => {
//         console.log(res);
//     }).catch(err => {
//         console.log(err);
//     })
