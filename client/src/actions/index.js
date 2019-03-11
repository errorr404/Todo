import {ADD_TODO,UPDATE_TODO} from '../constant'
import axios from 'axios'

export const addTodo = (name) =>{
    return dispatch =>{
        axios.post('http://localhost:5000/api/post_todo',{name:name}).then(res=>{
            if(res.status===200){
                dispatch(addTodoSuccess(res.data.todo))
            }
        })
    }
}

const addTodoSuccess = (name)=>{
    const action = {
        type:ADD_TODO,
        name
    }
    console.log('addTodo is called...')
    return action
}

export const setInitialTodo = ()=>{
    return dispatch =>{
        axios.get('http://localhost:5000/api/get_todo').then(res=>{
            if(res.status===200){
                console.log(res.data)
                res.data.todo.map(item=>{
                    dispatch(setInitialTodoSuccess(item))
                })
               
            }
        })
    }
  
}

const setInitialTodoSuccess = (name)=>{
    const action = {
        type:ADD_TODO,
        name
    }
    return action
}