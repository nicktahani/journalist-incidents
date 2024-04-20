import React from 'react';
import '../../css/Card.css'

export default function Card({ title, children }) { 
  return (
    <div className='card'>
        <h3>{title ? <span className='card-title'>{title}</span> : ''}</h3>
        {children}
    </div>
  )
}