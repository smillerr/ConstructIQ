'use client'

import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef } from 'react'

const MapWidget = ({ lat, lng }) => {
  const mapRef = useRef(null)
  useEffect(() => {
    async function initMap() {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
        version: 'weekly',
      })
      const { Map } = await loader.importLibrary('maps')
      //Init a marker
      const { Marker } = await loader.importLibrary('marker')
      const position = {
        lat,
        lng,
      }
      //Map options
      const mapOptions = {
        center: position,
        zoom: 17,
        mapId: `construction-${lat}-${lng}`,
      }
      //Setup the map
      const map = new Map(mapRef.current, mapOptions)
      //Put up the marker
      new Marker({
        position,
        map,
      })
    }
    initMap()
  }, [])
  return <div className="w-72 h-72" ref={mapRef} />
}

export default MapWidget
