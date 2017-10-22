const express = require('express')
const app = express()
const balance = require("./crypto-balance");

app.get('/:addr', function (req, res) {
    balance(req.params.addr)
    .then(items => res.send(items))
    .catch(error => res.send({ "error": error.message }));
});

app.listen(8888, function () {
    console.log('App listening on port 8888!')
});