require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./database/db");
const taskRoutes = require("./routes/task.routes");
const authRoutes = require("./routes/auth.routes");

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
