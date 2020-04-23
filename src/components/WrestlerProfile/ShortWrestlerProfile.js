import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import RankDisplay from './RankDisplay';

const ShortWrestlerProfile = ({ wrestlerName }) => {
  const { image, name, currentRank } = useSelector(store => {
    return {
      image: store.data.wrestlers[wrestlerName].image,
      name: store.data.wrestlers[wrestlerName].name,
      currentRank: store.data.wrestlers[wrestlerName].currentRank,
    };
  }, shallowEqual);

  return (
    <div className={`short-wrestler-profile ${name}`}>
      <img className="photo" src={`https://www3.nhk.or.jp${image}`} />
      <div> 
        <span className="wrestler-name">{name}</span>
        <RankDisplay showLabel {...currentRank} />
      </div>
    </div>
  );
}

export default ShortWrestlerProfile;
