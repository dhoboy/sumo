import React, { Fragment } from 'react';

import { 
  tournamentSummaryData
} from '../../../types/types';

interface Props {
  tournamentDisplayName: string;
  tournamentSummaryData: tournamentSummaryData;
  tournamentType: string;
  wins: number;
  losses: number;
}

const TournamentResultCardHeader: React.FunctionComponent<Props> = ({
  tournamentDisplayName,
  tournamentSummaryData,
  tournamentType,
  wins,
  losses
}) => { 
  return (
    <Fragment>
      <div className={`tournamentTitle`}>
        {`${tournamentDisplayName}: ${tournamentSummaryData.tournamentRank}`}
      </div>
      <div className={tournamentType}>
        {tournamentType}
      </div>
      <div className={`winsLosses ${tournamentType}-tournament`}>
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

export default TournamentResultCardHeader;
