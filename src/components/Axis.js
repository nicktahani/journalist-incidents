import React, { useRef, useEffect } from 'react'
import { select } from 'd3-selection'

export default function Axis({ transform, scale, axisType }) {
  // const ref = useRef()
  const axis = useRef()
  // const yAxis = useRef()

  useEffect(() => {
    if (!axis.current) return;
    
    const axisGenerator = axisType(scale)
    // const yAxisGenerator = axisLeft(yScale)
    
    select(axis.current)
      .call(axisGenerator)
    
    // select(yAxis.current)
    //   .call(yAxisGenerator)
  }, [scale, axisType])

  return (
    // <svg ref={ref}>
      <g ref={axis} transform={transform} />
    // </svg>
  )
}