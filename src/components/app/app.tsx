import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainPageScreen from '../../pages/main-page-screen/main-page-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites';
import LoginScreen from '../../pages/login-screen/login-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import {Reviews} from '../../types/review';
import {City, OffersCard} from '../../types/offers';

type AppScreenProps = {
  offers: OffersCard;
  reviews: Reviews;
  city: City;
};

function App({offers, reviews, city}: AppScreenProps): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Layout />}
        >
          <Route
            index
            element={<MainPageScreen offers={offers} city={city}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen/>}
          />
          <Route
            path={`${AppRoute.Room}/:id`}
            element={<PropertyScreen onReview={() => {
              throw new Error('Function \'onReview\' isn\'t implemented.');
            }}
            />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth }
              >
                <FavoritesScreen offers={offers}/>
              </PrivateRoute>
            }
          />
          <Route
            path='*'
            element={<NotFoundScreen/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
