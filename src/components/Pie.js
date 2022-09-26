import React from 'react'
import { margin, height, width } from '../util/charts'
import { schemeTableau10 } from 'd3-scale-chromatic'
import { scaleOrdinal } from 'd3-scale'

// const colors = schemeTableau10

export default function Pie({ data }) {
  // const colorScale = scaleOrdinal(data, colors)
  // console.log('in pie', data)
  const keys = Object.keys(data)
  const values = Object.values(data)
  console.log(values)
  

  return (
    <div>
      <svg>
        <g transform={`translate(${ width / 2 }, ${ height / 2 })`}>

        </g>
      </svg>
    </div>
  )
}
