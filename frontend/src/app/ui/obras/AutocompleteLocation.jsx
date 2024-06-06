'use client'

import { libs } from '@/lib/utils/utilFunctions'
import { useJsApiLoader } from '@react-google-maps/api'
import { useEffect, useRef, useState } from 'react'

const AutocompleteLocation = ({ register, setValue }) => {
  const google = window.google
  const [autocomplete, setAutocomplete] = useState(null)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    libraries: libs,
  })
  const autocompleteRef = useRef(null)

  useEffect(() => {
    if (isLoaded) {
      //Limit the autocomplete to only colombian addresses & Set up the autocomplete
      const gAutocomplete = new google.maps.places.Autocomplete(
        autocompleteRef.current,
        {
          fields: ['formatted_address', 'geometry', 'name'],
          componentRestrictions: {
            country: ['co'],
          },
        },
      )
      setAutocomplete(gAutocomplete)
    }
  }, [isLoaded])
  useEffect(() => {
    if (autocomplete) {
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        const position = place.geometry?.location
        if (position) {
          //Store the position in selected place
          setValue('geocoords', {
            lat: position.lat(),
            lng: position.lng(),
          })
        }
      })
    }
  }, [autocomplete])
  return <input type="text" {...register('geocoords')} ref={autocompleteRef} />
}

export default AutocompleteLocation
