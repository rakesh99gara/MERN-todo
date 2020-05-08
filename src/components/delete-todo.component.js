import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class DeleteTodo extends Component {
  constructor(props) {
    super(props);

    this.deleteme = this.deleteme.bind(this);
    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
    };
  }

  // this.props.history.push("/");componentDidMount() {
  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          todo_description: response.data.todo_description,
          todo_responsible: response.data.todo_responsible,
          todo_priority: response.data.todo_priority,
          todo_completed: response.data.todo_completed,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidUpdate() {
    axios
      .get("http://localhost:4000/todos/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          todo_description: response.data.todo_description,
          todo_responsible: response.data.todo_responsible,
          todo_priority: response.data.todo_priority,
          todo_completed: response.data.todo_completed,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteme(e) {
    const obj = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed,
    };
    axios
      .delete(
        "http://localhost:4000/todos/delete/" + this.props.match.params.id,
        obj
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h3 align="center">Delete Todo</h3>
        <h6>Description :: {this.state.todo_description}</h6>
        <h6>Responsible :: {this.state.todo_responsible}</h6>
        <h6>Priority :: {this.state.todo_priority}</h6>
        <h6>Completed :: {this.state.todo_completed}</h6>
        <button type="button" class="btn btn-success" onClick={this.deleteme}>
          Yes
        </button>
        <button type="button" class="btn btn-danger">
          No
        </button>
      </div>
    );
  }
}
