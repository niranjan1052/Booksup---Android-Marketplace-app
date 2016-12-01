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

app.post('/signUpX', function(req, res, next){
  console.log("body!  ",req.body);
  var username = req.body.userName;
  var useremail = req.body.userEmail;
  var userpass = req.body.userPass;
  var interestedposts = [];
  var noofinterestedposts =0;
  var usercontact = req.body.userContact;

  db.users.find({userName: username}).toArray(function(err, result) {
   if(result.length)
    {
      var foo = {flag: 2};
      res.send(foo);
    }
    else
    {
      db.users.insert({
        userName: username,
        userEmail: useremail,
        userPass: userpass,
        userContact: usercontact,
        interestedPosts: interestedposts,
        noOfInterestedPosts : noofinterestedposts

      }, function(err, noOfInsertedDocs){
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
  db.books.find({}).sort({ title: -1}).toArray(function(err, result) {
      if(err)
      {
        res.send({flag: 0});
      }
      else if (result.length)
      {
        var foo = {allposts: result,
        flag: 1};
        res.send(foo);
      }
      else
      {
        var foo = {allposts: result,
        flag: 0};
        res.send(foo);
      }
    });
});

app.get('/prospectiveBuyers/:postId', function(req, res, next) {
 var PostId = parseInt(req.params.postId);
 db.users.find({interestedPosts: PostId}).toArray(function(err, result) {
   if(err)
   {
     console.log('error')
     res.send({flag: 0});
   }
   else if(result.length)
   {
     console.log('Found some results')
     var foo = {users: result,
     flag: 1}
     res.send(foo);
   }
   else
   {
       console.log('0 results')
       var foo = {users: result,
       flag: 0}
       res.send(foo);
   }
 });
});

app.get('/myinterests/:userName', function(req,res){
  var username = req.params.userName;
 db.books.find({ interestedUsers: username}   ).toArray(function(err,result){
 if(err){
   res.send({flag:0});
 }
 else if(result.length){
   var foo = {
     flag: 1,
     interestedbooks: result

   }
      res.send(foo);
 }
 else {
   res.send({flag: 0});
 }
 });
});

app.get('/userposts/:userName', function(req, res, next) {
 var UserName = req.params.userName;
 db.books.find({userName: UserName}).sort({noOfInterestedUsers: -1}).toArray(function(err, result) {
   if(err)
   {
     console.log('error')
     res.send({flag: 0});
   }
   else if(result.length)
   {
     console.log('Found some results')
     var foo = {userPosts: result,
     flag: 1}
     res.send(foo);
   }
   else
   {
       console.log('0 results')
       var foo = {userPosts: result,
       flag: 0}
       res.send(foo);
   }
 });
});

app.get('/bookdetails/:postId',function(req,res){
    var postId = parseInt(req.params.postId);
    db.books.find({postId : postId }).toArray(function(err,result){
     if(err){
       res.send({flag:0});
     }
     else if ( result.length){
       var foo = { bookdetails : result,
       flag: 1 };
       res.send(foo);
     }
    });
});

app.post('/showinterest' , function(req,res){
  var postId = parseInt(req.body.postId);
  var userName = req.body.userName;
  console.log('user ',req.body,' shown interest in ',postId,' post');
  db.books.update({postId: postId}, {$push: {interestedUsers: userName}, $inc: {noOfInterestedUsers: 1}}, function(err,noUpdated){
if(err){
  res.send({flag:0});
}
else if( noUpdated){
  db.users.update({userName:userName},{$push: {interestedPosts: postId}, $inc: {noOfInterestedPosts:1 }} , function(err,noofUpdated){
  if(err){
    res.send({flag: 2});
  }
  else if(noofUpdated){
    var foo = {flag: 1};
    res.send(foo);
  }

});
}
  });
});

app.post('/deletepost' , function(req,res){
  var postId = parseInt(req.body.postId);
  console.log('to delete ',req.body,' and  ',postId,' post');
  db.books.remove({postId: postid}, function(err, noOfRemovedDocs){
    if (err)
    {
      res.send({flag: 0});
    }
    else
    {
      console.log('deleted from db');
      var foo = {flag: 1};
      res.send(foo);
    }
  });
});


app.post('/addnewbook',function(req,res){
  console.log('Started API');
  var Title = req.body.bookdetails.volumeInfo.title;
  var Author = req.body.bookdetails.volumeInfo.authors;
  var Publisher = req.body.bookdetails.volumeInfo.publisher;
  var PublishedDate = req.body.bookdetails.volumeInfo.publishedDate;
  var Isbn = req.body.bookdetails.volumeInfo.industryIdentifiers[0].identifier;
  var Description = req.body.bookdetails.volumeInfo.description;
  var ImageLinks = req.body.bookdetails.volumeInfo.imageLinks;
  var RetailPrice = req.body.bookdetails.saleInfo.retailPrice;
  var BuyLink = req.body.bookdetails.saleInfo.buyLink;
  var AskingPrice = req.body.askingPrice;
  var UserName = req.body.userName;
  console.log('isbn ', req.body.bookdetails.saleInfo.retailPrice);
  console.log('Initialized Values');
  var InterestedUsers = [];
  var NoOfInterestedUsers = 0;

  var oldPostId = db.books.find().sort({postId:-1}).limit(1).toArray(function(err, oldcounter) {
      var PostId = oldcounter[0].postId + 1;
      db.books.insert({
        postId: PostId,
        title: Title,
        author: Author,
        askingPrice: AskingPrice,
        userName: UserName,
        publisher :Publisher,
        publishedDate :PublishedDate,
        isbn :Isbn,
        description: Description,
        imageLinks: ImageLinks,
        interestedUsers:  InterestedUsers,
        noOfInterestedUsers : NoOfInterestedUsers
    },function(err,numInserted)
      {
        if(err){
          res.send(JSON.stringify({flag: 0}));
        }
        else{
          console.log('Inserted in db');
          res.send(JSON.stringify({flag: 1}));
        }
      });
    });
})

app.use('/client',express.static(__dirname + '/client'));

var portX = process.env.PORT || 2001;
serv.listen(portX);
