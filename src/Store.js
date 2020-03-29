import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

export default createStore(
  reducers,
  {
    publications: []
  },

  composeWithDevTools(
    applyMiddleware(...middleware)

    // other store enhancers if any
  )
);
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
