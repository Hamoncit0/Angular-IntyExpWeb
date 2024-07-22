create database db_intyexpweb;
use db_intyexpweb;
select * from usuarios;
CREATE TABLE Usuarios(
	Id_Usu int auto_increment primary key,
    Nombres VARCHAR(30),
    Apellidos VARCHAR(30),
    Correo VARCHAR(50) UNIQUE,
    Pass VARCHAR(20),
    Usuario VARCHAR(20),
    FechaNac date
);
CREATE TABLE Productos(
	IdProducto int auto_increment primary key,
    Nombre VARCHAR(30),
    Marca VARCHAR(15),
    Detalles text
);

SELECT * FROM usuarios WHERE Correo = 'aaa@gmail.com' AND Pass = 'aaaaaaaa';

SELECT pub.*, cat.Categoria FROM tb_publicacion pub
JOIN tb_categoria cat
	ON pub.id_categoria = cat.id_Categoria
ORDER BY FechaCreacion DESC
LIMIT 3;