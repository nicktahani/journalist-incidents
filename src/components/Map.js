import React, { useState, useEffect } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import useFetch from './useFetch'

const url = '/data/countries-50m.json'

const proj = geoMercator()

export default function Map({ ...mapProps }) {
  const [geo, setGeo] = useState([])

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
    <svg {...mapProps}>
      <g>
      {geo.map((d,i) => (
        <path
          key={ `path-${ i }` }
          d={ geoPath().projection(proj)(d) }
          fill='#ccc'
          stroke='#fff'
          strokeWidth={ 1 }
        />
      ))
      }
      </g>  
    </svg>
  )
}