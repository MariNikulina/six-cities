import { SiteProcessType } from "../../types/state";
import { CityLocation, cities, Sorting, NameSpace } from "../../const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CityName } from "../../types/offers";

const initialState: SiteProcessType = {
    city: {
        location: CityLocation[cities[0]],
        name: cities[0],
      },
    sorting: Sorting.Popular,
    activeOffer: null,
    error: null,
};

export const siteProcess = createSlice({
    name: NameSpace.SiteProcess,
    initialState,
    reducers: {
        setCity: (state, action: PayloadAction<CityName>) => {
            state.city = {
              name: action.payload,
              location: CityLocation[action.payload],
            };
        },
        setSorting: (state, action) => {
            state.sorting = action.payload;
        },
        setActiveOffer: (state, action) => {
            state.activeOffer = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const { setCity, setSorting, setActiveOffer, setError } = siteProcess.actions;