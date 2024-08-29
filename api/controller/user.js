import { Messages } from "../common/enums/enum-Messages.js";
import { StatusCodes } from "../common/enums/enum-statusCode.js";
import { ConstructResponse } from "../common/response/construct-response.function.js";
import { ErrorResponse } from "../common/response/error-resposne.function.js";
import { SuccessResponse } from "../common/response/success-response.function.js";
import User from "../models/User.js";

export const createUser = async (req, res, next) => {
  const newUser = new User(req.body);
  console.log(newUser);
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id });

    if (!user) {
      ErrorResponse(
        StatusCodes.NOT_FOUND,
        `User not Found with id ${req.params.id}`
      );
    }

    const data = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    // const { password, ...otherDetails } = user._doc;
    return ConstructResponse(
      res,
      SuccessResponse(data, StatusCodes.OK, Messages.USER_UPDATED_SUCCESSFULLY)
    );
    // res.status(200).json(updateUser);
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json(" User has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
