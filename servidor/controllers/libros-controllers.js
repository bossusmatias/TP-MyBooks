const db = require('../db-conection'); 



/** GET LIBROS */
const getLibros = async (req, res, next) => {

  try {
    const respuesta = await db.query('SELECT l.id AS libro_id, l.nombre AS libro_nombre, l.descripcion, l.categoria_id, l.persona_id, p.id AS persona_id, p.nombre AS categoria_libro, p.alias FROM libros AS l LEFT JOIN personas AS p ON l.persona_id = p.id ORDER BY libro_nombre');
    res.status(200).send({"respuesta": respuesta});

  } catch(err) {
  	  res.status(400).send({"Error": err.message});
			console.log(err);
		}

};

/** GET LIBROS POR ID */
const getLibroPorId = async (req, res, next) => {

  const libroId = req.params.id;

  try {
    const respuesta = await db.query('SELECT * FROM libros WHERE id = (?)', [libroId]);

    if (respuesta == '') {
        throw new Error ('No encontramos ningun libro con ese ID');
    } 
    
    else {
        res.status(200).send({"respuesta": respuesta});
    }
        
  } catch(err) {
			console.error(err.message);
			res.status(400).send({"Error": err.message});
		}

};


/** POST LIBRO */
const postLibro = async (req, res, next) => {

  const { nombre, description, categoriaId, personaId } = req.body; 

  try {

			if( !nombre || !description || !categoriaId ) {

				throw new Error("Se necesitan el nombre, descripcion Categoria ID y Persona ID");
			}

      let respuesta = await db.query("SELECT COUNT(*) as count FROM libros WHERE nombre = (?)", [nombre]);

			if(respuesta[0].count == 0) {

				respuesta = await db.query("INSERT INTO libros (nombre, descripcion, categoria_id, persona_id) VALUES (?, ?, ?, ?)", [nombre, description, categoriaId, personaId]);
				res.status(201).send("El libro se ha insertado correctamente!");

			} else {
					throw new Error("Ese libro ya existe");
			}
	
  } catch(err) {
      console.error(err.message);
      res.status(400).send({"Error": err.message});
  } 

};

/** UPDATE LIBRO */
const updateLibro = async (req, res, next) => {
	

	const libroId = req.params.id; // if empty undefinied
	const { description, categoriaId, personaId } = req.body; 
	console.log(libroId, description, categoriaId, personaId);

  try {

	  if(!libroId) {
			throw new Error ('Tanto el ID del libro como el nombre son necesarios');
	  }

	  	await db.query('UPDATE libros SET descripcion = (?), categoria_id = (?), persona_id = (?) WHERE id = (?)', [description, categoriaId, personaId, libroId]);

		res.status(200).send({'Se actualizo correctamene el libro con Id': libroId});

  } catch(err) {

			console.error(err.message);
			res.status(400).send({"Error": err.message});
  }
};

/** PRESTAR LIBRO */
const prestarLibro = async (req, res, next) => {
	

	const libroId = req.params.id; // if empty undefinied
	const { personaId } = req.body; 

  try {

	  if(!libroId) { 
			throw new Error ('Tanto el ID del libro como el nombre son necesarios');
	  }

		const libroPrestado = await db.query('SELECT persona_id FROM libros WHERE id = (?)', [libroId]);

		if (libroPrestado[0].persona_id != null) { // si el libro esta prestado o no
			throw new Error('El libro ya se encuentra prestado');
		} else {
			const respuesta = await db.query('UPDATE libros SET persona_id = (?) WHERE id = (?)', [personaId, libroId]);

			console.log(respuesta);
	
			res.status(200).send({'El libro se ha prestado': libroId});
		}

  } catch(err) {

			console.error(err.message);
			res.status(400).send({"Error": err.message});
  }
};

/** DEVOLVER LIBRO */
const devolverLibro = async (req, res, next) => {
	

	const libroId = req.params.id; // if empty undefinied

  try {

	  if(!libroId) {
			throw new Error ('Se necesita el ID del libro');
	  }

	  const respuesta = await db.query('UPDATE libros SET persona_id = (?) WHERE id = (?)',[null, libroId]);

	  console.log(respuesta);

	  res.status(200).send({'El libro se encuentra disponible': libroId});

  } catch(err) {

			console.error(err.message);
			res.status(400).send({"Error": err.message});
  }
};

/** DELETE LIBRO */
const deleteLibro = async (req, res, next) => {
 
  const libroId = req.params.id; // if empty undefinied

  try {

	  const data = await db.query('DELETE FROM libros WHERE id = (?)', [libroId]);
		console.log(data);

	  if (!data.affectedRows == 0) {
		  throw new Error ("El libro fue borrado");
	  } else {
			res.status(200).send({"Error": 'No se ha borrado ningun libro con ese ID'});
		}

  } catch(err) {
			console.error(err.message);
			res.status(400).send({"Error": err.message});
  }
};

exports.getLibros = getLibros;
exports.getLibroPorId = getLibroPorId;
exports.postLibro = postLibro;
exports.updateLibro = updateLibro;
exports.prestarLibro = prestarLibro;
exports.devolverLibro = devolverLibro;
exports.deleteLibro = deleteLibro;