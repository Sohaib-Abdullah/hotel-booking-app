// import CustomErrorHandler from "./custom-error";

export const createError = (status, message) => {
  const err = new Error();
  console.log("error in api", err);
  err.status = status;
  err.message = message;

  if (err instanceof ValidationError) {
    console.log("validation error", err);
    statusCode = 422; // use for validation error
    data = {
      message: err.message,
      statusCode,
      success: false,
    };
  }
  // if (err instanceof CustomErrorHandler) {
  //   console.log("validation error", err);
  //   statusCode = 422; // use for validation error
  //   data = {
  //     message: err.message,
  //     statusCode,
  //     success: false,
  //   };
  // }

  // console.log("after-erro", err);
  return err;
};
