import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react'
import CityOptions from './components/CityOptions';
import WeatherPanel from './components/WeatherPanel';
import { CityContext } from './utils/CityContext';
import { trpc } from './utils/trpc';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => 
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:5000/trpc',
        }),
      ]
    })
  );
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedLocation') || 'Select a location');
  const cityValue = {selectedCity, setSelectedCity};

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col gap-4 w-full p-3 sm:w-[30rem]">
          <CityContext.Provider value={cityValue}>
            <CityOptions />
            <WeatherPanel />
          </CityContext.Provider>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
