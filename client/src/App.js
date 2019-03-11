import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './component/TodoList';
import CreateTodo from './component/CreateTodo';
class App extends Component {
  render() {
    return (
      <div className="App">
      <CreateTodo />
      <TodoList />
      </div>
    );
  }
}

export default App;
