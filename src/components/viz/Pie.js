import React from 'react'
import { margin, height, width } from '../../util/charts'
import { schemeTableau10 } from 'd3-scale-chromatic'
import { scaleOrdinal } from 'd3-scale'
import { arc, pie } from 'd3-shape'

const colors = schemeTableau10

export default function Pie({ data, ...chartProps }) {
  const color = data && scaleOrdinal(Object.keys(data), colors)

  const pies = pie().value(d => d.value)
  const pieArcs = data && pies(Object.entries(data).map(d => ({type: d[0], value: d[1]})))

  const arcData = arc()
    .innerRadius( 0.5 * height / 2 )
    .outerRadius( 0.85 * height / 2 )

    if (!data) {
      return <span>select a country</span>
    }
  
  return (
    <div>
      <svg {...chartProps}>
        <g transform={`translate(200, 125)`}>
          {data && pieArcs.map((d, i) => (            
            <path
              key={ `path-${ i }` }
              d={ arcData(d) }
              stroke='#fff'
              strokeWidth={ 2 }
              fill={ color(d.data.type) }
              onClick={() => console.log(d.data.value)}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
