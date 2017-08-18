import React, { Component }  from 'react';

var margin = {'marginTop': '10px'}
var marginBottomZero = {'marginBottom': 0}
var listStyle =  {
        'listStyleType': 'none',
        'lisStylePosition': 'inside',
        'margin': 0,
        'padding': 0 }
var inline = {display: 'inline'}
var marginRight = {'marginRight': '7px'}

class ViewTodo extends Component {
    constructor(props) {
        super(props);

    }

    render(){
        if (!this.props.todosExist) {
            var snippet = <Welcome />
        } else var snippet = <Todo 
                                todoList={this.props.todoList}
                                updateStateOnEdit = {this.props.updateStateOnEdit}
                                updateStateOnSave = {this.props.updateStateOnSave}
                                updateStateOnDelete = {this.props.updateStateOnDelete}
                             />
        return(
          <div className='col-md-8'>
            <div className='panel panel-default'>
                <p style={marginBottomZero} className='panel-heading'>View Todos</p>
                <form>
                    <ul style={listStyle}>
                        {snippet}
                    </ul>
                </form>
            </div>
          </div>
        )
    }
}

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: {
                desc: '',
                priority: '',
                dueDate: ''
            }
        }
        this.updateDescription = this.updateDescription.bind(this);
        this.updatePriority = this.updatePriority.bind(this);
        this.updateDate = this.updateDate.bind(this);
    }

    editTodo(index) {
        this.setState({
            editing: {
                desc: this.props.todoList[index].desc,
                priority: this.props.todoList[index].priority,
                dueDate: this.props.todoList[index].dueDate
            }
        })
        this.props.updateStateOnEdit(index);
    }

    saveTodo(index, listItem) {
        this.setState({
            editing: {
                desc: listItem.desc,
                priority: listItem.priority,
                dueDate: listItem.dueDate
            }
        })
        this.props.updateStateOnSave(index, listItem)
    }

    deleteTodo(index) {
        this.props.updateStateOnDelete(index);
    }

    updateDescription(e) {
        this.setState({
            editing: {
                desc: e.target.value,
                priority: this.state.editing.priority,
                dueDate: this.state.editing.dueDate
            }
        })
    }
    
    updatePriority(e) {
        this.setState({
            editing: {
                priority: e.target.value,
                desc: this.state.editing.desc,
                dueDate: this.state.editing.dueDate
            }
        })
    }

    updateDate(e) {
        this.setState({
            editing: {
                dueDate: e.target.value,
                desc: this.state.editing.desc,
                priority: this.state.editing.priority
            }
        })
    }

    render() {
        var liClasses;
        var optionSelected = '';
        var snip = this.props.todoList.map((element, index, array) => {
            var listItem = {desc: this.state.editing.desc, priority: this.state.editing.priority, dueDate: this.state.editing.dueDate}
            if (this.props.todoList[index].priority == 'High') {
                liClasses = 'form-group panel-body bg-danger';
                optionSelected = 'High';
            } else if (this.props.todoList[index].priority == 'Medium') {
                liClasses = 'form-group panel-body bg-warning'
                optionSelected = 'Medium';
            } else if (this.props.todoList[index].priority == 'Low') {
                liClasses = 'form-group panel-body bg-success'
                optionSelected = 'Low';
            } else liClasses = 'form-group panel-body bg-default'
            
            if(!this.props.todoList[index].editEnabled) {
                return (
                    <li key={index} style={marginBottomZero} className={liClasses}>
                        <label>
                            <input type="checkbox" />{'    ' + this.props.todoList[index].desc}
                        </label>
                        <div className='pull-right form-group' style={inline}>
                            <a style={marginRight} id='edit-link' href='#' onClick={() => this.editTodo(index)}><i className="glyphicon glyphicon-edit"></i></a>
                            <a id='delete-link' href='#' onClick={() => this.deleteTodo(index)}><i className="glyphicon glyphicon-trash"></i></a>  
                        </div>
                    </li>
                )
            } else {
                return (
                    <li key={index} style={marginBottomZero} className={liClasses}>
                        <label>Description</label>
                        <textarea onChange={this.updateDescription} type='text' id='edit-description' defaultValue={this.state.editing.desc} className='form-control'/>
                        <div className='row'>
                            <div style={margin} className='col-md-6'>
                                <label>Due Date</label>
                                <input type='text' onChange={this.updateDate} defaultValue={this.state.editing.dueDate} id='edit-date' className='form-control'/>
                            </div>
                            <div style={margin} className='col-md-6'>
                                <label>Priority</label>
                                <select onChange={this.updatePriority} className='btn-block' defaultValue={optionSelected}>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>
                        <div className='text-right form-group'>
                            <button style={margin} className='btn btn-success' onClick={() => this.saveTodo(index, listItem)}>Save</button>
                        </div>
                    </li>
                )
            }
        })

        return (
            <div>
                {snip}
            </div>
        )
    }
}

class Welcome extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <li className='bg-primary panel-body' style={marginBottomZero}>
                <strong>Welcome to Very Simple Todo App!</strong>      
                <p>Get started now by adding a new todo on the left</p>
            </li>
        )
    }
}

export default ViewTodo;