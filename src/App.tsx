import React, { Component } from 'react';
import './App.css';
import {
  matchResults,
  wrestlerBaseInfo,
  wrestlerMap,
  rawWrestlerObj,
  matchups,
  techniques,
  tournamentMap,
  tournamentMetadataMap,
  rawTournamentMap,
} from './types/types';

import * as d3 from 'd3';
import axios from 'axios';

import Header from './components/Header/Header';
import WrestlerList from './components/WrestlerList/WrestlerList';
import WrestlerDetail from './components/WrestlerDetail/WrestlerDetail';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

class App extends Component {
  state = {
    wrestlers: {},
    page: "wrestlerList", // wrestlerList, wrestlerDetail...
    wrestlerDetailPage: "", // which wrestlerDetail page to load
    loading: true
  }
  
  componentDidMount() {
    this.loadSumoData();
    
    // using browser back button in this single page app
    window.onpopstate = (e) => {  
      let parts: string | string[] = window.location.href.split("#")[1];
      parts = parts.split("/");
      // go to a valid wrestler detail page
      if (parts[0] === "wrestler" && Object.keys(this.state.wrestlers).indexOf(parts[1].toUpperCase()) > -1) {
        this.goToWrestlerDetailPage(parts[1].toUpperCase());
      } else { // go back to wrestler list
        this.goToWrestlerList();
      }
    };
  }

  goToWrestlerDetailPage(wrestlerName: string) {
    history.pushState({
      "page": "wrestlerDetail",
      "wrestlerDetail": wrestlerName,
    }, "", `#wrestler/${wrestlerName.toLowerCase()}`);
    
    this.setState({
      wrestlerDetailPage: wrestlerName,
      page: "wrestlerDetail"
    });
  }

  goToWrestlerList() {
    history.pushState({ 
      "page": "wrestlerList",
      "wrestlerDetailPage": "" 
    }, "", `#wrestlerList/`);
    
    this.setState({
      page: "wrestlerList",
      wrestlerDetailPage: ""
    });
  }

