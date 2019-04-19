import React from 'react';
import { 
  wrestlerMap, 
  wrestlerBaseInfo, 
  matchResults,
  tournamentMap,
  tournamentMetadataMap
} from '../../types/types';

import TournamentResultCard from '../TournamentResultCard/TournamentResultCard';
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
        <div>Match Results</div>
      </div>
    )
  }

  drawMatchupStats() {
    return (
      <div>
        Matchup Stats go here
      </div>
    );
  }

  drawTournamentStats(wrestlerName: string, 
      tournaments: tournamentMap, 
      tournamentsMetadata: tournamentMetadataMap) {
    
    return (
      <div className="tournamentResults">
        {Object.keys(tournaments).map(tournament => {
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

    wrestlerData.results.forEach(tournamentObj => {
      let tournamentNameParts = Object.keys(tournamentObj)[0].split("_");
      let tournamentName = tournamentNameParts.slice(0,2).join("_");
      let tournamentDay = tournamentNameParts.slice(2)[0];
      if (!tournaments[tournamentName]) {
        tournaments[tournamentName] = {}
      }
      tournaments[tournamentName][tournamentDay] = Object.values(tournamentObj)[0];

      // track the tournamnet metadata for this wrestler
      let winner = Object.values(tournamentObj)[0].winner === wrestlerName; 
      let tournamentRank = "";
      if (winner) {
        tournamentRank = Object.values(tournamentObj)[0].winnerRank;
      } else {
        tournamentRank = Object.values(tournamentObj)[0].loserRank;
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
    });

    return {
      tournaments,
      tournamentsMetadata
    };
  }
  
  render() {
    const {
      wrestlerName,
      wrestlers
    } = this.props;

    const {
      tournaments,
      tournamentsMetadata
    } = this.formData();
    
    return (
      <div id={`${wrestlerName}`} className="wrestlerDetailPage">
        {this.drawDetailHeader()}
        {this.drawTournamentStats(wrestlerName, tournaments, tournamentsMetadata)}
        {this.drawMatchupStats()}
      </div>
    );
  }
}

export default WrestlerDetail;
