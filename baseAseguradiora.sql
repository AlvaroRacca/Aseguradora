 CREATE TABLE usuario (
    id_usuario int AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(15),
    apellido VARCHAR(15),
    email VARCHAR(30),
    contraseña VARCHAR(15)
    );

 CREATE TABLE informe (
 	id_informe int AUTO_INCREMENT PRIMARY KEY,
    tipo_objeto varchar(15),
    id_usuario int, 
    id_datosPersonales int,
 	estado ENUM( 'A', 'I') DEFAULT "A",
 	FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    	ON DELETE RESTRICT ON UPDATE CASCADE,
 	FOREIGN KEY (id_datosPersonales) REFERENCES datos_personales(id_datosPersonales)
    	ON DELETE RESTRICT ON UPDATE CASCADE,
 );

 CREATE TABLE datos_personales(
    id_datosPersonales INT AUTO_INCREMENT PRIMARY key,
    nombre VARCHAR(15),
    apellido VARCHAR(15),
    dni VARCHAR(15),
    cuit VARCHAR(15),
    email VARCHAR(30),
    localidad VARCHAR(15),
    provincia VARCHAR(15),
    codigo_postal INT,
    direccion VARCHAR(15),
    piso varchar(10), 
    departamento VARCHAR(5),
    telefono VARCHAR(15),
    Forma_Pago ENUM("Efectivo", "Transferencia", "Tarjeta"),
 	estado ENUM( 'A', 'I') DEFAULT "A"
 );


CREATE TABLE auto(
    id_auto int AUTO_INCREMENT PRIMARY key,
    tipo_objeto varchar(15),
    id_datosPersonales int,
    Estado_Vehiculo ENUM("Malo","Intermedio","Bueno","Muy Bueno"),
    Estado_Cubiertas ENUM("25%","50%","75%","100%"),
    año int,
    color varchar(15),
    marca varchar(15),
    modelo varchar(15),
    gamma varchar(15),
    patente varchar(15),
    km varchar(15),
    GNC ENUM("Si", "No"),
    seguros ENUM("Seguro básico", "Seguro contra terceros","Seguro contra todo riesgo"),
    foto varchar(55),
    FOREIGN KEY (id_datosPersonales) REFERENCES datos_personales(id_datosPersonales)
    	ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE moto (
    id_moto int AUTO_INCREMENT PRIMARY key,
    id_datosPersonales int,
    tipo_objeto varchar(15),
    año int,
    marca varchar(15),
    modelo varchar(15),
    km varchar(15),
    Estado_Vehiculo ENUM("Malo","Intermedio","Bueno","Muy Bueno"),
    Estado_Cubiertas ENUM("25%","50%","75%","100%"),
    seguros ENUM("Seguro contra terceros","Seguro contra robo e incendio"),
    foto varchar(15),
    FOREIGN KEY (id_datosPersonales) REFERENCES datos_personales(id_datosPersonales)
    	ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE bicicleta (
    id_bici int AUTO_INCREMENT PRIMARY key,
    id_datosPersonales int,
    tipo_objeto varchar(15),
    año int,
    marca varchar(15),
    modelo varchar(15),
    cuadro varchar(15),
    foto varchar(15),
    FOREIGN KEY (id_datosPersonales) REFERENCES datos_personales(id_datosPersonales)
    	ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE celular (
    id_celular int AUTO_INCREMENT PRIMARY key,
    id_datosPersonales int,
    tipo_objeto varchar(15),
    año int,
    marca varchar(15),
    modelo varchar(15),
    memoria varchar(15),
    valor varchar(15),
    foto varchar(15),
    FOREIGN KEY (id_datosPersonales) REFERENCES datos_personales(id_datosPersonales)
    	ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE poliza (
    id_poliza int AUTO_INCREMENT PRIMARY key,
    id_informe int,
    estado ENUM( 'A', 'I') DEFAULT "A",
    FOREIGN KEY (id_informe) REFERENCES informe(id_informe)
    	ON DELETE RESTRICT ON UPDATE CASCADE
)