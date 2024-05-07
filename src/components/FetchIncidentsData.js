import React, { useState } from 'react';
import { json } from 'd3-fetch'
import Card from './presentation/Card';
import { deserializer, getCounts } from '../util/incidents';
import Pane from './presentation/Pane';
import Table from './presentation/Table';
import useFetch from './useFetch';
import Map from './viz/Map';
import Dropdown from './presentation/Dropdown';
import BarChart from './viz/BarChart';
import { countryCountsByYear, countryCountsByType } from '../util/map';
import Pie from './viz/Pie'; 

const url = './data/persons.json'

export function FetchIncidentsData() {
  const { data, error, isFetching } = useFetch(url, json, deserializer)
  const [year, setYear] = useState('1992') //for dropdown
  const [selectedCountry, setSelectedCountry] = useState(null)


  if (isFetching) {
    return <div>Loading...</div>
  }

  const { updatedAt, incidents } = data

  const onSelectResult = result => {
    setYear(result)
  }

  const onSelectCountry = result => {
    setSelectedCountry(result)
  }

  const yearCounts = countryCountsByYear(incidents)[year]
  const years = [...new Set(incidents.map(d => d.year))]
  const totalDeaths = getCounts(incidents, 'typeOfDeath')
    .filter(d => d.prop !== 'null' && d.prop !== 'Unknown')
  
  const countsByDeathType = countryCountsByType(incidents)[year][selectedCountry]

  return (
    <div className='wrapper' style={{display: 'flex'}}>
      <Pane title='anti-press incidents'>
        <Card title='updated'>
           <i>{updatedAt}</i>
        </Card>
        <Card title='top 10 incidents by country'>
          <Table data={incidents} />
        </Card>
      </Pane>
      <div className='main-dash'>
        <div className='stat-cards'>
          {totalDeaths.map(d => 
              <Card key={d.prop} title={d.count}>
                {d.prop}
              </Card>
          )}
          <Card>
            <label>select year: </label>
            <Dropdown 
              data={years} 
              loading={isFetching}
              selected={year} 
              onSelectResult={onSelectResult}
            />
          </Card>
        </div>
        <div className='viz-wrapper'>
        <Card>
          <Map 
            data={incidents}
            width={550} 
            height={450} 
            year={year}
            selected={selectedCountry}
            onSelectCountry={onSelectCountry}
          />
        </Card>
        <div>
          <Card>
            <Pie 
              data={countsByDeathType} 
              width={500}
              height={250}
            />
          </Card>
          <Card title={`counts by country in ${year}`}>
            <BarChart data={yearCounts} />
          </Card>
        </div>
      </div>
      </div>
    </div>
  )
}
