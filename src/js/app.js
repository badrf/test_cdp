var express = require("express");
var app     = express();
var path    = require("path");


app.get('/',function(req,res){
  res.sendFile( path.resolve('../html/index.html') );
});

app.get('/new_issue',function(req,res){
res.sendFile( path.resolve('../html/new_issue.html') );
});

app.get('/new_project',function(req,res){
  res.sendFile( path.resolve('../html/new_project.html') );
});

app.get('/edit_issue',function(req,res){
  res.sendFile( path.resolve('../html/edit_issue.html') );
});

app.get('/login',function(req,res){
  res.sendFile( path.resolve('../html/login.html') );
});

app.listen(8080);

console.log("Running at Port 8080");
