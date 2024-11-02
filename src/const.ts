import {CityName, Location} from "./types/offers";

export const STARS_COUNT = 5;
export const MAX_PERCENT_STARS_WIDTH = 100;
export const TIMEOUT_SHOW_ERROR = 2000;

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export const CityLocation: { [key in CityName]: Location } = {
  'Paris': {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 10
  },
  'Cologne': {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 10
  },
  'Brussels': {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 10
  },
  'Amsterdam': {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 10
  },
  'Hamburg': {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 10
  },
  'Dusseldorf': {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 10
  },
};


export enum AppRoute {
  Main = '/',
  Login = 'login',
  Favorites = 'favorites',
  Room = 'offer',
  NotExist = '404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum MainClassName {
  Article = 'cities__place-',
  Wrapper = 'cities',
  Info = '',
  List = 'cities__places-list places__list tabs__content',
}

export enum FavoritesClassName {
  Article = 'favorites__',
  Wrapper = 'favorites',
  Info = 'favorites__card-info',
  List = 'favorites__places',
}

export enum PropertyClassName {
  Article = 'near-places__',
  Wrapper = 'near-places',
  Info = '',
  List = 'near-places__list places__list',
}

export enum Rating {
  Perfect = 'perfect',
  Good = 'good',
  NotBad = 'not bad',
  Badly = 'badly',
  Terribly = 'terribly',
}

export enum Sorting {
  Popular = 'Popular',
  PriceIncrease = 'Price: low to high',
  PriceDecrease = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum APIRoute {
  Hostels = '/hotels',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

// export enum TypeHousing {
//   apartment = 'Apartment',
//   room = 'Private Room',
//   house = 'House',
//   hotel = 'Hotel',
// }

export const TypeHousing: Record<string, string> = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
};

export enum NameSpace {
  SiteData = 'SITE_DATA',
  SiteProcess = 'SITE_PROCESS',
  UserProcess = 'USER_PROCESS',
}
