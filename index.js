// Library Code
function createStore(reducer) {

    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    return {
        getState,
        subscribe,
        dispatch,
    }
}

// App Code

// Reducer-Function
function todos(state = [], action) {
    if (action.type === 'ADD_TODO') {
        return state.concat(action.todo);
    } else if (action.type === 'REMOVE_TODO') {
        return state.filter(todo => todo.id !== action.id)

    } else if (action.type === 'TOGGLE_TODO') {
        return state.map(todo => todo.id !== action.id ? todo :
            Object.assign({}, todo, { 'complete': !todo.complete }))
    }
    return state
}


const store = createStore(todos);
unsubscribe = store.subscribe(() => {
    console.log('The new state is ', store.getState());
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        complete: false,
        title: 'Eat a banana'
    }
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 1,
        complete: true,
        title: 'Eat an apple'
    }
})


store.dispatch({
    type: 'TOGGLE_TODO',
    id: 0,
})

store.dispatch({
    type: 'REMOVE_TODO',
    id: 1,
})