  loadSumoData() {
    let tournamentCalls: {
      [key: string]: any
    } = { // these can be read in from a file...
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
      Promise.all(tournamentCalls[tournament]).then((resp: any[]) => {
          return {
            [tournament]: resp.map((d, i) => { 
              return {
                [`day${i+1}`]: d.data.data
              }; 
            })
          };
      }).then(data => {
        let tournaments = Object.keys(tournamentCalls);
        if (tournament === tournaments[tournaments.length - 1]) {
          // loaded final tournament data, pass in flag to turn off loading state
          this.massageData(data, false) 
        } else {
          this.massageData(data);
        }
      });
    });
  }

  massageData(tournamentRaw: rawTournamentMap, loading: boolean = true) {
    let wrestlers: wrestlerMap = this.state.wrestlers;

    const tournamentName = Object.keys(tournamentRaw)[0];
    const tournamentDate = new Date(tournamentName);
    const today = Date.now();
    const tournamentDiff = Math.abs(today - tournamentDate.getTime());

    tournamentRaw[tournamentName].forEach((dayObj, i) => {
      // used for determining rank in most recent tournament
      const day = Object.keys(dayObj)[0];
      
      dayObj[day].forEach(item => {
        // add a wrestler if not already in the map
        if (!wrestlers[item.east.name]) {
          wrestlers[item.east.name] = {
            image: item.east.image,
            name: item.east.name,
            name_ja: item.east.name_ja,
            currentRank: { // initialize currentRank to this tournament
              asOf: tournamentDate,
              rank: item.east.rank
            },
            division: "east",
            results: []
          }
        }
        if (!wrestlers[item.west.name]) {
          wrestlers[item.west.name] = {
            image: item.west.image,
            name: item.west.name,
            name_ja: item.west.name_ja,
            currentRank: { // initialize currentRank to this tournament
              asOf: tournamentDate,
              rank: item.west.rank
            },
            division: "west",
            results: []
          };
        }
        
        // add to wrestler's results
        wrestlers[item.east.name].results = wrestlers[item.east.name].results.concat({
          [`${tournamentName}_${day}`]: {
            winner: item.east.result === "win" ? item.east.name : item.west.name, 
            loser: item.east.result === "lose" ? item.east.name : item.west.name,
            technique: item.technique,
            winnerRank: item.east.result === "win" ? item.east.rank : item.west.rank,
            loserRank: item.east.result === "lose" ? item.east.rank : item.west.rank,
            recordSoFar: item.east.perform
          }
        });

        wrestlers[item.west.name].results = wrestlers[item.west.name].results.concat({
          [`${tournamentName}_${day}`]: {
            winner: item.west.result === "win" ? item.west.name : item.east.name, 
            loser: item.west.result === "lose" ? item.west.name : item.east.name,
            technique: item.technique,
            winnerRank: item.west.result === "win" ? item.west.rank : item.east.rank,
            loserRank: item.west.result === "lose" ? item.west.rank : item.east.rank,
            recordSoFar: item.west.perform
          }
        });
      
        // update wrestler's current rank to their rank in most recent tournament
        // most recent tournament should be same for wrestlers
        // in both east and west divisions, but computing 
        // each division's time diff for clear code readability
        let westCurrentRankDiff = Math.abs(
          wrestlers[item.west.name].currentRank.asOf.getTime() - today
        );

        let eastCurrentRankDiff = Math.abs(
          wrestlers[item.east.name].currentRank.asOf.getTime() - today
        );

        // if current tournament is more recent than tournament 
        // where this wrestler's most recent rank is derived from
        // update wrestler's current rank
        if (tournamentDiff < westCurrentRankDiff) {
          wrestlers[item.west.name].currentRank = {
            asOf: tournamentDate,
            rank: item.west.rank
          }
        }

        if (tournamentDiff < eastCurrentRankDiff) {
          wrestlers[item.east.name].currentRank = {
            asOf: tournamentDate,
            rank: item.east.rank
          }
        }
      });
    });

    this.setState({
      wrestlers,
      loading
    });
  }

  formData(wrestlerName: string) {
    let wrestlers: wrestlerMap = this.state.wrestlers;
    let wrestlerData: wrestlerBaseInfo = wrestlers[wrestlerName];

    // massage results into bins
    let tournaments: tournamentMap = {};
    let tournamentsMetadata: tournamentMetadataMap = {};
    let matchups: matchups = {};
    let techniques: techniques = {};

    wrestlerData.results.forEach(tournamentObj => {
      let tournamentNameParts = Object.keys(tournamentObj)[0].split("_");
      let tournamentName = tournamentNameParts.slice(0,2).join("_");
      let tournamentDay = tournamentNameParts.slice(2)[0];
      if (!tournaments[tournamentName]) {
        tournaments[tournamentName] = {}
      }
      tournaments[tournamentName][tournamentDay] = Object.values(tournamentObj)[0];

      // track the tournamnet metadata for this wrestler
      let winner: boolean = Object.values(tournamentObj)[0].winner === wrestlerName; 
      let opponent: string = "";
      let opponentRank: string = "";
      let tournamentRank: string = "";
      let technique: string = Object.values(tournamentObj)[0].technique;
      
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
    });

    return {
      tournaments,
      tournamentsMetadata,
      matchups,
      techniques
    };
  }

  // assertNever(x: string): void {
  //   throw new Error("Invalid Page: " + x);
  // }

  render() {
    let component = null;
    if (this.state.loading) {
      component = (
        <LoadingScreen />
      );
    } else {
      switch (this.state.page) {
        case "wrestlerList":
          component = (
            <WrestlerList 
              wrestlers={this.state.wrestlers} 
              goToWrestlerDetailPage={this.goToWrestlerDetailPage.bind(this)}
              formData={this.formData.bind(this)}
            />
          );
          break;
        case "wrestlerDetail":
          component = (
            <WrestlerDetail 
              wrestlerName={this.state.wrestlerDetailPage}
              wrestlers={this.state.wrestlers}
            />
          );  
          break;
         //default: 
           //return this.assertNever(this.state.page);
           //break;
      }
    }
    
    return (
      <div className="App">
        <Header
          goToWrestlerList={this.goToWrestlerList.bind(this)}
        />
        {component}
      </div>
    );
  }
}

export default App;
