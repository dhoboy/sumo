import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import TournamentResults from '../TournamentResults/TournamentResults';
import WrestlerMatchups from '../WrestlerMatchups/WrestlerMatchups';

const DetailBody = ({ wrestlerName }) => {
  const { loading, wrestlers } = useSelector(({ data }) => {
    return {
      loading: data.loading,
      wrestlers: data.wrestlers,
    };
  }, shallowEqual);

  if (loading) {
    return <p>Loading...</p>
  }

  const wrestler = wrestlers[wrestlerName];
  const { matchup, tournament, tournamentSummary } = wrestler;
  
  return (
    <div className="wrestler-detail-body">
      <TournamentResults
        wrestlerName={wrestlerName}
        tournament={tournament}
        tournamentSummary={tournamentSummary}
      />
      <WrestlerMatchups
        wrestlerName={wrestlerName}
        matchups={matchup}
      />
    </div>
  );
};

export default DetailBody;
