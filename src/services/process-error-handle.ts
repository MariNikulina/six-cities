import {store} from '../store';
import { setError } from '../store/site-process/site-process';
import {clearErrorAction} from '../store/api-actions';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
