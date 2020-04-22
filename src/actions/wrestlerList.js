import history from '../history';

export const loadWrestlerListPage = () => {
  return dispatch => {
    const path = '/wrestler-list';
    dispatch({ type: "_LOAD_WRESTLER_LIST_PAGE", payload: { path }});
    history.push(path);
  };
};

export const setSortType = (e) => {
  return dispatch => {
    dispatch({ type: "SET_WRESTLER_LIST_SORT_TYPE", payload: { sortType: e.target.value }});
  };
};

export const setSortDirection = (e) => {
  return dispatch => {
    dispatch({ type: "SET_WRESTLER_LIST_SORT_DIRECTION", payload: { sortDirection: e.target.value }});
  };
};

export const setFilterText = (e) => {
  return dispatch => {
    dispatch({ type: "SET_WRESTLER_LIST_FILTER_TEXT", payload: { filterText: e.target.value }});
  };
};

