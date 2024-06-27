import React, {useState} from 'react'
import { margin, height, width } from '../../util/charts'
import { schemeTableau10 } from 'd3-scale-chromatic'
import { scaleOrdinal } from 'd3-scale'
import { arc, pie } from 'd3-shape'
import Legend from './Legend'
import { useTooltipContext } from '../../contexts/TooltipContext'

export default function Pie({ data, ...chartProps }) {
  const { handlePointerEnter, handlePointerLeave } = useTooltipContext()

  const color = data && scaleOrdinal(Object.keys(data), schemeTableau10)

  const pies = pie().value(d => d.value)
  const pieArcs = data && pies(Object.entries(data).map(d => ({type: d[0], value: d[1]})))

  const arcData = arc()
    .innerRadius( 0.5 * height / 2 )
    .outerRadius( 0.85 * height / 2 )

  if (!data) {
    return <i>select a country</i>
  }
  
  return (
    <div>
      <svg {...chartProps}>
        <Legend color={color} {...chartProps}/>
        <g transform={`translate(150, 125)`}>    
          {data && pieArcs.map((d, i) => (    
            <> 
              <path
                key={ `path-${ i }` }
                d={ arcData(d) }
                stroke='#fff'
                strokeWidth={ 2 }
                fill={ color(d.data.type) }
                onPointerMove={e => handlePointerEnter(e, d.data.value)}
                onPointerLeave={handlePointerLeave}
                
              />
            </> 
          ))}
        </g>
      </svg>
    </div>
  )
}
