import React, { Component } from 'react';
import InputPanel from './InputPanel';
import ViewTodo from './ViewTodo';

var headerStyle = {color: 'white'}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todosExist: false,
      todos: []
    }
    this.updateTodoList = this.updateTodoList.bind(this);
    this.updateStateOnEdit = this.updateStateOnEdit.bind(this);
    this.updateStateOnSave = this.updateStateOnSave.bind(this);
    this.updateStateOnDelete = this.updateStateOnDelete.bind(this);
  }

  updateTodoList(listItem, exist) {
    var arr = this.state.todos.slice();
    arr.push(listItem);
    this.setState({
      todos: arr,
      todosExist: exist
    })
  }

  updateStateOnEdit(index) {
    var arr = this.state.todos.slice();
    arr[index].editEnabled = true;
    this.setState({
      todos: arr
    })
  }

  updateStateOnSave(index, listItem) {
    var arr = this.state.todos.slice();
    arr[index].editEnabled = false;
    arr[index].desc = listItem.desc;
    arr[index].priority = listItem.priority;
    arr[index].dueDate = listItem.dueDate;
    this.setState({
      todos: arr
    })
  }

  updateStateOnDelete(index) {
    var arr = this.state.todos.slice();
    var spliced = arr.splice(index, 1);
    console.log(arr, spliced);
    this.setState({
      todos: arr
    })
  }

  render() {
    return (
      <div className='container app'>
          <div className='header' style={headerStyle}>
            <h1>Very Simple Todo App</h1>
            <p>Track all of the things</p>
          </div>
          <hr/>
          <div className='row'>
            <InputPanel
                updateTodoList = {this.updateTodoList}
            />
            <ViewTodo
                todosExist = {this.state.todosExist}
                todoList = {this.state.todos}
                updateStateOnEdit = {this.updateStateOnEdit}
                updateStateOnSave = {this.updateStateOnSave}
                updateStateOnDelete = {this.updateStateOnDelete}
            />
          </div>
      </div>
    );
  }
}

export default App;
