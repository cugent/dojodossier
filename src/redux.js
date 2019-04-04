import { combineReducers, createStore } from "redux";
const initialState = {
  tabs: [],
  tabIndex: 0
};

export const addTab = payload => ({
  type: "ADD_TAB",
  payload // <-- action.type
});

export const addItem = (payload, index) => ({
  type: "ADD_ITEM",
  payload, // <-- action.type
  index
});

export const tabUpdate = (payload, index) => ({
  type: "TAB_UPDATE",
  payload, // <-- action.type
  index
});
export const changeTab = index => ({
  type: "CHANGE_TAB",
  index
});
export const tabs = (state = initialState.tabs, action) => {
  let newState = state;
  switch (action.type) {
    case "ADD_TAB":
      return [...state, action.payload];
    case "ADD_ITEM":
      console.log(action);
      newState[action.index].items.push(action.payload);
      return newState;
    case "TAB_UPDATE":
      return action.payload;
    default:
      return state;
  }
};

export const tabIndex = (state = initialState.tabIndex, action) => {
  switch (action.type) {
    case "CHANGE_TAB":
      return action.index;
    default:
      return state;
  }
};

export const reducers = combineReducers({
  tabs,
  tabIndex
});

export function configureStore(initialState = initialState) {
  // initialState = initialState | {}
  const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  console.log(store);
  return store;
}

export const store = configureStore();
