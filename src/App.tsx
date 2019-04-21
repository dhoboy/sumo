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
import Header from './components/Header/Header';
import WrestlerList from './components/WrestlerList/WrestlerList';
import WrestlerDetail from './components/WrestlerDetail/WrestlerDetail';

// write api later for loading this data...
import july_2018_day1 from './hardCodedData/2018/july_2018/day1.json';
import july_2018_day2 from './hardCodedData/2018/july_2018/day2.json';
import july_2018_day3 from './hardCodedData/2018/july_2018/day3.json';
import july_2018_day4 from './hardCodedData/2018/july_2018/day4.json';
import july_2018_day5 from './hardCodedData/2018/july_2018/day5.json';
import july_2018_day6 from './hardCodedData/2018/july_2018/day6.json';
import july_2018_day7 from './hardCodedData/2018/july_2018/day7.json';
import july_2018_day8 from './hardCodedData/2018/july_2018/day8.json';
import july_2018_day9 from './hardCodedData/2018/july_2018/day9.json';
import july_2018_day10 from './hardCodedData/2018/july_2018/day10.json';
import july_2018_day11 from './hardCodedData/2018/july_2018/day11.json';
import july_2018_day12 from './hardCodedData/2018/july_2018/day12.json';
import july_2018_day13 from './hardCodedData/2018/july_2018/day13.json';
import july_2018_day14 from './hardCodedData/2018/july_2018/day14.json';
import july_2018_day15 from './hardCodedData/2018/july_2018/day15.json';

import may_2018_day1 from './hardCodedData/2018/may_2018/day1.json';
import may_2018_day2 from './hardCodedData/2018/may_2018/day2.json';
import may_2018_day3 from './hardCodedData/2018/may_2018/day3.json';
import may_2018_day4 from './hardCodedData/2018/may_2018/day4.json';
import may_2018_day5 from './hardCodedData/2018/may_2018/day5.json';
import may_2018_day6 from './hardCodedData/2018/may_2018/day6.json';
import may_2018_day7 from './hardCodedData/2018/may_2018/day7.json';
import may_2018_day8 from './hardCodedData/2018/may_2018/day8.json';
import may_2018_day9 from './hardCodedData/2018/may_2018/day9.json';
import may_2018_day10 from './hardCodedData/2018/may_2018/day10.json';
import may_2018_day11 from './hardCodedData/2018/may_2018/day11.json';
import may_2018_day12 from './hardCodedData/2018/may_2018/day12.json';
import may_2018_day13 from './hardCodedData/2018/may_2018/day13.json';
import may_2018_day14 from './hardCodedData/2018/may_2018/day14.json';
import may_2018_day15 from './hardCodedData/2018/may_2018/day15.json';

import november_2018_day1 from './hardCodedData/2018/november_2018/day1.json';
import november_2018_day2 from './hardCodedData/2018/november_2018/day2.json';
import november_2018_day3 from './hardCodedData/2018/november_2018/day3.json';
import november_2018_day4 from './hardCodedData/2018/november_2018/day4.json';
import november_2018_day5 from './hardCodedData/2018/november_2018/day5.json';
import november_2018_day6 from './hardCodedData/2018/november_2018/day6.json';
import november_2018_day7 from './hardCodedData/2018/november_2018/day7.json';
import november_2018_day8 from './hardCodedData/2018/november_2018/day8.json';
import november_2018_day9 from './hardCodedData/2018/november_2018/day9.json';
import november_2018_day10 from './hardCodedData/2018/november_2018/day10.json';
import november_2018_day11 from './hardCodedData/2018/november_2018/day11.json';
import november_2018_day12 from './hardCodedData/2018/november_2018/day12.json';
import november_2018_day13 from './hardCodedData/2018/november_2018/day13.json';
import november_2018_day14 from './hardCodedData/2018/november_2018/day14.json';
import november_2018_day15 from './hardCodedData/2018/november_2018/day15.json';

import september_2018_day1 from './hardCodedData/2018/september_2018/day1.json';
import september_2018_day2 from './hardCodedData/2018/september_2018/day2.json';
import september_2018_day3 from './hardCodedData/2018/september_2018/day3.json';
import september_2018_day4 from './hardCodedData/2018/september_2018/day4.json';
import september_2018_day5 from './hardCodedData/2018/september_2018/day5.json';
import september_2018_day6 from './hardCodedData/2018/september_2018/day6.json';
import september_2018_day7 from './hardCodedData/2018/september_2018/day7.json';
import september_2018_day8 from './hardCodedData/2018/september_2018/day8.json';
import september_2018_day9 from './hardCodedData/2018/september_2018/day9.json';
import september_2018_day10 from './hardCodedData/2018/september_2018/day10.json';
import september_2018_day11 from './hardCodedData/2018/september_2018/day11.json';
import september_2018_day12 from './hardCodedData/2018/september_2018/day12.json';
import september_2018_day13 from './hardCodedData/2018/september_2018/day13.json';
import september_2018_day14 from './hardCodedData/2018/september_2018/day14.json';
import september_2018_day15 from './hardCodedData/2018/september_2018/day15.json';

