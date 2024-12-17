const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/auth.route");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const adminRoute = require("./routes/admin.route");
const errorMiddleware = require("./middlewares/error.middleware");

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cookieParser());

app.use("/api/auth", userRoute);
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
      console.log("MongoDB ga ulandi");
    });
  } catch (error) {
    console.log("MongoDB ga ulanishda xatolik", error);
  }
};

startApp();
