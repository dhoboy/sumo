import React from 'react';

// currentRank: { rank: string, asOf: Date }
// showLabel: boolean flag used to show "Rank: " label
const RankDisplay = ({
  rank,
  asOf,
  showLabel,
}) => {
  return (
    <div className="rank-display">
      <span>{showLabel ? `Rank: ${rank}` : rank}</span>
      {rank.toLowerCase() !== 'yokozuna' && <span>{`(${asOf.toLocaleDateString('en-US', {month: "long", year: "numeric"})})`}</span>}
    </div>
  );
};

export default RankDisplay;
