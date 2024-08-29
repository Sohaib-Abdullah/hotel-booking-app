export const ErrorResponse = (status, message) => ({
  status: status ? status : 500,
  message: message ? message : "INTERNAL SERVER ERROR",
  // success: false,
});
