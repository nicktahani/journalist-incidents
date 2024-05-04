import React from 'react';
import { margin, height, width } from '../../util/charts';
import { scaleBand, scaleLinear } from 'd3-scale';
import { extent, max } from 'd3-array';
import Axis from './Axis'
import { axisBottom, axisLeft } from 'd3-axis';
import AxisLeft from './AxisLeft';

export default function BarChart({ data }) {
  const chartData = Object.entries(data)
  const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };
  // const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = scaleBand()
    .domain(Object.keys(data))
    .rangeRound([margin.left, width - margin.right])
    .padding(0.1)

  const yScale = scaleLinear()
    .domain([0, max(Object.values(data))])
    .range([height - margin.bottom, margin.top])
    console.log(extent(yScale.domain()))

  return (
    <>
      <svg width={width} height={height}>
        {chartData.map(d => (
          <rect
            key={d[0]}
            x={xScale(d[0]) - xScale.bandwidth() / 2} 
            y={yScale(d[1])}
            height={yScale(0) - yScale(d[1])}
            width={xScale.bandwidth()}
            fill='steelblue'
          />
        ))}
        <g transform={`translate(0, ${height - margin.bottom - margin.top})`}>
          <Axis scale={xScale} />
        </g> 
        <g transform={`translate(${margin.left}, 0)`}>
          <AxisLeft scale={yScale} /> 
        </g>
      </svg>
    </>
  )
}
