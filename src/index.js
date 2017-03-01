import React from 'react';
import ReactDOM from 'react-dom';
import LocalDb from 'localDb';
import ToDoHeader from './ToDoHeader';
import ToDoMain from './ToDoMain';
import ToDoFooter from './ToDoFooter';
import './index.css';
const mountNode = document.getElementById('app');

class App extends React.Component{
	constructor(){
		super();
		this.db = new LocalDb('RToDo');
		this.state = {
			todos: this.db.get('todos') || [],
			isAllChecked: false
		}
		console.log(this.state)
	}
	allChecked(){
		let isAllChecked = false;
		if(this.state.todos.every(todo => todo.isDone)){
			isAllChecked = true;
		}
		this.setState({
			todos: this.state.todos,
			isAllChecked:  isAllChecked
		})
		console.log(this.state)
	}
	addTodo(todoItem){
		console.log('addTodo')
		this.state.todos.push(todoItem);
		this.setState({
			todos: this.state.todos
		})
		this.db.set('todos',this.state.todos)
	}
	deleteTodo(index){
		this.state.todos.splice(index,1);
		this.setState({
			todos: this.state.todos
		})
		this.db.set('todos',this.state.todos)
	}
	clearDone(){
		let todos = this.state.todos.filter(todo => !todo.isDone)
		this.setState({
			todos: todos,
			isAllChecked: false
		})
		this.db.set('todos',todos)
	}
	changeTodoState(index,isDone,isChangeAll = false){
		if(isChangeAll){
			this.setState({
				todos: this.state.todos.map((todo) => {
					todo.isDone = isDone;
					return todo;
				}),
				isAllChecked: isDone
			})
		}else{
			this.state.todos[index].isDone = isDone;
			this.allChecked();
		}
		this.db.set('todos',this.state.todos);
	}
	render(){
		let info = {
			isAllChecked: this.state.isAllChecked,
			todoCount: this.state.todos.length || 0,
			todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
		}
		return(
			<div>
				<header><h1 className="todo-title">React 清单</h1></header>
				<div className='app'>
					<ToDoHeader addTodo={this.addTodo.bind(this)} />
					<ToDoMain todos={this.state.todos} deleteTodo={this.deleteTodo.bind(this)} changeTodoState={this.changeTodoState.bind(this)} />
					<ToDoFooter todos={this.state.todos} {...info} changeTodoState={this.changeTodoState.bind(this)} clearDone={this.clearDone.bind(this)} />
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App />,mountNode);