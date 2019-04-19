import React from 'react';

import { 
  matchResults,
  tournamentMetadata
} from '../../types/types';

import TournamentResultCardHeader from './subcomponents/TournamentResultCardHeader';
import TrendLine from '../TrendLine/TrendLine';
import DayResultRow from './subcomponents/DayResultRow';
import './TournamentResultCard.css'

interface Props {
  wrestlerName: string;
  tournamentData: matchResults;
  tournamentMetadata: tournamentMetadata;
  wins: number;
  losses: number;
  tournamentDisplayName: string;
  tournamentType: string;
};

const TournamentResultCard: React.FunctionComponent<Props> = ({
  wrestlerName,
  tournamentData,
  tournamentMetadata,
  wins,
  losses,
  tournamentDisplayName,
  tournamentType
}) => {
  return (
    <div className="tournamentSection">
      <TournamentResultCardHeader
        tournamentDisplayName={tournamentDisplayName}
        tournamentMetadata={tournamentMetadata}
        tournamentType={tournamentType}
        wins={wins}
        losses={losses}
      />
      <TrendLine 
        tournamentData={tournamentData} 
        wrestlerName={wrestlerName}
        tournamentMetadata={tournamentMetadata}
      />
      <div className="tournamentDayResults">
        {Object.keys(tournamentData).map(day => {
          let dayData = tournamentData[day];
          let winner = dayData.winner === wrestlerName; 
          return (
            <DayResultRow
              day={day}  
              dayData={dayData}
              winner={winner}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TournamentResultCard;
