import React from 'react';

export default function Test({ data }) { 
  // console.log(rawData.data.map(d => d.name))
  console.log('d', data)
  
  
  return (
    <div>
      {data.map(d => 
        <div key={d.id} className='box'>
          <h3>{`${d.name} (${d.title})`}</h3>
          <ul>
            <li>{d.country}</li>
          </ul>
        </div>
      )}
    </div>
  )
}