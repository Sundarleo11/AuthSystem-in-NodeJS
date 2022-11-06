require("dotenv").config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {

    res.status(200).send("<h1>Hello from AuthSysetm<h1/>");

})

module.exports = app;