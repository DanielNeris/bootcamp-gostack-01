const express = require('express');

const server = express();

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "daniel", "linkedin": "https://www.linkedin.com/in/danielneris/" }

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.query;

    return res.json({message: `Hello ${name} seu id é ${id}`});
});

server.listen(3333);