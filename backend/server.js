require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const connectDB = require("./database/db");
const taskRoutes = require("./routes/task.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(express.static(path.join(__dirname, "dist")));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
