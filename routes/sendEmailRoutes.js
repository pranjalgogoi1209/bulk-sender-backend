import express from "express";
import multer from "multer";
import sendEmailController from "../controllers/sendEmailController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/send", upload.single("excel"), sendEmailController.sendEmail);

export default router;
