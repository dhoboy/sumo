import axios from 'axios';
import * as d3 from 'd3';

export const init = () => {
  return (dispatch) => {
    dispatch({ type: "INITIALIZE_APPLICATION" });
    dispatch(loadData());
  }
};

const loadData = () => {
  return (dispatch) => {
    let tournamentCalls = { // these can be read in from a file...
      "march_2019": [],
      "january_2019": [],
      "november_2018": [],
      "september_2018": [],
      "july_2018": [],
      "may_2018": []
    };
    
    Object.keys(tournamentCalls).forEach(tournament => {
      tournamentCalls[tournament] = d3.range(1, 16).map(num => {
        return axios.get(`https://raw.githubusercontent.com/dhoboy/dhoboy.github.io/master/sumo-data/${tournament}/day${num}.json`);
      });
    });

    Object.keys(tournamentCalls).forEach(tournament => {
      Promise.all(tournamentCalls[tournament]).then(resp => {
          return {
            [tournament]: resp.map((d, i) => { 
              return {
                [`day${i+1}`]: d.data.data
              }; 
            })
          };
      }).then(data => {
        console.log("data: ", data);
        let tournaments = Object.keys(tournamentCalls);
        if (tournament === tournaments[tournaments.length - 1]) {
          // loaded final tournament data, pass in flag to turn off loading state
          //this.massageData(data, false) 
        } else {
          //this.massageData(data);
        }
        dispatch({ type: "DATA_LOADED" });
      }).catch(err => {
        console.log("err: ", err);
      });
    });
  }
}
