import express from 'express';
import { client } from './client.js';

const app = express();
app.use(express.json());

// Genres
app.post('/genre', async (req, res) => {
    const { genre_name } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO genre (genre_name) VALUES ($1) RETURNING id', 
            [genre_name]
        );
        res.status(201).json({ id: result.rows[0].id }); //TÄMÄ OK
    } catch (err) {
        res.sendStatus(500); 
    }
});


// Movies
app.post('/movie', async (req, res) => {
    const { movie_name, year, genre_id } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO movie (movie_name, year, genre_id) VALUES ($1, $2, $3) RETURNING id', 
            [movie_name, year, genre_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.sendStatus(500); 
    }
});

app.get('/movie/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const movieResult = await client.query('SELECT * FROM movie WHERE id = $1', [id]);
        if (movieResult.rows.length === 0) {
            return res.status(404).send('Movie not found');
        }

        const reviewsResult = await client.query('SELECT * FROM review WHERE movie_id = $1', [id]);
        res.json({ ...movieResult.rows[0], reviews: reviewsResult.rows });
    } catch (err) {
        res.sendStatus(500);
    }
});

app.delete('/movie/:id', async (req, res) => {
    const { id } = req.params;
    try {

        const movieResult = await client.query('SELECT 1 FROM movie WHERE id = $1', [id]);
        if (movieResult.rows.length === 0) {
            return res.status(404).send('Movie not found');
        }
        await client.query('DELETE FROM movie WHERE id = $1', [id]);
        res.status(204).send(); 
    } catch (err) {
        console.error('Error deleting movie:', err);
        res.status(500).send('Error deleting movie');
    }
});


//All movies
app.get('/movies', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const result = await client.query('SELECT * FROM movie LIMIT $1 OFFSET $2', [limit, offset]);
        if (result.rows.length === 0) {
            return res.status(404).send('No movies found');
        }
        res.json(result.rows);
    } catch (err) {
        console.error('Error retrieving movies:', err);
        res.status(500).send('Error retrieving movies');
    }
});

//Movie with keyword
app.get('/movie', async (req, res) => {
    const { keyword } = req.query; 

    if (!keyword) {
        return res.sendStatus(400);
    }
    try {
        const result = await client.query(
            'SELECT * FROM movie WHERE movie_name ILIKE $1',
            [`%${keyword}%`] 
        );
        
        if (result.rows.length === 0) {
            return res.sendStatus(404);
        }

        res.json(result.rows);
    } catch {
        res.sendStatus(500);
    }
});


// User registering
app.post('/register', async (req, res) => {
    const { name, profile_name, password, year_of_birth } = req.body;
    try {
        if (!name || !profile_name || !password || !year_of_birth) {
            return res.status(400).send('All fields are required');
        }

        const result = await client.query(
            'INSERT INTO profile (name, profile_name, password, year_of_birth) VALUES ($1, $2, $3, $4) RETURNING id', 
            [name, profile_name, password, year_of_birth]
        );

        res.status(201).json({ id: result.rows[0].id }); 
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Error registering user');
    }
});



// Favorites
app.post('/favorite', async (req, res) => {
    const { profile_id, movie_id } = req.body;
    try {
        await client.query(
            'INSERT INTO favorite (profile_id, movie_id) VALUES ($1, $2)', 
            [profile_id, movie_id]
        );
        res.sendStatus(201);  
    } catch (err) {
        res.sendStatus(500);
    }
});

app.get('/favourites', async (req, res) => {
    const { profile_name } = req.query;
    try {
        const result = await client.query(
            'SELECT m.movie_name ' +
            'FROM movie m ' + 
            'JOIN favorite f ON m.id = f.movie_id ' +
            'JOIN profile p ON f.profile_id = p.id ' +
            'WHERE p.profile_name = $1', 
            [profile_name]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error retrieving favorites:', err);
        res.status(500).send('Error retrieving favorites');
    }
});

// Reviews
app.post('/review', async (req, res) => {
    const { profile_id, movie_id, stars, review_text } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO review (profile_id, movie_id, stars, review_text) VALUES ($1, $2, $3, $4) RETURNING id', 
            [profile_id, movie_id, stars, review_text]
        );
        res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
        res.sendStatus(500); 
    }
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
