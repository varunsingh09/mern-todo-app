import React, { useState, useEffect } from "react";
import { get, patch } from 'axios';

function TodoEdit(props) {

  const initialState = { title: '', content: '' }
  const [todo, setTodo] = useState(initialState)

  useEffect(function() {
    async function getTodo() {
      try {
        const response = await get(`/api/todos/${props.match.params._id}`);
        setTodo(response.data);        
      } catch(error) {
        console.log(error);
      }
    }
    getTodo();    
  }, [props]);

  function handleSubmit(event) {
    event.preventDefault();
    async function updateTodo() {
      try {
        await patch(`/api/todos/${todo._id}`, todo);
        props.history.push(`/todos/${todo._id}`);        
      } catch(error) {
        console.log(error);
      }
    }
    updateTodo();
  }

  function handleChange(event) {
    setTodo({...todo, [event.target.name]: event.target.value})
  }

  function handleCancel() {
    props.history.push(`/todos/${todo._id}`);
  }

  return (
    <div>
      <h1>Edit {todo.title}</h1>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={todo.title} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea name="content" rows="5" value={todo.content} onChange={handleChange} className="form-control" />
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default TodoEdit;