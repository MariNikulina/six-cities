import { NameSpace } from "../../const";
import { OfferCard, OffersCard } from "../../types/offers";
import { Reviews } from "../../types/review";
import { State } from "../../types/state";

export const getOffers = (state: State): OffersCard => state[NameSpace.SiteData].offers;

export const getDetailedOffers = (state: State): OfferCard  => state[NameSpace.SiteData].detailedOfferInfo!;

export const getOffersNearby = (state: State): OffersCard => state[NameSpace.SiteData].offersNearby;

export const getComments = (state: State): Reviews => state[NameSpace.SiteData].comments;

export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.SiteData].isOffersLoading;

export const getDetailedOffersLoadingStatus = (state: State): boolean => state[NameSpace.SiteData].isDetailedOffersLoading;

export const getOffersNearbyLoadingStatus = (state: State): boolean => state[NameSpace.SiteData].isOffersNearbyLoading;

export const getCommentsLoadingStatus = (state: State): boolean => state[NameSpace.SiteData].isCommentsLoading;