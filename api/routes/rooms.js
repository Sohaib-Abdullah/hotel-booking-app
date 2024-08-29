import express from "express";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
import {
  creatRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controller/room.js";
const router = express.Router();

//CREATE
router.post("/:hotelid", verifyAdmin, creatRoom);

//UPDATE

router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALLc
router.get("/", getRooms);

export default router;
