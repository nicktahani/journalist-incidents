import React from 'react';
import '../css/Card.css'

export default function Card({ title, children }) { 
  return (
    <div className='card'>
        {title ? <span className='card-title'>{title}</span> : ''}
        {children}
    </div>
  )
}