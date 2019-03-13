import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "react-responsive-modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

import { setInitialTodo, updateTodo, deleteTodo } from "../actions/index";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      showEditName: false,
      showEditPriority: false,
      openName: false,
      openPriority: false,
      currentId: "",
      currentName: "",
      currentPriority: "",
      currentCompleted: ""
    };
  }

  handleModalName = (id, name, priority, completed) => {
    this.setState({
      currentId: id,
      currentName: name,
      openName: true,
      currentPriority: priority,
      currentCompleted: completed
    });
  };

  handleModalPriority = (id, priority, name, completed) => {
    this.setState({
      currentId: id,
      currentPriority: priority,
      openPriority: true,
      currentName: name,
      currentCompleted: completed
    });
  };

  handleDelete = id => {
    this.props.deleteTodo(id);
  };

  handleUpdateTask = e => {
    e.preventDefault();
    console.log("in handle task...");
    console.log(
      this.state.currentId,
      this.state.currentName,
      this.state.currentPriority,
      this.state.currentCompleted
    );
    this.props.updateTodo(
      this.state.currentId,
      this.state.currentName,
      this.state.currentCompleted,
      this.state.currentPriority
    );
    this.setState({
      currentId: "",
      currentName: "",
      currentPriority: "",
      openName: false
    });
  };
  handleUpdatePriority = e => {
    this.props.updateTodo(
      this.state.currentId,
      this.state.currentName,
      this.state.currentCompleted,
      this.state.currentPriority
    );
    this.setState({
      currentId: "",
      currentName: "",
      currentPriority: "",
      openPriority: false
    });
  };
  handleUpdate = obj => {
    console.log(obj);
    var completed = !obj.completed;
    this.props.updateTodo(obj._id, obj.name, completed, obj.priority);
  };
  componentDidMount() {
    this.props.setInitialTodo();
  }
  render() {
    console.log(this.state);
    // console.log(this.props.todos);
    var todos = [];
    if (this.props.todos) {
      todos = this.props.todos;
    } else todos = [];
    return (
      <Paper>
        <Modal
          open={this.state.openName}
          onClose={e =>
            this.setState({ openName: false, currentId: "", currentName: "" })
          }
          closeOnEsc={e =>
            this.setState({
              openPriority: false,
              currentId: "",
              currentName: ""
            })
          }
          center
        >
          <h2>Edit the task</h2>
          <form onSubmit={this.handleUpdateTask}>
            <FormControl variant="outlined">
              <TextField
                id="outlined-name"
                label="Task Name"
                value={this.state.currentName}
                onChange={e => this.setState({ currentName: e.target.value })}
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleUpdateTask}
              >
                {" "}
                Add the task
              </Button>
            </FormControl>
          </form>
        </Modal>
        <Modal
          open={this.state.openPriority}
          onClose={e =>
            this.setState({
              openPriority: false,
              currentId: "",
              currentPriority: ""
            })
          }
          closeOnEsc={e =>
            this.setState({
              openPriority: false,
              currentId: "",
              currentPriority: ""
            })
          }
          center
        >
          <h2>Change the Priority</h2>
          <form onSubmit={this.handleUpdatePriority}>
            <FormControl variant="outlined">
              <TextField
                id="outlined-name"
                label="Priority"
                value={this.state.currentPriority}
                onChange={e =>
                  this.setState({ currentPriority: e.target.value })
                }
                margin="normal"
                variant="outlined"
              />
              <p>Eg:-High,Low,Medium</p>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleUpdatePriority}
              >
                {" "}
                Add the task
              </Button>
            </FormControl>
          </form>
        </Modal>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>Task Name</CustomTableCell>
              <CustomTableCell align="right">Priority</CustomTableCell>
              <CustomTableCell align="right">Status</CustomTableCell>
              <CustomTableCell align="right">Change Status</CustomTableCell>
              <CustomTableCell align="right">Delete</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map(todo => (
              <TableRow key={todo._id}>
                <CustomTableCell
                  component="th"
                  scope="row"
                  onMouseOver={e => this.setState({ showEditName: true })}
                  onMouseLeave={e => this.setState({ showEditName: false })}
                >
                  {todo.name}
                  {this.state.showEditName ? (
                    <i
                      className="fas fa-edit"
                      style={{ cursor: "pointer" }}
                      onClick={e =>
                        this.handleModalName(
                          todo._id,
                          todo.name,
                          todo.priority,
                          todo.completed
                        )
                      }
                    />
                  ) : (
                    ""
                  )}
                </CustomTableCell>
                <CustomTableCell
                  align="right"
                  onMouseOver={e => this.setState({ showEditPriority: true })}
                  onMouseLeave={e => this.setState({ showEditPriority: false })}
                >
                  {todo.priority}
                  {this.state.showEditPriority ? (
                    <i
                      className="fas fa-edit"
                      style={{ cursor: "pointer" }}
                      onClick={e =>
                        this.handleModalPriority(
                          todo._id,
                          todo.priority,
                          todo.name,
                          todo.completed
                        )
                      }
                    />
                  ) : (
                    ""
                  )}
                </CustomTableCell>
                <CustomTableCell align="right">
                  {todo.completed === true ? "Completed" : "Pending"}
                </CustomTableCell>
                {todo.completed === true ? (
                  <CustomTableCell align="right">
                    <i
                      style={{ cursor: "pointer" }}
                      className="fas fa-check-circle"
                      onClick={e => this.handleUpdate(todo)}
                    />
                  </CustomTableCell>
                ) : (
                  <CustomTableCell align="right">
                    <i
                      style={{ cursor: "pointer" }}
                      className="far fa-check-circle"
                      onClick={e => this.handleUpdate(todo)}
                    />
                  </CustomTableCell>
                )}
                <CustomTableCell align="right">
                  <i
                    style={{ cursor: "pointer" }}
                    className="fas fa-trash-alt"
                    onClick={e => this.handleDelete(todo._id)}
                  />
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
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
  { setInitialTodo, updateTodo, deleteTodo }
)(TodoList);
