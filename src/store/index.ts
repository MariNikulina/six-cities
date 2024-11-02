import {configureStore} from "@reduxjs/toolkit";
import {createApi} from "../services/api";
import {redirect} from "./middlewares/redirect";
import { rootReducer } from "./root-reducer";

export const api = createApi();
console.log('index-store')
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }).concat(redirect),
});

