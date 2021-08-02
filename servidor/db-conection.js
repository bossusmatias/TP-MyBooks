const mysql = require('mysql2');
const { promisify } = require('util');

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'books'
  });

mysqlPool.getConnection(err => {

    if(err) {
        console.log('Error en la conexion con la DB');
        return;
    }
    else {
        console.log('Conexion con BD exitosa');
    }
});

mysqlPool.query = promisify(mysqlPool.query).bind(mysqlPool);

module.exports = mysqlPool;