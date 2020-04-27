import React, { Component } from 'react';
import * as d3 from 'd3';

class PunchCard extends Component {
  componentDidMount() {
    const { 
      wrestlerName,
      tournamentData,
      tournamentSummaryData,
    } = this.props;

    let height = 70;
    let width = 250;

    // every tournament is 15 days
    let data = d3.range(0, 15).map(d => {
      if (tournamentData[`day${d+1}`]) {
        return {
          day: d+1,
          value: (tournamentData[`day${d+1}`] || {}).winner === wrestlerName ? 1 : 0,
        } 
      } else {
        return {
          day: d+1,
          value: null,
        }
      }
    });
    
    let x = d3.scaleBand()
      .domain(d3.range(1, 16))
      .range([0, width - 15]);

    let y = d3.scaleLinear()
      .domain([0, 1])
      .range([height - 15, 0]);

    const color = d3.scaleOrdinal()
      .domain([null, 0, 1])
      .range(["#fff", "#969696", "#238b45"])

    d3.select(`.punch-card.${wrestlerName}.${tournamentSummaryData.name}`).select('svg')
      .append("g")
      .attr("transform", `translate(${25}, ${10})`)
      .selectAll('.day')
      .data(data)
      .enter()
      .append('g')
      .attr('class', d => `day ${d.day}`)
      .append('circle')
      .attr("cx", d => x(d.day))
      .attr("cy", d => y(+d.value))
      .attr("r", 5)
      .attr("fill", d => color(d.value))
  }
  
  render() {
    const { 
      tournamentSummaryData,
      wrestlerName,
    } = this.props;

    return (
      <div className={`punch-card ${wrestlerName} ${tournamentSummaryData.name}`}>
        <svg height="70" width="250"></svg>
      </div>
    );
  }
}

export default PunchCard;
