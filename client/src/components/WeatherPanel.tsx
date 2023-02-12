import React, { useContext } from 'react'
import { CityContext } from '../utils/CityContext';
import { trpc } from '../utils/trpc';
import Details from './Details';
import Divider from './Divider';
import Weather from './types/types';
import WeatherHeader from './WeatherHeader';
import WeatherSub from './WeatherSub';

const WeatherPanel = () => {
  const { selectedCity } = useContext(CityContext);
  const { data, isError, error } = trpc.byCity.useQuery({ name: selectedCity });
  const weather: Weather | undefined = data;

  if (isError && error) return <p className='text-red-800 text-lg'>{error.message}</p>

  if (selectedCity === 'Select a location') return null
  if (!weather) return <p>Loading weather data...</p>

  const {icon, description, temp, rain, windDeg, windSpeed, windGust, humidity, pressure, cloud} = weather;

  return (
    <div className='bg-white shadow-xl flex flex-col items-center rounded-lg text-neutral-600 p-6'>
      <WeatherHeader icon={icon} description={description} temp={temp} />
      <WeatherSub rain={rain} windDeg={windDeg} windSpeed={windSpeed} />
      <Divider />
      <Details
        gust={windGust} 
        humidity={humidity}
        pressure={pressure}
        cloud={cloud}
      />       
    </div>
  )
}

export default WeatherPanel;



