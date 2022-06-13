import React, { useEffect, useState } from 'react';

export default function useFetch(url, fetchFn, deserializer) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    fetchFn(url)
      .then(deserializer)
      .then(data => {
        setIsFetching(false)
        setData(data)
      })
      .catch(error => {
        setIsFetching(false)
        setError(error)
      })
  }, [url, fetchFn, deserializer])

  return { data, error, isFetching }

}