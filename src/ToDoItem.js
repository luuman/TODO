import React from 'react';
import ReactDOM from 'react-dom';

class TodoItem extends React.Component{
	handleChange(){
		let isDone = !this.props.isDone;
		this.props.changeTodoState(this.props.index, isDone);
	}
	handleMouseOver(){
		ReactDOM.findDOMNode(this).style.background = '#313643';
		ReactDOM.findDOMNode(this.refs.delButton).style.marginRight = 0;
	}
	handleMouseOut(){
		ReactDOM.findDOMNode(this).style.background = '';
		ReactDOM.findDOMNode(this.refs.delButton).style.marginRight = '-100px';
	}
	handleDelete(){
		this.props.deleteTodo(this.props.index);
	}
	render(){
		let className = this.props.isDone ? 'task-done' : '';
		return(
			<li className={className} onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
				<label>
					<input type='checkbox' checked={this.props.isDone} onChange={this.handleChange.bind(this)} />
				</label>
				<span>{this.props.text}</span>
				<button ref='delButton' className='btn btn-danger' onClick={this.handleDelete.bind(this)}>Delete</button>
			</li>
		)
	}
}

export default TodoItem;