import React, { useState } from 'react';
import { json } from 'd3-fetch'
import Card from './Card';
import { deserializer, getCounts } from '../util/incidents';
import Pane from './Pane';
import Table from './Table';
import useFetch from './useFetch';
import Map from './Map';
import Dropdown from './Dropdown';
import BarChart from './BarChart';
import { countryCountsByYear, countryCountsByType } from '../util/map';

const url = './data/persons.json'

export function FetchIncidentsData() {
  const { data, error, isFetching } = useFetch(url, json, deserializer)
  const [year, setYear] = useState('1992') //for dropdown
  const [selectedCountry, setSelectedCountry] = useState(null)

  if (isFetching) {
    return <div>Loading...</div>
  }

  const onSelectResult = result => {
    setYear(result)
  }

  const onSelectCountry = result => {
    setSelectedCountry(result)
  }

  const yearCounts = countryCountsByYear(data.incidents)[year]
  const years = [...new Set(data.incidents.map(d => d.year))]
  const totalDeaths = getCounts(data.incidents, 'typeOfDeath')
    .filter(d => d.prop !== 'null' && d.prop !== 'Unknown')
  
  console.log(countryCountsByType(data.incidents)[year])
  
  
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
          {totalDeaths
            .map(d => 
              <Card key={d.prop} title={d.count}>
                {d.prop}
              </Card>
            )
          }
        </div>
        <Dropdown 
          data={years} 
          loading={isFetching}
          selected={year} 
          onSelectResult={onSelectResult}
        />
        <Card>
          <Map 
            data={data.incidents}
            width={750} 
            height={450} 
            year={year}
            selected={selectedCountry}
            onSelectCountry={onSelectCountry}
          />
        </Card>
        <Card title={`counts by country in ${year}`}>
          <BarChart data={yearCounts} />
        </Card>
      </div>
    </div>
  )
}
