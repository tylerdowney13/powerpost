const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// ROUTERS
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const liftlogRoute = require("./routes/liftlogs");
const articleRoute = require("./routes/articles");

const PORT = process.env.PORT || 5000;

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB");
});

// MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// IMAGE UPLOADS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/post");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.status(200).json("Welcome to PowerPost API");
});

app.get("/api", (req, res) => {
  res.status(200).json("This is the PowerPost api");
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});

// USE ROUTES
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/liftlog", liftlogRoute);
app.use("/api/articles", articleRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
