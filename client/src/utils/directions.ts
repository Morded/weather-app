type Direction = {
  name: string;
  deg: number;
}

const directions: Direction[] = [
  {
    name: 'N',
    deg: 0
  },
  {
    name: 'NNE',
    deg: 22.5
  },
  {
    name: 'NE',
    deg: 45
  },
  {
    name: 'ENE',
    deg: 67.5
  },
  {
    name: 'E',
    deg: 90
  },
  {
    name: 'ESE',
    deg: 112.5
  },
  {
    name: 'SE',
    deg: 135
  },
  {
    name: 'SSE',
    deg: 157.5
  },
  {
    name: 'S',
    deg: 180
  },
  {
    name: 'SSW',
    deg: 202.5
  },
  {
    name: 'SW',
    deg: 225
  },
  {
    name: 'WSW',
    deg: 247.5
  },
  {
    name: 'W',
    deg: 270
  },
  {
    name: 'WNW',
    deg: 292.5
  },
  {
    name: 'NW',
    deg: 315
  },
  {
    name: 'NNW',
    deg: 337.5
  },
  {
    name: 'N',
    deg: 360
  },
]

export default directions;
