import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { Link } from 'react-router-dom';

function TodoInfo(props) {
  const [todo, setTodo] = useState({}); 

  useEffect(function() { 
    async function getTodo() {
      try {
        const response = await axios.get(`/api/todos/${props.match.params._id}`); 
        setTodo(response.data);      
      } catch(error) {
        console.log('error', error);
      }
    }
    getTodo();    
  }, [props]); 

  async function handleDelete() { 
    try {
      await axios.delete(`/api/todos/${props.match.params._id}`); 
      props.history.push("/todos"); 
    } catch(error) {
      console.error(error);
    }
  }

  return ( 
    <div>
      <h2>{todo.title}</h2>
      <small>_id: {todo._id}</small>
      <p>{todo.content}</p>
      <div className="btn-group">
        <Link to={`/todos/${todo._id}/edit`} className="btn btn-primary">Edit</Link> 
        <button onClick={handleDelete} className="btn btn-danger">Delete</button> 
        <Link to="/todos" className="btn btn-secondary">Close</Link>
      </div>
      <hr/>
    </div>
  );
};

export default TodoInfo;