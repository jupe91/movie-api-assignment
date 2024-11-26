import express from 'express';
import { client } from './client.js';


const app = express();
app.use(express.json());

//Genres
app.post('/genres', (req, res) => {
    res.send('Add a new genre'); //placeholder response for adding genre
});

//Movies
app.post('/movies', (req, res) => {
    res.send('Add a new movie'); //placeholder response for adding movie
})

app.get('/movies/:id', (req, res) => {
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
                username: "sika",
                stars: 2,
                reviewText: "mukava leffa"
            }
        ]
    });  //Send movie ID from URL params
  });
  
app.delete('/movies/:id', (req, res) => {
    res.send(`Delete movie with ID: ${req.params.id}`);  //Send movie ID from URL params
});

app.get('/movies', (req, res) => {
    res.send('Get a list of all movies');  //Placeholder response for getting movies
});

app.get('/movies/search', (req, res) => {
    const { keyword } = req.query;  //Access keyword from query params
    res.send(`Search for movies with keyword: ${keyword}`);  //Send keyword search
});

//Users
app.post('/users/register', (req, res) => {
    res.send('Register a new user');  //Placeholder response for user registration
});

app.post('/users/:username/favorites', (req, res) => {
    res.send(`Add a favorite movie for user: ${req.params.username}`);  //Add favorite movie for user
});

app.get('/users/:username/favorites', (req, res) => {
    res.send(`Get favorite movies of user: ${req.params.username}`);  //Get favorite movies for user----------
});

//Reviews
app.post('/reviews', (req, res) => {
    res.send(`Add a review for a movie: `);  //Placeholder response for adding a review, ${req.body.}
});


app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
