import express from "express";
import { WellComeUser } from "../controller/wellcome.js";

const router = express.Router();

router.get("/wellcome", WellComeUser);

export default router;
