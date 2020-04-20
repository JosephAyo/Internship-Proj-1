var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const Profile =require('../models/Profile');
const Team = require('../models/Team');

<<<<<<< HEAD
<<<<<<< HEAD

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://josephayo:ND5xr-wGptQARHw@proj-1-ys6nl.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

=======
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://josephayo:rKxnool2hnH4lr7f@proj-1-ys6nl.mongodb.net/test?retryWrites=true&w=majority');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://josephayo:rKxnool2hnH4lr7f@proj-1-ys6nl.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
>>>>>>> 7b8a53407987e23ca77e17202a7c86153672ac26
||||||| merged common ancestors
var MongoClient =require('mongodb').MongoClient;
=======
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://josephayo:rKxnool2hnH4lr7f@proj-1-ys6nl.mongodb.net/test?retryWrites=true&w=majority');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://josephayo:rKxnool2hnH4lr7f@proj-1-ys6nl.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
>>>>>>> 3e35cb2ab67d97c358fcf5b7e75c2392268cfe7a
var url = 'mongodb://localhost/proj-1';

/*

PROFILES ENDPOINTS


*/
router.get('/profile',(req,res)=>{

  MongoClient.connect(uri,(err,db)=>{
    //Find all documents in the customers collection:
    const query = req.query;
    var filters= req.query;
    if(req.query.age !=null){
      filters = {age: {$lte: req.query.age}};
      Profile.find(filters)
    .then(function(result) {
      res.json({
        confirmation: 'success',
        data: result
      });
    })
    .catch(function(err){
      res.json({
        confirmation: 'failed',
        message: (`this error occurred: ${err.message}`)
      });
    });
    }else{
      Profile.find(query)
      .then(function(result) {
        res.json({
          confirmation: 'success',
          data: result
        });
      })
      .catch(function(err){
        res.json({
          confirmation: 'failed',
          message: (`this error occurred: ${err.message}`)
        });
      });
    }
    db.close();
  });
});



router.get('/profile/update',(req,res)=>{
  MongoClient.connect(uri,(err,db)=>{
    const query = req.query;
    const profileId = query.id;
    delete query.id;
    Profile.findByIdAndUpdate(profileId,query,{new:true})
    .then((result)=>{
      res.json({
        confirmation: 'success',
        data: result
      });
    })
    .catch(err=>{
      res.json({
        confirmation: 'failed',
        message: (`this error occurred: ${err.message}`)
      });
    });
      db.close();   
  });
});

router.get('/profile/delete',(req,res)=>{
  MongoClient.connect(uri,(err,db)=>{
    const query = req.query;
    const profileId = query.id;
    delete query.id;
    Profile.findByIdAndDelete(profileId)
    .then((result)=>{
      res.json({
        confirmation: 'success',
        data: `${result} has been deleted`
      });
    })
    .catch(err=>{
      res.json({
        confirmation: 'failed',
        message: (`this error occurred: ${err.message}`)
      });
    });
      db.close();   
  });
});

router.get('/profile/:id',(req,res)=>{
  MongoClient.connect(uri,(err,db)=>{
    if(err) throw err;
    const id = req.params.id;
    Profile.findById(id)
    .then(function(result){
      res.json({
        confirmation: 'success',
        data: result
      });
    })
    .catch(err=>{
      res.json({
        confirmation: 'failed',
        message: (`this error occurred: ${err.message}`)
      });
    });   
  });
});


//create a new profile and post to database
router.post('/profile',(req,res)=>{
  
  MongoClient.connect(uri,(err,db)=>{
    //Find all documents in the customers collection:
    var myobj = req.body;
    Profile.create(myobj)
    .then(result=>{
      res.json({
      confirmation:'success',
      message: (`data:${result} added successfully`)
      });
    })
    .catch(err=>{
      res.json({
        confirmation: 'failed',
        message: (`this error occurred: ${err.message}`)
      });
    });
      db.close();
    });
});


/*

TEAMS ENDPOINTS

*/
router.get('/team',(req,res)=>{

  MongoClient.connect(uri,(err,db)=>{
    const query2 = req.query;
    var filters2= req.query;
    if(req.query.NBAtitles !=null){
      filters2 = {NBAtitles: {$gte: req.query.NBAtitles}};
      Team.find(filters2)
      .then(function(result) {
        res.json({
          confirmation: 'success',
          data: result
      });
    })
    .catch(function(err){
      res.json({
        confirmation: 'failed',
        message: (`this error occurred: ${err.message}`)
      });
    });
    }else{
      Team.find(query2)
      .then(function(result) {
        res.json({
          confirmation: 'success',
          data: result
        });
      })
      .catch(function(err){
        res.json({
          confirmation: 'failed',
          message: (`this error occurred: ${err.message}`)
        });
      });
    }
    db.close();
  });
});


router.get('/team/update',(req,res)=>{
  MongoClient.connect(uri,(err,db)=>{
    const query = req.query;
    const teamId = query.id;
    delete query.id;
    Team.findByIdAndUpdate(teamId,query,{new:true})
    .then((result)=>{
      res.json({
        confirmation: 'success',
        data: result
      });
    })
    .catch(err=>{
      res.json({
        confirmation: 'failed',
        message: (`this error occurred: ${err.message}`)
      });
    });
      db.close();   
  });
});

router.get('/team/delete',(req,res)=>{
  MongoClient.connect(uri,(err,db)=>{
    const query = req.query;
    const teamId = query.id;
    delete query.id;
    Team.findByIdAndDelete(teamId)
    .then((result)=>{
      res.json({
        confirmation: 'success',
        data: `${result} has been deleted`
      });
    })
    .catch(err=>{
      res.json({
        confirmation: 'failed',
        message: (`this error occurred: ${err.message}`)
      });
    });
      db.close();   
  });
});

router.get('/team/:id',(req,res)=>{
  MongoClient.connect(uri,(err,db)=>{
    if(err) throw err;
    const id = req.params.id;
    Team.findById(id)
    .then(function(result){
      res.json({
        confirmation: 'success',
        data: result
      });
    })
    .catch(err=>{
      res.json({
        confirmation: 'failed',
        message: (`this error occurred: ${err.message}`)
      });
    });   
  });
});


//create a new team and post to database
router.post('/team',(req,res)=>{
  
  MongoClient.connect(uri,(err,db)=>{
    //Find all documents in the customers collection:
    var myobj = req.body;
    Team.create(myobj)
    .then(result=>{
      res.json({
      confirmation:'success',
      message: (`data:${result} added successfully`)
      });
    })
    .catch(err=>{
      res.json({
        confirmation: 'failed',
        message: (`this error occurred: ${err.message}`)
      });
    });
      db.close();
    });
});


module.exports = router;
