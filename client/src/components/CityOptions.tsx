import React, { useContext, useRef, useState } from 'react';
import { CityContext } from '../utils/CityContext';
import { trpc } from '../utils/trpc';
import useOutsideCloser from './hooks/useOutsideCloser';

const CityOptions = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data, isSuccess} = trpc.getCities.useQuery();
  const { selectedCity, setSelectedCity } = useContext(CityContext);

  const options = useRef(null);
  useOutsideCloser({ref: options, setIsOpen: setIsOpen});
  
  if (!isSuccess) return <p>Loading options...</p>
  data.sort();

  function handleSelection(cityName: string) {
    if (cityName === selectedCity) return

    localStorage.setItem('selectedLocation', cityName);

    setSelectedCity(cityName);
    setIsOpen(false);
  }

  return (
    <div ref={options} className='relative font-jakarta w-full flex flex-row gap-2 justify-between'>
      <div 
        className={`select-none px-4 py-2 text-2xl w-full cursor-pointer bg-gray-800 
          text-white font-bold rounded-lg hover:bg-gray-900 transition-all ease-in-out
          hover:shadow-lg
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCity}
      </div>

      <div className={`${isOpen ? 'visible' : 'invisible'} flex flex-col absolute mt-2 border border-white w-full transition-all ease-in-out bg-white shadow-lg rounded-lg`}>
        {data.map((val, i) =>
          <div 
            key={i} 
            className={`p-4 ${val !== selectedCity ? 'cursor-pointer hover:tracking-widest hover:font-bold': 'tracking-widest text-gray-400'} transition-all ease-in-out`}
            onClick={() => handleSelection(val)}
          >{val}</div>
        )}
      </div>
    </div>
  )
}

export default CityOptions;

