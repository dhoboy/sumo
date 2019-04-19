import React from 'react';
import { 
  wrestlerMap, 
  wrestlerBaseInfo, 
  matchResults,
  tournamentMap,
  tournamentMetadataMap
} from '../types/types';

import TrendLine from './TrendLine';

import '../styles/wrestlerDetail.css';

interface Props {
  wrestlerName: string;
  wrestlers: wrestlerMap
}

/* ADD */
// section of wrestler's all time numbers against each other wrestler

// line graph of every match by wrestler 

// maybe these are three columns...

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
  
  render() {
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

      console.log("bababa: ", tournamentObj);

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

    console.log("tournaments: ", tournaments);

    return (
      <div id={`${wrestlerName}`} className="wrestlerDetailPage">
        {this.drawDetailHeader()}
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

            console.log("tournamentData: ", tournamentData);
            console.log("tournamentMetadata: ", tournamentMetadata);

            return (
              <div className="tournamentSection">
                <div className={`tournamentTitle`}>
                  {`${tournamentDisplayName}: ${tournamentMetadata.tournamentRank}`}
                </div>
                <div className={tournamentType}>
                  {tournamentType}
                </div>
                <div className={`winsLosses ${tournamentType}-tournament`}>
                  <div className="wins">
                    {`${wins} ${wins === 1 ? 'win' : 'wins'}`}
                  </div>
                  <div>-</div>
                  <div className="losses">
                    {`${losses} ${losses === 1 ? 'loss' : 'losses' }`}
                  </div>
                </div>
                <TrendLine 
                  tournamentData={tournamentData} 
                  wrestlerName={wrestlerName}
                  tournamentMetadata={tournamentMetadata}
                />
                <div className="tournamentDayResults">
                  {Object.keys(tournamentData).map(day => {
                    let dayData = tournamentData[day];
                    let winner = dayData.winner === wrestlerName; 
                    return (
                      <div className="dayAndResult">
                        <div className="dayName">
                          {`${day.charAt(0).toUpperCase() + day.slice(1)}: `}
                        </div>
                        <div className="matchResult">
                          {winner ? `Defeated ${dayData.loser} by ${dayData.technique}` : `Lost to ${dayData.winner} by ${dayData.technique}`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );   
          })}
        </div>
      </div>
    );
  }
}

export default WrestlerDetail;
