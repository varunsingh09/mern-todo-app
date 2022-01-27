import React, { useState, useEffect } from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';

function TodoList() {
  const [todos, setTodos] = useState([])

  useEffect(function() {
    async function getTodos() {
      try {
        const response = await axios.get("/api/todos");
        setTodos(response.data);
      } catch(error) {
        console.log('error', error);
      }
    }        
    getTodos();
  }, []);

  return (
    <div>
      <h2>
        Todos
        <Link to="/todos/new" className="btn btn-primary float-right">Create Todo</Link> 
      </h2>
      <hr/>
      {todos.map((todo) => {
        return(
          <div key={todo._id}>
            <h4><Link to={`/todos/${todo._id}`}>{todo.title}</Link></h4>
            <small>_id: {todo._id}</small>
            <hr/>
          </div>
        )     
      })}
    </div>
  )
}

export default TodoList;