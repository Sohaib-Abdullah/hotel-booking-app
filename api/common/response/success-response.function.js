export const SuccessResponse = (
  data,
  statusCode,
  message,
  accessToken = undefined //taking default parameter as undefined
) => ({
  data,
  status: statusCode,
  message,
  success: true,
  ...(accessToken && { accessToken }), // accessToken ko tab add karein jab wo defined ho
});
