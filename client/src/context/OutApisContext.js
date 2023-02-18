import axios from 'axios'
import { env } from 'config/environment'
import { createContext, useCallback, useState } from 'react'
import { useGeolocation } from 'react-recipes'

export const OutApisContext = createContext()

export default function OutApisProvider({ children }) {
  const [temp, setTemp] = useState(0)
  const [region, setRegion] = useState('')
  const [loading, setLoading] = useState(false)

  const { latitude, longitude, error } = useGeolocation(true)

  const getInfoLocation = useCallback(async () => {
    const revertGeocoding = async () => {
      try {
        const result = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?key=${env.openCageDataKey}&q=${latitude}+${longitude}&language=en&pretty=1&no_annotations=1`
        )

        setRegion(
          result.data.results[0].components.city_district ||
            result.data.results[0].components.city
        )
      } catch (error) {
        console.log(error)
      }
    }

    const getCurrentTemp = async () => {
      try {
        const result = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}%2C${longitude}?unitGroup=metric&include=current&key=${env.visualCrossingKey}&contentType=json`
        )

        setTemp(result.data.currentConditions.temp)
      } catch (error) {
        console.log(error)
      }
    }

    if (error) return
    if (latitude >= 0 && latitude <= 180 && longitude >= 0 && longitude <= 180)
      Promise.all([
        setLoading(true),
        await revertGeocoding(),
        await getCurrentTemp()
      ]).then(() => setLoading(false))
  }, [error, latitude, longitude])

  return (
    <OutApisContext.Provider
      value={{
        temp,
        region,
        loading,
        location: { latitude, longitude, error },
        getInfoLocation
      }}
    >
      {children}
    </OutApisContext.Provider>
  )
}
