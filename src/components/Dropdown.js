import React, { useState, useEffect } from 'react';

export default function Dropdown({ data, loading, selected, onSelectResult }) {
  
  const handleSelectResult = e => {
    // console.log(e.target.value)
    const { value } = e.target
    if (value === selected) return
    onSelectResult && onSelectResult(value)
  }
  
  return (
    <>
      <select 
        disabled={loading} 
        onChange={handleSelectResult}
      >
       {data.map(d => 
          <option 
            key={d}
            value={d}
          >
            {d}
          </option>
        )} 
      </select>
    </>
  )
}