import React, { useState, useEffect } from 'react';
import { json } from 'd3-fetch'
import Card from './Card';
import { deserializer, getCounts } from '../util/incidents';
import Pane from './Pane';
import Table from './Table';

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
    <div className='wrapper' style={{display: 'flex'}}>
      <Pane title='anti-press incidents'>
        <Card title='updated'>
           <i>{rawData.updatedAt}</i>
        </Card>
        <Card title='incidents at a glance (country)'>
          <Table data={rawData.incidents} />
        </Card>
      </Pane>
      <div className='main-dash'>
        {/* <Card title={rawData.incidents.length}>
          total incidents
        </Card> */}
        {console.log('h', getCounts(rawData.incidents, 'typeOfDeath'))
        }
        {getCounts(rawData.incidents, 'typeOfDeath').map(d => 
          <Card title={d.count}>
            {d.prop}
          </Card>
        )}
      </div>
    </div>
  )
}
