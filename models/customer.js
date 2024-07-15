const mongoose = require('mongoose');

// we now have a template for our docs
const customerSchema = new mongoose.Schema({
    name: String, 
    age: Number
})

// the model is where the methods and functions are located
module.exports = mongoose.model('Customer', customerSchema)