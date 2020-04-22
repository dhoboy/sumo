import history from '../history';

export const loadWrestlerDetailPage = (wrestlerName) => {
  return dispatch => {
    const path = `wrestler/${wrestlerName.toLowerCase()}`
    dispatch({ type: "_LOAD_WRESTLER_DETAIL_PAGE", payload: { path }});
    history.push(path);
  };
};
