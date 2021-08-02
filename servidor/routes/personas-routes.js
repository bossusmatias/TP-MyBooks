const express = require("express");

const router = express.Router();

const personasControllers = require('../controllers/personas-controllers');

// => /categoria/
router.get('/', personasControllers.getPersonas);
router.get('/:id', personasControllers.getPersonasId);
router.post('/', personasControllers.postPersona);
router.patch('/:id', personasControllers.updatePersonas);
router.delete('/:id', personasControllers.deletePersona);

module.exports = router;
