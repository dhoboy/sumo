import React from 'react';
import TrendLine from '../TrendLine/TrendLine';

const HeaderGraphs = ({ 
  wrestlerName,
  tournament, 
  tournamentSummary,
}) => {
  return (
    <div className="header-graphs">
      {Object.keys(tournament).sort((a, b) => {
        let aDate = new Date(a.split("_").join(" "));
        let bDate = new Date(b.split("_").join(" "));
        return Number(aDate) - Number(bDate);
      }).map(tournamentName => {
        let tournamentData = tournament[tournamentName];
        let tournamentSummaryData = tournamentSummary[tournamentName];
        let tournamentDisplayNameParts = tournamentName.split("_");
        let tournamentDisplayName = `${tournamentDisplayNameParts[0].charAt(0).toUpperCase()}${tournamentDisplayNameParts[0].slice(1)} ${tournamentDisplayNameParts[1]}`;
        
        return (
          <div className="graph-and-label">
            <TrendLine
              tournamentData={tournamentData} 
              wrestlerName={wrestlerName}
              tournamentSummaryData={tournamentSummaryData}
              pageLocation={"header"}
            />
            <div className="graph-label">
              {tournamentDisplayName}
            </div>
          </div>
        );
      })}
    </div>    
  );
}

export default HeaderGraphs;
