const express = require ('express'); 
const router = express.Router(); 
const Todo = require('../models/todo'); 

router.get('/todos', function(req, res) { 
  Todo.find(function(err, todos) {
    res.json(todos);
  });
});

router.get('/todos/:id', function(req, res) {  
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo) {
      res.status(404).send('No result found');
    } else {
      res.json(todo);
    }
  });
});

router.post('/todos', function(req, res) {     
  let todo = new Todo(req.body);
  todo.save()
    .then(todo => {
      res.send(todo);
    })
    .catch(function(err) {
      res.status(422).send('Todo add failed');
    });
});

router.patch('/todos/:id', function(req, res){    
  Todo.findByIdAndUpdate(req.params.id, req.body)
    .then(function() {
      res.json('Todo updated');
    })
    .catch(function(err) {
      res.status(422).send("Todo update failed.");
    });
});

router.delete('/todos/:id', function(req, res) {  
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo) {
      res.status(404).send('Todo not found');
    } else {
      Todo.findByIdAndRemove(req.params.id)
        .then(function() { res.status(200).json("Todo deleted") })
        .catch(function(err) {
          res.status(400).send("Todo delete failed.");
        })
    }
  });
})

module.exports = router;   