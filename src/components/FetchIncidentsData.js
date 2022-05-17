import React, { useState, useEffect } from 'react';
import { json } from 'd3-fetch'
import Test from './Test';
import { deserializer } from '../util/incidents';

const url = './data/persons.json'

export function FetchIncidentsData() {
  const [error, setError] = useState(false)
  const [rawData, setRawData] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    json(url)
      .then(deserializer)
      .then(data => {
        setIsFetching(false)
        setRawData(data)
      })
      .catch(err => {
        setIsFetching(false)
        setError(err)
      })
  }, [])
  
  // console.log(data)

  if (isFetching) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Test data={rawData} />
    </>
  )
}
