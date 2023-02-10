import { createTRPCReact } from '@trpc/react-query';
import type { WeatherRouter } from '../../../api/routes/weather';

export const trpc = createTRPCReact<WeatherRouter>();
