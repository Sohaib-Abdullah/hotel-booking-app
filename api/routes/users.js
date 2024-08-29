import express from "express";
import { updateUser } from "../controller/user.js";
import { deleteUser, getUsers } from "../controller/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
