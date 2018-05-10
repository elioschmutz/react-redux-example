var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

// App Code

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const TOGGLE_GOAL = 'TOGGLE_GOAL';

function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction(id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

function toggleGoalAction(id) {
    return {
        type: TOGGLE_GOAL,
        id
    }
}

// Reducer-Function
//
// Needs to be pure:
// - Return the same result if the same arguments are passed in
// - Depend solely on the arguments passed into them
// - Do not produce side effects
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat(action.todo);
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map(todo => todo.id !== action.id ? todo :
                Object.assign({}, todo, { 'complete': !todo.complete }))
        default:
            return state
    }
}

function goals(state = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat(action.goal);
        case REMOVE_GOAL:
            return state.filter(goal => goal.id !== action.id)
        case TOGGLE_GOAL:
            return state.map(goal => goal.id !== action.id ? goal :
                Object.assign({}, goal, { 'complete': !goal.complete }))
        default:
            return state
    }
}

const checker = store => next => action => {

    if (
        (
            action.type == ADD_TODO &&
            action.todo.title.toLowerCase().includes('bitcoin')
        ) ||
        (
            action.type == ADD_GOAL &&
            action.goal.title.toLowerCase().includes('bitcoin')
        )
       )
    {
        return alert("No, it's a bad idea");
    }

    next(action);
}

const logger = store => next => action => {
    console.group(action.type);
        console.log("The action is:", action)
        const result = next(action)
        console.log("The new state is", store.getState())
        return result
    console.groupEnd()
}

const store = Redux.createStore(
    Redux.combineReducers({todos, goals}),
    Redux.applyMiddleware(checker, logger));
