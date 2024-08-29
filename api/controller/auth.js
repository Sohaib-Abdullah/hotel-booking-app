import User from "../models/User.js";
import bcrypt from "bcryptjs";
// import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import registerSchema from "../validator/register.validator.js";
import { ErrorResponse } from "../common/response/error-resposne.function.js";
import { ConstructResponse } from "../common/response/construct-response.function.js";
import { StatusCodes } from "../common/enums/enum-statusCode.js";
import { Messages } from "../common/enums/enum-Messages.js";
import { SuccessResponse } from "../common/response/success-response.function.js";
import loginSchema from "../validator/login.validator.js";
import { AuthResponse } from "../common/response/auth-response.function.js";

export const register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return next(error);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const exist = await User.exists({ email: req.body.email });
    console.log("exit", exist);
    if (exist) {
      return ConstructResponse(
        res,
        ErrorResponse(StatusCodes.CONFLICT, Messages.EMAIL_ALREADY_EXISTS)
      );
    }
    // } catch (err) {
    //   return ConstructResponse(
    //     res,
    //     ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR)
    //   );
    // }
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    const data = await newUser.save();
    console.log("data", data);
    // Return success response
    return ConstructResponse(
      res,
      SuccessResponse(
        data,
        StatusCodes.CREATED,
        Messages.REGISTRATION_SUCCESSFUL
      )
    );
    // res.status(200).json("User has been Created");
  } catch (err) {
    console.log("error-why", err);
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(error);
  try {
    const user = await User.findOne({ username: req.body.username });
    // if (!user) return next(createError(404, "User not found!"));
    if (!user) {
      return ConstructResponse(
        res,
        ErrorResponse(StatusCodes.NOT_FOUND, Messages.USER_NAME_NOT_FOUND)
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log("isPasswordCorrect", isPasswordCorrect);
    if (!isPasswordCorrect) {
      // return next(createError(404, "Wrong username or password"));
      return ConstructResponse(
        res,
        ErrorResponse(StatusCodes.NOT_FOUND, Messages.WRONG_PASSWORD)
      );
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, ...otherDetails } = user._doc;
    return AuthResponse(
      res.cookie("access_token", token, {
        httpOnly: true,
      }),
      SuccessResponse(
        otherDetails,
        StatusCodes.OK,
        Messages.LOGiN_SUCCESSFULL,
        token
      )
    );
  } catch (err) {
    console.log("first", err);
    next(err);
  }
};
