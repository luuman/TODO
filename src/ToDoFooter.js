import React from 'react';

class ToDoFooter extends React.Component {
	constructor(){
	  super();
	  this.state = {
	  	isAllChecked: false
	  };
	}
	handleSelectAll(event){
		this.props.changeTodoState(null,event.target.checked,true);
		this.setState({
			isAllChecked: event.target.checked
		})
	}
	handleDeleteDone(){
		this.props.clearDone();
	}
	render(){
		if(this.props.todos.length === 0){
			return <div></div>
		}else{
			let className = !this.state.isAllChecked ? 'todo-footer' : 'todo-footer task-done';
			return(
				<div className={className}>
					<label>
						<input type='checkbox' checked={this.props.isAllChecked} onChange={this.handleSelectAll.bind(this)} />
					</label>
					<div className='select'>Select</div>
					<span>
						<span className='text-success'>Finish {this.props.todoDoneCount}</span>
					</span>
					<button className='btn btn-dangers' onClick={this.handleDeleteDone.bind(this)}>Delete</button>
				</div>
			)
		}
	}
}

export default ToDoFooter;