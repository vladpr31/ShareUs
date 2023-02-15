import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
mongoose
  .connect("mongodb://0.0.0.0:27017/ShareUs")
  .then(() =>
    app.listen("3001", () => console.log("Server Running On Port 3001"))
  )
  .catch((err) => console.log(err.message));
