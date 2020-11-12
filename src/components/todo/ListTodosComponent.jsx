import React, { Component } from "react";
import TodosDataService from "../../api/todo/TodoDataService.js";
import AuthenticationService from "./AuthenticationService.js"
import moment from "moment";

class ListTodosComponent extends Component {
  constructor(props) {
    console.log("constructor")
    super(props);
    this.state = {
      todos: [],
      message: null
    };

    this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    this.updateTodoClicked = this.updateTodoClicked.bind(this);
    this.refreshTodos = this.refreshTodos.bind(this);
    this.addTodoClicked = this.addTodoClicked.bind(this);
  }

  componentWillUnmount() {
    console.log("willunount")
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate")
    console.log(nextProps)
    console.log(nextState)
    return true
  }

  componentDidMount() {
    console.log("componentDiMount")
    this.refreshTodos();
  }

  refreshTodos() {
    let userName = AuthenticationService.getLoggedInUserName()
    TodosDataService.retrieveAllTodos(userName)
      .then(
        response => {
          //console.log(response)
          this.setState({ todos: response.data })
        }
      )

  }

  addTodoClicked(){
    this.props.history.push(`/todos/-1`)
  }

  deleteTodoClicked(id) {
    let username = AuthenticationService.getLoggedInUserName();
    //console.log( id +" "+ username)
    TodosDataService.deleteTodo(username, id)
      .then(
        response => {
          this.setState({ message: `Delete of todo ${id} Successful` })
          this.refreshTodos();
        }
      )
  }

  updateTodoClicked(id) {
    console.log("update " + id)
    this.props.history.push(`/todos/${id}`)
    //todos/${id}
    /*     let username = AuthenticationService.getLoggedInUserName();
        //console.log( id +" "+ username)
        TodosDataService.deleteTodo(username, id)
        .then(
          response => {
            this.setState({message: `Delete of todo ${id} Successful`})
            this.refreshTodos();
          }
        ) */
  }



  render() {
    console.log("render")
    return (
      <div>
        <h1>List Todos</h1>

        {this.state.message !== null && (<div className="alert alert-success">{this.state.message}</div>)}
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Target Date</th>
                <th>Is completed</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo, i) => (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{moment(todo.targetDate.toString()).format("DD.MM.YYYY")}</td>
                  <td>{todo.done.toString()}</td>
                  <td><button className="btn btn-success" onClick={(() => this.updateTodoClicked(todo.id))}>Update</button></td>
                  <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <button className="btn btn-success" onClick= {(()=> this.addTodoClicked())}>Add</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListTodosComponent;
