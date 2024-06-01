// Import required modules
const express = require('express');
const mysql = require('mysql');

// Create Express app
const app = express();

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'localhost', // MySQL server host
    user: 'your_mysql_username', // MySQL username
    password: 'your_mysql_password', // MySQL password
    database: 'your_database_name' // MySQL database name
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Example route to fetch data from MySQL
app.get('/data', (req, res) => {
    connection.query('SELECT * FROM your_table', (error, results, fields) => {
        if (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).send('Error fetching data from MySQL');
            return;
        }
        res.json(results); // Return data as JSON
    });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

