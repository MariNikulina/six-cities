import { NameSpace } from "../../const";
import { State } from "../../types/state";

export const getCity = (state: State) => state[NameSpace.SiteProcess].city;

export const getSorting = (state: State) => state[NameSpace.SiteProcess].sorting;

export const getActiveOffers = (state: State) => state[NameSpace.SiteProcess].activeOffer;

export const getError = (state: State) => state[NameSpace.SiteProcess].error;