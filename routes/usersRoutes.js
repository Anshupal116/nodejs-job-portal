import express from "express";
import userAuth from "../middelwares/authMiddelwares.js";
import { updateUserController } from "../controller/userController.js";

//router Object
const router = express.Router();

//routes
//GET USERS || GET

//UPDATE USER || PUT
router.put("/update-user", userAuth, updateUserController);

export default router;
