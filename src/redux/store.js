import { createStore, applyMiddleware } from "redux";
import rootReducers from "./reducer";
import thunk from "redux-thunk";
import { LoadState, SaveState } from "../components/LocalStorage";

const initialState = LoadState();

const middleware = [thunk];
const store = createStore(
  rootReducers,
  initialState,
  applyMiddleware(...middleware)
);

store.subscribe(() => {
    SaveState({
      handleCart: store.getState().handleCart
    })
})

export default store;
