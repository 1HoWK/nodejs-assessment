const requestHandlerMiddleware = (req, res, next) => {
  const cleanbody = { ...req.body };
  if (cleanbody.password) {
    cleanbody.password = "*****";
  }
  console.log(
    `[${new Date().toISOString()}] [INFO] ${req.method} ${
      req.originalUrl
    } - Request: ${JSON.stringify(cleanbody, null, null)}`
  );

  next();
};

module.exports = requestHandlerMiddleware;
