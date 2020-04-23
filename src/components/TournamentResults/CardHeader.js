import React, { Fragment } from 'react';

const CardHeader = ({
  tournamentDisplayName,
  tournamentSummaryData,
  tournamentType,
  wins,
  losses,
}) => { 
  return (
    <Fragment>
      <div className={`tournament-title`}>
        {`${tournamentDisplayName}: ${tournamentSummaryData.tournamentRank}`}
      </div>
      <div className={tournamentType}>
        {tournamentType}
      </div>
      <div className={`wins-losses ${tournamentType}-tournament`}>
        <div className="wins">
          {`${wins} ${wins === 1 ? 'win' : 'wins'}`}
        </div>
        <div>-</div>
        <div className="losses">
          {`${losses} ${losses === 1 ? 'loss' : 'losses' }`}
        </div>
      </div>
    </Fragment>
  );
};

export default CardHeader;
