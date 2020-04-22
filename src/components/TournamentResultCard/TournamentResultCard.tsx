import React from 'react';

import { 
  matchResults,
  tournamentSummaryData,
} from '../../types/types';

import TournamentResultCardHeader from './subcomponents/TournamentResultCardHeader';
import TrendLine from '../TrendLine/TrendLine';
import PunchCard from '../PunchCard/PunchCard';
import DayResultRow from './subcomponents/DayResultRow';

import './TournamentResultCard.css'

interface Props {
  wrestlerName: string;
  tournamentData: matchResults;
  tournamentSummaryData: tournamentSummaryData;
  wins: number;
  losses: number;
  tournamentDisplayName: string;
  tournamentType: string;
};

const TournamentResultCard: React.FunctionComponent<Props> = ({
  wrestlerName,
  tournamentData,
  tournamentSummaryData,
  wins,
  losses,
  tournamentDisplayName,
  tournamentType
}) => {
  return (
    <div className="tournamentSection">
      <TournamentResultCardHeader
        tournamentDisplayName={tournamentDisplayName}
        tournamentSummaryData={tournamentSummaryData}
        tournamentType={tournamentType}
        wins={wins}
        losses={losses}
      />
      <div className="trendLineContainer">
        <div className="trendLineKeys">
          <div className="trendLineKey">win</div>
          <div className="trendLineKey">loss</div>
        </div>
        <TrendLine 
          tournamentData={tournamentData} 
          wrestlerName={wrestlerName}
          tournamentSummaryData={tournamentSummaryData}
          pageLocation={'resultCard'}
        />
      </div>
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
