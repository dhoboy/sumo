import React from 'react';
import * as d3 from 'd3';
import { 
  match,
  lineGenerator,
} from '../../types/types';

import './TrendLine.css';

interface Props {
  tournamentData: {
    [key: string]: match
  };
  wrestlerName: string;
  tournamentMetadata: {
    wins: number;
    losses: number;
    name: string;
  }
}

class TrendLine extends React.Component<Props, object> {
  componentDidMount() {
    const { 
      tournamentData,
      wrestlerName,
      tournamentMetadata
    } = this.props;

    let g = d3.select(`.${tournamentMetadata.name}`)
      .append("g")
      .attr("transform", `translate(${10}, ${10})`);

    let height = 50;
    let width = 10 * (Object.keys(tournamentData).length + 1); //150;

    let data = d3.range(1, Object.keys(tournamentData).length + 1).map(d => {
      if (tournamentData[`day${d}`]) {
        return {
          day: d,
          value: (tournamentData[`day${d}`] || {}).winner === wrestlerName ? 1 : 0
        } 
      } else {
        return {
          day: d,
          value: 0,
          filterThisOut: true
        }
      }
    }).filter(d => {
      return !d.filterThisOut;
    });
    
    let xScale = d3.scaleLinear()
      .domain([1, data.length])
      .range([0, width - 20]);

    let yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([height - 20, 0]);

    let line = d3.line<lineGenerator>()
      .x(d => xScale(d.day))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);
    
    g.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  }
  
  render() {
    const { 
      tournamentData,
      tournamentMetadata
    } = this.props;

    return (
      <div>
        <svg className={`${tournamentMetadata.name}`}
          height="50" width="150">
        </svg>
      </div>
    );
  }
}

export default TrendLine;

