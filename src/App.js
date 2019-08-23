import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <Router>
      <Navigation />

      <div className="container p-4">
        <Route exact path="/" component={TodoList}/>
        <Route path="/edit/:id" component={CreateTodo}/>
        <Route path="/create" component={CreateTodo}/>
        <Route path="/user" component={CreateUser}/>
      </div>
    </Router>  
    
  );
}

export default App;
