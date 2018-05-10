import API from 'goals-todos-api';
export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';
export const TOGGLE_GOAL = 'TOGGLE_GOAL';

function addGoal(goal) {
  return {
    type: ADD_GOAL,
    goal
  };
}

function removeGoal(id) {
  return {
    type: REMOVE_GOAL,
    id
  };
}

export function handleAddGoal(name) {
  return dispatch => {
    return API.saveGoal(name).then((goal) => {
      dispatch(addGoal(goal));
    }).catch(() => {
      alert("Something went wrong.");
    });
  };
}

export function handleRemoveGoal(goal) {
  return (dispatch) => {
    dispatch(removeGoal(goal.id));
    return API.deleteGoal(goal.id)
      .catch(() => {
        dispatch(addGoal(goal));
      });
  };
}

