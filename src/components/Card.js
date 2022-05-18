import React from 'react';
import '../css/Card.css'

export default function Card({ children }) { 
  // console.log('d', data)
  
  
  return (
    <div className='card'>
      {children}
    </div>
  )
}