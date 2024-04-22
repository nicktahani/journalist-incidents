import React, { useState, useEffect } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { max } from 'd3-array'
import { scaleSequential } from 'd3-scale'
import { interpolateYlGn } from 'd3-scale-chromatic'
import { feature } from 'topojson-client'
import useFetch from '../useFetch'
import { getCountsByYear, countryCountsByType, filterBySelection } from '../../util/map'
import Modal from '../presentation/Modal'

const url = '/data/countries-50m.json'

const proj = geoMercator()
  .scale(180)
  .translate([420, 220])

export default function Map({ data, year, selected, onSelectCountry, ...mapProps }) {
  const [geo, setGeo] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectCountry = country => {
    onSelectCountry && onSelectCountry(country)
  }

  const countsByYear = getCountsByYear(data)
  const filteredSelection = filterBySelection(data, selected, year)

  const colorCounts = Object.values(countsByYear[year]).map(d => d.count) 
  const color = scaleSequential([0, max(colorCounts)], interpolateYlGn)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url)
        if (!res.ok) {
          throw Error(`Error. Status Code: ${res.status}`)
        }
        const mapData = await res.json()
        setGeo(feature(mapData, mapData.objects.countries).features)
        
      } catch (e) {
        console.error(e)
      }
    }

    fetchData()
    
    
  }, [])  

  // const {data, error, isFetching} = useFetch(url, fetch, undefined)

  return (
    <>
      <Modal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      >
        <h3>{`Incidents in ${selected}`}</h3>
        {filteredSelection.map(d => 
          <div className='modalCard' key={d.id}>
            <span>
              {d.name}
              <a href={d.page}>CPJ page</a>
            </span>
            <p dangerouslySetInnerHTML={{__html: d.body}} />
          </div>
        )}
      </Modal>
      <svg {...mapProps} viewBox='0 -200 910 670'>
        <g>
          {geo && geo.map((d, i) => {
            const year_val = countsByYear[year]?.[d.properties.name]?.count
            return (
              <path
                key={ `path-${ i }` }
                onClick={() => {
                  handleSelectCountry(d.properties.name)
                  setIsModalOpen(true)
                }}
                d={ geoPath().projection(proj)(d) }
                fill={ year_val ? color(year_val) : '#ccc' }
                stroke='#fff'
                strokeWidth={ 1 }
                cursor='pointer'
              /> 
            )
          })
          }
        </g>  
      </svg>
    </>
  )
}