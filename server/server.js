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
  


//////////////USUARIO/////////////////////////////
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


/////////////////PRODUCTOS////////////////////////////
//agarrar los productos para poder verlos en pantalla (todos)
app.get('/products', (req, res) => {
  console.log('entro a productos');
  db.query('SELECT IdProducto, Nombre, Marca, Detalles, Precio, Imagen FROM Productos', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Un error ha ocurrido mientras se buscaban los productos.' });
      return;
    }
    results.forEach(product => {
      if (product.Imagen) {
        product.Imagen = `data:image/jpeg;base64,${Buffer.from(product.Imagen).toString('base64')}`;
      }
    });
    res.status(200).json(results);
  });
});
//MOSTRAR PRODUCTOS POR CATEGORIA
app.post('/products/category', (req, res) => {
  console.log('entro a productos por categoria');
  const { CategoriaStr} = req.body;
  
  db.query('SELECT procat.IdProducto, procat.IdCategoria, cat.Categoria, pro.Nombre, pro.Marca, pro.Detalles, pro.Precio, pro.Imagen  FROM productocategorias procat JOIN productos pro ON procat.IdProducto = pro.IdProducto JOIN categorias cat ON procat.IdCategoria = cat.IdCategoria WHERE cat.Categoria = "?";', [CategoriaStr], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Un error ha ocurrido mientras se buscaba el producto.' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      console.log('no funciono :(' )
      return;
    }
    const user = results[0];
    res.status(200).json(user);
  });
});

//MOSTRAR PRODUCTOS POR Rango de precio

app.post('/products/price-range', (req, res) => {
  console.log('entro a productos por categoria');
  const { PrecioMin, PrecioMax} = req.body;
  
  db.query('SELECT procat.IdProducto, procat.IdCategoria, cat.Categoria, pro.Nombre, pro.Marca, pro.Detalles, pro.Precio, pro.Imagen  FROM productocategorias procat JOIN productos pro ON procat.IdProducto = pro.IdProducto JOIN categorias cat ON procat.IdCategoria = cat.IdCategoria WHERE pro.Precio>=? AND pro.Precio<=?;', [PrecioMin, PrecioMax], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Un error ha ocurrido mientras se buscaba el producto.' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      console.log('no funciono :(' )
      return;
    }
    const user = results[0];
    res.status(200).json(user);
  });
});

//////////////////CARRITO//////////////////////////


//agregar producto NUEVO al carrito
app.post('/agregarCarrito', (req, res) => {
  console.log("Entro a Agregar Carrito Nuevo");
  const { ProductoId, UsuarioId} = req.body;
  db.query('INSERT INTO carrito (IdProducto, IdUsu, Cantidad) VALUES (?, ?, 1)', [ProductoId, UsuarioId], (err, result) => {
    if (err) {
      console.error('Error insertando el usuario:', err);
      res.status(500).json({ error: 'Error insertando el usuario' });
      return;
    }
    res.json({ message: 'Producto insertado correctamente al carrito', id: result.insertId });
  });
});
//modificar producto EXISTENTE al carrito
app.post('/modificarCarrito', (req, res) => {
  console.log("chi");
  const { ProductoId, UsuarioId, Cantidad } = req.body;
  db.query('UPDATE carrito SET Cantidad = ? WHERE IDUsu = ? AND IDProducto = ?;', [Cantidad, UsuarioId, ProductoId], (err, result) => {
    if (err) {
      console.error('Error insertando el usuario:', err);
      res.status(500).json({ error: 'Error modificando el carrito' });
      return;
    }
    res.json({ message: 'Modificar carrito correctamente', id: result.insertId });
  });
});

//borrar producto EXISTENTE del carrito
app.post('/borrarProductoCarrito', (req, res) => {
  console.log("chi");
  const { ProductoId, UsuarioId} = req.body;
  db.query('Delete from carrito WHERE IDUsu = ? AND IDProducto = ?;', [UsuarioId, ProductoId], (err, result) => {
    if (err) {
      console.error('Error insertando el usuario:', err);
      res.status(500).json({ error: 'Error borrando productos del carrito' });
      return;
    }
    res.json({ message: 'Producto del carrito borrado correctamente', id: result.insertId });
  });
});

//borrar Carrito del usuario
app.post('/borrarCarrito', (req, res) => {
  console.log("chi");
  const {UsuarioId} = req.body;
  db.query('Delete from carrito WHERE IDUsu = ?;', [UsuarioId], (err, result) => {
    if (err) {
      console.error('Error insertando el usuario:', err);
      res.status(500).json({ error: 'Error borrando el carrito' });
      return;
    }
    res.json({ message: 'Producto del carrito borrado correctamente', id: result.insertId });
  });
});

//mostrar productos EXISTENTES del carrito

app.post('/mostrarCarrito', (req, res) => {
  console.log('entro a login');
  const { ProductoId, UsuarioId } = req.body;
  
  db.query('SELECT car.Cantidad, pro.* FROM Carrito car JOIN Productos pro ON car.IDProducto = pro.IdProducto WHERE car.IDUsu = ? AND car.IDProducto =?;', [UsuarioId, ProductoId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Un error ha ocurrido mientras se buscaba el carrito.' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Carrito no encontrado' });
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
  