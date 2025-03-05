// app.js (CORS enabled correctly)
const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/database");
const apiRoutes = require("./routes/index");
require("dotenv").config();

const port = process.env.PORT || 5000;

// 🔹 Enable CORS for frontend requests
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true,
}));

const middleware = [
  logger("dev"),
  cookieParser(),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
];

app.use(middleware);
app.get("/", (req, res) => res.send("Welcome to the Complaint App!"));
app.use("/api", apiRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

dbConnect();
app.listen(port, () => console.log(`App listening on port ${port}!`));
