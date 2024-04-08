create database db_intyexpweb;
use db_intyexpweb;
select * from usuarios;
CREATE TABLE Usuarios(
	Id_Usu int auto_increment primary key,
    NombreComp VARCHAR(30),
    Correo VARCHAR(50) UNIQUE,
    Pass VARCHAR(20),
    Usuario VARCHAR(20),
    FechaNac date
)