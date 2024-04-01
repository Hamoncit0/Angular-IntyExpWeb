// Import required modules
const express = require('express');
const mysql = require('mysql'); // Using mysql2 package for MySQL connectivity
const bodyParser = require('body-parser'); // Deprecated; consider using express.json() instead
const cors = require('cors')
// Create Express app
const app = express();
const port = 3000; // Choose a port for your Express server

// Middleware to parse JSON request bodies
app.use(cors());
app.use(bodyParser.json()); // Deprecated; consider using express.json() instead
// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost', // Change this to your MySQL server host
  user: 'root',      // Change this to your MySQL username
  password: 'root',  // Change this to your MySQL password
  database: 'db_intyexpweb' // Change this to your MySQL database name
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});
  //CREATE
  app.post('/users', (req, res) => {
  console.log("chi");
  const { Usuario, Correo, Pass } = req.body;
  db.query('INSERT INTO usuarios (Usuario, Correo, Pass) VALUES (?, ?, ?)', [Usuario, Correo, Pass], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ error: 'Error inserting user' });
      return;
    }
    res.json({ message: 'User inserted successfully', id: result.insertId });
  });
});
// READ
app.get('/get-users', (req, res) => {
  console.log("entro")
  const {Usuario, Pass} = req.body;
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Error querying users:', err);
      res.status(500).json({ error: 'Error querying users' });
      return;
    }
    res.json(results);
  });
});

app.post('/login', (req, res) => {
  console.log('entro');
  const { Usuario, Pass } = req.body;
  // Query the database to find a user with the provided username and password
  db.query('SELECT * FROM usuarios WHERE Usuario = ? AND Pass = ?', [Usuario, Pass], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'An error occurred while fetching user' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const user = results[0];
    res.status(200).json(user);
  });
});


  // Start the Express server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  