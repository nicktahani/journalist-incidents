import React from 'react';
import { useMemo } from 'react';
import { margin } from '../../util/charts';

export default function AxisLeft({ scale }) {
  const range = scale.range();

  const ticks = useMemo(() => {
    const height = range[0] - range[1];

    return scale.ticks().map((value) => ({
      value,
      yOffset: scale(value),
    }));
  }, [scale]);

  return (
    <>
      {ticks.map(({ value, yOffset }) => (
        <g key={value} transform={`translate(${margin.top - margin.left}, ${yOffset})`}>
          <line x2={-6} stroke="currentColor" style={{ textAlign: 'center' }}/>
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateX(-20px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
}