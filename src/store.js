import { 
  createStore, 
  combineReducers, 
  applyMiddleware,
} from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";

import ui from "./reducers/ui";
import data from "./reducers/data";
import wrestlerList from "./reducers/wrestlerList";
import wrestlerDetail from "./reducers/wrestlerDetail";

let middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

const store = createStore(
  combineReducers({
    ui,
    data,
    wrestlerList,
    wrestlerDetail,
  }),
  applyMiddleware(...middleware)
);


export default store;