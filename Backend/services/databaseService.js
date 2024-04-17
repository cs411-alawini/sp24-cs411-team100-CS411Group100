const mysql = require('mysql2');

let serverURL = process.env.MYSQL_URL || 'localhost'
let serverPORT = process.env.MYSQL_PORT || '3306'
let database = process.env.MYSQL_DB_NAME || 'cs411group100'
let user = process.env.MYSQL_USER || 'root'
let password = process.env.MYSQL_PWD || 'password'

const connection = mysql.createConnection({
    host: serverURL,     // Your MySQL server host
    port: serverPORT,          // Your MySQL server port
    user: user,      // Your MySQL username
    password: password,  // Your MySQL password
    database: database // Your MySQL database name
});

exports.initializeMySQL = function () {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database: ' + err.stack);
            return;
        }
        console.log('Connected to database ' + connection.config.database);
    });
}

exports.executeMySQLQuery = async function (query,  params = []) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
            });
    });
}

exports.endMySQL = function () {
    connection.end((err) => {
        if (err) {
            console.error('Error closing connection: ' + err.stack);
            return;
        }
        console.log('Connection closed.');
    });
}