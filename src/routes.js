const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors')


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'form_test'
});

const app = express();

app.use(cors());

// Creating a GET route that returns data from the 'users' table.
app.get('/productos', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

        // Executing the MySQL query (select all data from the 'users' table).
        connection.query('SELECT * FROM producto', function (error, results, fields) {
            // If some error occurs, we throw an error.
            if (error) throw error;

            // Getting the 'response' from the database and sending it to our route. This is were the data is.
            res.send(results)
        });
    });
});

// Starting our server.
app.listen(3001, () => {
    console.log('Go to http://localhost:3001/productos so you can see the data.');
});
