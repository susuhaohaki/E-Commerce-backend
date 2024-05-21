const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const router = require("./Routes/route.js");
const cookieParser = require("cookie-parser");

//dotenv
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api", router);

const port = process.env.PORT || 4040;
app.get("/", (req, res) => {
  res.send("hello");
});

//connect DB
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`);
  });
});
