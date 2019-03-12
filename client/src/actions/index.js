import { ADD_TODO, UPDATE_TODO } from "../constant";
import axios from "axios";

export const addTodo = name => {
  return dispatch => {
    axios
      .post("http://localhost:5000/api/post_todo", { name: name })
      .then(res => {
        if (res.status === 200) {
          dispatch(addTodoSuccess(res.data.todo));
        }
        else if(res.status===301){
          console.log(res.data.message)
        }
      }).catch(err=>console.log(err));
  };
};

const addTodoSuccess = name => {
  const action = {
    type: ADD_TODO,
    name
  };
  console.log("addTodo is called...");
  return action;
};

export const setInitialTodo = () => {
  return dispatch => {
    axios.get("http://localhost:5000/api/get_todo").then(res => {
      if (res.status === 200) {
        console.log(res.data);
        res.data.todo.map(item => {
          dispatch(setInitialTodoSuccess(item));
        });
      }
    }).catch(err=>console.log(err));
  };
};

const setInitialTodoSuccess = name => {
  const action = {
    type: ADD_TODO,
    name
  };
  return action;
};

export const updateTodo = (id,name,completed,priority)=>{
  return dispatch =>{
    axios.put("http://localhost:5000/api/update_todo",{
      id,
      name,
      completed,
      priority
    }).then(res=>{
      if(res.status===200)
      {
       dispatch(updateTodoState(id,name,completed,priority))
      }
    })
  }
}

const updateTodoState = (id,name,completed,priority) =>{
  const action = {
    type:UPDATE_TODO,
    payload:{
      completed,
      priority,
      _id:id,
      name
    }
  }
  return action
}