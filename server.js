import express from 'express';
import { client } from './client.js';

const app = express();
app.use(express.json());

//Genres
app.post('/genre', (req, res) => {
    res.send('Add a new genre'); //placeholder response for adding genre
});

//Movies
app.post('/movie', (req, res) => {
    res.send('Add a new movie'); //placeholder response for adding movie
})

app.get('/movie/:id', (req, res) => {
    res.json({
        id: req.params.id,
        name: "Pekka ja Pätkä",
        year: 1900,
        genre: "action",
        reviews: [
            {
                username: "meikalainen",
                stars: 4,
                reviewText: "aivan fantastinen pläjäys"
            },
            {
                username: "rontti",
                stars: 2,
                reviewText: "mukava leffa"
            }
        ]
    });  //Send movie ID from URL params
});

app.delete('/movie/:id', (req, res) => {
    res.send(`Delete movie with ID: ${req.params.id}`);  //Send movie ID from URL params
});

app.get('/movies', (req, res) => {
    res.send('Get a list of all movies');  //Placeholder response for getting movies
});

app.get('/movie', (req, res) => {
    const { keyword } = req.query;  //Access keyword from query params
    res.send(`Search for movies with keyword: ${keyword}`);  //Send keyword search
});

//Users
app.post('/register', (req, res) => {
    res.send('Register a new user');  //Placeholder response for user registration
});

//Favorites
app.post('/favourite', (req, res) => {
    res.send('Add a favorite movie');  //Add favorite movie
});

app.get('/favourites', (req, res) => {
    res.send('Get a list of favorite movies');  //Get favorite movies
});

//Reviews
app.post('/review', (req, res) => {
    res.send('Add a review for a movie: ');  //Placeholder response for adding a review
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
