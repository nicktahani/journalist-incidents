import React from 'react';
import { margin, height, width } from '../../util/charts';
import { scaleBand, scaleLinear } from 'd3-scale';
import { extent, max } from 'd3-array';
import Axis from './Axis'
// import { axisBottom, axisLeft } from 'd3-axis';
import AxisLeft from './AxisLeft';
import { useTooltipContext } from '../../contexts/TooltipContext'

export default function BarChart({ data }) {
  const { handlePointerEnter, handlePointerLeave } = useTooltipContext()
  const chartData = Object.entries(data)

  const xScale = scaleBand()
    .domain(Object.keys(data))
    .rangeRound([margin.left, width - margin.right])
    .padding(0.1)

  const yScale = scaleLinear()
    .domain([0, max(Object.values(data))])
    .range([height - margin.bottom, margin.top])

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
            onPointerMove={e => handlePointerEnter(e, d[1])}
            onPointerLeave={handlePointerLeave}
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
