import React, { Component }  from 'react';

var margin = {'marginTop': '10px'}

class InputPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            selectedOption: ''
        }
        this.updateTextInput = this.updateTextInput.bind(this);
        this.updateSelectedOption = this.updateSelectedOption.bind(this);
    }

    updateTextInput(e) {
        this.setState({
            inputText: e.target.value
        })
    }

    updateSelectedOption(e) {
        this.setState({
            selectedOption: e.target.value
        })
    }

    handleClick() {
        var listItem = {desc: this.state.inputText, priority: this.state.selectedOption, editEnabled: false, dueDate: ''};
        this.setState({
            inputText: ''
        })
        this.props.updateTodoList(listItem, true);
    }

    render(){
        return(
          <div className='col-md-4'>
            <div className='panel panel-default'>
                <p className='panel-heading'>Add new todo</p>
                <div className='panel-body'>
                    <form>
                        <div className='form-group'>
                            <label>I want to...</label>
                            <textarea value={this.state.inputText} onChange={this.updateTextInput} name='todoText' type='text' className='form-control'></textarea>
                            <label style={margin}>How much of a priority is this?</label>
                            <select name='todoPriority' onChange={this.updateSelectedOption} id="prioritySelect" className='btn-block'>
                                <option defaultValue hidden>Select a Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className='panel-footer'>
                    <button onClick={() => this.handleClick()} type='button' className='btn btn-success btn-block'>Add</button>
                </div>
            </div>
          </div>
        )
    }
}

export default InputPanel;