import express from "express";
import { getLetterById, getAllLetters, createLetter } from "../controllers/letterController.js";

const router = express.Router();

// GET all letters (for User Dashboard)
router.get("/", getAllLetters);

// GET letter by ID or tracking number
router.get("/:id", getLetterById);

// POST submit new letter application
router.post("/", createLetter);

export default router;
