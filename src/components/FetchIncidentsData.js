import React from 'react';
import { json } from 'd3-fetch'
import Card from './Card';
import { deserializer, getCounts } from '../util/incidents';
import Pane from './Pane';
import Table from './Table';
import useFetch from './useFetch';
import Map from './Map'

const url = './data/persons.json'

export function FetchIncidentsData() {
  const { data, error, isFetching } = useFetch(url, json, deserializer)
  
  if (isFetching) {
    return <div>Loading...</div>
  }

  return (
    <div className='wrapper' style={{display: 'flex'}}>
      <Pane title='anti-press incidents'>
        <Card title='updated'>
           <i>{data.updatedAt}</i>
        </Card>
        <Card title='top 10 incidents by country'>
          <Table data={data.incidents} />
        </Card>
      </Pane>
      <div className='main-dash'>
        <div className='stat-cards' style={{display: 'flex'}}>
          {getCounts(data.incidents, 'typeOfDeath')
            .filter(d => d.prop !== 'null' && d.prop !== 'Unknown')
            .map(d => 
              <Card title={d.count}>
                {d.prop}
              </Card>
            )
          }
        </div>
        <Card>
          <Map data={data} width={750} height={450} />
        </Card>
      </div>
    </div>
  )
}
