import React from 'react';
import { FaCloudRain, FaWind } from 'react-icons/fa';
import directions from '../utils/directions';

type WeatherSubProps = {
  rain: number,
  windDeg: number, 
  windSpeed: number
}

function WeatherSub({rain, windDeg, windSpeed}: WeatherSubProps) {
  return (
    <div className='flex flex-row gap-4 items-center justify-evenly text-neutral-500 w-full'>
        <div className='flex flex-row gap-3 items-center'>
          <FaCloudRain className='text-xl text-neutral-300'/> <span className='text-sm'>{rain} %</span>
        </div>

        <div className='flex flex-row gap-3 items-center  text-neutral-500'>
          <FaWind className='text-xl text-neutral-300'/> 
          <span className='text-sm font-bold'>{calculateWindDirection(windDeg)}</span>
          <span className='text-sm'>{Math.round(windSpeed * 3.6)} km/h</span>
        </div>
    </div>
  )
}

function calculateWindDirection(deg: number): string {
  const direction = directions.find(dir => Math.abs(deg - dir.deg) < 12.25)?.name ?? '' 
  return direction
}

export default WeatherSub;
