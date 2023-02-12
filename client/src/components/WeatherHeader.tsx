import React from 'react';

type WeatherHeaderProps = {
  icon: string,
  description: string,
  temp: number
}

function WeatherHeader({icon, description, temp}: WeatherHeaderProps) {
  return(
    <div className='flex flex-row items-center w-full -mt-8'>
      <img alt='weather icon' src={`http://openweathermap.org/img/wn/${icon}@4x.png`} className="w-6/12" />
      <div className='w-6/12 flex flex-col gap-2 items-center'>
        <span className='text-sm text-neutral-500 capitalize'>{description}</span>
        <span className='text-5xl font-bold'>{Math.round(temp)}°</span>
      </div>
    </div>
  )
}

export default WeatherHeader;
