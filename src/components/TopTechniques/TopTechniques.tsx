import React from 'react';
import { techniques } from '../../types/types';
import * as d3 from 'd3';

import './TopTechniques.css';

interface Props {
  techniques: techniques
}

const TopTechniques: React.FunctionComponent<Props> = ({
  techniques
}) => {  
  let totalWins: number = 0;
  let totalLosses: number = 0;

  Object.keys(techniques).forEach(technique => {
    totalWins += techniques[technique].winsBy;
    totalLosses += techniques[technique].lossesBy;
  });


  let topWinningTechniques = Object.keys(techniques).sort((a, b) => {
    return techniques[b].winsBy - techniques[a].winsBy;
  }).map(technique => {
    return {
      technique: technique,
      winPercentage: techniques[technique].winsBy / totalWins
    }
  });

  let topLoosingTechniques = Object.keys(techniques).sort((a, b) => {
    return techniques[b].lossesBy - techniques[a].lossesBy;
  }).map(technique => {
    return {
      technique: technique,
      lossPercentage: techniques[technique].lossesBy / totalLosses
    }
  });

  return (
    <div className="topTechniquesSection">
      <div className="winsSection">
        <div className="totalWins">
          <span className="totalWinsLabel">Total Wins:</span>
          <span className="totalWinsNumber">{totalWins}</span>          
        </div>  
        <div className="topTechniques">
        <div className="topWinningTechniquesTitle">
            Wins By
          </div>
          {topWinningTechniques.slice(0,3).map((d, i) => {
            return (
              <div className="topTechnique">
                <div>{`${d.technique}`}</div>
                <div>{d3.format(",.1%")(d.winPercentage)}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="lossesSection">
        <div className="totalLosses">
          <span className="totalLossesLabel">Total Losses:</span>
          <span className="totalLossesNumber">{totalLosses}</span>          
        </div>
        <div className="topTechniques">
          <div className="topLoosingTechniquesTitle">
            Looses By
          </div>
          {topLoosingTechniques.slice(0,3).map((d, i) => {
            return (
              <div className="topTechnique">
                <div>{`${d.technique}`}</div>
                <div>{d3.format(",.1%")(d.lossPercentage)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );  
}

export default TopTechniques;
