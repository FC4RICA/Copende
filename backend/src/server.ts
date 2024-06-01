import express from "express";
import cors from "cors";
import { PORT, MONGO_URI } from "./config/config";
import userRouter from "./Router/userRouter"
import adminRouter from "./Router/adminRouter"
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send({
    message: "Hello World",
  });
});

app.use("/api/user",userRouter)
app.use("/api/admin", adminRouter)

app.listen(PORT, async () => {
  try {    
    mongoose.connect(MONGO_URI);
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (error: any) {
    console.log("server error", error.message);
  }
});