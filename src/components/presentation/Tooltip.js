import React, { useState } from 'react';

export default function Tooltip({ content, position }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: position.y + 10,
        left: position.x + 10,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '5px',
        zIndex: 9999,
      }}
    >
      {content}
    </div>
  )
}
