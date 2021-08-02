const express = require("express");

const router = express.Router();

const librosControllers = require('../controllers/libros-controllers');

// => /libros/
router.get('/', librosControllers.getLibros);
router.post('/', librosControllers.postLibro);
router.get('/:id', librosControllers.getLibroPorId);
router.put('/:id', librosControllers.updateLibro);
router.put('/prestar/:id', librosControllers.prestarLibro);
router.put('/devolver/:id', librosControllers.devolverLibro);
router.delete('/:id', librosControllers.deleteLibro);

module.exports = router;