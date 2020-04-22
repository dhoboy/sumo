const initialState = {
  wrestlers: {},
  loading: true,
};

const data = (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case "WRESTLER_DATA_UPDATED": 
      return {
        ...state,
        ...state.wrestlers,
        ...payload.wrestlers,
      };
    case "WRESTLER_MATCH_DATA_COMPILED":
      return {
        ...state,
        wrestlers: {
          ...state.wrestlers,
          [payload.wrestlerName]: {
            ...state.wrestlers[payload.wrestlerName],
            tournament: { ...payload.tournament },
            tournamentSummary: { ...payload.tournamentSummary },
            matchup: { ...payload.matchup },
            technique: { ...payload.technique },
          }
        }
      };
      case "WRESTLER_DATA_LOADING_COMPLETE":
        return {
          ...state,
          loading: false,
        }
    default:
      return state;
  };
};

export default data;
