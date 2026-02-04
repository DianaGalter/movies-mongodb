import express from "express";
import {
  fetchMovies,
  fetchMovie,
  newMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movies.controller.js";
import { validateMovie } from "../middlewares/movies.middleware.js";
const router = express.Router();

router.get(
  "/",
  (req, res, next) => {
    next();
  },
  fetchMovies,
);

router.get("/:id", fetchMovie);

router.post("/", validateMovie, newMovie);

router.put("/:id", validateMovie, updateMovie);

router.delete("/:id", deleteMovie);

export default router;
