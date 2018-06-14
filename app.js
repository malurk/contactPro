//importing modules 

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');  
var cors = require('cors');  
var path = require('path');

var app = express();
const route = require ('./routes/route');



//MongoDB Connection 

mongoose.connect('mongodb://localhost:27017/contacts');
mongoose.connection.on('connected', function (){
    console.log('Successfully connected to MongoDB Database');
});

mongoose.connection.on('error',function(err){
    if(err){
        console.log('Error in Database Connection - ' + err);
    }
});


//port number 
const port = 3000;


app.use(cors());
app.use(bodyparser.json());

//static file

app.use(express.static(path.join(__dirname,'public')));


app.use('/api',route);






app.listen(port, function(){
    console.log("Server started on port: " + port);
});


module.exports = app;