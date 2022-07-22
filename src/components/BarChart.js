import React from 'react';
import { getCountsByYear, countryCountsByYear } from '../util/map'
import { margin, height, width } from '../util/charts';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

export default function BarChart({ data, year }) {
  const chartData = Object.entries(getCountsByYear(data)[year])
  console.log(Object.values(countryCountsByYear(data)[year]))
  
  const xDomain = Object.keys(getCountsByYear(data)[year])
  const yDomain = max(Object.values(getCountsByYear(data)[year]).map(({count}) => count))

  const xScale = scaleBand()
    .domain(xDomain)
    .rangeRound([margin.left, width - margin.right])
    .padding(0.25)
  
  const yScale = scaleLinear()
    .domain([0, yDomain])
    .range([height - margin.bottom, margin.top])
    
  
  return (
    <>
      <svg width={width} height={height}>
        {chartData.map(d => d[1]).map((d, i) => (
          <rect
            key={d.country}
            x={xScale(d.country)}
            y={yScale(d.count)}
            height={yScale(0) - yScale(d.count)}
            width={xScale.bandwidth()}
            fill='steelblue'
          />
        ))}
      </svg>
    </>
  )
}
