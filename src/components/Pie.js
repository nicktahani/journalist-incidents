import React from 'react'
import { margin, height, width } from '../util/charts'
import { schemeTableau10 } from 'd3-scale-chromatic'
import { scaleOrdinal } from 'd3-scale'
import { arc, pie } from 'd3-shape'

const colors = schemeTableau10

export default function Pie({ data, ...chartProps }) {
  const colorScale = data && scaleOrdinal(Object.keys(data), colors)

  const arcs = arc()
    .innerRadius( 0.5 * height / 2 )
    .outerRadius( 0.85 * height / 2 )

  const labelArcs = arc()
    .innerRadius( 0.95 * height / 2 )
    .outerRadius( 0.95 * height / 2 )
  
  const keys = data && Object.keys(data)
  const values = data && Object.values(data)
  const pies = pie()
    .value(d => d.value)
  
  const pieArcs = pie(Object.entries(data).map(d => ({type: d[0], value: d[1]})))

  console.log(pieArcs)
    
  return (
    <div>
      <svg {...chartProps}>
        <g transform={`translate(${ width / 2 }, ${ height / 2 })`}>

        </g>
      </svg>
    </div>
  )
}
