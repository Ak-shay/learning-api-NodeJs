const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();

// connect to mongo db
mongoose.connect('mongodb://localhost/mydb', {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    //console.log(err);
    res.status(422).send({error: err.message});
});

//listen for req
app.listen(process.env.port || 8080, function(){
    console.log("now listening for requests");
});