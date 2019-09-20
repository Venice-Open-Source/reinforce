import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import reducers from "./reducers/combine-reducers";

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    composeWithDevTools()
  )
);

// export default store;
