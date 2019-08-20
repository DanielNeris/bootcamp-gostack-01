const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "daniel", "linkedin": "https://www.linkedin.com/in/danielneris/" }

// CRUD = Create, Read, Update, Delete

const users = ['Daniel', 'Diego', 'Filipe'];

server.use((req, res, next) => {
    console.time('Request');
    console.log(`Método: ${req.method}; URL: ${req.url}`);

    next();

    console.timeEnd('Request');
});

function checkUserExist(req, res, next) {
    const { name } = req.body;
    
    if(!name)
        return res.status(400).json({ erro: 'User name is required' });

    return next();
}

function checkUserInArray(req, res, next) {
    const user = users[req.params.index];

    if(!user)
        return res.status(400).json({ erro: 'User does not exists' });

    req.user = user;    

    return next();
}

server.get('/users', (req, res) => {
    try {
        return res.json(users);
    } catch (error) {
        return res.status(400).json(error);
    }
});

server.get('/users/:index', checkUserInArray, (req, res) => {
    try {
        return res.json(req.user);
    } catch (error) {
        return res.status(400).json(error);
    }
});

server.post('/users', checkUserExist, (req, res) => {
    try {
        const { name } = req.body;

        users.push(name);

        return res.json(users);
    } catch (error) {
        return res.status(400).json(error);
    }
});

server.put('/users/:index', checkUserExist, checkUserInArray, (req, res) => {
    try {
        const { index } = req.params;
        const { name } = req.body;

        users[index] = name;

        return res.json(users);
    } catch (error) {
        return res.status(400).json(error);
    }
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
    try {
        const { index } = req.params;

        users.splice(index, 1);

        return res.json({status: 'ok'});
    } catch (error) {
        return res.status(400).json(error);
    }
});

server.listen(3333);