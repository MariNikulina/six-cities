import { createSlice } from '@reduxjs/toolkit';
import { SiteDataType } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchOffersAction, changeStatusFavoriteOffer, fetchComments, fetchDetailedInfoAction, fetchFavoriteOffers, fetchOffersNearbyAction, leaveComment } from '../api-actions';

const initialState: SiteDataType = {
  offers: [],
  isOffersLoading: false,
  isDetailedOffersLoading: false,
  isOffersNearbyLoading: false,
  isCommentsLoading: false,
  isFavoriteOffersLoading: false,
  detailedOfferInfo: null,
  favoriteOffers: [],
  offersNearby: [],
  comments: [],
};
export const siteData = createSlice({
  name: NameSpace.SiteData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchDetailedInfoAction.pending, (state) => {
        state.isDetailedOffersLoading = true;
      })
      .addCase(fetchDetailedInfoAction.fulfilled, (state, action) => {
        state.detailedOfferInfo = action.payload;
        state.isDetailedOffersLoading = false;
      })
      .addCase(fetchDetailedInfoAction.rejected, (state) => {
        state.isDetailedOffersLoading = false;
      })
      .addCase(fetchOffersNearbyAction.pending, (state) => {
        state.isOffersNearbyLoading = true;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
        state.isOffersNearbyLoading = false;
      })
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
      })
      .addCase(changeStatusFavoriteOffer.fulfilled, (state, action) => {
        const updatedFavoriteOffer = action.payload;
        state.offers = state.offers.map((offer) => offer.id === updatedFavoriteOffer.id ? updatedFavoriteOffer : offer);

        if (state.detailedOfferInfo && state.detailedOfferInfo.id === updatedFavoriteOffer.id) {
          state.detailedOfferInfo = updatedFavoriteOffer;
        }

        if (updatedFavoriteOffer.isFavorite) {
          state.favoriteOffers = state.favoriteOffers?.concat(updatedFavoriteOffer);
        } else {
          state.favoriteOffers = state.favoriteOffers?.filter((offer) => offer.id !== updatedFavoriteOffer.id);
        }
      })
      .addCase(fetchComments.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsLoading = false;
      })
      .addCase(leaveComment.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(leaveComment.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsLoading = false;
      });
  }
});
