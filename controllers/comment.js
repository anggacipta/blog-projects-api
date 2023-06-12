const Comment = require("../models/Comment");
const Post = require("../models/Post");
const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Types.ObjectId;

const getAllComment = async (req, res) => {
  res.json(await Comment.find());
};

const createComment = async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id);
  const { name, comment } = req.body;
  const imageDoc = await Comment.create({
    name,
    comment,
    blog: postDoc._id,
  });
  res.json(imageDoc);
};

const getComments = async (req, res) => {
  const { id } = req.params;
  const imageDoc = await Comment.find({ blog: id });
  res.json(imageDoc);
};

const getCommentsSum = async (req, res) => {
  const { id } = req.params;
  const imageDoc = await Comment.aggregate([
    { $match: { blog: new mongoose.Types.ObjectId(id) } },
    { $group: { _id: null, num_tutorial: { $sum: 1 } } },
    { $project: { _id: 0, num_tutorial: 1 } },
  ]);
  res.json(imageDoc);
};

module.exports = {
  getAllComment,
  createComment,
  getComments,
  getCommentsSum,
};
