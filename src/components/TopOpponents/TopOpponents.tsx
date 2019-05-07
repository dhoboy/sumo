import React from 'react';
import * as d3 from 'd3';
import { matchups } from '../../types/types';

import './TopOpponents.css';

interface Props {
  matchups: matchups;
}

const TopOpponents: React.FunctionComponent<Props> = ({
  matchups
}) => {
  let totalWins: number = 0;
  let totalLosses: number = 0;

  Object.keys(matchups).forEach(matchup => {
    totalWins += matchups[matchup].totalWins;
    totalLosses += matchups[matchup].totalLosses;
  });

  const topWinningMatchups = Object.keys(matchups).sort((a, b) => {
    return matchups[b].totalWins - matchups[a].totalWins;
  }).map(matchup => {
    return {...matchups[matchup], opponent: matchup};
  });

  const topLoosingMatchups = Object.keys(matchups).sort((a, b) => {
    return matchups[b].totalLosses - matchups[a].totalLosses;
  }).map(matchup => {
    return {...matchups[matchup], opponent: matchup};
  });

  return (
    <div className="topOpponentsSection">
      <div className="winsSection">
        <div className="topOpponents">
        <div className="topWinningOpponentsTitle">
            Wins Against
          </div>
          {topWinningMatchups.slice(0,2).map((d, i) => {
            return (
              <div className="topOpponent">
                <div>{`${d.opponent}`}</div>
                <div>{d3.format(",.1%")(d.totalWins / totalWins)}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="lossesSection">
        <div className="topOpponents">
          <div className="topLoosingOpponentsTitle">
            Looses Against
          </div>
          {topLoosingMatchups.slice(0,2).map((d, i) => {
            return (
              <div className="topOpponent">
                <div>{`${d.opponent}`}</div>
                <div>{d3.format(",.1%")(d.totalLosses / totalLosses)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TopOpponents;
