export const ConstructResponse = (response, responseData) => {
  // console.log("response-data", responseData);
  responseData.success
    ? response.status(responseData.status).send({
        data: responseData.data,
        status: responseData.status,
        message: responseData.message,
      })
    : response.status(responseData.status).send({
        data: responseData.data,
        status: responseData.status,
        message: responseData.message,
      });
};
