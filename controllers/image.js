const Image = require("../models/Image");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const secret = "lkasjflsajflsaf";

const getImageAll = async (req, res) => {
  res.json(await Image.find());
};

const createImage = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, vtubername, vtubersource, art, link } = req.body;
    const imageDoc = await Image.create({
      title,
      vtubername,
      vtubersource,
      art,
      link,
      image: newPath,
      author: info.id,
    });
    res.json(imageDoc);
  });
};

const getImageById = async (req, res) => {
  const { id } = req.params;
  const imageDoc = await Image.findById(id).populate("author", ["username"]);
  res.json(imageDoc);
};

const updateImage = async (req, res) => {
  let newPath = "";
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, vtubername, vtubersource, art, link } = req.body;
    const imageDoc = await Image.findById(id);
    const isAuthor =
      JSON.stringify(imageDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await imageDoc.updateOne({
      title,
      vtubername,
      vtubersource,
      art,
      link,
      image: newPath ? newPath : imageDoc.image,
    });

    res.json(imageDoc);
  });
};

const deleteImage = async (req, res) => {
  const { id } = req.params;
  const imageDoc = await Image.findOneAndDelete({ _id: id });
  res.json(imageDoc);
};

module.exports = {
  getImageAll,
  createImage,
  getImageById,
  updateImage,
  deleteImage,
};
