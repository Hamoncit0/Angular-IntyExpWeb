const express = require('express');
const mysql = require('mysql'); 
const bodyParser = require('body-parser'); 
const cors = require('cors')

const app = express();
const port = 3000; //Puerto para andar escuchando


app.use(cors());
app.use(bodyParser.json());//esto es para parsear las entidades

//configuracion para conectarse a la base de datos
const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: 'root',  
  database: 'db_intyexpweb' 
});

//Ya se conecta aqui
db.connect((err) => {
  if (err) {
    console.error('Error al conectarse a la base de datos de MySQL:', err);
    return;
  }
  console.log('Se conecto a la base de datos de MySQL');
});
  
  app.post('/users', (req, res) => {
  console.log("chi");
  const { Usuario, Correo, Pass } = req.body;
  db.query('INSERT INTO usuarios (Usuario, Correo, Pass) VALUES (?, ?, ?)', [Usuario, Correo, Pass], (err, result) => {
    if (err) {
      console.error('Error insertando el usuario:', err);
      res.status(500).json({ error: 'Error insertando el usuario' });
      return;
    }
    res.json({ message: 'Usuario insertado correctamente', id: result.insertId });
  });
});



app.post('/login', (req, res) => {
  console.log('entro a login');
  const { Correo, Pass } = req.body;
  
  db.query('SELECT * FROM usuarios WHERE Correo = ? AND Pass = ?', [Correo, Pass], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Un error ha ocurrido mientras se buscaba el usuario.' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      console.log('no funciono :(' )
      return;
    }
    const user = results[0];
    res.status(200).json(user);
  });
});


  // Start the Express server
  app.listen(port, () => {
    console.log(`El servidor esta corriendo en http://localhost:${port}`);
  });
  