import { createSelector } from '@reduxjs/toolkit';
import { NameSpace} from '../../const';
import { OfferCard, OffersCard } from '../../types/offers';
import { Reviews } from '../../types/review';
import { State } from '../../types/state';
import { filterOffers, Corparator } from '../../utils';
import { getCity, getSorting } from '../site-process/selectors';

export const getOffers = (state: State): OffersCard => state[NameSpace.SiteData].offers;

export const getDetailedOffers = (state: State): OfferCard => state[NameSpace.SiteData].detailedOfferInfo!;

export const getOffersNearby = (state: State): OffersCard => state[NameSpace.SiteData].offersNearby;

export const getComments = (state: State): Reviews => state[NameSpace.SiteData].comments;

export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.SiteData].isOffersLoading;

export const getDetailedOffersLoadingStatus = (state: State): boolean => state[NameSpace.SiteData].isDetailedOffersLoading;

export const getOffersNearbyLoadingStatus = (state: State): boolean => state[NameSpace.SiteData].isOffersNearbyLoading;

export const getCommentsLoadingStatus = (state: State): boolean => state[NameSpace.SiteData].isCommentsLoading;

export const getFavoriteOffers = (state: State): OffersCard => state[NameSpace.SiteData].favoriteOffers;

export const getFavoriteOffersLoadingStatus = (state: State): boolean => state[NameSpace.SiteData].isFavoriteOffersLoading;

export const selectOffers = createSelector(
  [getOffers, getCity, getSorting],
  (offers, city, sorting) => (filterOffers(city.name, offers).sort(Corparator[sorting]))
);
