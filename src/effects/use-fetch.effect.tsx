import { useState, useEffect } from 'react'

export const useFetch = (url: string, dependencies?) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url)
      if (response.status === 400) {
        alert('Failed to fetch')
        return null
      }
      const dataArray = await response.json()
      setData(dataArray)
    }

    fetchData()
  }, [url, dependencies])

  return data
}
