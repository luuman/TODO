import React from 'react';

class ToDoHeader extends React.Component {
	handleKeyUp(e){
		let unicode = e.which || e.keyCode;
		if(unicode === 13){
			let value = e.target.value;
			if(!value) return false;
			let newTodoItem = {
				text: value,
				isDone: false
			}
			e.target.value = '';
			this.props.addTodo(newTodoItem);
		}
	}
	render(){
		return(
			<div className='todo-header'>
				<input type='text' onKeyUp={this.handleKeyUp.bind(this)} placeholder='What are you going to do?' />
			</div>
		)
	}
}

export default ToDoHeader;