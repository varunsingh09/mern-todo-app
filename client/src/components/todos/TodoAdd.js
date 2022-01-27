import React, { useState } from "react"; 
import { post } from 'axios'; 

function TodoAdd(props) {
  const initialState = { title: '', content: '' }
  const [todo, setTodo] = useState(initialState) 

  function handleChange(event) { 
    setTodo({...todo, [event.target.name]: event.target.value})
  }

  function handleSubmit(event) { 
    event.preventDefault();     
    if(!todo.title || !todo.content ) return 
    async function postTodo() {
      try {
        const response = await post('/api/todos', todo); 
        props.history.push(`/todos/${response.data._id}`);  
      } catch(error) {
        console.log('error', error);
      }
    }
    postTodo();
  }

  function handleCancel() {
    props.history.push("/todos");
  }

  return ( 
    <div>
      <h1>Create Todo</h1>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input name="title" type="text" value={todo.title} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea name="content" rows="5" value={todo.content} onChange={handleChange} className="form-control" />
        </div>
        <div className="btn-group">
          <input type="submit" value="Submit" className="btn btn-primary" />
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default TodoAdd;