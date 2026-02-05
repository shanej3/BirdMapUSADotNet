// Types for:
// - Bird/Weather/Rec APIs
// - User bird data, (favorite/found/want to see)
// - Location with radius 


// Bird observation from eBird API
export interface BirdObservation {
  speciesCode: string;
  comName: string;
  sciName: string;
  howMany: number;
  lat: number;
  lng: number;
  obsDt: string;
  locationPrivate: boolean;

  // User-specific flags
  isFavorite?: boolean;
  found?: boolean;
  wantToSee?: boolean;
}

// Recreation area from RIDB API
export interface RecArea {
  RecAreaID: string;
  RecAreaName: string;
  RecAreaLatitude: number;
  RecAreaLongitude: number;
  RecAreaDescription: string;
}

// Weather forecast from NWS API
export interface WeatherForecast {
  name: string;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  detailedForecast: string;
  probabilityOfPrecipitation?: {
    value: number | null;
  };
  windSpeed: string;
  windDirection: string;
}

// Location data from NWS API (initial call)
export interface LocationData {
  properties: {
    forecast: string;
    forecastGridData: string;
    relativeLocation: {
      properties: {
        city: string;
        state: string;
      };
    };
  };
}

// User bird data (favorite, found, want to see) stored in backend
export interface UserBird {
  id: string;
  userId: string;
  speciesCode: string;
  isFavorite: boolean;
  found: boolean;
  wantToSee: boolean;
}

// Location coordinate with radius
export interface LocationWithRadius {
  lat: number;
  lng: number;
  radius: number;
}
