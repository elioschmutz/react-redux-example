import { ADD_TODO } from '../actions/todos';
import { ADD_GOAL } from '../actions/goals';


const checker = store => next => action => {
  if ((
    action.type === ADD_TODO &&
    action.todo.name.toLowerCase().includes('bitcoin')) ||
  (
    action.type === ADD_GOAL &&
    action.goal.name.toLowerCase().includes('bitcoin'))
  ) {
    return alert('No, it\'s a bad idea');
  }
  next(action);
};

export default checker
