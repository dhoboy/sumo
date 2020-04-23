import React from 'react';
import CardHeader from './CardHeader';
import TrendLine from '../TrendLine/TrendLine';
import CardRow from './CardRow';

const ResultCard = ({
  wrestlerName,
  tournamentData,
  tournamentSummaryData,
  wins,
  losses,
  tournamentDisplayName,
  tournamentType,
}) => {
  return (
    <div className="tournament-section">
      <CardHeader
        tournamentDisplayName={tournamentDisplayName}
        tournamentSummaryData={tournamentSummaryData}
        tournamentType={tournamentType}
        wins={wins}
        losses={losses}
      />
      <div className="trend-line-container">
        <div className="trend-line-keys">
          <div className="trend-line-key">win</div>
          <div className="trend-line-key">loss</div>
        </div>
        <TrendLine 
          tournamentData={tournamentData} 
          wrestlerName={wrestlerName}
          tournamentSummaryData={tournamentSummaryData}
          pageLocation={'resultCard'}
        />
      </div>
      <div className="tournament-day-results">
        {Object.keys(tournamentData).map(day => {
          let dayData = tournamentData[day];
          let winner = dayData.winner === wrestlerName; 
          return (
            <CardRow
              day={day}  
              dayData={dayData}
              winner={winner}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ResultCard;
