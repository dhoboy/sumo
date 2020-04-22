import axios from 'axios';
import * as d3 from 'd3';

export const init = () => {
  return (dispatch) => {
    dispatch({ type: "INITIALIZE_APPLICATION" });
    dispatch(loadData());
  }
};

// load in match data from each tournament
const loadData = () => {
  return (dispatch) => {
    let tournamentCalls = { // these can be read in from a file...
      "march_2019": [],
      "january_2019": [],
      "november_2018": [],
      "september_2018": [],
      "july_2018": [],
      "may_2018": [],
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
            return { [`day${i+1}`]: d.data.data }; 
          })
        };
      }).then(data => {
        let tournaments = Object.keys(tournamentCalls);
        if (tournament === tournaments[tournaments.length - 1]) {
          // loaded final tournament dataset, pass in flag to turn off loading state
          dispatch({ type: "_FINAL_DATASET_LOADED", payload: { dataset: Object.keys(data)[0] }});
          dispatch(parseData(data, true));
        } else {
          dispatch({ type: "_DATASET_LOADED", payload: { dataset: Object.keys(data)[0] }});
          dispatch(parseData(data));
        }
      }).catch(err => {
        console.log("err: ", err);
      });
    });
  }
}

// parse out and update how each wrestler did in each tournament
const parseData = (data, loadingComplete) => {
  return (dispatch, getState) => {
    const { wrestlers } = getState().data;
    const tournamentName = Object.keys(data)[0];
    const tournamentDate = new Date(tournamentName);
    const today = Date.now();
    const tournamentDiff = Math.abs(today - tournamentDate.getTime());

    data[tournamentName].forEach((dayObj, i) => {
      // used for determining rank in most recent tournament
      const day = Object.keys(dayObj)[0];
      
      dayObj[day].forEach(item => {
        const { east, west, technique } = item;

        // add a wrestler if not already in the map
        if (!wrestlers[east.name]) {
          wrestlers[east.name] = {
            image: east.image,
            name: east.name,
            name_ja: east.name_ja,
            currentRank: { // initialize currentRank to this tournament
              asOf: tournamentDate,
              rank: east.rank,
            },
            division: "east",
            results: [],
          }
        }
        if (!wrestlers[west.name]) {
          wrestlers[west.name] = {
            image: west.image,
            name: west.name,
            name_ja: west.name_ja,
            currentRank: { // initialize currentRank to this tournament
              asOf: tournamentDate,
              rank: west.rank,
            },
            division: "west",
            results: [],
          };
        }
        
        // add this day's match to wrestler's results
        wrestlers[east.name].results = wrestlers[east.name].results.concat({
          [`${tournamentName}_${day}`]: {
            winner: east.result === "win" ? east.name : west.name, 
            loser: east.result === "lose" ? east.name : west.name,
            technique,
            winnerRank: east.result === "win" ? east.rank : west.rank,
            loserRank: east.result === "lose" ? east.rank : west.rank,
            recordSoFar: east.perform,
          }
        });

        wrestlers[west.name].results = wrestlers[west.name].results.concat({
          [`${tournamentName}_${day}`]: {
            winner: west.result === "win" ? west.name : east.name, 
            loser: west.result === "lose" ? west.name : east.name,
            technique,
            winnerRank: west.result === "win" ? west.rank : east.rank,
            loserRank: west.result === "lose" ? west.rank : east.rank,
            recordSoFar: west.perform,
          }
        });
      
        // update wrestler's current rank to their rank in most recent tournament
        // most recent tournament should be same for wrestlers
        // in both east and west divisions, but computing 
        // each division's time diff for clear code readability
        let westCurrentRankDiff = Math.abs(
          wrestlers[west.name].currentRank.asOf.getTime() - today
        );

        let eastCurrentRankDiff = Math.abs(
          wrestlers[east.name].currentRank.asOf.getTime() - today
        );

        // if current tournament is more recent than tournament 
        // where this wrestler's most recent rank is derived from
        // update wrestler's current rank
        if (tournamentDiff < westCurrentRankDiff) {
          wrestlers[west.name].currentRank = {
            asOf: tournamentDate,
            rank: west.rank,
          };
        }

        if (tournamentDiff < eastCurrentRankDiff) {
          wrestlers[east.name].currentRank = {
            asOf: tournamentDate,
            rank: east.rank,
          }
        }
      });
    });

    dispatch({ type: "WRESTLER_DATA_UPDATED", payload: { wrestlers }});
    if (loadingComplete) {
      dispatch({ type: "_LOADING_COMPLETE" });
      dispatch(buildAllMatchData());
    }
  }
};

