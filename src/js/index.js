import { createSlice, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

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
const fetchPosts = (dispatch) => {
  return fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((json) => dispatch(counterIncremented(55)));
};
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case INCREMENTED:
      return { value: state.value + action.payload.value };
    case DECREMENTED:
      return { value: state.value - action.payload.value };
    default:
      return state;
  }
}

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

store.subscribe(() => console.log(store.getState()));
// store.dispatch(counterIncremented(5));
store.dispatch(fetchPosts);
// store.dispatch(thunkFunction);
