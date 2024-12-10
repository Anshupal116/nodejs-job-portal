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
/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - company
 *         - position
 *         - workLocation
 *       properties:
 *         company:
 *           type: string
 *           description: The company name
 *         position:
 *           type: string
 *           description: The job position
 *         status:
 *           type: string
 *           enum: [Pending, Reject, Interview]
 *           default: Pending
 *           description: The job status
 *         WorkType:
 *           type: string
 *           enum: [Full-Time, Part-Time, Internship, Contractor]
 *           default: Full-Time
 *           description: The work type
 *         workLocation:
 *           type: string
 *           default: Delhi
 *           description: The work location
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the job
 *       example:
 *         company: OpenAI
 *         position: Software Engineer
 *         status: Pending
 *         WorkType: Full-Time
 *         workLocation: San Francisco
 *         createdBy: 64b2f5d1e4d0f3a1c8d3f6e2
 */

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management APIs
 */

/**
 * @swagger
 * /create-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /get-job:
 *   get:
 *     summary: Retrieve all jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */

/**
 * @swagger
 * /update-job/{id}:
 *   patch:
 *     summary: Update a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       404:
 *         description: Job not found
 */

/**
 * @swagger
 * /delete-job/{id}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 */

/**
 * @swagger
 * /job-stats:
 *   get:
 *     summary: Get job statistics
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job statistics retrieved successfully
 */

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
