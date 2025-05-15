const mongoose = require("mongoose");

const connectDatabase = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB has connected successfully"));
};

module.exports = connectDatabase;
