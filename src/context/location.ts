import { createContext, useContext } from "react";

interface Location {
  latitude: number | null;
  longitude: number | null;
}
const initialState: Location = {
  latitude: null,
  longitude: null,
};
interface LocationContextType {
  location: Location;
  setLocation: (position: Location) => void;
  error: string | null;
  isDenied: boolean;
}

export const locationContextType: LocationContextType = {
  location: { latitude: null, longitude: null },
  setLocation: () => {},
  error: null,
  isDenied: false,
};

export const locationContext =
  createContext<LocationContextType>(locationContextType);
export const LocationProvider = locationContext.Provider;
export default function useLocation() {
  return useContext(locationContext);
}
