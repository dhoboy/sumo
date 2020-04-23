import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import RankDisplay from './RankDisplay';

const FullWrestlerProfile = ({ wrestlerName }) => {
  const { image, name, name_ja, currentRank } = useSelector(store => {
    return {
      image: store.data.wrestlers[wrestlerName].image,
      name: store.data.wrestlers[wrestlerName].name,
      name_ja: store.data.wrestlers[wrestlerName].name_ja,
      currentRank: store.data.wrestlers[wrestlerName].currentRank,
    };
  }, shallowEqual);

  return (
    <div className={`full-wrestler-profile ${name}`}>
      <img className="photo" src={`https://www3.nhk.or.jp${image}`} />
      <div> 
        <span className="wrestler-name">{name}</span>
        <img className="name-ja" src={`https://www3.nhk.or.jp${name_ja}`} />
        <RankDisplay {...currentRank} />
      </div>
    </div>
  );
}

export default FullWrestlerProfile;
