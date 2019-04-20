import React from 'react';
import {
  matchups
} from '../../types/types';

import './WrestlerMatchups.css';

interface Props {
  wrestlerName: string;
  matchups: matchups
}

class WrestlerMatchups extends React.Component<Props, object> {
  drawHeader() {
    return (
      <div className="wrestlerMatchupsHeader">
        Matchups
      </div>
    );
  }

  drawMatchup(opponent: string) {
    const {
      wrestlerName,
      matchups
    } = this.props;

    const opponentMatchupData = matchups[opponent];
    return (
      <div>
        <div>{opponent}</div>
        <div>
          <span>Total Wins</span>
          <span>{opponentMatchupData.totalWins}</span>
        </div>
        <div>
          <span>Total Losses</span>
          <span>{opponentMatchupData.totalLosses}</span>
        </div>
        <div>
          {opponentMatchupData.results.map(d => {
            return (
              <div>
                <div>
                  <span>Tournament</span>
                  <span>{d.tournament}</span>
                </div>
                <div>
                  <span>Day</span>
                  <span>{d.day}</span>
                </div>
                <div>
                  <span>Opponent Rank</span>
                  <span>{d.opponentRank}</span>
                </div>
                <div>
                  <span>Result</span>
                  <span>{d.result}</span>
                </div>
              </div>
            );  
          })}
        </div>
      </div>
    );
  }
  
  render() {
    const {
      wrestlerName,
      matchups
    } = this.props;

    console.log("matchups in matchups component: ", matchups);

    return (
      <div className="wrestlerMatchups">
        {this.drawHeader()}
        {Object.keys(matchups).map(opponent => {
          return this.drawMatchup(opponent);
        })}
      </div>
    );
  }
}

export default WrestlerMatchups;
