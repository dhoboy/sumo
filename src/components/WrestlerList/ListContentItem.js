import React from 'react';
import { useDispatch } from 'react-redux';
import { loadWrestlerDetailPage } from '../../actions/wrestlerDetail';
import FullWrestlerProfile from '../WrestlerProfile/FullWrestlerProfile';
import RecentPerformanceGraph from '../shared/RecentPerformanceGraph';

const ListContentItem = ({
  name,
  tournament,
  tournamentSummary,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(loadWrestlerDetailPage(name));
  };

  let mostRecentTournament = Object.keys(tournament || []).sort((a, b) => {
    let aDate = new Date(a.split("_").join(" "));
    let bDate = new Date(b.split("_").join(" "));
    return Number(bDate) - Number(aDate);
  })[0];

  const tournamentData = tournament[mostRecentTournament];
  const tournamentSummaryData = tournamentSummary[mostRecentTournament];
  const tournamentDisplayNameParts = tournamentSummaryData.name.split("_");
  const tournamentDisplayName = `${tournamentDisplayNameParts[0].charAt(0).toUpperCase()}${tournamentDisplayNameParts[0].slice(1)} ${tournamentDisplayNameParts[1]}`;
  
  return (
    <div className="list-content-item" key={name} onClick={handleClick}>
      <FullWrestlerProfile wrestlerName={name} />
      <RecentPerformanceGraph 
        wrestlerName={name}
        tournamentData={tournamentData}
        tournamentSummaryData={tournamentSummaryData}
        tournamentDisplayName={tournamentDisplayName}
      />
    </div>
  );
}

export default ListContentItem;
