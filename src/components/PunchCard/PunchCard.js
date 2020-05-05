import React from 'react';
import * as d3 from 'd3';

const PunchCard = ({
  wrestlerName,
  tournamentData,
  tournamentSummaryData,
  pageLocation,
}) => {
    const { name } = tournamentSummaryData;

    // prepare the tooltip
    const tooltip = d3.select("#tooltip");
    tooltip.html("");
    tooltip.append("p").attr("class", "day-number");
    tooltip.append("p").attr("class", "match-result winner");
    tooltip.append("p").attr("class", "match-result looser");
    tooltip.append("p").attr("class", "technique");
  
    // interaction flag
    let autoScrolled = false;

    // interaction helper functions
    const highlightCircle = (day) => {
      d3.selectAll(`.punch-card.${name}`)
        .select(`svg`)
        .select(`g`)
        .select(`g.day${day}`)
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
      d3.select(`#tournament-${name}`).select(`.tournament-day-results`).select(`.day-result-row.${name}.day${day}`)
        .style("font-weight", "bold");
    }
  
    const resetResultCardDays = () => {
      d3.select(`#tournament-${name}`).select(`.tournament-day-results`).selectAll(`.day-result-row`)
        .style("font-weight", "normal");
    };

    // prepare to draw graph
    let height = 70;
    let width = 250;

    // every tournament is 15 days, form the data for graph
    let data = d3.range(0, 15).map(d => {
      if (tournamentData[`day${d+1}`]) {
        return {
          tournament: tournamentSummaryData.name,
          day: d+1,
          value: (tournamentData[`day${d+1}`] || {}).winner === wrestlerName ? 1 : 0,
          data: { ...tournamentData[`day${d+1}`] }
        } 
      } else {
        return {
          day: d+1,
          value: null,
        }
      }
    });
    
    // scales
    let x = d3.scaleBand()
      .domain(d3.range(1, 16))
      .range([0, width - 15]);

    let y = d3.scaleLinear()
      .domain([0, 1])
      .range([height - 25, 0]);

    const color = d3.scaleOrdinal()
      .domain([null, 0, 1])
      .range(["#fff", "#969696", "#238b45"])

    // draw graph 
    const svg = d3.select(`.punch-card.${wrestlerName}.${tournamentSummaryData.name}.${pageLocation}`).select('svg');

    const g = svg.append("g")
      .attr("width", width - 50)
      .attr("transform", `translate(${15}, ${15})`)
      .selectAll('.day')
      .data(data)
      .enter()
      .append('g')
      .attr('class', d => `day day${d.day}`)
    
    g.append('circle')
      .attr("cx", d => x(d.day))
      .attr("cy", d => y(+d.value))
      .attr("r", 5)
      .attr("fill", d => color(d.value))
      .attr("stroke-width", 2);

    // interaction code
    g.on("mouseover", (d) => {
      autoScrolled = false;
      resetCircles();
      resetResultCardDays();
      highlightCircle(d.day);
      highlightResultCardDay(d.day);

      if (d.data) {
        tooltip.select(".match-result.winner").text(`Winner: ${d.data.winner}`);
        tooltip.select(".match-result.looser").text(`Loser: ${d.data.loser}`);
        tooltip.select(".technique").text(`Technique: ${d.data.technique}`);
      } else {  
        tooltip.select(".match-result.winner").text(`Did not compete`);
        tooltip.select(".match-result.looser").text(``);
        tooltip.select(".technique").text(``);
      }
      tooltip.style("visibility", "visible");
    })
    .on("mousemove", d => {
      autoScrolled = false;
      const tooltip = d3.select("#tooltip");
      const { pageX, pageY } = d3.event;
      let left = pageX + 10;
      let top = pageY - 10; 
      return tooltip.style("top", `${top}px`).style("left", `${left}px`);
    })
    .on("mouseout", () => {
      if (!autoScrolled) {
        resetCircles();        
        resetResultCardDays();
      }
      const tooltip = d3.select("#tooltip");
      tooltip.select(".day-number").text(``);
      tooltip.select(".match-result.winner").text(``);
      tooltip.select(".match-result.looser").text(``);
      tooltip.select(".technique").text(``);
      
      return tooltip.style("visibility", "hidden");
    })
    .on("click", (d) => {
      autoScrolled = true;
      d3.selectAll(`.day-result-row`).style("font-weight", "normal");
      d3.select(`#day-result-row-${d.tournament}-day${d.day}`).style("font-weight", "bold");
      d3.selectAll(`.punch-card.${tournamentSummaryData.name}`)
        .select(`svg`)
        .select(`g`)
        .select(`g.day${d.day}`)
        .select("circle")
        .attr("stroke", "#000");

      const node = document.getElementById(`tournament-${d.tournament}`);
      node.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
    });
    
    return (
      <div className={`punch-card ${wrestlerName} ${tournamentSummaryData.name} ${pageLocation} ${tournamentSummaryData.result}`}>
        <svg height="70" width="250"></svg>
      </div>
    );
}


export default PunchCard;
