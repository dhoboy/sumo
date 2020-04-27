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
  return (
    <div className="recent-performance-graph">
      <div className="date-label">
        {tournamentDisplayName}
      </div>
      <div className="graph-and-keys">
        <div className="keys">
          <span>win</span>
          <span>loss</span>
        </div>
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
