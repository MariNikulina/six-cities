export enum AppRoute {
  Main = '/',
  Login = 'login',
  Favorites = 'favorites',
  Room = 'offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum CardClassName {
  Article = 'cities__place-',
  Wrapper = 'cities',
  Info = '',
}

export enum FavoritesClassName {
  Article = 'favorites__',
  Wrapper = 'favorites',
  Info = 'favorites__card-info',
}

export enum Rating {
  Perfect = 'perfect',
  Good = 'good',
  NotBad = 'not bad',
  Badly = 'badly',
  Terribly = 'terribly',
}

export const STARS_COUNT = 5;
