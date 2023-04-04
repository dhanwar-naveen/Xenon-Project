const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

// Parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name'
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;
  const sql = 'INSERT INTO contact_form (name, email, message) VALUES (?, ?, ?)';
  connection.query(sql, [name, email, message], (error, results) => {
    if (error) {
      res.send('Error: ' + error.message);
    } else {
      res.send('Message sent successfully!');
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
