import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { clerkMiddleware } from "@clerk/express";
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(clerkMiddleware());
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
