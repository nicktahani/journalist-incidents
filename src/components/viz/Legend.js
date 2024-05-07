import React from 'react';

export default function Legend({ color, ...chartProps }) {
  console.log(color)
  const domain = color.domain()
  const legendSpacing = 15
  const legendRectSize = 15
  const legendPosition = {
    x: chartProps.width / 4,
    y: 40
  }

  return (
    <g transform={`translate(${chartProps.width / 3}, -20)`}>
      {domain.map((d, i) => (
        <g key={d} transform={`translate(0, ${i * legendSpacing})`}> 
          <rect
            x={legendPosition.x} 
            y={legendPosition.y + (i * legendSpacing)}
            height={legendRectSize}
            width={legendRectSize}
            fill={color(d)}
          />
          <text
            x={legendPosition.x + legendRectSize + 5}
            y={legendPosition.y + (i * legendSpacing) + (legendRectSize / 2)}
            dy='0.35em'
            style={{ fontSize: '10px' }}
          >
            {d}
          </text>
        </g>
      ))}
    </g>
  )
}