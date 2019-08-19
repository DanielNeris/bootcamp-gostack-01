const express = require('express');

const server = express();

server.get('/test', (req, res) => {
    return res.json({message: 'Hello World'});
});

server.listen(3333);