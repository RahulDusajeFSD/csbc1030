

var express = require('express');

var app = express();

const port = 8095;

const userRoutes = require('./routes/routes');

app.listen(port, (req, res)=>{

    console.log(`Server Stared at port ${port}`);

});

app.get('/', (req, res)=>{
    res.send('Hello Assignment 4');
})

app.use('/users', userRoutes);