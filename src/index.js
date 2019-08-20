const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "daniel", "linkedin": "https://www.linkedin.com/in/danielneris/" }

// CRUD = Create, Read, Update, Delete

const users = ['Daniel', 'Diego', 'Filipe'];

server.get('/users', (req, res) => {
    try {
        return res.json(users);
    } catch (error) {
        return res.status(400).json(error);
    }
});

server.get('/users/:index', (req, res) => {
    try {
        const { index } = req.params;

        return res.json(users[index]);
    } catch (error) {
        return res.status(400).json(error);
    }
});

server.post('/users', (req, res) => {
    try {
        const { name } = req.body;

        users.push(name);

        return res.json(users);
    } catch (error) {
        return res.status(400).json(error);
    }
});

server.put('/users/:index', (req, res) => {
    try {
        const { index } = req.params;
        const { name } = req.body;

        users[index] = name;

        return res.json(users);
    } catch (error) {
        return res.status(400).json(error);
    }
});

server.delete('/users/:index', (req, res) => {
    try {
        const { index } = req.params;

        users.splice(index, 1);

        return res.json({status: 'ok'});
    } catch (error) {
        return res.status(400).json(error);
    }
});

server.listen(3333);