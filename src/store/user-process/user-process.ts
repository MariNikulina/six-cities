import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcessType } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { UserData } from '../../types/user-data';

const initialState: UserProcessType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: '',
};

export const userProcess = createSlice({
  name: NameSpace.UserProcess,
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserProcessType['user']>) => {
      state.user = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action: PayloadAction<UserData['email']>) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const {setUserData} = userProcess.actions;
