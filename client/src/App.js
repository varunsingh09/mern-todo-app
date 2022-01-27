import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import TodoList from './components/todos/TodoList';
import TodoInfo from './components/todos/TodoInfo';
import TodoAdd from './components/todos/TodoAdd';
import TodoEdit from './components/todos/TodoEdit';

function App() {
  return (
    <div className="App">     
      <Router>
        <Navigation />
        <div className="container">
          <Main />
        </div>
      </Router>
    </div>
  );
}

function Navigation() {
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className='container'>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink></li>
          <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/todos">Todos</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

function Main() {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/todos" component={TodoList} />
      <Route exact path="/todos/new" component={TodoAdd} />
      <Route exact path="/todos/:_id" component={TodoInfo} />
      <Route exact path="/todos/:_id/edit" component={TodoEdit} />
    </Switch>
  );
}

export default App;
