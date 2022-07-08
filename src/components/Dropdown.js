import React, { useState, useEffect } from 'react';

export default function Dropdown({ data, loading, onSelectResult }) {
  const [selected, setSelected] = useState('1992')
  
  const years = [...new Set(data.map(d => d.year))]

  const handleSelectResult = e => {
    console.log(e.target.value)
    const { value } = e.target
    if (value === selected) return
    setSelected(value)
    onSelectResult && onSelectResult(value)
  }
  
  return (
    <>
      <select 
        disabled={loading} 
        onChange={handleSelectResult}
      >
       {years.map(year => 
          <option 
            key={year}
            value={year}
          >
            {year}
          </option>
        )} 
      </select>
    </>
  )
}