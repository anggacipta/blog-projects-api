const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    name: String,
    comment: String,
    blog: { type: ObjectId, ref: "Post" },
  },
  {
    timestamps: true,
  }
);

const commentModel = model("Comment", CommentSchema);

module.exports = commentModel;
