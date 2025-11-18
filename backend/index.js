import express from "express";
import { connectDB } from "./config/db.js";
import postsRouter from "./routes/post.js";
import { config } from "dotenv";
import cors from "cors";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use("/api/posts", postsRouter);

config();
connectDB();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
