import React from 'react';
import TodoItem from './ToDoItem.js';

class ToDoMain extends React.Component {
	render(){
		if(this.props.todos.length === 0){
			return <div className='todo-empty'>Nothing</div>
		}else{
			return(
				<ul className='todo-main'>
					{
						this.props.todos.map((todo,keys) => {
							return <TodoItem key={keys} text={todo.text} isDone={todo.isDone} index={keys} {...this.props} />
						})
					}
				</ul>
			)
		}
	}
}

export default ToDoMain;