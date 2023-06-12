const express = require("express");
const router = express.Router();
const {
  getAllComment,
  createComment,
  getComments,
  getCommentsSum,
} = require("../controllers/comment");

router.get("/", getAllComment);
router.get("/:id", getComments);
router.post("/:id", createComment);
router.get("/sum/:id", getCommentsSum);

module.exports = router;
