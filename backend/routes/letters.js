import express from "express";
import { getLetterById, getAllLetters, createLetter, approveLetter } from "../controllers/letterController.js";

const router = express.Router();

// GET all letters
router.get("/", getAllLetters);

// GET letter by ID or tracking number
router.get("/:id", getLetterById);

// POST submit new letter application
router.post("/", createLetter);

// POST approve / TTE letter
router.post("/:id/approve", approveLetter);

export default router;
