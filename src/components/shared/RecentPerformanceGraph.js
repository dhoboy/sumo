import React from 'react';
import PunchCard from '../PunchCard/PunchCard';

// component doesn't reason about
// which tournamet is most recent
// it just graphs whatever tournament
// is passed to it
const RecentPerformanceGraph = ({
  wrestlerName,
  tournamentData,
  tournamentSummaryData,
  tournamentDisplayName,
}) => {
  const tournamentResult = tournamentSummaryData.result.charAt(0).toUpperCase().concat(tournamentSummaryData.result.slice(1));
  return (
    <div className="recent-performance-graph">
      <div className="date-label">
        {`${tournamentDisplayName}: ${tournamentResult}`}
      </div>
      <div className="graph-and-keys">
        <PunchCard
          wrestlerName={wrestlerName}
          tournamentData={tournamentData} 
          tournamentSummaryData={tournamentSummaryData}
        />
      </div>
      <div className="title">
        Daily Match Record
      </div>
      </div>
  );
}

export default RecentPerformanceGraph;
