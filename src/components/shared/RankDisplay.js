import React from 'react';

// currentRank: { rank: string, asOf: Date }
const RankDisplay = ({
  rank,
  asOf,
}) => {
  return (
    <div className="rank-display">
      <span>{rank}</span>
      {rank.toLowerCase() !== 'yokozuna' && <span>{`(${asOf.toLocaleDateString('en-US', {month: "long", year: "numeric"})})`}</span>}
    </div>
  );
};

export default RankDisplay;
