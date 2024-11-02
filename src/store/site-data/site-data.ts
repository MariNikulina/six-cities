import { createSlice } from "@reduxjs/toolkit";
import { SiteDataType } from "../../types/state";
import { NameSpace } from "../../const";
import { fetchComments, fetchDetailedInfoAction, fetchOffersAction, fetchOffersNearbyAction, leaveComment } from "../api-actions";

const initialState: SiteDataType = {
    offers: [],
    isOffersLoading: false,
    isDetailedOffersLoading: false,
    isOffersNearbyLoading: false,
    isCommentsLoading: false,
    detailedOfferInfo: null,
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
        .addCase(fetchOffersNearbyAction.pending, (state) => {
            state.isOffersNearbyLoading = true;
        })
        .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
            state.offersNearby = action.payload;
            state.isOffersNearbyLoading = false;
        })
        .addCase(fetchComments.pending, (state) => {
            state.isCommentsLoading = true;
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.isCommentsLoading = false;
        })
        .addCase(leaveComment.pending, (state)  => {
            state.isCommentsLoading = true;
        })
        .addCase(leaveComment.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.isCommentsLoading = false;
        })
    }
})