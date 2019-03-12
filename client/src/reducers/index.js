import {ADD_TODO,UPDATE_TODO} from '../constant'

const todoFunc = (state=[],action) =>{
    let todo = null
    switch(action.type){
        case ADD_TODO:
        todo = [...state,action.name]
        console.log('in add todo reducer')
        return todo

        case UPDATE_TODO:
        todo = state.filter(item=>item._id!==action.payload._id)
        var newTodo = [...todo,action.payload]
        return newTodo
    }
}

export default todoFunc