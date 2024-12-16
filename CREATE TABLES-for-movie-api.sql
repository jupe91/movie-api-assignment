CREATE TABLE genre(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genre_name VARCHAR(255) NOT NULL
);

CREATE TABLE movie(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    movie_name VARCHAR(255) NOT NULL,
    YEAR INT NOT NULL,
    genre_id INT,
    FOREIGN KEY (genre_id) REFERENCES genre(id)
);

CREATE TABLE profile(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    profile_name VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    year_of_birth INT NOT NULL
);

CREATE TABLE review (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    profile_id INT NOT NULL,
    movie_id INT NOT NULL,
    stars INT NOT NULL,
    review_text TEXT,
    FOREIGN KEY (profile_id) REFERENCES profile(id),
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);
CREATE TABLE favorite (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    profile_id INT NOT NULL,
    movie_id INT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profile(id),
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);

--Inserting some data to test the connections

INSERT INTO genre (genre_name) 
VALUES 
    ('Action'),
    ('Comedy'),
    ('Drama'),
    ('Horror'),
    ('Sci-Fi');


INSERT INTO movie (movie_name, year, genre_id) 
VALUES 
    ('The Matrix', 1999, 5),  -- Sci-Fi
    ('The Dark Knight', 2008, 1),  -- Action
    ('The Hangover', 2009, 2),  -- Comedy
    ('The Conjuring', 2013, 4),  -- Horror
    ('Forrest Gump', 1994, 3);  -- Drama



INSERT INTO profile (name, profile_name, password, year_of_birth) 
VALUES 
    ('Reetta-Maria', 'reettamaria', 'password123', 1991),
    ('Pekka', 'pekkanen', 'password456', 1989),
    ('Meikäläinen', 'meikäläinen', 'password789', 1992);


INSERT INTO review (profile_id, movie_id, stars, review_text) 
VALUES 
    (1, 1, 5, 'Great movie, mind-bending!'),  -- Reetta-Maria reviewing The Matrix
    (2, 3, 4, 'Hilarious and fun movie, had a great time!'),  -- Pekka reviewing The Hangover
    (3, 2, 5, 'One of the best superhero movies ever made!');  -- Meikäläinen reviewing The Dark Knight


INSERT INTO favorite (profile_id, movie_id) 
VALUES 
    (1, 1),  -- Reetta-Maria's favorite movie is The Matrix
    (2, 3),  -- Pekka's favorite movie is The Hangover
    (3, 2);  -- Meikäläinen's favorite movie is The Dark Knight



--Checking that all tables are showing their contents

SELECT * from genre;

SELECT * FROM movie;

SELECT * FROM profile;

SELECT * FROM review;

SELECT * FROM favorite;

--Testing tables with more complex queries

SELECT movie.movie_name, movie.year, genre.genre_name
FROM movie
JOIN genre ON movie.genre_id = genre.id;

SELECT profile.profile_name, review.stars, review.review_text
FROM review
JOIN profile ON review.profile_id = profile.id
WHERE review.movie_id = 2;  -- Movie ID 2 is "The Dark Knight"


SELECT movie.movie_name
FROM favorite
JOIN movie ON favorite.movie_id = movie.id
WHERE favorite.profile_id = 3;  -- Profile ID 1 is "Meikäläinen"
