import React from 'react';
import { connect } from 'react-redux';
import { handleRemoveGoal, handleAddGoal } from '../actions/goals';
import List from './list';


class Goals extends React.Component {
  removeItem = (goal) => {
    this.props.dispatch(handleRemoveGoal(goal));
  }
  addItem = (e) => {
    e.preventDefault();
    this.props.dispatch(handleAddGoal(this.input.value))
      .then(() => {
        this.input.value = '';
      });
  }
  render() {
    return (
      <div>
        <h2>GOALS</h2>
        <input type="text"
          placeholder="Add a goal"
          ref={(input) => this.input = input}/>
        <button onClick={this.addItem}>Add goal</button>
        <List
          remove={this.removeItem}
          items={this.props.goals}/>
      </div>
    );
  }
}

export default connect((state) => ({
  goals: state.goals
}))(Goals);

