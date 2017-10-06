//console.log('Welcome to this class.');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var _ = require('lodash.sortby');
var _ = require('lodash');

app.use(bodyParser());

app.listen(3000, function() {
    console.log('server started');
});

app.get('/', function(req, resp){
    resp.send('Hello');
});

var students=[];

app.get('/students', function(req, resp){
    let sortBy = req.query.sortBy;
    /* console.log('sortBy: ' + sortBy + ', type: ' + (typeof sortBy));
    let sortArr = JSON.parse(sortBys);
    console.log('sortArr: ' + sortArr + ', type: ' + (typeof sortArr));
    resp.send('received...'); */
    if (sortBy == undefined) 
        resp.send('Missing sortBy in request');
    else {
        let sortedArr = _.sortBy(students, sortBy);
        /* students = students.sort(function(stu1, stu2, sortBy){
            return stu1[sortBy] > stu2[sortBy];
        }) */
        resp.send(sortedArr);
    }
});

app.post('/students', function(req, resp){
    let id = req.body.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    let existing = students.find(rec => rec.id==id);
    if (existing == null) {
        let data = {
            id:id,
            firstName:firstName,
            lastName:lastName
        }
        /*students.push({
            firstName:firstName,
            lastName:lastName
        });*/
        students.push(data);
        resp.send(data);
    } else {
        resp.send('Error: duplicate id #:' + id);
    }

});

app.delete('/students/:id', function(req, resp){
    let id = req.params.id;
    let lengthBefore = students.length;
    students = students.filter(rec => rec.id !== id);
    if (lengthBefore == students.length)
        resp.send("Couldn't find student id #: " + id);
    else 
        resp.send('Done with deleting student whose id # is ' + id);
});