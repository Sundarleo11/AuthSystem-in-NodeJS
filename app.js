require("dotenv").config();
require('./config/db').connect();
const express = require('express');

const app = express();
app.use(express.json());

const user = require('./model/user')
app.get('/', (req, res) => {

    res.status(200).send("<h1>Hello from AuthSysetm<h1/>");

})

app.post('/reqister', async (req, res) => {

    if (!(Firstname && Lastname && email && password)) {
        res.status(400).send('All field are required');
    }
    const existinguser = await user.findOne({ email }); //promise

    if (existinguser) {
        res.status(401).send('user already exists');
    }
});
module.exports = app;