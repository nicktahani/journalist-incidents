import React from 'react';
import { getCountsByYear, countryCountsByYear } from '../util/map'
import { margin, height, width } from '../util/charts';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

export default function BarChart({ data }) {
  const chartData = Object.entries(data)

  const xScale = scaleBand()
    .domain(Object.keys(data))
    .rangeRound([margin.left, width - margin.right])
    .padding(0.25)
  
  const yScale = scaleLinear()
    .domain([0, max(Object.values(data))])
    .range([height - margin.bottom, margin.top])
    
  
  return (
    <>
      <svg width={width} height={height}>
        {chartData.map(d => (
          <rect
            key={d[0]}
            x={xScale(d[0])}
            y={yScale(d[1])}
            height={yScale(0) - yScale(d[1])}
            width={xScale.bandwidth()}
            fill='steelblue'
          />
        ))}
      </svg>
    </>
  )
}
