const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/auth.route");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const adminRoute = require("./routes/admin.route");
const errorMiddleware = require("./middlewares/error.middleware");
const faceRoute = require("./routes/face.route");
const { loadModels } = require("./controller/face.controller");
const workReportRoute = require("./routes/work.report.route");
const reportRoute = require("./routes/report.route");

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static("static"));

app.use("/api/auth", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/face", faceRoute);
app.use("/api/work", workReportRoute);
app.use("/api/report", reportRoute);

app.use(errorMiddleware);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await loadModels();
    console.log("Yuzni aniqlash modeli yuklandi");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
      console.log("MongoDB ga ulandi");
    });
  } catch (error) {
    console.log("Error", error);
  }
};

startApp();
