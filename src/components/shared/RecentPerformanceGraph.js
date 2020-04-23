import React from 'react';
import TrendLine from '../TrendLine/TrendLine';

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
      <div className="graph-and-keys">
        <div className="keys">
          <span>win</span>
          <span>loss</span>
        </div>
        <TrendLine
          wrestlerName={wrestlerName}
          tournamentData={tournamentData} 
          tournamentSummaryData={tournamentSummaryData}
          pageLocation={Math.random().toString(36).slice(2)}
        />
      </div>
      <div className="date-label">
        {tournamentDisplayName}
      </div>
    </div>
  );
}

export default RecentPerformanceGraph;
