import React from 'react';

const CardRow = ({
  day,
  winner,
  dayData,
}) => {
  return (
    <div className="day-result-row">
      <div className="day-name">
        {`${day.charAt(0).toUpperCase() + day.slice(1)}: `}
      </div>
      <div className="match-result">
        {winner ? 
          `Defeated ${dayData.loser} by ${dayData.technique}` : 
          `Lost to ${dayData.winner} by ${dayData.technique}`
        }
      </div>
    </div>
  );
}

export default CardRow;
