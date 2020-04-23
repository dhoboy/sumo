import React from 'react';
import { useSelector } from 'react-redux';
import ShortWrestlerProfile from '../WrestlerProfile/ShortWrestlerProfile';
import TopTechniques from '../TopTechniques/TopTechniques';
import TopOpponents from '../TopOpponents/TopOpponents';

const HeaderOverview = ({
  wrestlerName,
}) => {
  const { loading, wrestlers } = useSelector(store => {
    return {
      loading: store.data.loading,
      wrestlers: store.data.wrestlers,
    };
  });

  // need to revisit all loading logic later
  if (loading) {
    return <p>Loading...</p>;
  }

  const { technique, matchup } = wrestlers[wrestlerName];
  
  // deal with this naming convention techniques vs technique later...
  return (
    <div className="header-overview">
      <ShortWrestlerProfile wrestlerName={wrestlerName} />
      <div className="overview-data">
        <TopTechniques techniques={technique} />
        <TopOpponents matchups={matchup} />
      </div>
    </div>
  );
};

export default HeaderOverview;
