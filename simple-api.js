//console.log('Welcome to this class.');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser());

app.listen(3000, function() {
    console.log('server started');
});

app.get('/', function(req, resp){
    resp.send('Hello');
});

var students=[];

app.get('/students', function(req, resp){
    resp.send(students);
});

app.post('/students', function(req, resp){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var data = {
        firstName:firstName,
        lastName:lastName
    }
    /*students.push({
        firstName:firstName,
        lastName:lastName
    });*/
    students.push(data);

    resp.send(data);
});
