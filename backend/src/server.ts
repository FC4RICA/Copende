import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = 8080;

app.get("/", async (req, res) => {
  res.send({
    message: "Hello World",
  });
});

app.listen(PORT, async () => {
  try {
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (error: any) {
    console.log("server error");
  }
});