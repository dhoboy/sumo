import React from 'react';
import { match } from '../../../types/types';

interface Props {
  day: string;
  winner: boolean;
  dayData: match;
}

const DayResultRow: React.FunctionComponent<Props> = ({
  day,
  winner,
  dayData
}) => {
  return (
    <div className="dayResultRow">
      <div className="dayName">
        {`${day.charAt(0).toUpperCase() + day.slice(1)}: `}
      </div>
      <div className="matchResult">
        {winner ? 
          `Defeated ${dayData.loser} by ${dayData.technique}` : 
          `Lost to ${dayData.winner} by ${dayData.technique}`
        }
      </div>
    </div>
  );
}

export default DayResultRow;
