import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import HeaderOverview from './HeaderOverview';
import HeaderGraphs from './HeaderGraphs';

const DetailHeader = ({
  wrestlerName,
}) => {
  const { loading, wrestlers } = useSelector(({ data }) => {
    return {
      loading: data.loading,
      wrestlers: data.wrestlers,
    };
  }, shallowEqual);

  if (loading) {
    return <p>Loading...</p>;
  }

  const { tournament, tournamentSummary } = wrestlers[wrestlerName];

  return (
    <div className="wrestler-detail-header">
      <HeaderOverview wrestlerName={wrestlerName} />
      <HeaderGraphs 
        wrestlerName={wrestlerName}
        tournament={tournament} 
        tournamentSummary={tournamentSummary} 
      />
    </div>
  );
}

export default DetailHeader;
