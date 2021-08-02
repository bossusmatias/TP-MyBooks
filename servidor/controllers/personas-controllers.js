const db = require('../db-conection');


/** POST PERSONAS */

const postPersona = async (req, res, next) => {

  const { nombre, apellido, email, alias } = req.body;

  try {

    if (!nombre || !apellido || !email || !alias) {

      throw new Error("Se necesitan el nombre, apellido, Email y Alias");
    }

    let respuesta = await db.query("SELECT COUNT(*) as count FROM personas WHERE email = (?)", [email]);

    if (respuesta[0].count == 0) {

      respuesta = await db.query("INSERT INTO personas (nombre, apellido, email, alias) VALUES (?, ?, ?, ?)", [nombre, apellido, email, alias]);
      res.status(201).send({ "Error": "La Persona se ha insertado correctamente!" });

    } else {
      throw new Error("Ese Email ya esta asociado a una persona");
    }

  } catch (err) {
    console.error(err.message);
    res.status(413).send({ "Error": err.message });
  }

};

/** GET PERSONAS */
const getPersonas = async (req, res, next) => {

  try {
    const respuesta = await db.query('SELECT * FROM personas');
    res.status(200).send({ "respuesta": respuesta });

  } catch (err) {
    res.status(413).send({ "Error": err.message });
    console.log(err);
  }

};

/** GET CATEGORIA POR ID */
const getPersonasPorId = async (req, res, next) => {

  const personaId = req.params.id;

  try {
    const respuesta = await db.query('SELECT * FROM personas WHERE id = (?)', [personaId]);
    console.log(respuesta);

    if (respuesta == '') {
      throw new Error('Persona no encontrada');
    }

    else {
      res.status(200).send({ "respuesta": respuesta });
    }

  } catch (err) {
    console.error(err.message);
    res.status(413).send({ "Error": err.message });

  } finally {
    await db.close();
  }
};


/** DELETE PERSONA */
const deletePersona = async (req, res, next) => {

  const personaId = req.params.id; // if empty undefinied

  try {

    let data = await db.query('SELECT COUNT(id) as cantidad FROM libros WHERE persona_id = (?)', [personaId]);
	  let respuesta = data[0].cantidad;

	  if (!respuesta == '') {
		  throw new Error ("Esta Persona tiene un Libro o Mas asociados");
	  }
    
    respuesta = await db.query('SELECT * FROM personas WHERE id = (?)', [personaId]);
    console.log(respuesta);

    if (respuesta == '') {
      throw new Error('Persona no encontrada');
    }

    
    data = await db.query('DELETE FROM persona WHERE id = (?)', [personaId]);
    console.log(data);

    if (!data.affectedRows == 0) {
      throw new Error("La Persona fue borrada");
    } else {
      res.status(200).send({ "Error": 'No se ha borrado ninguna persona con ese ID' });
    }


  } catch (err) {
    console.error(err.message);
    res.status(413).send({ "Error": err.message });
  }
};


/** UPDATE PERSONAS */
 const updatePersonas = async (req, res, next) => {

  const personaId = req.params.id; // if empty undefinied
  const personaName = req.body.nombrePersona;
  const { nombre, apellido, email, alias } = req.body;
  try {

    
    if (personaName == "" || personaId == "") {
      throw new Error ('Falta enviar el nombre de la Persona');
      }
    
    let respuesta = await db.query('SELECT * FROM personas WHERE id = (?)', [personaId]);
    
    if (respuesta == '') {
      throw new Error('Persona no encontrada');
    }

    respuesta = await db.query('UPDATE categorias SET nombre = (?) apellido = (?) alias =(?) WHERE id = (?)', [nombre, apellido,alias,personaId]);

	  console.log(respuesta);

	  res.status(200).send({'Se modificó id': respuesta.insertId});
  } catch(err) {

			console.error(err.message);
			res.status(413).send({"Error": err.message});
  }
};


/** EXPORTS */
exports.getPersonas = getPersonas;
exports.getPersonasId = getPersonasPorId;
exports.postPersona = postPersona;
exports.updatePersonas = updatePersonas;
exports.deletePersona = deletePersona;


