require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());

// MongoDB connection setup
const client = new MongoClient(process.env.MONGODB_URI);
let moviesCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('moviesDB');
    moviesCollection = db.collection('movies');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

connectToDatabase();

// Routes

// Default route (HTML list of movies)
app.get('/', async (req, res) => {
  const movies = await moviesCollection.find().toArray();
  const movieList = movies.map(movie => `<li>${movie.title} by ${movie.director} (${movie.year})</li>`).join('');
  res.send(`<ul>${movieList}</ul>`);
});

// GET /movies: Fetch all movies
app.get('/movies', async (req, res) => {
  const { title, director, year } = req.query;

  const query = {};
  if (title) query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
  if (director) query.director = { $regex: director, $options: 'i' };
  if (year) query.year = parseInt(year, 10);

  const movies = await moviesCollection.find(query).toArray();
  res.json(movies);
});

// POST /movies: Add a new movie
app.post('/movies', async (req, res) => {
  const { title, director, year } = req.body;

  if (!title || !director || !year || typeof year !== 'number' || year < 1888) {
    return res.status(400).json({ error: 'Invalid data: title, director, and a valid year are required.' });
  }

  const newMovie = { title, director, year };
  const result = await moviesCollection.insertOne(newMovie);
  res.status(201).json(result.ops[0]); // 201 Created
});

// GET /movies/:id: Fetch a specific movie by ID
app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await moviesCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!movie) return res.status(404).send('Movie not found');
    res.json(movie);
  } catch {
    res.status(400).send('Invalid movie ID');
  }
});

// PUT /movies/:id: Update a movie by ID
app.put('/movies/:id', async (req, res) => {
  const { title, director, year } = req.body;

  if (!title || !director || !year || typeof year !== 'number' || year < 1888) {
    return res.status(400).json({ error: 'Invalid data: title, director, and a valid year are required.' });
  }

  try {
    const result = await moviesCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { title, director, year } },
      { returnDocument: 'after' }
    );

    if (!result.value) return res.status(404).send('Movie not found');
    res.json(result.value);
  } catch {
    res.status(400).send('Invalid movie ID');
  }
});

// DELETE /movies/:id: Delete a movie by ID
app.delete('/movies/:id', async (req, res) => {
  try {
    const result = await moviesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (!result.deletedCount) return res.status(404).send('Movie not found');
    res.status(204).send(); // 204 No Content
  } catch {
    res.status(400).send('Invalid movie ID');
  }
});

// Catch-all route
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
