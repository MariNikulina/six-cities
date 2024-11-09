import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainPageScreen from '../../pages/main-page-screen/main-page-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites';
import LoginScreen from '../../pages/login-screen/login-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import {useAppSelector} from '../../hooks';
import {isCheckedAuth} from '../../utils';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getOffersLoadingStatus } from '../../store/site-data/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);

  if (isCheckedAuth(authorizationStatus) || isOffersLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Layout />}
        >
          <Route
            index
            element={<MainPageScreen />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen/>}
          />
          <Route
            path={`${AppRoute.Room}/:id`}
            element={<PropertyScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route
            path='*'
            element={<NotFoundScreen/>}
          />
        </Route>
      </Routes>
    </HistoryRouter>

  );
}

export default App;
