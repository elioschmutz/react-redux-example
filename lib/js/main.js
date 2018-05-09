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

const store = Redux.createStore(Redux.combineReducers({todos, goals}));
store.subscribe(() => {
    const { todos, goals } = store.getState();

    document.getElementById('todos').innerHTML = ''
    document.getElementById('goals').innerHTML = ''

    todos.forEach(addTodoToDom)
    goals.forEach(addGoalToDom)
});

const addTodo = () => {
    const input = document.getElementById('todo');
    const title = input.value;

    store.dispatch(addTodoAction({
        id: ID(),
        complete: false,
        title: title
    }));

    input.value = '';
}

const addGoal = () => {
    const input = document.getElementById('goal');
    const title = input.value;

    store.dispatch(addGoalAction({
        id: ID(),
        complete: false,
        title: title
    }));

    input.value = '';
}

const createDeleteBtn = (onClick) => {
    const btn = document.createElement('button')
    const text = document.createTextNode('x')
    btn.appendChild(text)

    btn.addEventListener('click', onClick)

    return btn
}

const addTodoToDom = (todo) => {
    const node = document.createElement('li');
    const text = document.createTextNode(todo.title);
    node.appendChild(text);
    node.className = todo.complete ? 'complete' : ''
    node.addEventListener('click', () => store.dispatch(toggleTodoAction(todo.id)));
    node.appendChild(createDeleteBtn(() => {
        store.dispatch(removeTodoAction(todo.id))
    }))

    document.getElementById('todos').append(node);
}

const addGoalToDom = (goal) => {
    const node = document.createElement('li');
    const text = document.createTextNode(goal.title);
    node.appendChild(text);
    node.className = goal.complete ? 'complete' : ''
    node.addEventListener('click', () => store.dispatch(toggleGoalAction(goal.id)));
    node.appendChild(createDeleteBtn(() => {
        store.dispatch(removeGoalAction(goal.id))
    }))

    document.getElementById('goals').append(node);
}

window.addEventListener('load', () => {
    document.getElementById('todoBtn').addEventListener('click', addTodo);
    document.getElementById('goalBtn').addEventListener('click', addGoal);

})