// compile summary and metadata about each wrestler
const buildAllMatchData = () => {
  return (dispatch, getState) => {    
    const { wrestlers } = getState().data;
    const wrestlerNames = Object.keys(wrestlers);

    dispatch({ type: "_BUILD_ALL_MATCH_DATA" });
    wrestlerNames.forEach((wrestlerName, i) => {
      if (i === wrestlerNames.length - 1) {
        dispatch(buildMatchData(wrestlerName, true));
      }
      dispatch(buildMatchData(wrestlerName));
    })
  }
};

// one wrestler at a time, aggregate all their data
const buildMatchData = (wrestlerName, lastWrestler) => {
  return (dispatch, getState) => {
    const { wrestlers } = getState().data;
    const wrestlerData = wrestlers[wrestlerName];

    // massage results into bins
    let tournaments = {};
    let tournamentsMetadata  = {};
    let matchups = {};
    let techniques = {};

    let lastTournament = false;
    let numberOfTournaments = wrestlerData.results.length;

    wrestlerData.results.forEach((tournamentObj, i) => {
      let tournamentNameParts = Object.keys(tournamentObj)[0].split("_");
      let tournamentName = tournamentNameParts.slice(0,2).join("_");
      let tournamentDay = tournamentNameParts.slice(2)[0];
      if (!tournaments[tournamentName]) {
        tournaments[tournamentName] = {};
      }
      tournaments[tournamentName][tournamentDay] = Object.values(tournamentObj)[0];

      // track the tournamnet metadata for this wrestler
      let winner = Object.values(tournamentObj)[0].winner === wrestlerName; // boolean
      let opponent = ""; // string
      let opponentRank = ""; // string
      let tournamentRank = ""; // string
      let technique = Object.values(tournamentObj)[0].technique; // string 
      
      if (winner) {
        tournamentRank = Object.values(tournamentObj)[0].winnerRank;
        opponent = Object.values(tournamentObj)[0].loser;
        opponentRank = Object.values(tournamentObj)[0].loserRank;
      } else {
        tournamentRank = Object.values(tournamentObj)[0].loserRank;
        opponent = Object.values(tournamentObj)[0].winner;
        opponentRank = Object.values(tournamentObj)[0].winnerRank;
      }

      if (!tournamentsMetadata[tournamentName]) {
        tournamentsMetadata[tournamentName] = { 
          name: tournamentName,
          tournamentRank: tournamentRank,
          wins: 0, 
          losses: 0 
        };
      }

      if (winner) {
        tournamentsMetadata[tournamentName].wins += 1;
      } else {
        tournamentsMetadata[tournamentName].losses += 1;
      }

      // initialize matchup for this opponent 
      if (!matchups[opponent]) {
        matchups[opponent] = {
          results: [{
            tournament: tournamentName,
            day: tournamentDay,
            result: winner ? "Won" : "Lost",
            opponent: opponent,
            opponentRank: opponentRank,
            technique: technique
          }],
          totalWins: winner ? 1 : 0,
          totalLosses: !winner ? 1 : 0
        }
      } else { // add to matchups for this opponent
        matchups[opponent].totalWins = winner ? matchups[opponent].totalWins + 1 : matchups[opponent].totalWins; 
        matchups[opponent].totalLosses = !winner ? matchups[opponent].totalLosses + 1 : matchups[opponent].totalLosses; 
        matchups[opponent].results = matchups[opponent].results.concat({
          tournament: tournamentName,
          day: tournamentDay,
          result: winner ? "Won" : "Lost",
          opponent: opponent,
          opponentRank: opponentRank,
          technique: Object.values(tournamentObj)[0].technique
        });
      }

      // tracking moves won/lost by
      if (!techniques[technique]) {
        techniques[technique] = {
          winsBy: winner ? 1 : 0,
          lossesBy: !winner ? 1 : 0
        };
      } else {
        techniques[technique].winsBy += winner ? 1 : 0;
        techniques[technique].lossesBy += !winner ? 1 : 0;
      }

      if (i === numberOfTournaments - 1) {
        lastTournament = true;
      } 
    });

    // trying a singular naming convention means object
    // plural means array, for now, just to see.
    const payload = { 
      wrestlerName,
      tournament: tournaments,
      tournamentSummary: tournamentsMetadata,
      matchup: matchups,
      technique: techniques,
    };

    dispatch({ type: 'WRESTLER_MATCH_DATA_COMPILED', payload });
    
    if (lastWrestler && lastTournament) {
      dispatch({ type: 'WRESTLER_DATA_LOADING_COMPLETE' });
    }
  };
};

