const mongoose = require("mongoose");

const CarVarianceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please provide the id of the variance"],
    maxLength: 100,
  },
  name: {
    type: String,
    required: [true, "Please provide the name of the variance"],
    maxLength: 150,
  },
  price: {
    type: Number,
    required: [true, "Please provide the price of the variance"],
  },
});

const CarSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please provide the id for the car"],
    maxLength: 100,
  },
  carname: {
    type: String,
    required: [true, "Please provide the name of the car"],
    maxLength: 150,
  },
  brand: {
    type: String,
    required: [true, "Please provide the brand of the car"],
    maxLength: 150,
  },
  description: {
    type: String,
    required: [true, "Please provide the description of the car"],
  },
  variance: [CarVarianceSchema],
});

module.exports = mongoose.model("Car", CarSchema);
