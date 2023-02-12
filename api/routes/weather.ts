import { PrismaClient } from '@prisma/client';
import { t } from '../trpc';
import { z } from 'zod';
import axios from 'axios';
import dotenv from 'dotenv'
import Weather from '../../client/src/components/types/types'
import { TRPCError } from '@trpc/server';

const prisma = new PrismaClient();
dotenv.config({ path: './.env' });
const CITIES = ['Budapest', 'Győr', 'Debrecen', 'Miskolc', 'Pécs', 'Sopron', 'Szeged', 'Gyékényes'];
const BASE_URL = 'http://api.openweathermap.org/'

export const weatherRouter = t.router({
  getCities: t.procedure
    .query(() => {
      return CITIES;
    }),
  byCity: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      const { name } = input;

      if (CITIES.includes(name)) {
        return getCoordinates(name)
          .then(coords => { 
            return getWeather(name, coords?.lat, coords?.lon)
              .then(res => { 
                return res 
              })
          })
          .catch(error => {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: error.message
            })
          })
      } else {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Wrong location was passed to the api.'
        })
      }
    })
})

export type WeatherRouter = typeof weatherRouter;

async function getCoordinates(cityName: string): Promise<{lat: number, lon: number} | undefined> {
  const coords = await prisma.coordinate.findFirst({
    where: {
      name: cityName
    }
  })   
    .then(res => {
      if (res)
        return { lat: res.lat, lon: res.lon }
    })

  if (coords) return coords

  const url = `${BASE_URL}geo/1.0/direct?q=${cityName},HU&limit=1&appid=${process.env.WEATHER_API_KEY}`

  return await axios.get(url)
    .then(res => {
      const {lat, lon} = res.data[0];

      if (lat && lon) {
        prisma.coordinate.create({
          data: {
            name: cityName, 
            lat,
            lon
          }
        })
      } 

      return {lat: lat, lon: lon}
    })
    .catch(() => {
      throw new Error('Something went wrong while fetching the coordinates!')
    });
}

async function getWeather(cityName: string, lat: number | undefined, lon: number | undefined): Promise<Weather | undefined> {
  const TMinus10 = new Date().getTime() - 10 * 60000;
  const ISOTMinus10 = new Date(TMinus10).toISOString();

  await prisma.weather.deleteMany({
    where: {
      queriedAt: {
        lt: ISOTMinus10 
      }
    }
  });

  const weather = await prisma.weather.findFirst({
    where: {
      city: cityName,
    }, 
    orderBy: {
      queriedAt: 'desc'
    }
  })   
    .then(res => {
      if (res?.queriedAt && res?.queriedAt?.getTime() > TMinus10)
        return { 
          city: cityName,
          temp: res.temp,
          description: res.description,
          pressure: res.pressure,
          humidity: res.humidity,
          windDeg: res.windDeg,
          windSpeed: res.windSpeed,
          windGust: res.windGust,
          cloud: res.cloud,
          rain: res.rain,
          icon: res.icon
        }
    })

  if (weather) return weather

  const url = `${BASE_URL}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`

  console.log('querying from api')
  return await axios.get(url)
    .then(res => {
      const data = {
        city: cityName,
        temp: res.data.main.temp,
        description: res.data.weather[0].description,
        pressure: res.data.main.pressure,
        humidity: res.data.main.humidity,
        windDeg: res.data.wind.deg,
        windSpeed: res.data.wind.speed,
        windGust: res.data.wind.gust ?? res.data.wind.speed,
        cloud: res.data.clouds.all ?? 0,
        rain: res.data.rain ? res.data.rain['1h'] : 0,
        icon: res.data.weather[0].icon
      };

      if (lat && lon) {
        return prisma.weather.create({ data }).then(() => { return data })
      }
    })
    .catch(() => {
      throw new Error('Something went wrong while fetching the weather data!')
    });
}
