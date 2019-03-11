import {ADD_TODO,UPDATE_TODO} from '../constant'

export const addTodo = (name)=>{
    const action = {
        type:ADD_TODO,
        name
    }
    console.log('addTodo is called...')
    return action
}