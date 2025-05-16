require("dotenv").config();
const connectDatabase = require("./config/database");
const Car = require("./models/Car");
const carsData = require("./cars.json");

const create = async () => {
  try {
    await connectDatabase(process.env.MONGO_URI);
    await Car.create(carsData);
    console.log("Inserted list of cars to database");
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

create();
