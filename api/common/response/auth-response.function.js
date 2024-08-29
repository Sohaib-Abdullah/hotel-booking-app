export const AuthResponse = (response, responseData) => {
  console.log("response-data", responseData);
  responseData.success
    ? response.status(responseData.status).send({
        data: responseData.data,
        status: responseData.status,
        message: responseData.message,
        accesToken: responseData.accessToken,
      })
    : response.status(responseData.status).send({
        data: responseData.data,
        status: responseData.status,
        message: responseData.message,
      });
};
