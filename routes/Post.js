const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const checkAuth = require("../middleware/check-auth");

const {
  getAllPost,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
  getPostAuthor,
} = require("../controllers/post");

// router.route("/").get(getAllPost).patch(updatePost).post(createPost);
// router.route("/:id").get(getSinglePost);

router.post("/", uploadMiddleware.single("file"), createPost);
router.patch("/", uploadMiddleware.single("file"), updatePost);
router.get("/", getAllPost);
router.get("/author", getPostAuthor);
router.get("/:id", getSinglePost);
router.delete("/:id", deletePost);

module.exports = router;
