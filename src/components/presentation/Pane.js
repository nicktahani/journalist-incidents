import React from 'react';
import '../../css/Pane.css'

export default function Pane({ title, children }) {
  return (
    <div className='pane'>
      <h2>{title}</h2>
      {children}
    </div>
  )
}