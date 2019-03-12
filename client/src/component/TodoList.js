import React from "react";
import { connect } from "react-redux";
import {setInitialTodo,updateTodo} from '../actions/index'
class TodoList extends React.Component {

  handleDelete = e=>{
    e.preventDefault()
  }

  handleUpdate = obj =>{
    console.log(obj)
    var completed = true
    this.props.updateTodo(obj._id,obj.name,completed,obj.priority)
  }
  componentDidMount(){
    this.props.setInitialTodo()
  }
  render() {
    console.log(this.props.todos)
      var todos=[]
  if(this.props.todos){
      todos=this.props.todos
  }
  else todos=[]
    return (
      <div>
        {     todos.map((todo)=>{
                    return <li key={todo._id} >{todo.name}
                    {todo.priority}
                    {todo.completed?"true":"false"}
                    <i className="fas fa-trash-alt" onClick={e=>this.handleDelete(todo._id)}></i>
                    <i className="fas fa-check-circle" onClick={e=>this.handleUpdate(todo)}></i>
                    </li>
                })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state
  };
}

export default connect(
  mapStateToProps,
  {setInitialTodo,updateTodo}
)(TodoList);
