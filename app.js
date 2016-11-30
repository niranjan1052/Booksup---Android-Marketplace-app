

var ejs = require('ejs');
var mongojs = require("mongojs");
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(bodyparser());
app.set('view engine', 'ejs');
var serv = require('http').Server(app);
var db = mongojs('mongodb://librarian:timepass@ds113628.mlab.com:13628/webcrowsbooks', ['users','books']);

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/login.html');
});
app.get('/about',function(req, res) {
    res.sendFile(__dirname + '/client/about.html');
});
app.get('/signup',function(req, res) {
    res.sendFile(__dirname + '/client/signup.html');
});
app.get('/gamearea',function(req, res) {
    res.sendFile(__dirname + '/client/gamearea.html');
});
app.get('/spectator',function(req, res) {
    res.sendFile(__dirname + '/client/spectator.html');
});
app.get('/login',function(req, res) {
    res.sendFile(__dirname + '/client/login.html');
});
app.get('/error',function(req, res) {
    res.sendFile(__dirname + '/client/error.html');
});

app.post('/signUpX', function(req, res, next){
  console.log("body!  ",req.body);
  var username = req.body.userName;
  var useremail = req.body.userEmail;
  var userpass = req.body.userPass;

  db.users.find({userName: username}).toArray(function(err, result) {
   if(result.length)
    {
      var foo = {flag: 2};
      res.send(foo);
    }
    else
    {
      db.users.insert({userName: username, userEmail: useremail, userPass: userpass}, function(err, noOfInsertedDocs){
        if (err)
        {
          res.send({flag: 0});
        }
        else
        {
          var foo = {flag: 1};
          res.send(foo);
        }
      });
    }
  });


});

app.post('/loginX', function(req, res, next){
  var userName = req.body.userName;
  var userPass = req.body.userPass;
  console.log("login received ",req.body);
  db.users.find({userName: userName, userPass: userPass}).toArray(function(err, result) {
    if(err)
    {
      var foo = {flag: 0};
      res.send(foo);
    }
    else if(result.length)
    {
      var foo = {flag: 1};
      res.send(foo);
    }
    else
    {
        var foo = {flag: 0};
        res.send(foo);
    }
  });
});

app.get('/explore', function(req, res, next) {
  db.books.find({}).sort({postID}).toArray(function(err, result) {
      if(err)
      {
        res.send({flag: 0});
      }
      else if (result.length)
      {
        var foo = {allposts: result.length};
        res.send(foo);
      }
      else
      {
        var foo = {allposts: result};
        res.send(foo);
      }
    });
});



app.use('/client',express.static(__dirname + '/client'));

var portX = process.env.PORT || 2001;
serv.listen(portX);
