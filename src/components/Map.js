import React, { useState, useEffect } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { max } from 'd3-array'
import { scaleSequential } from 'd3-scale'
import { interpolateYlGn } from 'd3-scale-chromatic'
import { feature } from 'topojson-client'
import useFetch from './useFetch'
import { getCountsByYear, filterBySelection } from '../util/map'
import Modal from './Modal'

const url = '/data/countries-50m.json'

const proj = geoMercator()
  .scale(180)
  .translate([420, 220])

export default function Map({ data, year, ...mapProps }) {
  const [geo, setGeo] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null)

  const countsByYear = getCountsByYear(data)
  
  // console.log(getCountsByYear(data)['1992'])
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
        data={filterBySelection(data, selectedCountry, year)}
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selected={selectedCountry}
      />
      <svg {...mapProps} viewBox='0 -200 910 670'>
        <g>
          {geo && geo.map((d, i) => {
            const year_val = countsByYear[year]?.[d.properties.name]?.count
            return (
              <path
                key={ `path-${ i }` }
                onClick={() => {
                  setIsModalOpen(true)
                  setSelectedCountry(d.properties.name)
                  
                }}
                d={ geoPath().projection(proj)(d) }
                fill={ year_val ? color(year_val) : '#ccc' }
                stroke='#fff'
                strokeWidth={ 1 }
              /> 
            )
          })
          }
        </g>  
      </svg>
    </>
  )
}