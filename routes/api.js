var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const Profile =require('../models/Profile');
const Team = require('../models/Team');

var MongoClient =require('mongodb').MongoClient;
var url = 'mongodb://localhost/proj-1';
var ObjectId = require('mongodb').ObjectId; 

/*

PROFILES ENDPOINTS


*/
router.get('/profile',(req,res)=>{

  MongoClient.connect(url,(err,db)=>{
    if (err) throw err;
    //Find all documents in the customers collection:
    Profile.find({})
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
    db.close();
  });
});


/*TO DO:NOT WORKING YET*/
router.get('/profile',(req,res)=>{

  MongoClient.connect(url,(err,db)=>{
    let filters = req.body;
    if(req.query.age !=null){
      filters = {
        age:{
          $lte: req.query.age
        }
      };
    }
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
    db.close();
  });
});


router.get('/profile/update',(req,res)=>{
  MongoClient.connect(url,(err,db)=>{
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
  MongoClient.connect(url,(err,db)=>{
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
  MongoClient.connect(url,(err,db)=>{
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
  
  MongoClient.connect(url,(err,db)=>{
    //Find all documents in the customers collection:
    var dbo = db.db("proj-1");
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

module.exports = router;
