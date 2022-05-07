import React, { useState, useEffect } from 'react';
import { json } from 'd3-fetch'
// import { deserializer } from '../util/incidents';

const url = './data/persons.json'

const deserializer = d => {
  console.log('in de', d)
  
  return {
    ...d,
    name: d.fullName
  }
}

export function FetchIncidentsData() {
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    json(url)
      .then(deserializer)
      .then(data => {
        setIsFetching(false)
        setData(data)
      })
      .catch(err => {
        setIsFetching(false)
        setError(err)
      })
  }, [])
  
  console.log(data)

  if (isFetching) {
    return <div>Loading...</div>
  }

  return (
    <>
      {data && 
        <p>
          hi
        </p>
      }
    </>
  )
}
