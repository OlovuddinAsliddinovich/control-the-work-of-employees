const express = require("express");
const { verifyFace } = require("../controller/face.controller");
const router = express.Router();

router.post("/verify", verifyFace);

module.exports = router;
