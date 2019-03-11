const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors  = require('cors')

var Todo = require("./model/Todo");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
mongoose
  .connect("mongodb://localhost:27017/Todo", { useNewUrlParser: true })
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.log(err));

app.get('/api/get_todo',(req,res)=>{
    Todo.find({})
        .then(todo=>{
            console.log(todo)
            if(todo.length>0) return res.status(200).send({"message":"success","todo":todo})
            else return res.status(200).send({"message":"List is empty"})
        }).catch(err=>console.log(err))
})

app.post('/api/post_todo',(req,res)=>{
    // console.log(req.body)
    var todo_obj = {
        name:req.body.name,
        priority:req.body.priority
    }
    console.log(todo_obj)
    var todo = new Todo(todo_obj)
    todo.save()
        .then(save_res=>{
            // console.log(save_res)
            return res.status(200).send({"message":"saved successfully","todo":save_res})
        }).catch(err=>res.status(301).send({"message":"internal server error"}))
})

app.put('/api/update_todo',(req,res)=>{
    var id = req.body.id
    Todo.findByIdAndUpdate(id,{$set:{name:req.body.name,priority:req.body.priority,completed:req.body.completed}})
        .then(update_res=>{
            if(update_res){
                return res.status(200).send({"message":"successfully updated"})
            }
            else return res.status(201).send({"message":"No todo found"})
        }).catch(err=>res.send({"message":"internal server error"}))
})
app.listen(5000, () => console.log("server is up"));
