import { createContext, Dispatch, SetStateAction } from "react";

type CityContextProps = {
  selectedCity: string,
  setSelectedCity: Dispatch<SetStateAction<string>>
}

export const CityContext = createContext<CityContextProps>({
  selectedCity: '',
  setSelectedCity: () => {}
});
