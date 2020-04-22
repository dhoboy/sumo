const initialState = {
  filterText: "",
  sortType: "rank",
  sortDirection: "desc",
};

const wrestlerList = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_WRESTLER_LIST_FILTER_TEXT": 
      return {
        ...state,
        filterText: payload.filterText,
      };
    case "SET_WRESTLER_LIST_SORT_TYPE":
      return {
        ...state,
        sortType: payload.sortType,
      };
    case "SET_WRESTLER_LIST_SORT_DIRECTION":
      return {
        ...state,
        sortDirection: payload.sortDirection,
      };
    default:
      return state;
  }
};

export default wrestlerList;
