const express = require("express");
const { startWork, endWork } = require("../controller/work.report.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

// Ishni boshlash
router.post("/start", authMiddleware, startWork);

// Ishni tugatish
router.post("/end", authMiddleware, endWork);

module.exports = router;
