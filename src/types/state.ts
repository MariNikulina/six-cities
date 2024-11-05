import { store } from '../store';
import {City, OfferCard, OffersCard, SortName} from './offers';
import {AuthorizationStatus} from '../const';
import {UserData} from './user-data';
import {Reviews} from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// export type InitialState = {
//   city: City;
//   offers: OffersCard;
//   // sorting: SortName;
//   // activeOffer: number | null;
//   // authorizationStatus: AuthorizationStatus;
//   // error: string | null;
//   isOffersLoading: boolean;
//   isDetailedOffersLoading: boolean;
//   isOffersNearbyLoading: boolean;
//   isCommentsLoading: boolean;
//   // user: UserData["email"];
//   detailedOfferInfo: OfferCard | null;
//   offersNearby: OffersCard;
//   comments: Reviews;
// }

export type UserProcessType = {
  authorizationStatus: AuthorizationStatus;
  user: UserData['email'];
}

export type SiteProcessType = {
  city: City;
  sorting: SortName;
  activeOffer: number | null;
  error: string | null;
}

export type SiteDataType = {
  offers: OffersCard;
  isOffersLoading: boolean;
  isDetailedOffersLoading: boolean;
  isOffersNearbyLoading: boolean;
  isCommentsLoading: boolean;
  isFavoriteOffersLoading: boolean;
  detailedOfferInfo: OfferCard | null;
  favoriteOffers: OffersCard;
  offersNearby: OffersCard;
  comments: Reviews;
}
