import {ADD_TODO,UPDATE_TODO} from '../constant'

const todo = (action) =>{
    let {name} = action
    return {
        name
    }
}

const todoFunc = (state=[],action) =>{
    let todo = null
    switch(action.type){
        case ADD_TODO:
        todo = [...state,action.name]
        console.log('in add todo reducer')
        return todo
    }
}

export default todoFunc