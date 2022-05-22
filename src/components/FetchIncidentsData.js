import React, { useState, useEffect } from 'react';
import { json } from 'd3-fetch'
import Card from './Card';
import { deserializer } from '../util/incidents';
import Pane from './Pane';

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
  
  // console.log(rawData)

  if (isFetching) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Pane title='anti-press incidents'>
        <Card title='updated'>
           <i>{rawData.updated}</i>
        </Card>
      </Pane>
      <Card title={rawData.incidents.length}>
        total incidents
      </Card>
      {rawData.incidents.map(d => 
        <Card>
          <span>{d.name}</span>
          <ul>
            <li>{d.country}</li>
            <li>{d.title}</li>
          </ul>
        </Card>
      )}
    </>
  )
}
