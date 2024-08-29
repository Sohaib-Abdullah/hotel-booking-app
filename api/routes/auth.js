import express from "express";
import { login,  register } from "../controller/auth.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send("hello user, you are logged in");s
})

router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
    res.send("hello user, you are logged in and you can delete your account")
})
router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
    res.send("hello admin, you are logged in and you can delete all account")
})

router.post("/register", register);
router.post("/login", login);

export default router;