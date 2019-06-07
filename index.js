const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const server = express();
const Schema = mongoose.Schema;
const cors = require('cors');

server.use(express.static('public'));
server.use(cors());

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
server.use(bodyParser.json());   // for JSON data body
server.use(bodyParser.urlencoded({ extended: false }))

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected");
});

const taskSchema = new Schema({
    name:  {type:String},
    flag: {type:Boolean},
    daiet: { type: Date, default: Date.now}  ,
    // styl: {type:String},
    // pin: {type:Object},
    // time: {type: Date}
    // age: { type: Number, default:18, min: 18, max: 65, required :true }  
  });

const Task = mongoose.model('todolists', taskSchema);

//task 2

server.post("/task",function(req,res){
    let task = new Task();

    //console.log(req.body.name);

    task.name = req.body.name;
    task.flag = req.body.flag;
    task.daiet = req.body.daiet;

    task.save();
    console.log(task);
    res.json(task);
    // required = true;

    // let task2 = new Task();

    // task2.title = "task2"
    // task2.status = true;
    // task2.date = "2012-03-22";

    // task2.save();
    // res.json(task2);

    // task.save();
    // res.json(task);

    // let task1 = new Task();

    // task1.status = false;
    // task1.date = "2010-05-30";

    // task1.save();
    // res.json(task1);
    

})

//task 3

server.get("/task",function(req,res){
    Task.find({},function(err,docs){
         //console.log(docs);  // this is an array which contains all task objects
        res.json(docs);
    });
})

//task 4

server.put("/task/:id",function(req,res){
    Task.findOneAndUpdate({_id:req.params.id},{flag:req.body.flag},function(err,docs){
        // console.log(err,docs);  // this will contain db object
        res.json(docs);

    })
//     Task.findOne({_id:req.params.id},function(err,docs){
//         // console.log(docs);  // this is an array which contains all task objects
//         res.json(docs);
//     });
//
 })

//task 5

server.delete("/task/:id",function(req,res){
    Task.findOneAndDelete({_id:req.params.id},function(err,docs){
        // console.log(docs)  // this will contain deleted object object
        res.json(docs);

    });
    // Task.findOne({_id:req.params.id},function(err,docs){
    //     console.log(docs);  // this is an array which contains all task objects
    //     res.json(docs);
    // });
    // Task.findOne({_id:req.params.id},function(err,docs){
    //     res.json(docs);
    // });
})

server.listen(8080,function(){
    console.log("server started")
})