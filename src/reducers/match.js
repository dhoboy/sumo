const initialState = {
  matches: [],
};

const match = (state = initialState, action) => {
  switch(action) {
    default:
      return initialState;
  };
};

export default match;

// 3 reducers
// wrestler: {}, match: [], ui: {}

// load in data, put all wrestler info in wrestler reducer
// put all match info in match reducer
// put app state info in ui reducer

