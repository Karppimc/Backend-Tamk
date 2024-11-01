const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json()); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const movies = [
    { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
    { id: 2, title: "The Matrix", director: "The Wachowskis", year: 1999 },
    { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019 }
  ];

  app.get('/', (req, res) => {
    const movieList = movies.map(movie => `<li>${movie.title} by ${movie.director} (${movie.year})</li>`).join('');
    res.send(`<ul>${movieList}</ul>`);
  });

  app.get('/movies', (req, res) => {
    res.json(movies);
  });

  app.post('/movies', (req, res) => {
    const { title, director, year } = req.body;
    const newMovie = { id: movies.length + 1, title, director, year };
    movies.push(newMovie);
    res.status(201).json(newMovie);
  });

  app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).send('Movie not found');
    }
  });