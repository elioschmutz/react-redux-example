import React from 'react';
import { connect } from 'react-redux';
import { handleRemoveTodo, handleToggleTodo, handleAddTodo } from '../actions/todos';
import List from './list';

class Todos extends React.Component {
  removeItem = (todo) => {
    this.props.dispatch(handleRemoveTodo(todo));
  }
  toggleItem = (id) => {
    this.props.dispatch(handleToggleTodo(id));
  }
  addItem = (e) => {
    e.preventDefault();
    this.props.dispatch(handleAddTodo(this.input.value))
      .then(() => {
        this.input.value = '';
      });
  }
  render() {
    return (
      <div>
        <h2>TODOS</h2>
        <input type="text"
          placeholder="Add a todo"
          ref={(input) => this.input = input}/>
        <button onClick={this.addItem}>Add todo</button>
        <List
          toggle={this.toggleItem}
          remove={this.removeItem}
          items={this.props.todos}/>
      </div>
    );
  }
}

export default connect((state) => ({
  todos: state.todos
}))(Todos);
