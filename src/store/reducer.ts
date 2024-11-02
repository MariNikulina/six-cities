import {createReducer} from "@reduxjs/toolkit";
import {
  requireAuthorization,
  setActiveOffer,
  setCity, setComments,
  setCommentsLoadedStatus,
  setDataLoadedStatus, setDetailedOfferInfo,
  setDetailedOffersLoadedStatus,
  setError,
  setOffers, setOffersLoadedStatus, setOffersNearby,
  setOffersNearbyLoadedStatus,
  setSorting, setUserData
} from "./action";
import {AuthorizationStatus, cities, CityLocation, Sorting} from "../const";
import {InitialState} from "../types/state";


const initialState: InitialState = {
  city: {
    location: CityLocation[cities[0]],
    name: cities[0],
  },
  offers: [],
  sorting: Sorting.Popular,
  activeOffer: null,
  // authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersLoading: false,
  isDetailedOffersLoading: false,
  isOffersNearbyLoading: false,
  isCommentsLoading: false,
  // user: '',
  detailedOfferInfo: null,
  offersNearby: [],
  comments: [],
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = {
        name: action.payload,
        location: CityLocation[action.payload],
      };
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadedStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setDetailedOffersLoadedStatus, (state) => {
      state.isDetailedOffersLoading = action.payload;
    })
    .addCase(setOffersNearbyLoadedStatus, (state) => {
      state.isOffersNearbyLoading = action.payload;
    })
    .addCase(setCommentsLoadedStatus, (state) => {
      state.isCommentsLoading = action.payload;
    })
    .addCase(setSorting, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(setActiveOffer, (state, action) => {
      state.activeOffer = action.payload;
    })
    // .addCase(requireAuthorization, (state, action) => {
    //   state.authorizationStatus = action.payload;
    // })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    // .addCase(setUserData, (state, action) => {
    //   state.user = action.payload;
    // })
    .addCase(setDetailedOfferInfo, (state, action) => {
      state.detailedOfferInfo = action.payload;
    })
    .addCase(setOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
})

export {reducer};
