import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({  
    title: {
        type: String,
        required: [true, 'Title is a required field.']
    },
    director: {
        type: String,
        required: [true, 'Director is a required field.']
    },
    releaseYear: {
        type: Number,
        value: { min: 1888 }
    },
    genre: String,
    rating: {
        type: Number,
        min: 0,
        max: 10
    }
});


export const Movie = mongoose.model('Movie', movieSchema);