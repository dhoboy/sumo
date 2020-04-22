import React from 'react';
import { 
  wrestlerMap, 
  wrestlerBaseInfo, 
  matchResults,
  tournamentMap,
  matchups,
  tournamentSummaryDataMap,
  techniques
} from '../../types/types';

import WrestlerDetailHeader from './subcomponents/WrestlerDetailHeader';
import TournamentResultCard from '../TournamentResultCard/TournamentResultCard';
import WrestlerMatchups from '../WrestlerMatchups/WrestlerMatchups';

import './WrestlerDetail.css';

interface Props {
  wrestlerName: string;
  wrestlers: wrestlerMap
}

/* ADD */
// filter by sumo rank on list page
// have the graph lines highlight the day entrys on hover
// what rank they loose to a lot
// color code rank from the pyramid of rank on nhk sumo site

class WrestlerDetail extends React.Component<Props, object> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  
  drawDetailHeader(techniques: techniques, 
      tournaments: tournamentMap, 
      tournamentsSummaryData: tournamentSummaryDataMap,
      matchups: matchups) {
    
    let {
      wrestlerName,
      wrestlers
    } = this.props;
        
    let wrestlerData = wrestlers[wrestlerName];

    return (
      <WrestlerDetailHeader 
        techniques={techniques}
        wrestlerName={wrestlerName}
        wrestlerData={wrestlerData}
        tournaments={tournaments}
        tournamentsSummaryData={tournamentsSummaryData}
        matchups={matchups}
      />
    );
  }

  drawMatchupStats(wrestlerName: string, matchups: matchups) {
    return (
      <WrestlerMatchups
        wrestlerName={wrestlerName}
        matchups={matchups}
      />
    );
  }

  drawTournamentStats(wrestlerName: string, 
      tournaments: tournamentMap, 
      tournamentsSummaryData: tournamentSummaryDataMap) {
    
    return (
      <div className="tournamentResultsSection">
        <div className="tournamentResultsTitle">Tournament Results</div>
        <div className="tournamentResults">
          {Object.keys(tournaments).sort((a, b) => {
            let aDate = new Date(a.split("_").join(" "));
            let bDate = new Date(b.split("_").join(" "));
            return Number(bDate) - Number(aDate);
          }).map(tournament => {
            let tournamentData = tournaments[tournament];
            let tournamentSummaryData = tournamentsSummaryData[tournament];
            let wins = tournamentSummaryData.wins;
            let losses = tournamentSummaryData.losses;
            let tournamentDisplayNameParts = tournament.split("_");
            let tournamentDisplayName = tournamentDisplayNameParts[0].charAt(0).toUpperCase() + 
              tournamentDisplayNameParts[0].slice(1) + " " +
              tournamentDisplayNameParts[1];
            let tournamentType: string = "";

            if (wins > losses) {
              tournamentType = "kachi-koshi";
            } else if (losses > wins) {
              tournamentType = "machi-koshi";
            } else {
              tournamentType = "";
            }

            return (
              <TournamentResultCard
                tournamentData={tournamentData}
                tournamentSummaryData={tournamentSummaryData}
                wins={wins}
                losses={losses}
                tournamentDisplayName={tournamentDisplayName}
                tournamentType={tournamentType}
                wrestlerName={wrestlerName}
              />
            );   
          })}
        </div>
      </div>
    );
  }

  formData() {
    let {
      wrestlerName,
      wrestlers
    } = this.props;

    let wrestlerData = wrestlers[wrestlerName];

    // massage results into bins
    let tournaments: tournamentMap = {};
    let tournamentsSummaryData: tournamentSummaryDataMap = {};
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

      // track the tournamnet summary data for this wrestler
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

      if (!tournamentsSummaryData[tournamentName]) {
        tournamentsSummaryData[tournamentName] = { 
          name: tournamentName,
          tournamentRank: tournamentRank,
          wins: 0, 
          losses: 0 
        };
      }

      if (winner) {
        tournamentsSummaryData[tournamentName].wins += 1;
      } else {
        tournamentsSummaryData[tournamentName].losses += 1;
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
      tournamentsSummaryData,
      matchups,
      techniques
    };
  }
  
  render() {
    const {
      wrestlerName,
      wrestlers
    } = this.props;

    const {
      tournaments,
      tournamentsSummaryData,
      matchups,
      techniques
    } = this.formData();
    
    return (
      <div id={`${wrestlerName}`} className="wrestlerDetailPage">
        {this.drawDetailHeader(
          techniques, 
          tournaments, 
          tournamentsSummaryData,
          matchups
        )}
        <div className="wrestlerDetailBody">
          {this.drawTournamentStats(
            wrestlerName, 
            tournaments, 
            tournamentsSummaryData
          )}
          {this.drawMatchupStats(
            wrestlerName, 
            matchups
          )}
        </div>
      </div>
    );
  }
}

export default WrestlerDetail;
