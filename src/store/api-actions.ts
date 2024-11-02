import {createAsyncThunk} from "@reduxjs/toolkit";
import {StatusCodes} from "http-status-codes";
import {AppDispatch, State} from "../types/state";
import {AxiosInstance, AxiosError} from "axios";
import {OfferCard, OffersCard} from "../types/offers";
import {APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from "../const";
import {ArgPostReviewAction, NewReview, Review, Reviews} from "../types/review";
import { redirectToRoute } from "./action";
import { setError } from "./site-process/site-process";
import {AuthData} from "../types/auth-data";
import {UserData} from "../types/user-data";
import {store} from "./index";
import {dropToken, setToken} from "../services/token";
import OffersList from "../components/offers-list/offers-list";

console.log('api-action')
export const clearErrorAction = createAsyncThunk(
  'offers/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  }
)

export const fetchOffersAction = createAsyncThunk<OffersCard, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data: offers} = await api.get<OffersCard>(APIRoute.Hostels);
    // console.log(offers)
    // dispatch(setOffersLoadedStatus(true));
    // dispatch(setOffers(offers));
    // dispatch(setOffersLoadedStatus(false));
    return offers;
  },
);

export const fetchDetailedInfoAction = createAsyncThunk<OfferCard, OfferCard['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offer/fetchDetailedOfferInfo',
  async (id, {dispatch, extra: api, rejectWithValue}) => {
    try {
      const {data: offer} = await api.get<OfferCard>(`${APIRoute.Hostels}/${id}`);

      // dispatch(setDetailedOffersLoadedStatus(true));
      // dispatch(setDetailedOfferInfo(offer));
      // dispatch(setDetailedOffersLoadedStatus(false));
      // console.log(`${AppRoute.Room}/${id}`)
      dispatch(redirectToRoute(`${AppRoute.Room}/${id}`));
      return offer;
    } catch (error) {
      const axiosError = error as AxiosError;

      // if (axiosError.response?.status === StatusCodes.NOT_FOUND) {
      //   dispatch(redirectToRoute(AppRoute.NotExist));
      // }

      if (!axiosError.response) {
        throw axiosError;
      }
      return rejectWithValue(axiosError.response.data);
    }
  }
);

export const fetchOffersNearbyAction = createAsyncThunk<OffersCard, OfferCard['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchOffersNearby',
  async (id, {dispatch, extra: api}) => {
    const {data: offersNearby} = await api.get<OffersCard>(`${APIRoute.Hostels}/${id}/nearby`);
    // dispatch(setOffersNearbyLoadedStatus(true));
    // dispatch(setOffersNearby(offersNearby))
    // dispatch(setOffersNearbyLoadedStatus(false));
    return offersNearby;
  }
);

export const fetchComments = createAsyncThunk<Reviews, OfferCard['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'reviews/fetchReviews',
  async (id, {dispatch, extra: api}) => {
    const {data: comments} = await api.get<Reviews>(`${APIRoute.Comments}/${id}`);
    // dispatch(setCommentsLoadedStatus(true));
    // dispatch(setComments(comments));
    // dispatch(setCommentsLoadedStatus(false));
    return comments;
  }
);

export const leaveComment = createAsyncThunk<Reviews, ArgPostReviewAction, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'review/leaveReview',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    const {data: comments} = await api.post<Reviews>(`${APIRoute.Comments}/${id}`, {comment, rating});
    // dispatch(setComments(comments));
    return comments
  }
)

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    // try {
    //   await api.get(APIRoute.Login);
    //   dispatch(requireAuthorization(AuthorizationStatus.Auth));
    // } catch {
    //   dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    // }
    await api.get(APIRoute.Login);
  }
)

export const loginAction = createAsyncThunk<UserData["email"], AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    setToken(token);
    // dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));

    return email;
  }
)

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    // dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
)
