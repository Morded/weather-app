import React from 'react'
import { trpc } from '../utils/trpc';

const WeatherPanel = () => {
  const weather = trpc.getAll.useQuery()

  console.log(weather.data)
  return (
    <div>
      {weather.data?.map((val, i) =>
        <p key={i}>{val.lat}</p>
      )}
    </div>
  )
}

export default WeatherPanel;
