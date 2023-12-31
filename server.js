const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const authRoutes = require("./routes/authRoutes");
const openAiRoutes = require("./routes/openAiRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://personal-gpt-one.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Server is running fine!!");
});

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", openAiRoutes);

//connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server Running on PORT ${PORT} in ${process.env.NODE_ENV} mode.`.bgCyan
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
