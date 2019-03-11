import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
class CreateTodo extends React.Component{
    constructor(){
        super()
        this.state = {
            name:''
        }
    }
    handleAddTodo = (e)=>{
        e.preventDefault()
        this.props.addTodo(this.state.name)
    }
    render(){
        console.log(this.state.name)
        return(
            <div>
                <form onSubmit = {this.handleAddTodo}>
                    <input placeholder="enter the task"  type="text" onChange={e=>this.setState({name:e.target.value})} />
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}


export default connect(null,{addTodo})(CreateTodo)