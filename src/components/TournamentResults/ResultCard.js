import React from 'react';
import CardHeader from './CardHeader';
import CardRow from './CardRow';
import PunchCard from '../PunchCard/PunchCard';

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
    <div id={`tournament-${tournamentSummaryData.name}`} className={`tournament-section ${tournamentSummaryData.name}`}>
      <CardHeader
        tournamentDisplayName={tournamentDisplayName}
        tournamentSummaryData={tournamentSummaryData}
        tournamentType={tournamentType}
        wins={wins}
        losses={losses}
      />
      <div className="trend-line-container">
        <PunchCard
          wrestlerName={wrestlerName}
          tournamentData={tournamentData} 
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
              tournamentSummaryData={tournamentSummaryData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ResultCard;
