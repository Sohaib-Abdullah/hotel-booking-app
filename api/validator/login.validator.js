import Joi from "joi";

const loginSchema = Joi.object({
  username: Joi.string().required(),
  //   email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

export default loginSchema;
