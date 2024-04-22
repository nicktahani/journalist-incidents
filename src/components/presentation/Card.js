import React from 'react';
import '../../css/Card.css'

export default function Card({ title, children }) { 
  return (
    <div className='card'>
        {title ? <h3 className='card-title'>{title}</h3> : ''}
        {children}
    </div>
  )
}