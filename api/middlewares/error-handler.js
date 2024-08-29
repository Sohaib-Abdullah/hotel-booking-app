import Joi from "joi";
const { ValidationError } = Joi;
const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  const errorMessage = "Internal Server Error";
  // console.log("verify-user-token-error", err);
  let data;
  data = {
    message: errorMessage,
    success: false,
  };
  if (err instanceof ValidationError) {
    statusCode = 422; // code for unprocessable entity
    data = {
      message: err.message,
      statusCode,
      success: false,
    };
  }

  if (err.name === "CastError") {
    statusCode = 400; // Bad Request
    data.message = "Invalid ID";
    data.statusCode = statusCode;
  }
  return res.status(statusCode).json({ data });
};

export default errorHandler;
