const { StatusCodes } = require("http-status-codes");
const {
  ForbiddenError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../errors/index");
const Car = require("../models/Car");

const getCars = async (req, res) => {
  const { carname, pageindex, pagesize, timestamp } = req.body;

  let errorMessage = "";
  // check carname
  if (carname !== undefined && typeof carname !== "string") {
    errorMessage += "carname must be a string. ";
  }

  // check pageindex
  if (pageindex === undefined) {
    errorMessage += "pageindex is required. ";
  }
  if (typeof pageindex !== "number" || pageindex < 1) {
    errorMessage += "pageindex must be a number greater than or equal to 1. ";
  }

  // check pagesize
  if (pagesize === undefined) {
    errorMessage += "pagesize is required. ";
  }
  if (typeof pagesize !== "number" || pagesize < 1) {
    errorMessage += "pagesize must be a number greater than or equal to 1. ";
  }

  if (errorMessage !== "") {
    throw new BadRequestError(errorMessage);
  }
  let query = {};
  if (carname) {
    query.carname = { $regex: carname, $options: "i" };
  }
  const skip = (pageindex - 1) * pagesize;

  const cars = await Car.find(query).skip(skip).limit(pagesize);
  if (!cars) {
    throw new NotFoundError("No cars");
  }
  console.log(
    `[${new Date().toISOString()}] [INFO] ${StatusCodes.OK} ${req.method} ${
      req.originalUrl
    } - Response: ${JSON.stringify(
      {
        list: cars,
        totalcount: cars.length,
      },
      null,
      null
    )}`
  );
  res.status(StatusCodes.OK).json({ list: cars, totalcount: cars.length });
};

module.exports = getCars;
