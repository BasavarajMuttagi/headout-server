import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import UserRouter from "./src/routes/user.route";
import GameSessionRouter from "./src/routes/gameSession.route";
import ChallengeRouter from "./src/routes/challenge.route";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/user", UserRouter);
app.use("/game", GameSessionRouter);
app.use("/challenge", ChallengeRouter);
app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
