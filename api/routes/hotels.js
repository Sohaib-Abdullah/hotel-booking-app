import express from "express";
import {
  confirm,
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  intent,
  updateHotel,
} from "../controller/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create Hotel
router.post("/", verifyAdmin, createHotel);

router.post("/payment/create-payment-intent/:id", intent);

//Update Hotel
router.put("/:id", verifyAdmin, updateHotel);

router.put("/", confirm);

// DELETE HOTEL

router.delete(":id", verifyAdmin, deleteHotel);

// GET HOTEL

router.get("/find/:id", getHotel);

//Get All Hotel

router.get("/", getHotels);

//GET CITY BY COUNT
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

//GET HOTEL ROOM

router.get("/room/:id", getHotelRooms);
export default router;
