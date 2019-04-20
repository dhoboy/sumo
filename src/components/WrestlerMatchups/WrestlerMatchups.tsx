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
        <div className="matchupsFilterHelpText">Filter by Wrestler Name: </div>
        <input 
          className="matchupsFilterInput"
          type="text"
          onChange={(e) => {
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
              <th>Technique</th>
            </tr>
          </thead>
          <tbody>
            {opponentMatchupData.results.sort((a, b) => {
              let aDate = new Date(a.tournament.split("_").join(" "));
              let bDate = new Date(b.tournament.split("_").join(" "));
              return Number(bDate) - Number(aDate);
            }).map(d => {
              let tournamentNameParts: string[] = d.tournament.split("_");
              let displayTournamentName = tournamentNameParts[0].charAt(0).toUpperCase() + 
                tournamentNameParts[0].slice(1) + " " + tournamentNameParts[1];

              return (
                <tr>
                  <td>{displayTournamentName}</td>
                  <td>{d.day.slice(3)}</td>
                  <td>{d.opponentRank}</td>
                  <td>{d.result}</td>
                  <td>{d.technique}</td>
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

    return (
      <div className="wrestlerMatchupsSection">
        {this.drawHeader()}
        {this.drawInputBox()}
        <div className="wrestlerMatchups">
          {Object.keys(matchups).filter(opponent => {
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
