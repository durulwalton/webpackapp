import { createSlice, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
const fetchPosts = (dispatch) => {
  return fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((json) => dispatch(incrementByAmount(55)));
};
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action) {
      console.log(action)
      state.value += action.payload;
    },
  },
});
const { increment, decrement, incrementByAmount } = counterSlice.actions;
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
store.subscribe(() => console.log(store.getState()));
// store.dispatch(increment(5));
store.dispatch(fetchPosts);
// store.dispatch(thunkFunction);
