const redux = require('redux');

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }
};

const store = redux.createStore(counterReducer);

const counterSubscribe = () => {
  const state = store.getState();
  console.log(state);
};

store.subscribe(counterSubscribe);
store.dispatch({ type: 'increment' });
