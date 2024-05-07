import React, { useMemo } from 'react'

// https://2019.wattenberger.com/blog/react-and-d3#axes
export default function Axis({ scale }) {
  const ticks = useMemo(() => {
    return scale.domain().map((value) => ({
      value,
      xOffset: scale(value),
    }));
  }, [scale]);

  return (
    <>
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 30)`}>
          <line y2={6} stroke='currentColor' />
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(25px)rotate(45deg)'
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
}