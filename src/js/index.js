import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
// const serviceApi = createServiceApi("/some/url");
// const thunkMiddlewareWithArg = thunk.withExtraArgument({ serviceApi });

const INCREMENTED = "counter/incremented";
const DECREMENTED = "counter/decremented";
export const counterIncremented = (value) => ({
  type: INCREMENTED,
  payload: { value },
});
export const counterDecremented = (value) => ({
  type: DECREMENTED,
  payload: { value },
});

const asyncFunctionMiddleware = (storeAPI) => (next) => (action) => {
  console.log("storeAPI", storeAPI);
  // If the "action" is actually a function instead...
  if (typeof action === "function") {
    // then call the function and pass `dispatch` and `getState` as arguments
    return action(storeAPI.dispatch, storeAPI.getState);
  }

  // Otherwise, it's a normal action - send it onwards
  return next(action);
};
function counterReducer1(state = { value: 0 }, action) {
  switch (action.type) {
    case INCREMENTED:
      return { value: state.value + action.payload.value };
    case DECREMENTED:
      return { value: state.value - action.payload.value };
    default:
      return state;
  }
}
function counterReducer2(state = { value: 0 }, action) {
  switch (action.type) {
    case INCREMENTED:
      return { value: state.value + 2 };
    case DECREMENTED:
      return { value: state.value - 1 };
    default:
      return state;
  }
}
const fetchPosts = (dispatch) => {
  return fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((json) => dispatch(counterIncremented(55)));
};

const rootReducer = combineReducers({
  counter1: counterReducer1,
  counter2: counterReducer2,
});
let store = createStore(rootReducer, applyMiddleware(thunk,asyncFunctionMiddleware));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchPosts);
// store.dispatch(counterIncremented(5));
// store.dispatch(counterIncremented(5));
// store.dispatch(counterIncremented(5));
// store.dispatch(asyncFunctionMiddleware);
// store.dispatch(counterDecremented(4));
// store.dispatch(function1);
