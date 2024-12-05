import express from "express";
import userAuth from "../middelwares/authMiddelwares.js";
import {
  createJobController,
  deleteJobController,
  getAlljobsController,
  jobStatsController,
  updateJobController,
} from "../controller/jobsController.js";

const router = express.Router();

//routes
//Create JOB || POST
router.post("/create-job", userAuth, createJobController);

//GET JOBS || GET
router.get("/get-job", userAuth, getAlljobsController);

//UPDATE JOBS || PUT || PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

//DELETE JOBS || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

//JOBS STATS FILTER || GET
router.get("/job-stats", userAuth, jobStatsController);

export default router;
