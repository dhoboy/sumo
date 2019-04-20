import React from 'react';
import { 
  wrestlerMap, 
  wrestlerBaseInfo, 
  matchResults,
  tournamentMap,
  matchups,
  tournamentMetadataMap
} from '../../types/types';

import TournamentResultCard from '../TournamentResultCard/TournamentResultCard';
import WrestlerMatchups from '../WrestlerMatchups/WrestlerMatchups';
import './WrestlerDetail.css';

interface Props {
  wrestlerName: string;
  wrestlers: wrestlerMap
}

/* ADD */
// section of wrestler's all time numbers against each other wrestler

// line graph of every match by wrestler in top header beside name

// maybe these are three columns...

// filter by sumo rank on list page

// have the graph lines highlight the day entrys on hover

// 2 columns. one is double wide of tournmanet results
// other column is how you match up against everybody else all time

// in header beside their name, put how frequently then win by certain moves
// like, wins by over arm throw 80% of time
// who they loose to or who they beat a lot, or what rank they loose to a lot stuff like that

// color code rank from the pyramid of rank on nhk sumo site

class WrestlerDetail extends React.Component<Props, object> {
  drawDetailHeader() {
    let {
      wrestlerName,
      wrestlers
    } = this.props;
        
    let wrestlerData = wrestlers[wrestlerName];

    return (
      <div>
        <div>{wrestlerName}</div>
        <img src={`https://www3.nhk.or.jp${wrestlerData.image}`} />
        <div>
          <img src={`https://www3.nhk.or.jp${wrestlerData.name_ja}`} />
        </div>
      </div>
    )
  }

  drawMatchupStats(wrestlerName: string, matchups: matchups) {
    console.log("matchups!: ", matchups);
    return (
      <WrestlerMatchups
        wrestlerName={wrestlerName}
        matchups={matchups}
      />
    );
  }

  drawTournamentStats(wrestlerName: string, 
      tournaments: tournamentMap, 
      tournamentsMetadata: tournamentMetadataMap) {

    console.log("wrestlerName: ", wrestlerName);
    console.log("tournaments: ", tournaments);
    console.log("tournamentsMetadata: ", tournamentsMetadata);
    
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
            let tournamentMetadata = tournamentsMetadata[tournament];
            let wins = tournamentMetadata.wins;
            let losses = tournamentMetadata.losses;
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
                tournamentMetadata={tournamentMetadata}
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
    console.log("wrestlerData: ", wrestlerData);

    // massage results into tournament bins
    let tournaments: tournamentMap = {};
    let tournamentsMetadata: tournamentMetadataMap = {};
    let matchups: matchups = {};

    wrestlerData.results.forEach(tournamentObj => {
      console.log("tournamentObj: ", tournamentObj);
      let tournamentNameParts = Object.keys(tournamentObj)[0].split("_");
      let tournamentName = tournamentNameParts.slice(0,2).join("_");
      let tournamentDay = tournamentNameParts.slice(2)[0];
      if (!tournaments[tournamentName]) {
        tournaments[tournamentName] = {}
      }
      tournaments[tournamentName][tournamentDay] = Object.values(tournamentObj)[0];

      // track the tournamnet metadata for this wrestler
      let winner = Object.values(tournamentObj)[0].winner === wrestlerName; 
      let opponent = "";
      let opponentRank = "";

      let tournamentRank: string = "";
      
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

      // initialize match up for this opponent 
      if (!matchups[opponent]) {
        matchups[opponent] = {
          results: [{
            tournament: tournamentName,
            day: tournamentDay,
            result: winner ? "won" : "lost",
            opponent: opponent,
            opponentRank: opponentRank
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
          result: winner ? "won" : "lost",
          opponent: opponent,
          opponentRank: opponentRank
        });
      }
    });

    return {
      tournaments,
      tournamentsMetadata,
      matchups
    };
  }
  
  render() {
    const {
      wrestlerName,
      wrestlers
    } = this.props;

    const {
      tournaments,
      tournamentsMetadata,
      matchups
    } = this.formData();
    
    return (
      <div id={`${wrestlerName}`} className="wrestlerDetailPage">
        {this.drawDetailHeader()}
        <div className="wrestlerDetailBody">
          {this.drawTournamentStats(wrestlerName, tournaments, tournamentsMetadata)}
          {this.drawMatchupStats(wrestlerName, matchups)}
        </div>
      </div>
    );
  }
}

export default WrestlerDetail;
