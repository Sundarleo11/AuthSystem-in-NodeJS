//const express = require('express');
const app = require('./app');
//const port = 8080;
const { port } = process.env


app.listen(port, () => {
    console.log(`Server is up and runing on port ${port}`);
})

