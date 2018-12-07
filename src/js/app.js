var express = require("express");
var bodyParser = require('body-parser')
var app = express()
var path = require("path");
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "db",
  user: "root",
  password: "cdproot",
  database: "base1",
  port: 3306
});
con.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


app.get('/', function (req, res) {
  res.render(path.resolve('../ejs/index.ejs'));
});

app.get('/new_issue', function (req, res) {
  res.render(path.resolve('../ejs/new_issue.ejs'));
});

app.get('/new_project', function (req, res) {
  res.render(path.resolve('../ejs/new_project.ejs'));
});

app.get('/edit_issue', function (req, res) {
  res.render(path.resolve('../ejs/edit_issue.ejs'));
});

app.get('/login', function (req, res) {
  res.render(path.resolve('../ejs/login.ejs'));
});

app.get('/register', function (req, res) {
  res.render(path.resolve('../ejs/register.ejs'));
});

app.get('/new_task', function (req, res) {
  res.render(path.resolve('../ejs/new_task.ejs'));
});

app.get('/edit_task', function (req, res) {
  res.render(path.resolve('../ejs/edit_task.ejs'));
});

app.get('/new_sprint', function (req, res) {
  res.render(path.resolve('../ejs/new_sprint.ejs'));
});

app.get('/edit_sprint', function (req, res) {
  res.render(path.resolve('../ejs/edit_sprint.ejs'));
});

app.post('/login', function (req, res) {
  var user = req.body.username;
  var pass = req.body.password;
  //TODO
});

app.post('/register', function (req, res) {
  
  if(req.method == "POST"){
    var name= req.body.username;
    var pass= req.body.password;
    var email= req.body.email;    

    var sql = "INSERT INTO `users`(`username`,`password`,`email`) VALUES ('" + name + "','" + pass + "','" + email + "')";

    var query = con.query(sql, function(err, result) {

        console.log("1 user regisered");
       res.render(path.resolve('../ejs/login.ejs'));
    });

 } else {
    res.redirect('register');
 }
});

app.post('/addissue', function (req, res) {
  var pid = req.body.pid
  var id = req.body.id;
  var description = req.body.description;
  var priority = req.body.priority;
  var difficulty = req.body.difficulty;
  var sprint = req.body.sprint;
  res.render(path.resolve('../ejs/new_issue.ejs'), {
    pid: pid,
    id: id,
    description: description,
    priority: priority,
    difficulty: difficulty,
    sprint: sprint
  });
  var sql = "INSERT INTO issues (id,description,priority,difficulty,projects_id,sprint) VALUES (id,description,priority,difficulty,pid,sprint)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 issue added");
  });
});

app.post('/addproj', function (req, res) {
  var pid = req.body.pid;
  var title = req.body.title;
  var username = req.body.username;
  res.render(path.resolve('../ejs/new_project.ejs'), {
    pid: pid,
    title: title,
    username: username
  });
  var sql = "INSERT INTO projects (id,name,user_id) VALUES (pid,title,username)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 project added");
  });
});

app.post('/addtask', function (req, res) {
  var pid = req.body.pid
  var id = req.body.id;
  var description = req.body.description;
  var component = req.body.component;
  var ressource = req.body.ressource;
  var us = req.body.us;
  var dependency = req.body.dependency;
  var state = req.body.state;
  var dev = req.body.dev;
  var jh = req.body.jh;
  console.log(id + description + component + ressource + us + dependency + state + dev + jh);
  res.render(path.resolve('../ejs/new_task.ejs'), {
    pid: pid,
    id: id,
    description: description,
    component: component,
    ressource: ressource,
    us: us,
    dependency: dependency,
    state: state,
    dev: dev,
    jh: jh
  })
  var sql = "INSERT INTO task (sprint_idsprint, idtask,description,component,ressource,us,dependancy,state,dev,jh) VALUES (pid, id,component,ressource,us,dependancy,state,dev,jh)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 task added");
  });
});

app.post('/addsprint', function (req, res) {
  var pid = req.body.pid;
  var start = req.body.start;
  var end = req.body.end;
  var state = req.body.state;
  var number = req.body.number;
  res.render(path.resolve('../ejs/new_sprint.ejs'), {
    pid: pid,
    start: start,
    end: end,
    state: state,
    number: number
  })
  var sql = "INSERT INTO sprint (idsprint,start,end,state,projects_id) VALUES (number,start,end,state,pid)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 sprint added");
  });
});

app.listen(8080);

console.log("Running at Port 8080");
