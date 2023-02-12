import React from 'react';
import DetailType from './DetailType';

type DetailsProps = {
  gust: number, 
  humidity: number,
  pressure: number,
  cloud: number
}

function Details({gust, humidity, pressure, cloud}: DetailsProps) {
  return(
    <div className='grid grid-cols-2 w-full gap-6'>
      <DetailType title='Wind gusts' value={Math.round(gust * 3.6)} unit='km/h' />
      <DetailType title='Humidity' value={humidity} unit='%' />
      <DetailType title='Pressure' value={pressure} unit='hPa' />
      <DetailType title='Cloud coverage' value={cloud} unit='%' />
    </div>
  )
}

export default Details;
