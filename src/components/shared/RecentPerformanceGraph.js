import React from 'react';
import TrendLine from '../TrendLine/TrendLine';

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
