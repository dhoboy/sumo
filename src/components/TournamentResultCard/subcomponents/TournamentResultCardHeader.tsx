import React, { Fragment } from 'react';

import { 
  tournamentMetadata
} from '../../../types/types';

interface Props {
  tournamentDisplayName: string;
  tournamentMetadata: tournamentMetadata;
  tournamentType: string;
  wins: number;
  losses: number;
}

const TournamentResultCardHeader: React.FunctionComponent<Props> = ({
  tournamentDisplayName,
  tournamentMetadata,
  tournamentType,
  wins,
  losses
}) => { 
  return (
    <Fragment>
      <div className={`tournamentTitle`}>
        {`${tournamentDisplayName}: ${tournamentMetadata.tournamentRank}`}
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
