require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// config
const connectDatabase = require("./config/database");
// routes
const authRoutes = require("./routes/auth");

// middleware

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.send("<h1>Building NodeJS assessment!</h1>");
});

app.use("/api", authRoutes);

const start = async () => {
  try {
    await connectDatabase(mongo_uri);
    app.listen(port, () => console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
