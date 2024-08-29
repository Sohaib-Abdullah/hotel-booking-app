import Joi from "joi";

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  country: Joi.string(),
  city: Joi.string(),
  phone: Joi.string().length(10),
  img: Joi.string(),
  isAdmin: Joi.string(),
});

export default registerSchema;

// "username":"sanan",
//     "email":"sanan@gmail.com",
//     "password":"123456",
//     "country": "Pakistan",
//     "city": "Multan",
//     "phone":"0306397493",
//     "img":"https://images.pexels.com/photos/17324222/pexels-photo-17324222/free-photo-of-ruta-del-sillar.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
