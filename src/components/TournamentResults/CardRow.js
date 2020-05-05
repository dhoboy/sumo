import React from 'react'; 
import * as d3 from 'd3';

const CardRow = ({
  day,
  dayData,
  winner,
  tournamentSummaryData,
}) => {
  const { name } = tournamentSummaryData;

  // interaction helper functions
  const highlightCircle = (day) => {
    d3.selectAll(`.punch-card.${name}`)
      .select(`svg`)
      .select(`g`)
      .select(`g.${day}`)
      .select("circle")
      .attr("stroke", "#000");
  };

  const resetCircles = () => {
    d3.selectAll(`.punch-card.${name}`)
      .select(`svg`)
      .select(`g`)
      .selectAll(`g`)
      .select("circle")
      .attr("stroke", "none");
  };

  const highlightResultCardDay = (day) => {
    d3.select(`#tournament-${name}`).select(`.tournament-day-results`).select(`.day-result-row.${name}.${day}`)
      .style("font-weight", "bold");
  }

  const resetResultCardDays = () => {
    d3.select(`#tournament-${name}`).select(`.tournament-day-results`).selectAll(`.day-result-row`)
      .style("font-weight", "normal");
  };

  
  const handleMouseOver = () => {
    resetCircles();
    resetResultCardDays();
    highlightCircle(day);
    highlightResultCardDay(day);
  }

  const handleMouseOut = () => {
    resetCircles();
    resetResultCardDays();
  }
  
  
  return (
    <div id={`day-result-row-${tournamentSummaryData.name}-${day}`} className={`day-result-row ${tournamentSummaryData.name} ${day}`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
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
