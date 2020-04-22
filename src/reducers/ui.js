const initialState = {
  page: '/',
  loading: true,
};

const ui = (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case "LOADING_COMPLETE": 
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  };
};

export default ui;
