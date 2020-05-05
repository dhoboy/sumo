const initialState = {
  wrestlerName: "",
};

const wrestlerDetail = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOAD_WRESTLER_DETAIL_PAGE":
      return {
        ...state,
        wrestlerName: payload.wrestlerName,
      };
    default: 
      return state;
  }
}

export default wrestlerDetail;
