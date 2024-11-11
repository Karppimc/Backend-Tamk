const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = 3000;
app.use(morgan('dev'));
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

    const { title, director, year } = req.query;


    let filteredMovies = movies;

    if (title) {
      filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
    }
    if (director) {
      filteredMovies = filteredMovies.filter(movie => movie.director.toLowerCase().includes(director.toLowerCase()));
    }
    if (year) {
      filteredMovies = filteredMovies.filter(movie => movie.year === parseInt(year, 10));
    }

    res.json(filteredMovies);
  });


  app.post('/movies', (req, res) => {
    const { title, director, year } = req.body;

    if (!title || !director || !year || typeof year !== 'number' || year < 1888) {
      return res.status(400).json({ error: 'Invalid data: title, director, and a valid year are required.' });
    }

    const newMovie = { id: movies.length + 1, title, director, year };
    movies.push(newMovie);
    res.status(201).json(newMovie); // 201 Created
  });



  app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).send('Movie not found');
    }
  });

  app.put('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const { title, director, year } = req.body;


    if (!title || !director || !year || typeof year !== 'number' || year < 1888) {
      return res.status(400).json({ error: 'Invalid data: title, director, and a valid year are required.' });
    }


    movie.title = title;
    movie.director = director;
    movie.year = year;
    res.json(movie);
  });



  app.delete('/movies/:id', (req, res) => {
    const index = movies.findIndex(m => m.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).send('Movie not found');
    }
    movies.splice(index, 1);
    res.status(204).send();
  });

  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

