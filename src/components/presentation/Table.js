import React from 'react';
import '../../css/Table.css'
import { getCounts } from '../../util/incidents';

export default function Table({ data }) {
  
  const counts = getCounts(data, 'country').slice(0, 10)

  return (
    <ul className='list'>
      {counts.map(d => 
        <li key={d.prop} className='list-item'>{`${d.count} ${d.prop}`}</li>
      )}
    </ul>
  )
}