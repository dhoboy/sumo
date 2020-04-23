import React from 'react';
import ResultCard from './ResultCard';

const TournamentResults = ({
  wrestlerName,
  tournament,
  tournamentSummary,
}) => {
  return (
    <div className="tournament-result-section">
      <div className="tournament-result-title">Tournament Results</div>
      <div className="tournament-results">
        {Object.keys(tournament).sort((a, b) => {
          let aDate = new Date(a.split("_").join(" "));
          let bDate = new Date(b.split("_").join(" "));
          return Number(bDate) - Number(aDate);
        }).map(tournamentName => {
          let tournamentData = tournament[tournamentName];
          let tournamentSummaryData = tournamentSummary[tournamentName];
          let wins = tournamentSummaryData.wins;
          let losses = tournamentSummaryData.losses;
          let tournamentDisplayNameParts = tournamentName.split("_");
          let tournamentDisplayName = tournamentDisplayNameParts[0].charAt(0).toUpperCase() + tournamentDisplayNameParts[0].slice(1) + " " + tournamentDisplayNameParts[1];
          
          let tournamentType = "";
          if (wins > losses) {
            tournamentType = "kachi-koshi";
          } else if (losses > wins) {
            tournamentType = "machi-koshi";
          }
          
          return (
            <ResultCard
              tournamentData={tournamentData}
              tournamentSummaryData={tournamentSummaryData}
              wins={wins}
              losses={losses}
              tournamentDisplayName={tournamentDisplayName}
              tournamentType={tournamentType}
              wrestlerName={wrestlerName}
            />
          );   
        })}
      </div>
    </div>
  );
}

export default TournamentResults;
