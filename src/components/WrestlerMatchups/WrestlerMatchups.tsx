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
  state = {
    text: ""
  }

  drawHeader() {
    return (
      <div className="wrestlerMatchupsHeader">
        All Time Matchups
      </div>
    );
  }

  drawInputBox() {
    return (
      <div>
        <div>Filter by Wrestler Name: </div>
        <input 
          className="matchupsFilterInput"
          type="text"
          onChange={(e) => {
            console.log("e: ", e.target.value);
            this.setState({
              text: e.target.value
            });
          }}
          value={this.state.text}
        />
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
      <div className="matchupsEntry">
        <div className="matchupsTotalRow">
          <div className="matchupsTotalName">
            {`Against ${opponent}`}
          </div>
          <div className="matchupsTotalWins">
            <span>Total Wins:</span>
            <span className="matchupsValue">{opponentMatchupData.totalWins}</span>
          </div>
          <div className="matchupsTotalLosses">
            <span>Total Losses:</span>
            <span className="matchupsValue">{opponentMatchupData.totalLosses}</span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Tournament</th>
              <th>Day</th>
              <th>Opponent Rank</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {opponentMatchupData.results.map(d => {
              return (
                <tr>
                  <td>{d.tournament}</td>
                  <td>{d.day}</td>
                  <td>{d.opponentRank}</td>
                  <td>{d.result}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  
  render() {
    const {
      wrestlerName,
      matchups
    } = this.props;

    console.log("matchups in matchups component: ", matchups);
    console.log("matchups text: ", this.state.text);


    return (
      <div className="wrestlerMatchupsSection">
        {this.drawHeader()}
        {this.drawInputBox()}
        <div className="wrestlerMatchups">
          {Object.keys(matchups).filter(opponent => {
            console.log("opponent: ", opponent);
            console.log("opponent.indexOf(this.state.text): ", opponent.indexOf(this.state.text));
            return opponent.toLowerCase().indexOf(this.state.text.toLowerCase()) > -1;
          }).map(opponent => {
            return this.drawMatchup(opponent);
          })}
        </div>
      </div>
    );
  }
}

export default WrestlerMatchups;
