import React from "react";
import { connect } from "react-redux";
class TodoList extends React.Component {
  render() {
      var todos
  if(this.props.todos){
      todos=this.props.todos
  }
  else todos=[]
    return (
      <div>
        {     todos.map((todo,idx)=>{
                    return <li key={idx}>{todo}</li>
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
  null
)(TodoList);
