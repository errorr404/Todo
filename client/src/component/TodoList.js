import React from "react";
import { connect } from "react-redux";
import {setInitialTodo} from '../actions/index'
class TodoList extends React.Component {

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
                    return <li key={todo._id}>{todo.name}</li>
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
  {setInitialTodo}
)(TodoList);
