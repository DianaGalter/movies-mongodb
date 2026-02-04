export const validateMovie = (req, res, next) => {
  const { title, director, releaseYear, genre, rating } = req.body;
  if (!title || !director) {
    return res.status(400).send("Title and Director are required fields.");
  }

  if (releaseYear && (typeof releaseYear !== "number" || releaseYear < 1888)) {
    return res
      .status(400)
      .send("Release Year must be a number greater than or equal to 1888.");
  }
  if (rating && (typeof rating !== "number" || rating < 0 || rating > 10)) {
    return res.status(400).send("Rating must be a number between 0 and 10.");
  }
  if (genre && typeof genre !== "string") {
    return res.status(400).send("Genre must be a string.");
  }

  next();
};
