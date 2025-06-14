require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
// config
const connectDatabase = require("./config/database");
// routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const carRoutes = require("./routes/cars");
// middleware
const errorHandlerMiddleware = require("./middleware/errorHandler");
const authenticationMiddleware = require("./middleware/authentication");
const requestHandlerMiddleware = require("./middleware/requestHandler");
// utils
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.send("<h1>NodeJS training/assessment!</h1>");
});

app.use(requestHandlerMiddleware);

app.use("/api", authRoutes);
app.use("/api", authenticationMiddleware, userRoutes);
app.use("/api", authenticationMiddleware, carRoutes);

app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDatabase(mongo_uri);
    app.listen(port, () =>
      console.log(
        `[${new Date().toISOString()}] [INFO] Server is running on port ${port}...`
      )
    );
  } catch (error) {
    console.log(error);
  }
};
start();
