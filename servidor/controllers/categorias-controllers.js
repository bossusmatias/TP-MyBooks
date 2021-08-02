const db = require('../db-conection'); 


/** GET CATEGORIAS   */
const getCategorias = async (req, res, next) => {

	try {
		const respuesta = await db.query('SELECT * FROM categorias');
		res.status(200).send({"respuesta": respuesta});

	}	catch(err) {
			res.status(400).send({"Error": err.message});

	} 
};


/** GET CATEGORIA POR ID */
const getCategoriaPorId = async (req, res, next) => {

  const categoriaId = req.params.id;

  try {
	  const respuesta = await db.query('SELECT * FROM categorias WHERE id = (?)', [categoriaId]);

	  if (respuesta == '') {
			throw new Error('Categoria no encontrada');
	  } 
	  
	  else {
		  res.status(200).send({"respuesta": respuesta[0].nombre});
	  }
		  
  } catch(err) {
			console.error(err.message);
			res.status(400).send({"Error": err.message});

  } 
};


/** POST CATEGORIA */
const postCategoria = async (req, res, next) => {

  const categoria = req.body.nombreCategoria.trim(); // if empty undefinied

  try {

	  if (!categoria) {
		throw new Error ('Falta enviar el nombre de Categoria');
	  }

	  let respuesta = await db.query('SELECT COUNT(*) AS count FROM categorias WHERE nombre = (?)', [categoria]);
	  
	  if (respuesta[0].count !=0) {
		throw new Error ('Esa Categoría ya Existe');
	  }

	  respuesta = await db.query('INSERT INTO categorias (nombre) VALUE (?)', [categoria]);
	  res.status(201).send({'message': 'La categoria se agrego correctamente'});

  } catch(err) {
			res.status(500).send({'error': err.message});
  }
};

/** UPDATE CATEGORIA */
const updateCategoria = async (req, res, next) => {

  const categoriaName = req.body.nombreCategoria; // if empty undefinied
  const categoriaId = req.params.id; // if empty undefinied

  try {

	  if (!categoriaName || !categoriaId) {
			throw new Error ('Falta enviar el nombre de Categoria');
	  }

	  let respuesta = await db.query('UPDATE categorias SET nombre = (?) WHERE id = (?)', [categoriaName, categoriaId]);

	  console.log(respuesta);

	  res.status(200).send({'Se actualizo la categoria con el id': categoriaId});

  } catch(err) {

			console.error(err.message);
			res.status(400).send({"Error": err.message});
  }
};


/** DELETE CATEGORIA */
const deleteCategoria = async (req, res, next) => {
 
  const categoriaId = req.params.id; // if empty undefinied
//probando
  try {

	  let data = await db.query('SELECT COUNT(id) as cantidad FROM libros WHERE categoria_id = (?)', [categoriaId]);
	  let respuesta = data[0].cantidad;

	  if (!respuesta == '') {
		  throw new Error ("Esta Categoria tiene un Libro o Mas asociados");
	  }
	  	  
	  data = await db.query('DELETE FROM categorias WHERE id = ?', [categoriaId]);
	  
	  if (data.affectedRows == '') {
		  throw new Error ('Categoria no Econtrada');
	  } 

	  res.status(200).send({"Error": 'Se Borro Correctamente'});

  } catch(err) {
			console.error(err.message);
			res.status(500).send({'error': err.message});
  }
};


/** EXPORTS */
exports.getCategorias = getCategorias;
exports.getCategoriaPorId = getCategoriaPorId;
exports.postCategoria = postCategoria;
exports.updateCategoria = updateCategoria;
exports.deleteCategoria = deleteCategoria;
