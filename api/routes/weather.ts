import { PrismaClient } from '@prisma/client';
import { t } from '../trpc';
import { z } from 'zod';
import axios from 'axios';
import dotenv from 'dotenv'

const prisma = new PrismaClient();
dotenv.config({ path: './.env' });
const CITIES = ['Budapest', 'Győr', 'Debrecen', 'Miskolc', 'Pécs', 'Sopron', 'Szeged', 'Gyékényes'] as const;

export const weatherRouter = t.router({
  getCities: t.procedure
    .query(() => {
      return CITIES;
    }),
  byCity: t.procedure
    .input(z.object({ name: z.enum(CITIES) }))
    .query(() => {
      
    }),
  getAll: t.procedure 
    .query(() => {
      console.log(getCoordinates('Budapest'))
      return prisma.weather.findMany()
    }),
  create: t.procedure
    .mutation(() => {
      return prisma.weather.create({

        data: {
          city: 'Budapest',
          lat: 23,
          lon: 16,
          temp: 26, 
          pressure: 27,
          humidity: 85,
          windDeg: 200,
          windSpeed: 10,
          windGust: 15,
          cloud: 100,
          rain: 10
        },
      })
    })
})

export type WeatherRouter = typeof weatherRouter;

function getCoordinates(cityName: string) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},HU&limit=1&appid=${process.env.WEATHER_API_KEY}`

  axios.get(url).then(res => {
    const {lat, lon} = res.data;
    console.log('lat ', lat)
    console.log('lon ', lon)
    return({lat, lon})
  })
}
