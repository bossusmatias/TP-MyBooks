const express = require('express');

const app = express();
const puerto = 5000;

const librosRoutes = require('./routes/libros-routes');
const personasRoutes = require('./routes/personas-routes');
const categoriasRoutes = require('./routes/categorias-routes');


app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-	Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, 	DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

/** FORM/DATA */
app.use(express.json()); 
app.use(express.urlencoded());


/** APP ROUTES */
app.use('/libros', librosRoutes); // => /libros
app.use('/personas', personasRoutes); // => /personas
app.use('/categorias/', categoriasRoutes); // => / categoria


/** SERVER */
app.listen(puerto,() => {
    console.log('Servidor escuchando puerto',puerto);
});
