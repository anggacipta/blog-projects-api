const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ImageSchema = new Schema(
  {
    title: String,
    vtubername: String,
    vtubersource: String,
    art: String,
    link: String,
    image: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const ImageModel = model("Image", ImageSchema);

module.exports = ImageModel;
