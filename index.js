const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/Post");
const userRoutes = require("./routes/User");
const imageRoutes = require("./routes/Image");
const commentRoutes = require("./routes/Comment");
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/uploadsimage", express.static(__dirname + "/uploadsimage"));

// untuk connect ke MongoDBAtlas
// mongoose.connect(
//   "mongodb+srv://anggacp:SzBwmITa1PLL1lRp@cluster0.8zhthid.mongodb.net/?retryWrites=true&w=majority"
// );

mongoose.connect("mongodb://127.0.0.1:27017/vtuber-blog");

app.use(userRoutes);
app.use("/post", postRoutes);
app.use("/image", imageRoutes);
app.use("/comment", commentRoutes);

app.listen(4000);
//
//
