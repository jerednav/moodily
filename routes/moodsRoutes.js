import express from "express";
const router = express.Router();

import {
  createMood,
  deleteMood,
  getAllMoods,
  updateMood,
  showStats,
} from "../controllers/moodsController.js";

router.route("/").post(createMood).get(getAllMoods);
//remember about :id
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteMood).patch(updateMood);

export default router;
