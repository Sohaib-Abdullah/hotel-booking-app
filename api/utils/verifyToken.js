import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("token-come", token);
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    console.log("check", req.user);
    next();
  });
};

// export const verifyUser = (req, res, next) => {
//   verifyToken(req, res, (err) => {
//     if (err) return next(err);
//     // console.log("not-come-back-why");
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       //   console.log("internal-check");
//       next();
//     } else {
//       return next(err);
//     }
//   });
// };

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   console.log("token-come", token);
//   if (!token) {
//     return next(createError(401, "You are not authenicated"));
//   }
//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return next(createError(403, "Token is not valid!"));
//     req.user = user;
//     console.log("check", req.user);
//     next();
//   });
// };

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    console.log("not-come-back-why");
    if (req.user.id === req.params.id || req.user.isAdmin) {
      console.log("internal-check");
      next();
    } else {
      if (err) return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      if (err) return next(createError(403, "You are not authorized admin!"));
    }
  });
};
