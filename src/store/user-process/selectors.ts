import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State) => state[NameSpace.UserProcess].authorizationStatus;

export const getUser = (state: State) => state[NameSpace.UserProcess].user;
