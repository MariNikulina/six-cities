import {createAction} from "@reduxjs/toolkit";
import {AppRoute} from "../const";


// export const setCity = createAction<CityName>('city/setCity');

// export const setOffers = createAction<OffersCard>('offers/setOffers');

// export const setOffersLoadedStatus = createAction<boolean>('data/setOffersLoadedStatus');

// export const setDetailedOffersLoadedStatus = createAction<boolean>('data/setDetailedOffersLoadedStatus');

// export const setOffersNearbyLoadedStatus = createAction<boolean>('data/setOffersNearbyLoadedStatus');

// export const setCommentsLoadedStatus = createAction<boolean>('data/setCommentsLoadedStatus');

// export const setSorting = createAction<SortName>('sorting/setSorting');

// export const setActiveOffer = createAction<number | null>('offers/setActiveOffer');

// export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

// export const setError = createAction<string | null>('offers/setError');

// export const setUserData = createAction<UserData['email']>('user/setUserData');

export const redirectToRoute = createAction<AppRoute | string>('offers/redirectToRoute');

// export const setDetailedOfferInfo = createAction<OfferCard>('offer/setDetailedOfferInfo');

// export const setOffersNearby = createAction<OffersCard>('offers/setOffersNearby');

// export const setComments = createAction<Reviews>('reviews/setReviews');


