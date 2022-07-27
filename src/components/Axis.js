import React, { useRef, useEffect } from 'react'
import { select } from 'd3-selection'
import { axisLeft, axisBottom } from 'd3-axis'

export default function Axis({ transform, xScale, yScale }) {
  const ref = useRef()
  const xAxis = useRef()
  const yAxis = useRef()

  useEffect(() => {
    if (!ref.current) return;
    
    const XaxisGenerator = axisBottom(xScale)
    // const YaxisGenerator = axisLeft(yScale)
    
    select(xAxis.current)
      .call(XaxisGenerator)
    
    // select(yAxis.current)
    //   .call(YaxisGenerator)
  }, [])

  return (
    <svg ref={ref}>
      <g ref={xAxis} transform={transform} />
    </svg>
  )
}