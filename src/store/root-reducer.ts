import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { siteData } from './site-data/site-data';
import { siteProcess } from './site-process/site-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.SiteData]: siteData.reducer,
  [NameSpace.SiteProcess]: siteProcess.reducer,
  [NameSpace.UserProcess]: userProcess.reducer,
});