import january_2019_day1 from './hardCodedData/2019/january_2019/day1.json';
import january_2019_day2 from './hardCodedData/2019/january_2019/day2.json';
import january_2019_day3 from './hardCodedData/2019/january_2019/day3.json';
import january_2019_day4 from './hardCodedData/2019/january_2019/day4.json';
import january_2019_day5 from './hardCodedData/2019/january_2019/day5.json';
import january_2019_day6 from './hardCodedData/2019/january_2019/day6.json';
import january_2019_day7 from './hardCodedData/2019/january_2019/day7.json';
import january_2019_day8 from './hardCodedData/2019/january_2019/day8.json';
import january_2019_day9 from './hardCodedData/2019/january_2019/day9.json';
import january_2019_day10 from './hardCodedData/2019/january_2019/day10.json';
import january_2019_day11 from './hardCodedData/2019/january_2019/day11.json';
import january_2019_day12 from './hardCodedData/2019/january_2019/day12.json';
import january_2019_day13 from './hardCodedData/2019/january_2019/day13.json';
import january_2019_day14 from './hardCodedData/2019/january_2019/day14.json';
import january_2019_day15 from './hardCodedData/2019/january_2019/day15.json';

import march_2019_day1 from './hardCodedData/2019/march_2019/day1.json';
import march_2019_day2 from './hardCodedData/2019/march_2019/day2.json';
import march_2019_day3 from './hardCodedData/2019/march_2019/day3.json';
import march_2019_day4 from './hardCodedData/2019/march_2019/day4.json';
import march_2019_day5 from './hardCodedData/2019/march_2019/day5.json';
import march_2019_day6 from './hardCodedData/2019/march_2019/day6.json';
import march_2019_day7 from './hardCodedData/2019/march_2019/day7.json';
import march_2019_day8 from './hardCodedData/2019/march_2019/day8.json';
import march_2019_day9 from './hardCodedData/2019/march_2019/day9.json';
import march_2019_day10 from './hardCodedData/2019/march_2019/day10.json';
import march_2019_day11 from './hardCodedData/2019/march_2019/day11.json';
import march_2019_day12 from './hardCodedData/2019/march_2019/day12.json';
import march_2019_day13 from './hardCodedData/2019/march_2019/day13.json';
import march_2019_day14 from './hardCodedData/2019/march_2019/day14.json';
import march_2019_day15 from './hardCodedData/2019/march_2019/day15.json';

class App extends Component {
  state = {
    wrestlers: {},
    page: "wrestlerList", // wrestlerList, wrestlerDetail...
    wrestlerDetailPage: "" // which wrestlerDetail page to load
  }
  
  componentDidMount() {
    this.loadSumoData();
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

  // write getting data bit later
  loadSumoData() {
    let wrestlers: wrestlerMap = {};
    
    let tournamentData: rawTournamentMap = {
      july_2018_day1, 
      july_2018_day2,
      july_2018_day3, 
      july_2018_day4, 
      july_2018_day5, 
      july_2018_day6, 
      july_2018_day7, 
      july_2018_day8, 
      july_2018_day9, 
      july_2018_day10, 
      july_2018_day11, 
      july_2018_day12, 
      july_2018_day13, 
      july_2018_day14, 
      july_2018_day15, 
      may_2018_day1, 
      may_2018_day2, 
      may_2018_day3, 
      may_2018_day4, 
      may_2018_day5, 
      may_2018_day6, 
      may_2018_day7, 
      may_2018_day8, 
      may_2018_day9, 
      may_2018_day10, 
      may_2018_day11, 
      may_2018_day12, 
      may_2018_day13, 
      may_2018_day14, 
      may_2018_day15,
      november_2018_day1, 
      november_2018_day2, 
      november_2018_day3, 
      november_2018_day4, 
      november_2018_day5, 
      november_2018_day6, 
      november_2018_day7, 
      november_2018_day8, 
      november_2018_day9, 
      november_2018_day10, 
      november_2018_day11, 
      november_2018_day12, 
      november_2018_day13, 
      november_2018_day14, 
      november_2018_day15, 
      september_2018_day1,
      september_2018_day2, 
      september_2018_day3, 
      september_2018_day4, 
      september_2018_day5, 
      september_2018_day6, 
      september_2018_day7, 
      september_2018_day8, 
      september_2018_day9, 
      september_2018_day10, 
      september_2018_day11, 
      september_2018_day12, 
      september_2018_day13, 
      september_2018_day14, 
      september_2018_day15, 
      january_2019_day1, 
      january_2019_day2, 
      january_2019_day3, 
      january_2019_day4, 
      january_2019_day5, 
      january_2019_day6, 
      january_2019_day7, 
      january_2019_day8, 
      january_2019_day9, 
      january_2019_day10, 
      january_2019_day11,
      january_2019_day12, 
      january_2019_day13, 
      january_2019_day14, 
      january_2019_day15, 
      march_2019_day1, 
      march_2019_day2, 
      march_2019_day3, 
      march_2019_day4, 
      march_2019_day5, 
      march_2019_day6, 
      march_2019_day7, 
      march_2019_day8, 
      march_2019_day9, 
      march_2019_day10,
      march_2019_day11,
      march_2019_day12,
      march_2019_day13,
      march_2019_day14,
      march_2019_day15
    };

    Object.keys(tournamentData).forEach(day => {
      // used for determining rank in most recent tournament
      const tournamentDate = new Date(day.split("_").slice(0,2).join(" "));
      const today = Date.now();
      const tournamentDiff = Math.abs(today - tournamentDate.getTime());

      tournamentData[day].data.forEach(item => {
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
          [day]: {
            winner: item.east.result === "win" ? item.east.name : item.west.name, 
            loser: item.east.result === "lose" ? item.east.name : item.west.name,
            technique: item.technique,
            winnerRank: item.east.result === "win" ? item.east.rank : item.west.rank,
            loserRank: item.east.result === "lose" ? item.east.rank : item.west.rank,
            recordSoFar: item.east.perform
          }
        });

        wrestlers[item.west.name].results = wrestlers[item.west.name].results.concat({
          [day]: {
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
      wrestlers
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
