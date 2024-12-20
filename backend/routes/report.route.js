const express = require("express");
const { generateReport } = require("../controller/report.controller");
const { adminAuthMiddleware, adminMiddleware } = require("../middlewares/admin.auth.middleware");
const router = express.Router();

// Hisobotni yaratish (Excel)
router.get("/generate", adminAuthMiddleware, adminMiddleware, generateReport);

module.exports = router;
