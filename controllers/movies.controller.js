import { readJsonFile, writeJsonFile } from "../utils/filesManagement.js";
import { fileURLToPath } from "node:url";
import { v4 as uuidv4 } from "uuid";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "..", "data", "movies.json");
let movies = [];

export const fetchMovies = async (req, res) => {
  const data = await readJsonFile(filePath);
  movies = [...data];
  res.status(200).send(movies);
};

export const fetchMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readJsonFile(filePath);
    movies = [...data];
    const movie_exist = movies.filter((movie) => movie.id === id);

    if (!(movie_exist.length > 0)) {
      throw new Error("Movie not found");
    }
    res.status(200).send(movie_exist[0]);
  } catch (error) {
    res.status(400).send(error.message || error);
  }
};

export const newMovie = async (req, res) => {
  try {
    const { title, director, year, genre, rating } = req.body;
    const data = await readJsonFile(filePath);
    movies = [...data];
    movies.push({
      id: uuidv4(),
      title,
      director,
      year,
      genre,
      rating,
    });
    await writeJsonFile(filePath, movies);
    const statusMessage = createStatusMessage(req.body);
    res.status(201).send(statusMessage);
  } catch (error) {
    console.log(error);
    res.send("Error creating a new movie");
  }
};

function createStatusMessage(updatedFields) {
  const { title, director, year, genre, rating } = updatedFields;
  let message = `Movie created with title: ${title}, director: ${director}`;
  if (year !== undefined) {
    message += `, year: ${year}`;
  }
  if (genre !== undefined) {
    message += `, genre: ${genre}`;
  }
  if (rating !== undefined) {
    message += `, rating: ${rating}`;
  }
  return message;
}

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await readJsonFile(filePath);
    movies = [...data];

    const index = movies.findIndex((movie) => movie.id === id);
    if (index === -1) throw new Error("Movie not found");

    movies[index] = {
      ...movies[index],
      ...req.body,
    };
    await writeJsonFile(filePath, movies);
    res.status(200).send(`Movie with id: ${id} updated successfully`);
  } catch (error) {
    res.status(400).send(error.message || error);
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readJsonFile(filePath);
    movies = [...data];
    const movie_exist = movies.filter((movie) => movie.id !== id);

    await writeJsonFile(filePath, movie_exist);
    res.status(200).send(`Movie with id: ${id} deleted successfully`);
  } catch (error) {
    res.status(400).send(error.message || error);
  }
};
