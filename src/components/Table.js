import React from 'react';
import '../css/Table.css'
import { getCountryCounts } from '../util/incidents';

export default function Table({ data }) {
  const countryCounts = getCountryCounts(data).slice(0, 10)
  
  return (
    <ul className='list'>
      {countryCounts.map(d => 
        <li className='list-item'>{`${d.count} ${d.country}`}</li>
      )}
    </ul>
  )
}