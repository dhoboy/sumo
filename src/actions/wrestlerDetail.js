import history from '../history';

export const loadWrestlerDetailPage = (wrestlerName) => {
  return dispatch => {
    const path = `wrestler/${wrestlerName.toLowerCase()}`
    dispatch({ type: "LOAD_WRESTLER_DETAIL_PAGE", payload: { path, wrestlerName }});
    history.push(path);
  };
};

