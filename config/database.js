const mongoose = require("mongoose");

const connectDatabase = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      console.log(
        `[${new Date().toISOString()}] [INFO] MongoDB has connected successfully`
      )
    );
};

module.exports = connectDatabase;
