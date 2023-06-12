const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const uploadMiddleware = multer({ dest: "uploadsimage/" });

const {
  getImageAll,
  createImage,
  getImageById,
  updateImage,
  deleteImage,
} = require("../controllers/image");

router.get("/", getImageAll);
router.post("/", uploadMiddleware.single("file"), createImage);
router.get("/:id", getImageById);
router.patch("/", uploadMiddleware.single("file"), updateImage);
router.delete("/:id", deleteImage);

module.exports = router;
