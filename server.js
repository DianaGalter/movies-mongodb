import express from "express";
import moviesRouter from "./routes/movies.route.js";

const app = express();

app.use(express.json());

app.use("/movies", moviesRouter);

app.use("/", (req, res) => {
  res.send("fallback..404 - not found");
});

app.listen(3000, () => {
  console.log("Server is running...");
});
