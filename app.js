import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import sendEmailRoutes from "./routes/sendEmailRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/email", sendEmailRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(80, () => {
  console.log(`Server is running on port 80`);
});
