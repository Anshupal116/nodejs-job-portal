import express from "express";
import userAuth from "../middelwares/authMiddelwares.js";
import { updateUserController } from "../controller/userController.js";

//router Object
const router = express.Router();

//routes
//GET USERS || GET

//UPDATE USER || PUT
router.put("/update-user", userAuth, updateUserController);

/*
 * @swagger
 * components:
 *   schemas:
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Updated user name
 *         example: Jane
 *         lastname:
 *           type: string
 *           description: Updated user last name
 *           example: Doe
 *         email:
 *           type: string
 *           description: Updated user email address
 *           example: janedoe@example.com
 *         location:
 *           type: string
 *           description: Updated user location
 *           example: New York
 * /

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management APIs
 */

/**
 * @swagger
 * /update-user:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 user:
 *                   $ref: '#/components/schemas/UserUpdate'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */

export default router;
